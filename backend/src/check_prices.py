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

        # Get the earliest recorded price and currency (last item since ordered by desc)
        initial_record = price_history[-1]
        initial_price = initial_record.price
        currency = initial_record.currency

        # Retrieve updated product data
        updated_product = scrape_product(product.url)
        
        # If product is unavailable, keep the last known price
        if not updated_product["is_available"]:
            updated_product["price"] = price_history[0].price  # Use most recent price
            print(f"Product {updated_product['name']} is currently unavailable")

        # Add the price to the database
        db.add_price(updated_product)
        print(f"Added new price entry for {updated_product['name']}")

        # Only check for price drops if the product is available
        if updated_product["is_available"] and initial_price > 0:
            current_price = updated_product["price"]
            price_drop = (initial_price - current_price) / initial_price
            if price_drop >= PRICE_DROP_THRESHOLD:
                RECIPIENT_EMAIL = "rutambhagat@gmail.com"
                send_price_alert(
                    product_name=updated_product["name"],
                    old_price=initial_price,
                    new_price=current_price,
                    url=product.url,
                    recipient_email=RECIPIENT_EMAIL,
                    currency=currency
                )


if __name__ == "__main__":
    check_prices()