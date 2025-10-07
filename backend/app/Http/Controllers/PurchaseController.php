<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Models\Purchase;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the user's purchases.
     */
    public function index(Request $request)
    {
        // Get the currently authenticated user
        $user = $request->user();

        // Find all purchases belonging to this user with product data
        $purchases = Purchase::where('user_id', $user->id)
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        // Return the purchases formatted through PurchaseResource collection
        return PurchaseResource::collection($purchases);
    }

    /**
     * Store a newly created purchase in storage.
     */
    public function store(Request $request, Product $product)
    {
        // Get the currently authenticated user
        $user = $request->user();

        // Create a new purchase record
        $purchase = Purchase::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        // Return the purchase data formatted through PurchaseResource
        return response()->json([
            'message' => 'Purchase created successfully',
            'data' => new PurchaseResource($purchase)
        ], Response::HTTP_CREATED);
    }
}