<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageUploadService
{
    protected $imageManager;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * Handle image upload with watermarking
     *
     * @param UploadedFile $file
     * @return array
     */
    public function handleImageUpload(UploadedFile $file): array
    {
        try {
            \Log::info('ImageUploadService: Starting upload for ' . $file->getClientOriginalName());
            
            // da pravi naziv fajla
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            \Log::info('ImageUploadService: Generated filename: ' . $filename);
            
            //za diretkrorijum
            $originalPath = 'products/originals';
            $previewPath = 'products/previews';
            
            Storage::disk('public')->makeDirectory($originalPath);
            Storage::disk('public')->makeDirectory($previewPath);
            
            //ovo mi je za originalnu sliku
            $originalFullPath = $file->storeAs($originalPath, $filename, 'public');
            \Log::info('ImageUploadService: Saved original to: ' . $originalFullPath);
            
            //ovo je za samo preview sliku
            $image = $this->imageManager->read($file->getPathname());
            $image->scaleDown(width: 800);
            
            //watermark
            $watermarkPath = public_path('slike/watermark.png');
            if (file_exists($watermarkPath)) {
                try {
                    $watermark = $this->imageManager->read($watermarkPath);
                    
                    
                    $watermark->resize($image->width(), $image->height());
                    
                    
                    $image->place($watermark, 'center', 0, 0, 25);
                    \Log::info('ImageUploadService: Watermark applied successfully');
                } catch (\Exception $e) {
                    
                    \Log::warning('Watermark failed: ' . $e->getMessage());
                }
            } else {
                \Log::warning('Watermark file not found at: ' . $watermarkPath);
            }
            
            
            $previewFullPath = $previewPath . '/' . $filename;
            $previewImageData = $image->toJpeg(90);
            Storage::disk('public')->put($previewFullPath, $previewImageData);
            \Log::info('ImageUploadService: Saved preview to: ' . $previewFullPath);
            
            $result = [
                'original' => $originalFullPath,
                'preview' => $previewFullPath,
            ];
            
            \Log::info('ImageUploadService: Returning: ' . json_encode($result));
            return $result;
        } catch (\Exception $e) {
            \Log::error('ImageUploadService failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
