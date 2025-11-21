// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize the cart from localStorage
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Save the cart to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add a product to the cart
    const addToCart = (product) => {
        setCart((prev) => {
            const productId = Number(product.id);
            const existing = prev.find((item) => Number(item.id) === productId);
            if (existing) {
                console.log("Existing product found, increasing quantity");
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove a product from the cart
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
    // Clear the cart
    const clearCart = () => setCart([]);

    // Update the quantity of a product in the cart
    const updateQuantity = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
            )
        );
    };

    // Get the total price of the cart
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };
    // Get the total quantity of the cart
    const getCartTotalQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartTotalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
