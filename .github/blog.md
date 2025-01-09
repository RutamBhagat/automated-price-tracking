# Building an Automated Price Tracking Tool

There is a lot to be said about the psychology of discounts. For example, buying a discounted item we don’t need isn’t saving money at all - it’s falling for one of the oldest sales tactics. However, there are legitimate cases where waiting for a price drop on items you actually need makes perfect sense.

The challenge is that e-commerce websites run flash sales and temporary discounts constantly, but these deals often disappear as quickly as they appear. Missing these brief windows of opportunity can be frustrating.

That’s where automation comes in. In this guide, we’ll build a Python application that monitors product prices across any e-commerce website and instantly notifies you when prices drop on items you’re actually interested in. Here is a sneak peek of the app:

![Screenshot of a minimalist price tracking application showing product listings, price history charts, and notification controls for monitoring e-commerce deals using Firecrawl](image.png)

The app has a simple appearance but provides complete functionality:

*   It has a minimalistic UI to add or remove products from the tracker
*   A simple dashboard to display price history for each product
*   Controls for setting the price drop threshold in percentages
*   A notification system that sends Discord alerts when a tracked item’s price drops
*   A scheduling system that updates the product prices on an interval you specify
*   Runs for free for as long as you want

Even though the title says “Amazon price tracker” (full disclosure: I was forced to write that for SEO purposes), the app will work for any e-commerce website you can imagine (except Ebay, for some reason).

So, let’s get started building this Amazon price tracker.

## The Toolstack We Will Use

The app will be built using Python and these libraries:

*   [Streamlit](https://streamlit.io/) for the UI
*   [Firecrawl](https://firecrawl.dev/) for AI-based scraping of e-commerce websites
*   [SQLAlchemy](https://www.sqlalchemy.org/) for database management

In addition to Python, we will use these platforms:

*   [Discord](https://discord.com/) for notifications
*   [GitHub](https://github.com/) for hosting the app
*   [GitHub Actions](https://github.com/features/actions) for running the app on a schedule
*   [Supabase](https://supabase.com/) for hosting a free Postgres database instance

## Building an Amazon Price Tracker App Step-by-step

Since this project involves multiple components working together, we’ll take a top-down approach rather than building individual pieces first. This approach makes it easier to understand how everything fits together, since we’ll introduce each tool only when it’s needed. The benefits of this strategy will become clear as we progress through the tutorial.

### Step 1: Setting up the environment

First, let’s create a dedicated environment on our machines to work on the project:

```bash
mkdir automated-price-tracker
cd automated-price-tracker
python -m venv .venv
source .venv/bin/activate
```

These commands create a working directory and activate a virtual environment. Next, create a new script called `ui.py` for designing the user interface with Streamlit.

```bash
touch ui.py
```

Then, install Streamlit:

```bash
pip install streamlit
```

Next, create a `requirements.txt` file and add Streamlit as the first dependency:

```bash
touch requirements.txt
echo "streamlit\n" >> requirements.txt
```

Since the code will be hosted on GitHub, we need to initialize Git and create a `.gitignore` file:

```bash
git init
touch .gitignore
echo ".venv" >> .gitignore  # Add the virtual env folder
git commit -m "Initial commit"
```

### Step 2: Add a sidebar to the UI for product input

Let’s take a look at the final product one more time:

![A screenshot of an Amazon price tracker web application showing a sidebar for adding product URLs and a main dashboard displaying tracked products with price history charts. Created with streamlit and firecrawl](image.png)

It has two sections: the sidebar and the main dashboard. Since the first thing you do when launching this app is adding products, we will start building the sidebar first. Open `ui.py` and paste the following code:

```python
import streamlit as st

# Set up sidebar
with st.sidebar:
    st.title("Add New Product")
    product_url = st.text_input("Product URL")
    add_button = st.button("Add Product")

# Main content
st.title("Price Tracker Dashboard")
st.markdown("## Tracked Products")
```

The code snippet above sets up a basic Streamlit web application with two main sections. In the sidebar, it creates a form for adding new products with a text input field for the product URL and an “Add Product” button. The main content area contains a dashboard title and a section header for tracked products. The code uses Streamlit’s `st.sidebar` context manager to create the sidebar layout and basic Streamlit components like `st.title`, `st.text_input`, and `st.button` to build the user interface elements.

To see how this app looks like, run the following command:

```bash
streamlit run ui.py
```

Now, let’s add a commit to save our progress:

```bash
git add .
git commit -m "Add a sidebar to the basic UI"
```

### Step 3: Add a feature to check if input URL is valid

In the next step, we want to add some restrictions to the input field like checking if the passed URL is valid. For this, create a new file called `utils.py` where we write additional utility functions for our app:

```bash
touch utils.py
```

Inside the script, paste following code:

```python
# utils.py
from urllib.parse import urlparse
import re

def is_valid_url(url: str) -> bool:
    try:
        # Parse the URL
        result = urlparse(url)

        # Check if scheme and netloc are present
        if not all([result.scheme, result.netloc]):
            return False

        # Check if scheme is http or https
        if result.scheme not in ["http", "https"]:
            return False

        # Basic regex pattern for domain validation
        domain_pattern = (
            r"^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$"
        )
        if not re.match(domain_pattern, result.netloc):
            return False

        return True

    except Exception:
        return False
```

The above function `is_valid_url()` validates URLs by checking several criteria:

*   It verifies the URL has both a scheme (http/https) and domain name
*   It ensures the scheme is specifically http or https
*   It validates the domain name format using regex to check for valid characters and TLD
*   It returns `True` only if all checks pass, `False` otherwise

Let’s use this function in our `ui.py` file. Here is the modified code:

```python
import streamlit as st
from utils import is_valid_url

# Set up sidebar
with st.sidebar:
    st.title("Add New Product")
    product_url = st.text_input("Product URL")
    add_button = st.button("Add Product")

    if add_button:
        if not product_url:
            st.error("Please enter a product URL")
        elif not is_valid_url(product_url):
            st.error("Please enter a valid URL")
        else:
            st.success("Product is now being tracked!")

# Main content
...
```

Here is what’s new:

*   We added URL validation using the `is_valid_url()` function from `utils.py`
*   When the button is clicked, we perform validation:
    *   Check if URL is empty
    *   Validate URL format using `is_valid_url()`
*   User feedback is provided through error/success messages:
    *   Error shown for empty URL
    *   Error shown for invalid URL format
    *   Success message when URL passes validation

Rerun the Streamlit app again and see if our validation works. Then, return to your terminal to commit the changes we’ve made:

```bash
git add .
git commit -m "Add a feature to check URL validity"
```

### Step 4: Scrape the input URL for product details

When a valid URL is entered and the add button is clicked, we need to implement product scraping functionality instead of just showing a success message. The system should:

*   Immediately scrape the product URL to extract key details:
    *   Product name
    *   Current price
    *   Main product image
    *   Brand name
    *   Other relevant attributes
*   Store these details in a database to enable:
    *   Regular price monitoring
    *   Historical price tracking
    *   Price change alerts
    *   Product status updates

For the scraper, we will use Firecrawl, an AI-based scraping API for extracting webpage data without HTML parsing. This solution provides several advantages:

*   No website HTML code analysis required for element selection
*   Resilient to HTML structure changes through AI-based element detection
*   Universal compatibility with product webpages due to structure-agnostic approach
*   Reliable website blocker bypass via robust API infrastructure

First, create a new file called `scraper.py`:

```bash
touch scraper.py
```

Then, install these three libraries:

```bash
pip install firecrawl-py pydantic python-dotenv
echo "firecrawl-py\npydantic\npython-dotenv\n" >> requirements.txt  # Add them to dependencies
```

`firecrawl-py` is the Python SDK for Firecrawl scraping engine, `pydantic` is a data validation library that helps enforce data types and structure through Python class definitions, and `python-dotenv` is a library that loads environment variables from a `.env` file into your Python application.

With that said, head over to the [Firecrawl website](https://firecrawl.dev/) and sign up for a free account (the free plan will work fine). You will be given an API key, which you should copy.

Then, create a `.env` file in your terminal and add the API key as an environment variable:

```bash
touch .env
echo "FIRECRAWL_API_KEY='YOUR-API-KEY-HERE'" >> .env
echo ".env" >> .gitignore  # Ignore .env files in Git
```

The `.env` file is used to securely store sensitive configuration values like API keys that shouldn’t be committed to version control. By storing the Firecrawl API key in `.env` and adding it to `.gitignore`, we ensure it stays private while still being accessible to our application code. This is a security best practice to avoid exposing credentials in source control.

Now, we can start writing the `scraper.py`:

```python
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FirecrawlApp()
```

Here, `load_dotenv()` function reads the `.env` file you have in your working directory and loads the environment variables inside, including the Firecrawl API key. When you create an instance of `FirecrawlApp` class, the API key is automatically detected to establish a connection between your script and the scraping engine in the form of the `app` variable.

Now, we create a Pydantic class (usually called a model) that defines the details we want to scrape from each product:

```python
class Product(BaseModel):
    """Schema for creating a new product"""

    url: str = Field(description="The URL of the product")
    name: str = Field(description="The product name/title")
    price: float = Field(description="The current price of the product")
    currency: str = Field(description="Currency code (USD, EUR, etc)")
    main_image_url: str = Field(description="The URL of the main image of the product")
```

Pydantic models may be completely new to you, so let’s break down the `Product` model:

*   The `url` field stores the product page URL we want to track
*   The `name` field stores the product title/name that will be scraped
*   The `price` field stores the current price as a float number
*   The `currency` field stores the 3-letter currency code (e.g. USD, EUR)
*   The `main_image_url` field stores the URL of the product’s main image

Each field is typed and has a description that documents its purpose. The `Field` class from Pydantic allows us to add metadata like descriptions to each field. These descriptions are especially important for Firecrawl since it uses them to automatically locate the relevant HTML elements containing the data we want.

Now, let’s create a function to call the engine to scrape URL’s based on the schema above:

```python
def scrape_product(url: str):
    extracted_data = app.scrape_url(
        url,
        params={
            "formats": ["extract"],
            "extract": {"schema": Product.model_json_schema()},
        },
    )

    # Add the scraping date to the extracted data
    extracted_data["extract"]["timestamp"] = datetime.utcnow()

    return extracted_data["extract"]

if __name__ == "__main__":
    product = "https://www.amazon.com/gp/product/B002U21ZZK/"

    print(scrape_product(product))
```

The code above defines a function called `scrape_product` that takes a URL as input and uses it to scrape product information. Here’s how it works:

The function calls `app.scrape_url` with two parameters:

*   The product URL to scrape
*   A `params` dictionary that configures the scraping:
    *   It specifies we want to use the “extract” format
    *   It provides our `Product` Pydantic model schema as the extraction template as a JSON object

The scraper will attempt to find and extract data that matches our `Product` schema fields - the URL, name, price, currency, and image URL.

The function returns just the “extract” portion of the scraped data, which contains the structured product information. `extract` returns a dictionary to which we add the date of the scraping as it will be important later on.

Let’s test the script by running it:

```bash
python scraper.py
```

You should get an output like this:

```json
{
    'url': 'https://www.amazon.com/dp/B002U21ZZK',
    'name': 'MOVA Globe Earth with Clouds 4.5"',
    'price': 212,
    'currency': 'USD',
    'main_image_url': 'https://m.media-amazon.com/images/blog/price-tracking/I/41bQ3Y58y3L._AC_.jpg',
    'timestamp': '2024-12-05 13-20'
}
```

The output shows that a MOVA Globe costs $212 USD on Amazon at the time of writing this article. You can test the script for any other website that contains the information we are looking (except Ebay):

*   Price
*   Product name/title
*   Main image URL

One key advantage of using Firecrawl is that it returns data in a consistent dictionary format across all websites. Unlike HTML-based scrapers like BeautifulSoup or Scrapy which require custom code for each site and can break when website layouts change, Firecrawl uses AI to understand and extract the requested data fields regardless of the underlying HTML structure.

Finish this step by committing the new changes to Git:

```bash
git add .
git commit -m "Implement a Firecrawl scraper for products"
```

### Step 5: Storing new products in a PostgreSQL database

If we want to check product prices regularly, we need to have an online database. In this case, Postgres is the best option since it’s reliable, scalable, and has great support for storing time-series data like price histories.

There are many platforms for hosting Postgres instances but the one I find the easiest and fastest to set up is Supabase. So, please head over to the [Supabase website](https://supabase.com/) and create your free account. During the sign-up process, you will be given a password, which you should save somewhere safe on your machine.

Then, in a few minutes, your free Postgres instance comes online. To connect to this instance, click on **Home** in the left sidebar and then, “Connect”:

![Screenshot of Supabase dashboard showing database connection settings and credentials for connecting to a PostgreSQL database instance](image.png)

You will be shown your database connection string with a placeholder for the password you copied. You should paste this string in your `.env` file with your password added to the `.env` file:

```bash
echo POSTGRES_URL="THE-SUPABASE-URL-STRING-WITH-YOUR-PASSWORD-ADDED" >> .env
```

Now, the easiest way to interact with this database is through SQLAlchemy. Let’s install it:

```bash
pip install "sqlalchemy==2.0.35" psycopg2-binary
echo "psycopg2-binary\nsqlalchemy==2.0.35\n" >> requirements.txt
```

*Note:* SQLAlchemy is a Python SQL toolkit and Object-Relational Mapping (ORM) library that lets us interact with databases using Python code instead of raw SQL. For our price tracking project, it provides essential features like database connection management, schema definition through Python classes, and efficient querying capabilities. This makes it much easier to store and retrieve product information and price histories in our Postgres database.

After the installation, create a new `database.py` file for storing database-related functions:

```bash
touch database.py
```

Let’s populate this script:

```python
from sqlalchemy import create_engine, Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    url = Column(String, primary_key=True)
    prices = relationship(
        "PriceHistory", back_populates="product", cascade="all, delete-orphan"
    )

class PriceHistory(Base):
    __tablename__ = "price_histories"

    id = Column(String, primary_key=True)
    product_url = Column(String, ForeignKey("products.url"))
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    currency = Column(String, nullable=False)
    main_image_url = Column(String)
    timestamp = Column(DateTime, nullable=False)
    product = relationship("Product", back_populates="prices")
```

The code above defines two SQLAlchemy models for our price tracking database:

*   The `Product` model acts as a registry of all items we want to track. It’s kept simple with just the URL as we don’t want to duplicate data that changes over time.
*   The `PriceHistory` model stores the actual price data points and product details at specific moments in time. This separation allows us to:
    *   Track how product details (name, price, image) change over time
    *   Maintain a clean historical record for each product
    *   Efficiently query price trends without loading unnecessary data

Each record in `PriceHistory` contains:

*   A unique ID as primary key
*   The product URL as a foreign key linking to the `Product`
*   The product name
*   The price value and currency
*   The main product image URL
*   A timestamp of when the price was recorded

The relationship between `Product` and `PriceHistory` is bidirectional, allowing easy navigation between related records. The `cascade` setting ensures price histories are deleted when their product is deleted.

These models provide the structure for storing and querying our price tracking data in a PostgreSQL database using SQLAlchemy’s ORM capabilities.

Now, we define a `Database` class with a singe `add_product` method:

```python
class Database:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def add_product(self, url):
        session = self.Session()
        try:
            # Create the product entry
            product = Product(url=url)
            session.merge(product)  # merge will update if exists, insert if not
            session.commit()
        finally:
            session.close()
```

The `Database` class above provides core functionality for managing product data in our PostgreSQL database. It takes a connection string in its constructor to establish the database connection using SQLAlchemy.

The `add_product` method allows us to store new product URLs in the database. It uses SQLAlchemy’s `merge` functionality which intelligently handles both inserting new products and updating existing ones, preventing duplicate entries.

The method carefully manages database sessions, ensuring proper resource cleanup by using `try`/`finally` blocks. This prevents resource leaks and maintains database connection stability.

Let’s use this method inside the sidebar of our UI. Switch to `ui.py` and make the following adjustments:

First, update the imports to load the `Database` class and initialize it:

```python
import os
import streamlit as st

from utils import is_valid_url
from database import Database
from dotenv import load_dotenv

load_dotenv()

with st.spinner("Loading database..."):
    db = Database(os.getenv("POSTGRES_URL"))
```

The code integrates the `Database` class into the Streamlit UI by importing required dependencies and establishing a database connection. The database URL is loaded securely from environment variables using `python-dotenv`. The `Database` class creates or updates the tables we specified in `database.py` after being initialized.

The database initialization process is wrapped in a Streamlit spinner component to maintain responsiveness while establishing the connection. This provides visual feedback during the connection setup period, which typically requires a brief initialization time.

Then, in the sidebar code, we only need to add a single line of code to add the product to the database if the URL is valid:

```python
# Set up sidebar
with st.sidebar:
    st.title("Add New Product")
    product_url = st.text_input("Product URL")
    add_button = st.button("Add Product")

    if add_button:
        if not product_url:
            st.error("Please enter a product URL")
        elif not is_valid_url(product_url):
            st.error("Please enter a valid URL")
        else:
            db.add_product(product_url)  # This is the new line
            st.success("Product is now being tracked!")
```

In the final `else` block that runs when the product URL is valid, we call the `add_product` method to store the product in the database.

Let’s commit everything:

```bash
git add .
git commit -m "Add a Postgres database integration for tracking product URLs"
```

### Step 6: Storing price histories for new products

Now, after the product is added to the `products` table, we want to add its details and its scraped price to the `price_histories` table.

First, switch to `database.py` and add a new method for creating entries in the `PriceHistories` table:

```python
class Database:
    ... # the rest of the class

    def add_price(self, product_data):
        session = self.Session()
        try:
            price_history = PriceHistory(
                id=f"{product_data['url']}_{product_data['timestamp']}",
                product_url=product_data["url"],
                name=product_data["name"],
                price=product_data["price"],
                currency=product_data["currency"],
                main_image_url=product_data["main_image_url"],
                timestamp=product_data["timestamp"],
            )
            session.add(price_history)
            session.commit()
        finally:
            session.close()
```

The `add_price` method takes a dictionary containing product data (which is returned by our scraper) and creates a new entry in the `PriceHistory` table. The entry’s ID is generated by combining the product URL with a timestamp. The method stores essential product information like name, price, currency, image URL, and the timestamp of when the price was recorded. It uses SQLAlchemy’s session management to safely commit the new price history entry to the database.

Now, we need to add this functionality to the sidebar as well. In `ui.py`, add a new import statement that loads the `scrape_product` function from `scraper.py`:

```python
... # The rest of the imports
from scraper import scrape_product
```

Then, update the `else` block in the sidebar again:

```python
with st.sidebar:
    st.title("Add New Product")
    product_url = st.text_input("Product URL")
    add_button = st.button("Add Product")

    if add_button:
        if not product_url:
            st.error("Please enter a product URL")
        elif not is_valid_url(product_url):
            st.error("Please enter a valid URL")
        else:
            db.add_product(product_url)
            with st.spinner("Added product to database. Scraping product data..."):
                product_data = scrape_product(product_url)
                db.add_price(product_data)
            st.success("Product is now being tracked!")
```

Now when a user enters a product URL and clicks the “Add Product” button, several things happen:

*   The URL is validated to ensure it’s not empty and is properly formatted.
*   If valid, the URL is added to the `products` table via `add_product()`.
*   The product page is scraped immediately to get current price data.
*   This initial price data is stored in the price history table via `add_price()`.
*   The user sees loading spinners and success messages throughout the process.

This gives us a complete workflow for adding new products to track, including capturing their initial price point. The UI provides clear feedback at each step and handles errors gracefully.

Check that everything is working the way we want it and then, commit the new changes:

```bash
git add .
git commit -m "Add a feature to track product prices after they are added"
```

### Step 7: Displaying each product's price history in the main dashboard

Let’s take a look at the final product shown in the introduction once again:

![Screenshot of a minimalist price tracking dashboard showing product price history charts, add/remove product controls, and notification settings for monitoring e-commerce deals and price drops](image.png)

Apart from the sidebar, the main dashboard shows each product’s price history visualized with a Plotly line plot where the X axis is the timestamp while the Y axis is the prices. Each line plot is wrapped in a Streamlit component that includes buttons for removing the product from the database or visiting its source URL.

In this step, we will implement the plotting feature and leave the two buttons for a later section. First, add a new method to the `Database` class for retrieving the price history for each product:

```python
class Database:
    ... # The rest of the code

    def get_price_history(self, url):
        """Get price history for a product"""
        session = self.Session()
        try:
            return (
                session.query(PriceHistory)
                .filter(PriceHistory.product_url == url)
                .order_by(PriceHistory.timestamp.desc())
                .all()
            )
        finally:
            session.close()
```

The method queries the `price_histories` table based on product URL, orders the rows in descending order (oldest first) and returns the results.

Then, add another method for retrieving all products from the `products` table:

```python
class Database:
    ...

    def get_all_products(self):
        session = self.Session()
        try:
            return session.query(Product).all()
        finally:
            session.close()
```

The idea is that every time our Streamlit app is opened, the main dashboard queries all existing products from the database and render their price histories with line charts in dedicated components.

To create the line charts, we need Plotly and Pandas, so install them in your environment:

```bash
pip install pandas plotly
echo "pandas\nplotly\n" >> requirements.txt
```

Afterward, import them at the top of `ui.py` along with other existing imports:

```python
import pandas as pd
import plotly.express as px
```

Then, switch to `ui.py` and paste the following snippet of code after the **Main content** section:

```python
# Main content
st.title("Price Tracker Dashboard")
st.markdown("## Tracked Products")

# Get all products
products = db.get_all_products()
```

Here, after the page title and subtitle is shown, we are retrieving all products from the database. Let’s loop over them:

```python
# Create a card for each product
for product in products:
    price_history = db.get_price_history(product.url)
    if price_history:
        # Create DataFrame for plotting
        df = pd.DataFrame(
            [
                {"timestamp": ph.timestamp, "price": ph.price, "name": ph.name}
                for ph in price_history
            ]
        )
```

For each product, we get their price history with `db.get_price_history` and then, convert this data into a dataframe with three columns:

*   Timestamp
*   Price
*   Product name

This makes plotting easier with Plotly. Next, we create a Streamlit expander component for each product:

```python
# Create a card for each product
for product in products:
    price_history = db.get_price_history(product.url)
    if price_history:
        ...
        # Create a card-like container for each product
        with st.expander(df["name"][0], expanded=False):
            st.markdown("---")
            col1, col2 = st.columns([1, 3])

            with col1:
                if price_history[0].main_image_url:
                    st.image(price_history[0].main_image_url, width=200)
                st.metric(
                    label="Current Price",
                    value=f"{price_history[0].price} {price_history[0].currency}",
                )
```

The expander shows the product name as its title and contains:

*   A divider line
*   Two columns:
    *   Left column: Product image (if available) and current price metric
    *   Right column (shown in next section)

The price is displayed using Streamlit’s `metric` component which shows the current price and currency.

Here is the rest of the code:

```python
            ...

            with col2:
                # Create price history plot
                fig = px.line(
                    df,
                    x="timestamp",
                    y="price",
                    title=None,
                )
                fig.update_layout(
                    xaxis_title=None,
                    yaxis_title="Price",
                    showlegend=False,
                    margin=dict(l=0, r=0, t=0, b=0),
                    height=300,
                )
                fig.update_xaxes(tickformat="%Y-%m-%d %H:%M", tickangle=45)
                fig.update_yaxes(tickprefix=f"{price_history[0].currency} ", tickformat=".2f")
                st.plotly_chart(fig, use_container_width=True)
```

In the right column, we create an interactive line plot using Plotly Express to visualize the price history over time. The plot shows price on the y-axis and timestamp on the x-axis. The layout is customized to remove the title, adjust axis labels and formatting, and optimize the display size. The timestamps are formatted to show date and time, with angled labels for better readability. Prices are displayed with 2 decimal places and a dollar sign prefix. The plot is rendered using Streamlit’s `plotly_chart` component and automatically adjusts its width to fill the container.

After this step, the UI must be fully functional and ready to track products. For example, here is what mine looks like after adding a couple of products:

![Screenshot of a price tracking dashboard showing multiple product listings with price history charts, product images, and current prices for Amazon items](image.png)

But notice how the price history chart doesn’t show anything. That’s because we haven’t populated it by checking the product price in regular intervals. Let’s do that in the next couple of steps. For now, commit the latest changes we’ve made:

```bash
git add .
git commit -m "Display product price histories for each product in the dashboard"
```

Let’s take a brief moment to summarize the steps we took so far and what’s next. So far, we’ve built a Streamlit interface that allows users to add product URLs and displays their current prices and basic information. We’ve implemented the database schema, created functions to scrape product data, and designed a clean UI with price history visualization. The next step is to set up automated price checking to populate our history charts and enable proper price tracking over time.

### Step 8: Adding new price entries for existing products

Now, we want to write a script that adds new price entries in the `price_histories` table for each product in `products` table. We call this script `check_prices.py`:

```python
import os
from database import Database
from dotenv import load_dotenv
from firecrawl import FirecrawlApp
from scraper import scrape_product

load_dotenv()

db = Database(os.getenv("POSTGRES_URL"))
app = FirecrawlApp()

def check_prices():
    products = db.get_all_products()

    for product in products:
        try:
            updated_product = scrape_product(product.url)
            db.add_price(updated_product)
            print(f"Added new price entry for {updated_product['name']}")
        except Exception as e:
            print(f"Error processing {product.url}: {e}")

if __name__ == "__main__":
    check_prices()
```

At the top, we are importing the functions and packages and initializing the database and a Firecrawl app. Then, we define a simple `check_prices` function.

In the function body, we retrieve all products URLs, retrieve their new price data with `scrape_product` function from `scraper.py` and then, add a new price entry for the product with `db.add_price`.

If you run the function once and refresh the Streamlit app, you must see a line chart appear for each product you are tracking:

![Screenshot of a price tracking dashboard showing a line chart visualization of product price history over time, with price on the y-axis and dates on the x-axis](image.png)

Let’s commit the changes in this step:

```bash
git add .
git commit -m "Add a script for checking prices of existing products"
```

### Step 9: Check prices regularly with GitHub actions

GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate various software workflows directly from your GitHub repository. In our case, it’s particularly useful because we can set up automated price checks to run the `check_prices.py` script at regular intervals (e.g., daily or hourly) without manual intervention. This ensures we consistently track price changes and maintain an up-to-date database of historical prices for our tracked products.

So, the first step is creating a new GitHub repository for our project and pushing existing code to it:

```bash
git remote add origin https://github.com/yourusername/price-tracker.git
git push origin main
```

Then, return to your terminal and create this directory structure:

```bash
mkdir -p .github/workflows
touch .github/workflows/check_prices.yml
```

The first command creates a new directory structure `.github/workflows` using the `-p` flag to create parent directories if they don’t exist.

The second command creates an empty YAML file called `check_prices.yml` inside the `workflows` directory. GitHub Actions looks for workflow files in this specific location - any YAML files in the `.github/workflows` directory will be automatically detected and processed as workflow configurations. These YAML files define when and how your automated tasks should run, what environment they need, and what commands to execute. In our case, this file will contain instructions for GitHub Actions to periodically run our price checking script. Let’s write it:

```yaml
name: Price Check

on:
  schedule:
    # Runs every 3 minutes
    - cron: "*/3 * * * *"
  workflow_dispatch: # Allows manual triggering
```

Let’s break down this first part of the YAML file:

*   The `name: Price Check` line gives our workflow a descriptive name that will appear in the GitHub Actions interface.
*   The `on:` section defines when this workflow should be triggered. We’ve configured two triggers:
    *   A `schedule` using cron syntax `*/3 * * * *` which runs the workflow every 3 minutes. The five asterisks represent minute, hour, day of month, month, and day of week respectively. The `*/3` means “every 3rd minute”. The 3-minute interval is for debugging purposes, we will need to choose a wider interval later on to respect the free limits of GitHub actions.
    *   `workflow_dispatch` enables manual triggering of the workflow through the GitHub Actions UI, which is useful for testing or running the check on-demand.

Now, let’s add the rest:

```yaml
jobs:
  check-prices:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.10"
          cache: "pip"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run price checker
        env:
          FIRECRAWL_API_KEY: ${{ secrets.FIRECRAWL_API_KEY }}
          POSTGRES_URL: ${{ secrets.POSTGRES_URL }}
        run: python check_prices.py
```

Let’s break down this second part of the YAML file:

*   The `jobs:` section defines the actual work to be performed. We have one job named `check-prices` that runs on an Ubuntu virtual machine (`runs-on: ubuntu-latest`).
*   Under `steps:`, we define the sequence of actions:
    *   First, we checkout our repository code using the standard `actions/checkout@v4` action
    *   Then we set up Python 3.10 using `actions/setup-python@v5`, enabling pip caching to speed up dependency installation
    *   Next, we install our Python dependencies by upgrading pip and installing requirements from our `requirements.txt` file. At this point, it is essential that you were keeping a complete dependency file based on the installs we made in the project.
    *   Finally, we run our price checker script, providing two environment variables:
        *   `FIRECRAWL_API_KEY`: For accessing the web scraping service
        *   `POSTGRES_URL`: For connecting to our database

Both variables must be stored in our GitHub repository as secrets for this workflow file to run without errors. So, navigate to the repository you’ve created for the project and open its **Settings**. Under **“Secrets and variables” > “Actions”**, click on **“New repository secret”** button to add the environment variables we have in the `.env` file one-by-one.

Then, return to your terminal, commit the changes and push:

```bash
git add .
git commit -m "Add a workflow to check prices regularly"
git push origin main
```

Next, navigate to your GitHub repository again and click on the **“Actions”** tab:

![Screenshot of GitHub Actions interface showing workflow runs and manual trigger button for automated price tracking application](image.png)

From there, you can run the workflow manually (click **“Run workflow”** and refresh the page). If it is executed successfully, you can return to the Streamlit app and refresh to see the new price added to the chart.
