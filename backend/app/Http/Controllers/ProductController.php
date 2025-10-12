<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }


    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $products = Product::paginate($perPage);
        
        return ProductResource::collection($products);
    }

   
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $productData = $request->only(['name', 'description', 'price']);

        
        if ($request->hasFile('image')) {
            $imagePaths = $this->imageUploadService->handleImageUpload($request->file('image'));
            $productData['original_file_path'] = $imagePaths['original'];
            $productData['preview_file_path'] = $imagePaths['preview'];
        }

        $product = Product::create($productData);

        return new ProductResource($product);
    }

    
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

   
    public function update(Request $request, Product $product)
    {
        try {
            $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'price' => 'sometimes|numeric|min:0',
                'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:5120',
            ]);

            $productData = $request->only(['name', 'description', 'price']);

            
            \Log::info('Request data: ' . json_encode($request->all()));
            \Log::info('Request files: ' . json_encode($request->allFiles()));
            \Log::info('Has file image: ' . ($request->hasFile('image') ? 'YES' : 'NO'));
            
            
            if ($request->hasFile('image')) {
                \Log::info('Image file detected: ' . $request->file('image')->getClientOriginalName());
                
                
                if ($product->original_file_path && Storage::disk('public')->exists($product->original_file_path)) {
                    Storage::disk('public')->delete($product->original_file_path);
                    \Log::info('Deleted old original: ' . $product->original_file_path);
                }
                if ($product->preview_file_path && Storage::disk('public')->exists($product->preview_file_path)) {
                    Storage::disk('public')->delete($product->preview_file_path);
                    \Log::info('Deleted old preview: ' . $product->preview_file_path);
                }

                
                \Log::info('Calling ImageUploadService...');
                $imagePaths = $this->imageUploadService->handleImageUpload($request->file('image'));
                \Log::info('ImageUploadService returned: ' . json_encode($imagePaths));
                
                $productData['original_file_path'] = $imagePaths['original'];
                $productData['preview_file_path'] = $imagePaths['preview'];
            } else {
                \Log::info('No image file provided, keeping existing paths');
                
                $productData['original_file_path'] = $product->original_file_path;
                $productData['preview_file_path'] = $product->preview_file_path;
            }

            $product->update($productData);

            return new ProductResource($product);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Update failed: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    
    public function destroy(Product $product)
    {
        
        if ($product->original_file_path && Storage::disk('public')->exists($product->original_file_path)) {
            Storage::disk('public')->delete($product->original_file_path);
        }
        if ($product->preview_file_path && Storage::disk('public')->exists($product->preview_file_path)) {
            Storage::disk('public')->delete($product->preview_file_path);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], Response::HTTP_OK);
    }
}
