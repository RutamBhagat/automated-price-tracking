import os
import streamlit as st
import pandas as pd
import plotly.express as px
from dotenv import load_dotenv
from babel.numbers import format_currency

from utils import is_valid_url
from database import Database
from scraper import scrape_product

load_dotenv()

st.set_page_config(layout="wide")  # This makes the page full-width

st.markdown("""
    <style>
        .block-container {
            max-width: 75% !important;
            padding-top: 1rem;
            padding-right: 1rem;
            padding-left: 1rem;
            padding-bottom: 1rem;
        }
        .stExpander {
            min-width: 100%;
        }
        [data-testid="stMetricValue"] > div {
            width: 100%;
            white-space: nowrap;
            overflow: visible;
            margin-right: 20px;
        }
    </style>
""", unsafe_allow_html=True)

# Loading database
with st.spinner("Loading database..."):
    db = Database(os.getenv("DATABASE_URL"))

# Sidebar Content
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
            with st.spinner("Scraping product data..."):
                product_data = scrape_product(product_url)
                # Use the cleaned URL from product_data
                db.add_product(product_data["url"])
                db.add_price(product_data)
            st.success("Product is now being tracked!")

# Main content
st.title("Price Tracker Dashboard")
st.markdown("## Tracked Products")

# Get all products
products = db.get_all_products()

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

        # Create a card-like container for each product
        with st.expander(df["name"][0], expanded=True):
            st.markdown("---")
            col1, col2 = st.columns([1, 3])

            with col1:
                if price_history[0].main_image_url:
                    st.image(price_history[0].main_image_url, width=200)
                currency = price_history[0].currency
                # Updated CSS with better width handling
                st.markdown(
                    """
                    <style>
                    [data-testid="stMetricValue"] {
                        min-width: 200px;
                    }
                    [data-testid="stMetricValue"] > div {
                        width: auto !important;
                        white-space: nowrap;
                        overflow: visible;
                        margin-right: 20px;
                        padding: 0 10px;
                    }
                    .element-container {
                        width: 100% !important;
                    }
                    </style>
                    """,
                    unsafe_allow_html=True
                )
                # Add a container div for the metric
                st.markdown('<div style="min-width: 200px;">', unsafe_allow_html=True)
                # Format price using babel
                formatted_price = format_currency(
                    price_history[0].price, 
                    currency,
                    locale='en_US'  # This ensures standard international formatting
                )
                
                st.metric(
                    label="Current Price",
                    value=formatted_price
                )
                st.markdown('</div>', unsafe_allow_html=True)

            with col2:
                # Format currency symbol for plot using babel
                sample_format = format_currency(0, price_history[0].currency, locale='en_US')
                currency_symbol = sample_format[0]  # Get just the symbol
                
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
                fig.update_yaxes(tickprefix=currency_symbol, tickformat=".2f")
                st.plotly_chart(fig, use_container_width=True)