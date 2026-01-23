import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Minus, Plus } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } else {
                setProduct(data);
                setSelectedImage(data.image);
                fetchRelated(data.category, data.id);
            }
            setLoading(false);
        };

        const fetchRelated = async (category, currentId) => {
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .neq('id', currentId)
                .limit(3);
            setRelatedProducts(data || []);
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="text-center section-padding">Loading...</div>;

    if (!product) {
        return (
            <div className="container section-padding text-center">
                <h2>Product not found</h2>
                <Link to="/collections" className="btn-link">Return to Collections</Link>
            </div>
        );
    }

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    // Use gallery if available, otherwise just main image
    const images = product.gallery || [product.image];

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumbs */}
                <div className="product-breadcrumbs">
                    <Link to="/">Home</Link> <span>/</span>
                    <Link to="/collections">Collections</Link> <span>/</span>
                    <span>{product.name}</span>
                </div>

                <div className="product-detail-layout">
                    {/* Left: Gallery */}
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img
                                src={selectedImage || product.image}
                                alt={product.name}
                                className="main-product-image"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Molvbriv'; }}
                            />
                        </div>
                        <div className="thumbnail-grid">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="product-info-section">
                        <h1 className="pd-title">{product.name}</h1>
                        <div className="pd-price-wrapper">
                            {product.compare_price && product.compare_price > product.price && (
                                <span className="pd-compare-price">Rs.{product.compare_price.toLocaleString()}</span>
                            )}
                            <span className="pd-price">Rs.{product.price.toLocaleString()}</span>
                            {product.compare_price && product.compare_price > product.price && (
                                <span className="pd-discount">
                                    {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                                </span>
                            )}
                        </div>
                        <div className="add-to-cart-area">
                            <div className="quantity-selector">
                                <button className="qty-btn" onClick={() => handleQuantityChange('dec')}><Minus size={16} /></button>
                                <input type="text" value={quantity} readOnly className="qty-input" />
                                <button className="qty-btn" onClick={() => handleQuantityChange('inc')}><Plus size={16} /></button>
                            </div>
                            <button
                                className="btn-buy-now"
                                onClick={() => {
                                    alert(`Proceeding to checkout:\n${product.name} x ${quantity}\nTotal: Rs.${(product.price * quantity).toLocaleString()}`);
                                    // TODO: Integrate with payment gateway
                                }}
                            >
                                Buy Now - Rs.{(product.price * quantity).toLocaleString()}
                            </button>
                            <button className="btn-add-cart">
                                Add to Bag
                            </button>
                        </div>

                        {product.description && (
                            <p className="pd-description">
                                {product.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-section">
                        <div className="container">
                            <h3 className="section-title text-center">You May Also Like</h3>
                            <div className="related-grid">
                                {relatedProducts.map(rp => (
                                    <Link to={`/product/${rp.id}`} key={rp.id} className="featured-item group">
                                        <div className="featured-img-wrapper" style={{ height: '400px' }}>
                                            <img src={rp.image} alt={rp.name} className="featured-img" />
                                        </div>
                                        <h4 className="featured-title" style={{ fontSize: '1.2rem' }}>{rp.name}</h4>
                                        <p style={{ color: '#888' }}>Rs.{rp.price}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
