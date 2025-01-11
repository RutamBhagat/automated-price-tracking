from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import os
from dotenv import load_dotenv
from babel.numbers import format_currency

load_dotenv()

def send_price_alert(product_name: str, old_price: float, new_price: float, url: str, recipient_email: str, currency: str = 'INR'):
    """Send a beautifully styled price drop alert via email
    
    Args:
        product_name (str): Name of the product
        old_price (float): Original price
        new_price (float): New discounted price
        url (str): Product URL
        recipient_email (str): Email address to send the alert to
        currency (str): Currency code (default: 'INR')
    """
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_APP_PASSWORD")
    
    # Calculate price drop percentage
    drop_percentage = ((old_price - new_price) / old_price) * 100
    
    # Format prices using babel
    formatted_old_price = format_currency(old_price, currency, locale='en_US')
    formatted_new_price = format_currency(new_price, currency, locale='en_US')
    
    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f"Price Drop Alert: {product_name}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Price Drop Alert</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <table width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #1e3a8a; padding: 30px 15px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px;">🔥 Price Drop Alert! 🔥</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 20px;">
                    <h2 style="font-size: 24px; color: #1a202c; margin-bottom: 20px; text-align: center;">{product_name}</h2>
                    <div style="background-color: #f7fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center;">
                        <span style="background-color: #fef2f2; color: #dc2626; font-size: 24px; font-weight: 700; padding: 8px 16px; border-radius: 8px; display: inline-block;">-{drop_percentage:.1f}% Off!</span>
                        <span style="display: block; color: #64748b; text-decoration: line-through; font-size: 18px; margin: 16px 0 8px;">{formatted_old_price}</span>
                        <span style="display: block; color: #0f172a; font-size: 32px; font-weight: 800;">{formatted_new_price}</span>
                        <a href="{url}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; margin-top: 20px;">View Deal</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; background-color: #f8fafc; text-align: center; font-size: 14px; color: #718096;">
                    <p style="margin: 0 0 10px;">This is an automated price alert. Prices and availability are subject to change.</p>
                    <p style="margin: 0;">
                        <a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | 
                        <a href="#" style="color: #2563eb; text-decoration: none;">Manage Preferences</a>
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        # Create secure SSL/TLS connection
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, sender_password)
        
        # Send email
        server.send_message(msg)
        server.quit()
        print("Price alert email sent successfully!")
    except Exception as e:
        print(f"Error sending email notification: {e}")

if __name__ == "__main__":
    # Test the email notification
    send_price_alert(
        "Apple 2024 MacBook Air 13″ Laptop with M3 chip", 
        154900, 
        134900, 
        "https://www.amazon.in/dp/B0CX237H3B",
        "rutambhagat@gmail.com",
        "INR"
    )