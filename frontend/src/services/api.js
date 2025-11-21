// API Service for Mini Market

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Simple fetch wrapper (no complex auth needed)
 */
const apiFetch = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return null;
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// ============================================
// PRODUCT ENDPOINTS
// ============================================

/**
 * Get all products
 * @returns {Promise<Array>} Array of all products
 */
export const getAllProducts = async () => {
    return await apiFetch('/products');
};

/**
 * Get single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
    return await apiFetch(`/products/${id}`);
};

/**
 * Get featured products (IDs: 1, 35, 7, 23, 11, 34, 9)
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedProducts = async () => {
    return await apiFetch('/products/featured');
};

/**
 * Get products by category
 * @param {string} category - Category name (electronics, gaming, kitchen, etc.)
 * @returns {Promise<Array>} Array of products in the category
 */
export const getProductsByCategory = async (category) => {
    return await apiFetch(`/products/category/${category}`);
};

/**
 * Search products by query
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    return await apiFetch(`/products/search?q=${encodedQuery}`);
};

/**
 * Get products by array of IDs
 * @param {Array<number>} ids - Array of product IDs
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByIds = async (ids) => {
    return await apiFetch('/products/by-ids', {
        method: 'POST',
        body: JSON.stringify({ ids }),
    });
};

/**
 * Get all product categories
 * @returns {Promise<Array>} Array of category names
 */
export const getCategories = async () => {
    return await apiFetch('/products/categories');
};

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data
 */
export const register = async (userData) => {
    return await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data
 */
export const login = async (email, password) => {
    return await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
    return await apiFetch('/logout', {
        method: 'POST',
    });
};

// ============================================
// ORDER ENDPOINTS
// ============================================

/**
 * Checkout a new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Order data
 */
export const checkout = async (orderData) => {
    return await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
    });
};

/**
 * Get an order by ID
 * @param {number} id - Order ID
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (id) => {
    return await apiFetch(`/orders/${id}`);
};

/**
 * Get all orders by user ID
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of orders
 */
export const getOrdersByUserId = async (userId) => {
    return await apiFetch(`/orders/user/${userId}`);
};
// Export the base URL for reference
export { API_BASE_URL };

