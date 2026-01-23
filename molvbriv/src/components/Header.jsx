import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import './Header.css';

// Mock Cart Item for display
const MOCK_CART_ITEM = {
  id: 1,
  name: "The Classic Tote",
  price: 1250,
  image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop",
  quantity: 1
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  }, [location]);

  const handleAccountClick = () => {
    navigate('/login');
  };

  // Focus input when search opens
  const searchInputRef = React.useRef(null);
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100); // Slight delay for animation start
    }
  }, [isSearchOpen]);

  /* Clothes Dropdown logic */
  const [isClothesOpen, setIsClothesOpen] = useState(false);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="logo">Molvbriv</Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li><NavLink to="/" className="nav-link" end>Home</NavLink></li>

              {/* Clothes Dropdown */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => setIsClothesOpen(true)}
                onMouseLeave={() => setIsClothesOpen(false)}
              >
                <NavLink to="/collections/clothes" className="nav-link">Clothes</NavLink>

                <div className={`dropdown-menu ${isClothesOpen ? 'active' : ''}`}>
                  <div className="dropdown-column">
                    <h4>Men Collection</h4>
                    <Link to="/collections/Men/Jeans">Jeans</Link>
                    <Link to="/collections/Men/Shirts">Shirts</Link>
                    <Link to="/collections/Men/T-Shirts">T-Shirts</Link>
                    <Link to="/collections/Men/Formal Pants">Formal Pants</Link>
                    <Link to="/collections/Men/Jackets">Jackets</Link>
                    <Link to="/collections/Men/Hoodies">Hoodies</Link>
                    <Link to="/collections/Men/Shoes">Shoes</Link>
                  </div>
                  <div className="dropdown-column">
                    <h4>Women Collection</h4>
                    <Link to="/collections/Women/Saree">Saree</Link>
                    <Link to="/collections/Women/Kurti">Kurti</Link>
                    <Link to="/collections/Women/Lehenga">Lehenga</Link>
                    <Link to="/collections/Women/One Piece Dress">One Piece Dress</Link>
                    <Link to="/collections/Women/Suit">Suit</Link>
                    <Link to="/collections/Women/Tops">Tops</Link>
                    <Link to="/collections/Women/Slippers">Slippers</Link>
                    <Link to="/collections/Women/Jutti">Jutti</Link>
                    <Link to="/collections/Women/Shoes">Shoes</Link>
                  </div>
                </div>
              </li>

              <li><NavLink to="/collections" className="nav-link">Collections</NavLink></li>
              <li><NavLink to="/our-story" className="nav-link">Our Story</NavLink></li>
              <li><NavLink to="/journal" className="nav-link">Journal</NavLink></li>
              <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="header-actions">

            {/* Inline Search Container */}
            <div className={`search-inline-wrapper ${isSearchOpen ? 'active' : ''}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/collections');
                  setIsSearchOpen(false);
                }}
                className="search-inline-form"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="search-inline-input"
                />
              </form>
              <button
                className="icon-btn search-trigger"
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
            </div>

            <button className="icon-btn" aria-label="Account" onClick={handleAccountClick}>
              <User size={20} />
            </button>
            <button className="icon-btn cart-icon-wrapper" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              <span className="cart-count">1</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-link">Home</Link>
          <div className="mobile-dropdown-wrapper">
            <span className="mobile-link" style={{ opacity: 0.8 }}>Men</span>
            <Link to="/collections/Men/Jeans" className="mobile-sublink">Jeans</Link>
            <Link to="/collections/Men/Shirts" className="mobile-sublink">Shirts</Link>
          </div>
          <Link to="/collections" className="mobile-link">All Collections</Link>
          <Link to="/our-story" className="mobile-link">Our Story</Link>
          <Link to="/journal" className="mobile-link">Journal</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
        </nav>
      </div>

      {/* Search Backdrop (Dimmer) */}
      <div
        className={`search-backdrop ${isSearchOpen ? 'active' : ''}`}
        onClick={() => setIsSearchOpen(false)}
      ></div>

      {/* Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Bag (1)</h2>
          <button className="icon-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {/* Mock Item */}
          <div className="cart-item">
            <img src={MOCK_CART_ITEM.image} alt={MOCK_CART_ITEM.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h4>{MOCK_CART_ITEM.name}</h4>
              <p className="cart-item-price">${MOCK_CART_ITEM.price}</p>
              <p style={{ fontSize: '0.8rem', color: '#000000ff', marginTop: '5px' }}>Qty: {MOCK_CART_ITEM.quantity}</p>
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span>$1,250.00</span>
          </div>
          <button className="btn-checkout">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Header;
