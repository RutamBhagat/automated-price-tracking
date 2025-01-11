from datetime import datetime
from typing import Optional, List, TYPE_CHECKING

from sqlmodel import SQLModel, Field, create_engine, Session, select, Relationship

if TYPE_CHECKING:
    from typing import ForwardRef
    PriceHistory = ForwardRef("PriceHistory")

class Product(SQLModel, table=True):
    __tablename__ = "products"  # Specify existing table name
    url: str = Field(primary_key=True)
    prices: List["PriceHistory"] = Relationship(back_populates="product", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class PriceHistory(SQLModel, table=True):
    __tablename__ = "price_histories"  # Specify existing table name
    id: str = Field(primary_key=True)
    product_url: str = Field(foreign_key="products.url")
    name: str
    price: float
    currency: str
    main_image_url: Optional[str] = None
    timestamp: datetime
    is_available: bool = Field(default=True)
    product: Optional[Product] = Relationship(back_populates="prices")

class Database:
    def __init__(self, connection_string: str):
        """Initialize database connection.
        
        Args:
            connection_string: Database connection URL
        """
        self.engine = create_engine(connection_string)
        SQLModel.metadata.create_all(self.engine)

    def add_product(self, url: str):
        """Add a new product to track.
        
        Args:
            url: The URL of the product to track
        """
        with Session(self.engine) as session:
            product = Product(url=url)
            session.merge(product)
            session.commit()

    def add_price(self, product_data: dict):
        """Add a price history entry for a product.
        
        Args:
            product_data: Dictionary containing product details including:
                - url: Product URL
                - timestamp: Time of price check
                - name: Product name
                - price: Current price
                - currency: Price currency
                - main_image_url: Product image URL
                - is_available: Product availability status
        """
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

    def remove_product(self, url: str) -> bool:
        """Remove a product and all its price history entries.
        
        Args:
            url: The URL of the product to remove
            
        Returns:
            bool: True if product was found and removed, False otherwise
        """
        with Session(self.engine) as session:
            product = session.get(Product, url)
            if product:
                session.delete(product)
                session.commit()
                return True
            return False

    def get_price_history(self, url: str) -> List[PriceHistory]:
        """Get price history for a product.
        
        Args:
            url: The URL of the product
            
        Returns:
            List[PriceHistory]: List of price history entries ordered by timestamp descending
        """
        with Session(self.engine) as session:
            statement = (
                select(PriceHistory)
                .where(PriceHistory.product_url == url)
                .order_by(PriceHistory.timestamp.desc())
            )
            return session.exec(statement).all()

    def get_all_products(self) -> List[Product]:
        """Get all tracked products.
        
        Returns:
            List[Product]: List of all products being tracked
        """
        with Session(self.engine) as session:
            statement = select(Product)
            return session.exec(statement).all()
