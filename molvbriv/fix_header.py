import os

file_path = r'c:\Users\Rocky\OneDrive\Desktop\Molvbriv\molvbriv\src\components\Header.css'

new_css = """    /* --- Luxury Cart Design (Fixed & Enhanced) --- */
    .cart-drawer {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        background-color: #FFFEFA !important; /* Brighter Luxury Cream */
        box-shadow: none;
        z-index: 2010; /* Higher than overlay */
        transform: translateX(100%);
        visibility: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s 0.5s;
        display: flex;
        flex-direction: column;
        padding-top: 100px;
    }

    .cart-drawer.open {
        transform: translateX(0);
        visibility: visible;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s;
    }

    .cart-content-container {
        padding: 0 24px;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .luxury-cart-title {
        font-family: serif;
        font-size: 2rem; /* Reduced from 2.2rem */
        font-weight: 400;
        text-align: center;
        margin-bottom: 40px;
        color: #1a1a1a;
        letter-spacing: 0;
    }

    /* Product Card */
    .luxury-cart-item {
        display: grid;
        grid-template-columns: 90px 1fr; /* Adjusted column width */
        gap: 20px;
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .cart-item-img {
        width: 100%;
        height: 90px;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .cart-item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 4px;
    }

    .cart-item-name {
        font-family: serif;
        font-size: 1.2rem;
        font-weight: 500;
        color: #1a1a1a;
        margin: 0;
        line-height: 1.2;
    }

    .cart-remove-btn {
        background: transparent !important;
        border: none !important;
        color: #888 !important;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        padding: 0;
        min-width: auto; /* Reset min-width if set globally */
    }
    
    .cart-remove-btn:hover {
        color: #d00;
        text-decoration: none;
    }

    .cart-item-variant {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 15px;
        font-family: var(--font-sans);
    }

    .cart-item-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .quantity-selector {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0;
        background: #fff;
        height: 32px;
    }

    .qty-btn {
        background: transparent !important;
        border: none !important;
        width: 32px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1a1a1a;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 0;
        min-width: 32px;
    }

    .qty-number {
        font-size: 0.9rem;
        padding: 0 10px;
        color: #1a1a1a;
        font-weight: 500;
    }

    .cart-item-price {
        font-family: var(--font-sans);
        font-weight: 600;
        color: #1a1a1a;
        font-size: 1.05rem;
    }

    /* Order Summary - Separate Soft Card */
    .cart-order-summary {
        margin-top: auto;
        padding: 30px 24px 30px;
        background: #F9F5F0;
        border-radius: 16px 16px 0 0;
        margin-left: -24px;
        margin-right: -24px;
    }

    .summary-title {
        font-family: serif;
        font-size: 1.3rem;
        font-weight: 500;
        margin-bottom: 20px;
        color: #1a1a1a;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 0.95rem;
        color: #555;
    }

    .text-gold {
        color: #C1A661;
        font-weight: 600;
    }

    .summary-divider {
        height: 1px;
        background: rgba(0, 0, 0, 0.08);
        margin: 20px 0;
    }

    .summary-row.total {
        color: #000;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 30px;
    }

    .btn-luxury-checkout {
        width: 100%;
        background-color: #111 !important; /* Force Black */
        color: #fff !important;
        border: none !important;
        padding: 18px;
        font-size: 1rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .btn-luxury-checkout svg {
        margin-left: 8px;
    }

    /* Ensure backdrop is visible for both menus */
    .cart-drawer-overlay.open {
        opacity: 1;
        pointer-events: auto;
        background: rgba(0,0,0,0.4) !important; /* Darker overlay */
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 2000;
    }
    
}
"""

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "/* --- Luxury Cart Design (Bright & Premium) --- */"
end_marker = "/* Desktop */"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_css + "\n\n" + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced CSS block.")
else:
    print(f"Markers not found. Start: {start_idx}, End: {end_idx}")
