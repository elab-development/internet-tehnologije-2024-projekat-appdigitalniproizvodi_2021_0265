<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;


class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        User::query()->delete();
        Product::query()->delete();

        Schema::enableForeignKeyConstraints();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@jelisandia.com',
            'role' => 'admin',
        ]);

        

        Product::create(['name' => 'Surfer Dude Peepsicle', 'description' => 'Cruising down the street, catching that big wave, living the life. Release your inner surf dude by treating yourself with Surfer Dude Peepsicle!', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Cowboy Peepsicle', 'description' => 'Yeehaw! Horses, hay, boots, leather and a three-day-old beard. Thats the Cowboy Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Emo Boy Peepsicle', 'description' => 'Black eyeshadow, dark, loud music, piercings and weird hair - thats your typical Emo Boy Peepsicle. And dont worry, this is a judgement-free zone - we all had that phase.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Miss Neon Peepsicle', 'description' => 'Completely unique and different from the rest. She lights up every room she walks in. Miss Neon Peepsicle is rare, one of a kind.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'The Cold Peepsicle', 'description' => 'Why is it so cold!? Im ab-b-b-so-lu-tely freezing!! Maybe becoming a part of your co-co-collection would help?? Buy me then.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'One Odd Peepsicle', 'description' => 'Crystal blue eyes piercing your soul. Bold red lip paired with a simple white outfit. Thats One Odd Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Miss Alt Peepsicle', 'description' => 'When your Im-Not-Like-Other-Girls feeling kicks in, Miss Alt Peepsicle will be waiting for you. With her turquoise hair and edgy makeup, she will provide the true definition of the quirkiness we hold within ourselves.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Weird Yearbook Pic Peepsicle', 'description' => 'Remember those awful yearbook pics we had to take right in the most awkward stages of our lives? Yeah, looks like this Weird Yearbook Pic Peepsicle knows what were talking about.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Surfer Girl Peepsicle', 'description' => 'Getting a good tan, surfing that big wave, making puka shell necklaces. This beach babe knows the trick for the perfect beach waves. Get Surfer Girl Peepsicle today!', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Clown Peepsicle', 'description' => 'horn noises Clown Peepsicle is here to entertain you. He makes the best days out of the dullest, and he is ready to perform his best trick yet - become someones NFT.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Mister Stylish Peepsicle', 'description' => 'News - beanies are in, fedoras are out. Mister Stylish Peepsicle said so. Get him for more fashion advice.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Bad Boy Peepsicle', 'description' => 'Hair slicked back, neck covered in tattoos, smoking your cigarette away. Be the bad boy you always wanted to be - get yourself a Bad Boy Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Goth Chick Peepsicle', 'description' => 'Pale skin with black makeup, leather, hair. Light blue eyes that have the ability to see through you. She is the Goth Chick Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Miss Punk Peepsicle', 'description' => 'Feeling punk? If that is the case, Miss Punk is the perfect choice for you - edgy clothes and all.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'The Baked Peepsicle', 'description' => 'This Peepsicle knows the deeper meaning of the Metaverse. He is baked. No, he is not a chef, he is not a baker. Well, not in a culinary sense at least.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Rock Chick Peepsicle', 'description' => 'You like that bend? She does too. Shaggy haircut, neck tattoos and a bold eyeliner speak for themselves. She is your Rock Chick Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Cig Mom Peepsicle', 'description' => 'Our favorite days are Spa Days but for this Cig Mom Peepsicle, every day is Spa Day. She has a morning routine that consists of lots of things, the first one (and the most important one) being - relaxation.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Diesel Slav Power Peepsicle', 'description' => '90s Slav movement in a nutshell. Tracksuits for days, fast sunglasses are the way to go. Diesel Slav Power Peepsicle is the ultimate Slav NFT to own.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Miss Devil Peepsicle', 'description' => 'Is she flaming hot or is it just her skin? Anyways, dont mess with Miss Devil Peepsicle, she knows everything.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => '18th Century Peepsicle', 'description' => 'Arched eyebrows, over-the-top makeup, big, poofy hair, pearl necklace, the iconic outfit! She is the 18th Century Peepsicle, a timeless work of art.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Chill Lad Peepsicle', 'description' => 'There is nothing better than a good hairstyle and cool sunglasses paired together. This Chill Lad Peepsicle is waiting.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Suzanne Peepsicle', 'description' => 'Suzie, Suzie, Suzie! Getting this crazy hairstyle is tough, you know. But whats even tougher is resisting the charms of Suzanne Peepsicle! Get her. Come on.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Miss Nerd Peepsicle', 'description' => 'Release your inner NERD that has been hiding away for all these years! Braces and zits are cool. They are trendy, right?', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Hippie Peepsicle', 'description' => 'Oh, he loves the 60s. He was born in the wrong generation. Quite literally. This Hippie Peepsicle is all about music. He desires a good music festival and a place to just chill. That is all.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Iced Out Peepsicle', 'description' => 'Chains for days. Face tattoos all over. Iced out everything. Follow the trend with this Iced Out Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Thermo Peepsicle', 'description' => 'Thermo Peepsicle has all the colors. Cool hair, even cooler eyes. That is our Thermo Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Hillbilly Peepsicle', 'description' => 'He has got a timeless mullet and a nice shirt to keep him stylish any day of the week. Week? Decade. Hillbilly Peepsicle is a special fella with lots of unique fashion advice.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Mister Grunge Peepsicle', 'description' => 'Ever felt like grunge perfectly describes your personality? Fear no more! Mister Grunge Peepsicle is just the guy for you - come on, his red hair is waiting.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Old Money Peepsicle', 'description' => 'Back in my day...This Old Money Peepsicle, although evidently tired, decided to come out with his fashion senses. Shiny mustache paired with a monocle are always the perfect combo. Anyways, Im hip, right?', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Purple Dream Peepsicle', 'description' => 'Do you have the courage to rock out bright purple hair? This Purple Dream Peepsicle lives for purple. Live out your craziest fantasies with the Purple Dream Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Mister Punk Peepsicle', 'description' => 'Remember Miss Punk Peepsicle? This is her friend. He might be even crazier. He opted for a million piercings on his face while rocking the most outrageous red haircut ever. All the pins on his shirt cant hold him down. He is Mister Punk Peepsicle.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => 'Disco Peepsicle', 'description' => 'Groovy, wavy, feeling the musics vibrations. Dancing in the rhythm of the beat, this Disco Peepsicle will take you to the top.', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        Product::create(['name' => '3D Peepsicle', 'description' => 'Do you think he is coming through the screen? His 3Dness makes him totally the most authentic out of the collection. Get him now to stand out!', 'price' => 19.99, 'original_file_path' => 'placeholders/document.pdf', 'preview_file_path' => 'placeholders/preview.jpg']);
        }
}