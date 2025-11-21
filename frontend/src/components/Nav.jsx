import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import "./Nav.css";
import { CartContext } from "../context/CartContext";


export default function Nav() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const { getCartTotalQuantity } = useContext(CartContext);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(""); // Clear search input after navigation
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="nav-container">
            <div className="flex justify-between items-center">
                <Link to="/" className="nav-brand">
                    <span className="nav-brand-highlight">Congo</span>
                </Link>
                {isAuthenticated() && (
                    <div className="nav-search-container">
                        <form onSubmit={handleSearch} className="flex">
                             <input 
                                 type="text" 
                                 placeholder="Search products..."
                                 className="nav-search-input"
                                 value={searchQuery}
                                 onChange={(e) => setSearchQuery(e.target.value)}
                                 onFocus={() => setIsSearchFocused(true)}
                                 onBlur={() => setIsSearchFocused(false)}
                             />
                             <button 
                                 type="submit" 
                                 className={`nav-search-button ${isSearchFocused ? 'nav-search-button-focused' : ''}`}
                             >
                                 <i className="bi bi-search"></i>
                             </button>
                        </form>
                    </div>
                )}
                
                <div className="nav-links">
                    {isAuthenticated() ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/crime" className="nav-link">Crime Video</Link>
                            <Link to="/cart" className="nav-link">Cart ({getCartTotalQuantity()})</Link>
                            <Link to="/orders" className="nav-link">Orders</Link>
                            <span className="nav-link" style={{color: '#4a5568'}}>
                                Welcome, {user?.name || user?.email || 'User'}!
                            </span>
                            <button 
                                onClick={handleLogout} 
                                className="nav-link"
                                style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'none'}}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}