from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, create_engine, Session, select, Relationship

class Product(SQLModel, table=True):
    url: str = Field(primary_key=True)
    prices: List["PriceHistory"] = Relationship(back_populates="product")

class PriceHistory(SQLModel, table=True):
    id: str = Field(primary_key=True)
    product_url: str = Field(foreign_key="products.url")
    name: str
    price: float
    currency: str
    main_image_url: Optional[str] = None
    timestamp: datetime
    is_available: bool = Field(default=True)
    product: Product = Relationship(back_populates="prices")

class Database:
    def __init__(self, connection_string: str):
        self.engine = create_engine(connection_string)
        SQLModel.metadata.create_all(self.engine)

    def add_product(self, url: str):
        with Session(self.engine) as session:
            product = Product(url=url)
            session.merge(product)
            session.commit()

    def add_price(self, product_data: dict):
        with Session(self.engine) as session:
            price_history = PriceHistory(
                id=f"{product_data['url']}_{product_data['timestamp']}",
                product_url=product_data["url"],
                name=product_data["name"],
                price=product_data["price"],
                currency=product_data["currency"],
                main_image_url=product_data["main_image_url"],
                timestamp=product_data["timestamp"],
                is_available=product_data["is_available"]
            )
            session.add(price_history)
            session.commit()

    def get_price_history(self, url: str) -> List[PriceHistory]:
        with Session(self.engine) as session:
            statement = (
                select(PriceHistory)
                .where(PriceHistory.product_url == url)
                .order_by(PriceHistory.timestamp.desc())
            )
            return session.exec(statement).all()

    def get_all_products(self) -> List[Product]:
        with Session(self.engine) as session:
            statement = select(Product)
            return session.exec(statement).all()
