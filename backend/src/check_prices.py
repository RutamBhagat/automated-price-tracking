import os
from database import Database
from dotenv import load_dotenv
from firecrawl import FirecrawlApp
from scraper import scrape_product
from notifications import send_price_alert

load_dotenv()

db = Database(os.getenv("DATABASE_URL"))
app = FirecrawlApp()

# Threshold percentage for price drop alerts (e.g., 5% = 0.05)
PRICE_DROP_THRESHOLD = 0.05


def check_prices():
    products = db.get_all_products()

    for product in products:
        # Get the price history
        price_history = db.get_price_history(product.url)
        if not price_history:
            continue

        # Get the earliest recorded price and currency
        earliest_price = price_history[-1].price
        currency = price_history[-1].currency

        # Retrieve updated product data
        updated_product = scrape_product(product.url)
        current_price = updated_product["price"]

        # Add the price to the database
        db.add_price(updated_product)
        print(f"Added new price entry for {updated_product['name']}")

        # Check if price dropped below threshold
        if earliest_price > 0:
            price_drop = (earliest_price - current_price) / earliest_price
            if price_drop >= PRICE_DROP_THRESHOLD:
                # Updated call to send_price_alert with all required parameters
                # Hardcoded recipient email
                RECIPIENT_EMAIL = "rutambhagat@gmail.com"
                send_price_alert(
                    product_name=updated_product["name"],
                    old_price=earliest_price,
                    new_price=current_price,
                    url=product.url,
                    recipient_email=RECIPIENT_EMAIL,
                    currency=currency
                )


if __name__ == "__main__":
    check_prices()