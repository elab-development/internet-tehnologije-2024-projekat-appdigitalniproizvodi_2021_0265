<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'original_file_path' => $this->original_file_path,
            'preview_file_path' => $this->preview_file_path,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
