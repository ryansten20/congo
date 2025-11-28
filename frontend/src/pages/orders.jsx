import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/api";
import "./orders.css";

export default function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            if (!user || !user.id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const ordersData = await getOrdersByUserId(user.id);
                setOrders(ordersData || []);
            } catch (err) {
                console.error("Error loading orders:", err);
                setError(err.message || "Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="orders-container">
                <div className="orders-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="orders-container">
                <div className="orders-empty">
                    <p>Please log in to view your orders.</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-container">
                <h1>Your Orders</h1>
                <div className="orders-empty">
                    <p>You haven't placed any orders yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <h2>Order #{order.id}</h2>
                                <p className="order-date">Placed on {formatDate(order.created_at)}</p>
                            </div>
                            <div className="order-meta">
                                <span className="order-status">
                                    {order.status.toUpperCase()}
                                </span>
                                <p className="order-total">Total: ${parseFloat(order.total_amount).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="order-items">
                            <h3>Items ({order.order_items.length})</h3>
                            {order.order_items && order.order_items.length > 0 && (
                                <div className="items-list">
                                    {order.order_items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-image">
                                                <img 
                                                    src={item.product.image} 
                                                    alt={item.product.name} 
                                                />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.product.name}</h4>
                                                <p className="item-price">${parseFloat(item.price).toFixed(2)} each</p>
                                                <p className="item-quantity">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="item-total">
                                                <p>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}