import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Crime from "./pages/crime"
import Orders from "./pages/orders"
import {CartProvider} from "./context/CartContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ProductProvider} from "./context/ProductContext.jsx";
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <BrowserRouter>
                        <div className="flex-col">
                            <Nav />
                            <main className="flex-grow">
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Protected routes - require login */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } />
                            <Route path="/products/:id" element={
                                <ProtectedRoute>
                                    <Product />
                                </ProtectedRoute>
                            } />
                            <Route path="/category/:category" element={
                                <ProtectedRoute>
                                    <ProductList />
                                </ProtectedRoute>
                            } />
                            <Route path="/search/:query" element={
                                <ProtectedRoute>
                                    <ProductList />
                                </ProtectedRoute>
                            } />
                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            } />
                            <Route path="/orders" element={
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            } />
                            <Route path="/crime" element={
                                <ProtectedRoute>
                                    <Crime />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
