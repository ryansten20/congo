<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Checkout a new order
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);


        DB::beginTransaction(); // Start a database transaction

        $totalAmount = 0;
        $order = Order::create([ // Create a new order
            'user_id' => $request->user_id,
            'total_amount' => $totalAmount,
            'status' => 'pending', // Set the order status to pending
        ]);

        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            $totalAmount += $product->price * $item['quantity'];

            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }


        $order->update([ // Update the order total amount
            'total_amount' => $totalAmount,
        ]);
        DB::commit(); // Commit the database transaction

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ]);
    }
    // Get an order by ID
    public function show($id)
    {
        $order = Order::with('orderItems')->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
        }
    // Get all orders by user ID
    public function getByUserId($userId)
    {
        $orders = Order::with('orderItems')->where('user_id', $userId)->get();
        if (!$orders) {
            return response()->json(['message' => 'Orders not found'], 404);
        }
        return response()->json($orders);
    }
}