import os
from dotenv import load_dotenv
from fastapi import FastAPI, Query, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from database import Database
from scraper import scrape_product
from utils import is_valid_url

# Load environment variables
load_dotenv()


# Custom Exceptions
class ProductNotFoundError(Exception):
    pass


class InvalidURLError(Exception):
    pass


class ScrapingError(Exception):
    pass


app = FastAPI(title="Price Tracker API")


# Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "message": "Validation error on request data"},
    )


@app.exception_handler(ProductNotFoundError)
async def product_not_found_handler(request: Request, exc: ProductNotFoundError):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND, content={"message": "Product not found"}
    )


@app.exception_handler(InvalidURLError)
async def invalid_url_handler(request: Request, exc: InvalidURLError):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": "Invalid URL provided"},
    )


@app.exception_handler(ScrapingError)
async def scraping_error_handler(request: Request, exc: ScrapingError):
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"message": "Error scraping product data"},
    )


# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
db = Database(os.getenv("DATABASE_URL"))


# Response Models
class ProductResponse(BaseModel):
    url: str
    latest_price: Optional[float] = None
    latest_name: Optional[str] = None
    currency: Optional[str] = None
    is_available: Optional[bool] = True
    main_image_url: Optional[str] = None


class PriceHistoryResponse(BaseModel):
    timestamp: datetime
    price: float
    name: str
    currency: str
    is_available: bool
    main_image_url: Optional[str] = None


class ProductDetailResponse(BaseModel):
    product: ProductResponse
    price_history: List[PriceHistoryResponse]


# Endpoints
@app.post(
    "/api/v1/products",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"description": "Invalid URL"},
        503: {"description": "Scraping error"},
        422: {"description": "Validation error"},
    },
)
async def add_product(url: str):
    if not is_valid_url(url):
        raise InvalidURLError()

    try:
        product_data = scrape_product(url)
        db.add_product(product_data["url"])
        db.add_price(product_data)

        return ProductResponse(
            url=product_data["url"],
            latest_price=product_data["price"],
            latest_name=product_data["name"],
            currency=product_data["currency"],
            is_available=product_data["is_available"],
            main_image_url=product_data["main_image_url"],
        )
    except Exception as e:
        raise ScrapingError()


@app.get(
    "/api/v1/products",
    response_model=List[ProductResponse],
    status_code=status.HTTP_200_OK,
)
async def get_products():
    products = db.get_all_products()
    response = []

    for product in products:
        price_history = db.get_price_history(product.url)
        if price_history:
            latest = price_history[0]
            response.append(
                ProductResponse(
                    url=product.url,
                    latest_price=latest.price,
                    latest_name=latest.name,
                    currency=latest.currency,
                    is_available=latest.is_available,
                    main_image_url=latest.main_image_url,
                )
            )

    return response


@app.get(
    "/api/v1/products/{url:path}",
    response_model=ProductDetailResponse,
    status_code=status.HTTP_200_OK,
    responses={404: {"description": "Product not found"}},
)
async def get_product_details(url: str):
    price_history = db.get_price_history(url)
    if not price_history:
        raise ProductNotFoundError()

    latest = price_history[0]
    product = ProductResponse(
        url=url,
        latest_price=latest.price,
        latest_name=latest.name,
        currency=latest.currency,
        is_available=latest.is_available,
        main_image_url=latest.main_image_url,
    )

    history = [
        PriceHistoryResponse(
            timestamp=ph.timestamp,
            price=ph.price,
            name=ph.name,
            currency=ph.currency,
            is_available=ph.is_available,
            main_image_url=ph.main_image_url,
        )
        for ph in price_history
    ]

    return ProductDetailResponse(product=product, price_history=history)


@app.delete(
    "/api/v1/products/{url:path}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={404: {"description": "Product not found"}},
)
async def remove_product(url: str):
    success = db.remove_product(url)
    if not success:
        raise ProductNotFoundError()
    return None


@app.get(
    "/api/v1/products/{url:path}/price-history",
    response_model=List[PriceHistoryResponse],
    status_code=status.HTTP_200_OK,
    responses={
        404: {"description": "Product not found"},
        422: {"description": "Invalid pagination parameters"},
    },
)
async def get_price_history(
    url: str,
    limit: Optional[int] = Query(None, ge=1),
    offset: Optional[int] = Query(0, ge=0),
):
    price_history = db.get_price_history(url)
    if not price_history:
        raise ProductNotFoundError()

    # Apply pagination if limit is specified
    if limit:
        price_history = price_history[offset : offset + limit]

    return [
        PriceHistoryResponse(
            timestamp=ph.timestamp,
            price=ph.price,
            name=ph.name,
            currency=ph.currency,
            is_available=ph.is_available,
            main_image_url=ph.main_image_url,
        )
        for ph in price_history
    ]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
