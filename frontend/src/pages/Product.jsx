import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import BootstrapStarRating from "../components/BootstrapStarRating";
import { CartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import "./Product.css";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { fetchProductById } = useProducts();
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const productData = await fetchProductById(id);
                if (productData) {
                    setProduct(productData);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err.message || "Error loading product");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, fetchProductById]);

    const handleAddToCart = async () => {
        setAddingToCart(true);
        addToCart(product);
        setTimeout(() => {
            setAddingToCart(false);
        }, 500);
    };

    if (loading) {
        return (
            <div className="product-loading">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-error">
                <h1 className="error-title">Product Not Found</h1>
                <p className="error-message">{error || "The requested product could not be found."}</p>
                <button 
                    onClick={() => window.history.back()}
                    className="error-back-btn"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="product-container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <button 
                        onClick={() => window.history.back()}
                        className="breadcrumb-link"
                    >
                        <svg className="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </button>
                </nav>

                {/* Product Details */}
                <div className="product-details">
                    <div className="product-layout">
                        {/* Product Image */}
                        <div className="product-image-section">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image-page"
                            />
                        </div>
                        
                        {/* Product Info */}
                        <div className="product-info-section">
                            <div className="product-details-column">
                                <div className="product-header">
                                    <h1 className="product-title">{product.name}</h1>
                                    <div className="product-price-rating">
                                        <span className="product-price">${product.price}</span>
                                        <div className="product-rating">
                                            <BootstrapStarRating rating={product.rating || 4.2} />
                                            <span className="rating-text">({product.rating || 4.2})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="product-description">
                                    <h2 className="description-title">Description</h2>
                                    <p className="description-text">{product.description}</p>
                                </div>

                                {/* Category */}
                                <div className="product-category">
                                    <span className="category-badge">
                                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons Column */}
                            <div className="product-actions-column">
                                <div className="product-actions">
                                    <button onClick={handleAddToCart} className="add-to-cart-btn">
                                        {addingToCart ? "Adding to Cart..." : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
