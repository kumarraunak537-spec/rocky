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

  // ESC key handler - close all modals/menus
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsClothesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // Browser back button integration
  useEffect(() => {
    const handlePopState = () => {
      if (isMobileMenuOpen || isCartOpen || isSearchOpen) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };

    // Push history state when modal opens
    if (isMobileMenuOpen || isCartOpen || isSearchOpen) {
      window.history.pushState({ modal: true }, '');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isMobileMenuOpen, isCartOpen, isSearchOpen]);

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
          {/* Mobile Menu Trigger (Left Side) */}
          <button
            className="icon-btn hamburger mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

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

          {/* Icons (Right Side) */}
          <div className="header-actions">

            {/* Search - Desktop inline form + Mobile trigger */}
            <div className={`search-inline-wrapper ${isSearchOpen ? 'active' : ''}`}>
              {/* Desktop Search Form (hidden on mobile via CSS) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/collections');
                  setIsSearchOpen(false);
                }}
                className="search-inline-form"
              >
                <div className="container flex-center" style={{ height: '100%', position: 'relative' }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for luxury..."
                    className="search-inline-input"
                  />
                  <button
                    type="button"
                    className="search-close-mobile"
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Close search"
                  >
                    <X size={24} />
                  </button>
                </div>
              </form>
              {/* Search Trigger Button */}
              <button
                className="icon-btn search-trigger"
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={22} />
              </button>
            </div>

            <button className="icon-btn" aria-label="Account" onClick={handleAccountClick}>
              <User size={22} />
            </button>
            <button className="icon-btn cart-icon-wrapper" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <span className="mobile-menu-logo">MOLVBRIV</span>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link to="/collections" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/our-story" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>OUR STORY</Link>
          <Link to="/journal" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>JOURNAL</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link>
        </nav>
      </div>

      {/* Search Backdrop (Dimmer) - Blur effect */}
      <div
        className={`search-backdrop ${isSearchOpen ? 'active' : ''}`}
        onClick={() => setIsSearchOpen(false)}
      ></div>

      {/* Search Form - Rendered AFTER backdrop so it stays above blur */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/collections');
          setIsSearchOpen(false);
        }}
        className={`search-mobile-form ${isSearchOpen ? 'active' : ''}`}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for luxury..."
          className="search-mobile-input"
        />
        <button
          type="button"
          className="search-mobile-close"
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close search"
        >
          <X size={20} />
        </button>
      </form>

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
            <img
              src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop"
              alt="The Classic Tote"
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h4>The Classic Tote</h4>
              <p className="cart-item-price">$1,250</p>
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>$1,250</span>
          </div>
          <button className="btn-checkout">
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
