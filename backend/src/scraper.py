from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FirecrawlApp()


class Product(BaseModel):
    """Schema for creating a new product"""
    
    url: str = Field(description="The URL of the product")
    name: str = Field(description="The product name/title")
    price: float = Field(description="The current price of the product")
    currency: str = Field(description="Currency code (USD, EUR, etc)")
    main_image_url: str = Field(description="The URL of the main image of the product")
    is_available: bool = Field(description="Whether the product is currently available")


def scrape_product(url: str):
    extracted_data = app.scrape_url(
        url,
        params={
            "formats": ["extract"],
            "extract": {"schema": Product.model_json_schema()},
        },
    )

    data = extracted_data["extract"]
    data["timestamp"] = datetime.utcnow()

    return data


if __name__ == "__main__": 
    product = "https://www.amazon.in/Apple-2024-MacBook-Laptop-chip/dp/B0CX237H3B/ref=sr_1_3?crid=248LYMU0JK7LY&dib=eyJ2IjoiMSJ9.HN8Gr4FJ12sqF58k0nYWnqaqCmzBrKkIwm5NOL81lqAZHk4WPgMTAlYNb84bPlXQUX1fBEgnrJiQLLYRCsszGatxK-73tXC7PKaDr14It2uWam-mFQpjmYlWyNXBMxG6_ozFn0SVBI8RnquhOclWeLYOPOs92Yu7ASjT69XJHIZL4APomeSLB-qSWan8D6aFWFpFg9d5soQ4qLNlhOqaxxL_e9ErIgqaDpEda7jyT2w.tI-KPy75Op_tQjUYoXhbq3_ALWel7WskQIgULSgqxwU&dib_tag=se&keywords=macbook+m2+16gb+512gb&qid=1736503349&sprefix=macbook+m2+16gb+%2Caps%2C211&sr=8-3"

    print(scrape_product(product))
