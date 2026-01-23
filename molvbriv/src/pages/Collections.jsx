import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Filter } from 'lucide-react';
import './Collections.css';

// Hardcoded filters for now, or could be dynamic too
const filters = {
    categories: ["Clothes", "Accessories", "Jewelry"],
    colors: ["Brown", "Black", "Gold", "Cream", "Grey"]
};

// Subcategories Configuration (Matches ProductManager)
const SUBCATEGORIES = {
    Men: ["Jeans", "Shirts", "T-Shirts", "Formal Pants", "Jackets", "Hoodies", "Shoes"],
    Women: ["Saree", "Kurti", "Lehenga", "One Piece Dress", "Suit", "Tops", "Slippers", "Jutti", "Shoes"]
};

// Banner Images Configuration
const CATEGORY_BANNERS = {
    default: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    Clothes: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    clothes: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    Men: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop",
    men: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop",
    Women: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    women: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    Accessories: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
    accessories: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
    Jewelry: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop",
    jewelry: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2000&auto=format&fit=crop"
};

const Collections = () => {
    const { gender, subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeColor, setActiveColor] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync URL params with local state or just use them for filtering
    useEffect(() => {
        // If we are on a specific route, strictly filter by it
        // We can just rely on the params for the render logic
        if (gender === 'clothes') {
            // General clothes endpoint if we used it, but typically we use /collections/Men or /collections/Women
        }
    }, [gender, subcategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(product => {
        // 1. URL Param Filters (High Priority)
        if (gender) {
            const paramLower = gender.toLowerCase();

            if (paramLower === 'clothes') {
                if (product.category !== 'Clothes') return false;
            } else if (paramLower === 'men' || paramLower === 'women') {
                // Specific gender (Men/Women) -> Implies Clothes
                if (product.category !== 'Clothes') return false;
                if (!product.gender || product.gender.toLowerCase() !== paramLower) return false;
            } else {
                // Otherwise, treat 'gender' param as a Category (e.g., Jewelry, Accessories)
                // We compare case-insensitive match with product.category
                if (product.category.toLowerCase() !== paramLower) return false;
            }
        }

        if (subcategory) {
            if (!product.subcategory || product.subcategory.toLowerCase() !== subcategory.toLowerCase()) return false;
        }

        // 2. Sidebar Filters (Secondary)
        if (activeCategory && !gender) {
            if (product.category !== activeCategory) return false;
        }

        if (activeColor && product.color !== activeColor) return false;

        return true;
    });

    // Dynamic Title
    const pageTitle = () => {
        if (subcategory) return `${gender}'s ${subcategory}`;
        if (gender) {
            const paramLower = gender.toLowerCase();

            // Explicit Categories
            if (paramLower === 'accessories') return "Accessories Collection";
            if (paramLower === 'jewelry') return "Jewelry Collection";

            // Clothes Logic
            if (paramLower === 'clothes') return "All Clothes";
            if (paramLower === 'men' || paramLower === 'women') return `${gender}'s Collection`;

            // Generic Fallback
            return gender.charAt(0).toUpperCase() + gender.slice(1) + " Collection";
        }
        return activeCategory || "All Collections";
    };

    const getBannerImage = () => {
        // Handle explicit gender keys first
        if (gender === 'Men') return CATEGORY_BANNERS.Men;
        if (gender === 'Women') return CATEGORY_BANNERS.Women;

        // Handle active category from sidebar
        if (activeCategory && CATEGORY_BANNERS[activeCategory]) return CATEGORY_BANNERS[activeCategory];

        // Handle URL param as category (case-insensitive lookup)
        if (gender) {
            const paramLower = gender.toLowerCase();
            // Find key in CATEGORY_BANNERS that matches the param case-insensitively
            const matchedKey = Object.keys(CATEGORY_BANNERS).find(key => key.toLowerCase() === paramLower);
            if (matchedKey) return CATEGORY_BANNERS[matchedKey];
        }

        return CATEGORY_BANNERS.default;
    };

    return (
        <div className="collections-page section-padding">
            <div className="container">

                {/* Mobile Filter Toggle */}
                <button className="mobile-filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    <Filter size={18} /> Filters
                </button>

                <div className="collections-layout">
                    {/* Sidebar */}
                    <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
                        <div className="filter-group">
                            <h3>Category</h3>
                            <ul>
                                <li>
                                    <Link
                                        to="/collections"
                                        className={!gender ? 'active' : ''}
                                        onClick={() => setActiveCategory(null)}
                                    >All</Link>
                                </li>
                                {filters.categories.map(cat => (
                                    <React.Fragment key={cat}>
                                        <li>
                                            <Link
                                                to={`/collections/${cat}`}
                                                className={gender && gender.toLowerCase() === cat.toLowerCase() ? 'active' : ''}
                                                // Keep setActiveCategory for nested logic fallback or remove? 
                                                // Should set it to allow nested expansion if logic uses it.
                                                onClick={() => setActiveCategory(cat)}
                                            >{cat}</Link>
                                        </li>

                                        {/* Nested Clothes Subcategories - Logic Update: check activeCategory OR param */}
                                        {cat === 'Clothes' && (activeCategory === 'Clothes' || (gender && gender.toLowerCase() === 'clothes')) && (
                                            <div className="sidebar-subcategories">
                                                <div className="sidebar-gender-group">
                                                    <h4>Men</h4>
                                                    {SUBCATEGORIES.Men.map(sub => (
                                                        <Link
                                                            key={`Men-${sub}`}
                                                            to={`/collections/Men/${sub}`}
                                                            className={`sidebar-sublink ${subcategory === sub && gender === 'Men' ? 'active' : ''}`}
                                                        >
                                                            {sub}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="sidebar-gender-group">
                                                    <h4>Women</h4>
                                                    {SUBCATEGORIES.Women.map(sub => (
                                                        <Link
                                                            key={`Women-${sub}`}
                                                            to={`/collections/Women/${sub}`}
                                                            className={`sidebar-sublink ${subcategory === sub && gender === 'Women' ? 'active' : ''}`}
                                                        >
                                                            {sub}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                        <div className="filter-group">
                            <h3>Color</h3>
                            <ul>
                                <li
                                    className={!activeColor ? 'active' : ''}
                                    onClick={() => setActiveColor(null)}
                                >All</li>
                                {filters.colors.map(color => (
                                    <li
                                        key={color}
                                        className={activeColor === color ? 'active' : ''}
                                        onClick={() => setActiveColor(color)}
                                    >{color}</li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="product-grid-wrapper">

                        {/* Dynamic Category Banner */}
                        <div className="collection-hero" style={{ backgroundImage: `url("${getBannerImage()}")` }}>
                            <div className="hero-overlay">
                                <h2>{pageTitle()}</h2>
                                <p>Discover our latest exclusive collection.</p>
                            </div>
                        </div>

                        <div className="collection-header">
                            <span className="results-count">{filteredProducts.length} Results</span>
                        </div>

                        {loading ? (
                            <p>Loading collections...</p>
                        ) : (
                            <div className="product-grid">
                                {filteredProducts.map(product => (
                                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                        <div className="product-img">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                                            />
                                            <div className="quick-add">View Details</div>
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <span className="price">Rs.{product.price}</span>
                                        </div>
                                    </Link>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <p>No products found in this category.</p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Collections;
