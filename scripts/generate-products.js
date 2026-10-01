import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for pricing & variation
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Store templates
const STORE_PROVIDERS = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', link: 'https://amazon.in' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg', link: 'https://flipkart.com' },
  { name: 'Blinkit', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg', link: 'https://blinkit.com' },
  { name: 'Reliance Digital', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg', link: 'https://reliancedigital.in' },
  { name: 'eBay', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg', link: 'https://ebay.com' }
];

function generateStoreOffers(basePrice, storeCount) {
  const count = Math.min(Math.max(storeCount, 3), STORE_PROVIDERS.length);
  const selectedStores = STORE_PROVIDERS.slice(0, count);
  
  return selectedStores.map((store, idx) => {
    // index 0 is lowest
    const markupMultiplier = idx === 0 ? 1 : 1 + (idx * 0.02) + (Math.random() * 0.03);
    const price = Math.round((basePrice * markupMultiplier) / 10) * 10;
    const isFree = idx < 4 || Math.random() > 0.4;
    return {
      store: store.name,
      logo: store.logo,
      price: price,
      shipping: isFree ? 'Free' : `₹${[49, 99, 149][idx % 3]}`,
      seller: idx === 0 ? `${store.name} Verified` : `Authorized Retailer ${idx}`,
      available: Math.random() > 0.08,
      updated: `${(idx + 1) * 3} min ago`,
      best: idx === 0,
      link: store.link
    };
  });
}

// 1. SMARTPHONES GENERATOR (105 items)
function getSmartphones() {
  const phoneModels = [
    // Apple (18)
    { brand: 'Apple', name: 'iPhone 16 Pro Max 256GB', price: 144900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '6.9" Super Retina XDR OLED', '48MP Fusion Camera', 'Titanium Build'] },
    { brand: 'Apple', name: 'iPhone 16 Pro Max 512GB', price: 164900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '6.9" Super Retina XDR', 'Camera Control button', 'USB-C 3.0'] },
    { brand: 'Apple', name: 'iPhone 16 Pro Max 1TB', price: 184900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '1TB NVMe Storage', '4K 120fps Dolby Vision', 'Desert Titanium'] },
    { brand: 'Apple', name: 'iPhone 16 Pro 128GB', price: 119900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '6.3" ProMotion 120Hz', '5x Telephoto zoom', 'Natural Titanium'] },
    { brand: 'Apple', name: 'iPhone 16 Pro 256GB', price: 129900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '6.3" ProMotion 120Hz', '48MP Ultra Wide', 'Black Titanium'] },
    { brand: 'Apple', name: 'iPhone 16 Pro 512GB', price: 149900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Pro chip', '512GB Storage', 'Ray Tracing Gaming', 'White Titanium'] },
    { brand: 'Apple', name: 'iPhone 16 Plus 128GB', price: 89900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Bionic', '6.7" Super Retina XDR', 'Dynamic Island', 'Action Button'] },
    { brand: 'Apple', name: 'iPhone 16 Plus 256GB', price: 99900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 Bionic', '6.7" Super Retina XDR', 'Ultramarine Blue', '48MP 2x Telephoto'] },
    { brand: 'Apple', name: 'iPhone 16 128GB', price: 79900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 chip', '6.1" OLED Display', 'Camera Control', 'Teal Green'] },
    { brand: 'Apple', name: 'iPhone 16 256GB', price: 89900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/IPhone_18_Pro_Vector.svg/960px-IPhone_18_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A18 chip', '256GB Storage', 'Pink Finish', 'Spatial Audio Capture'] },
    { brand: 'Apple', name: 'iPhone 15 Pro Max 256GB', price: 134900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_15_Pro_Vector.svg/960px-IPhone_15_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A17 Pro 3nm', '6.7" 120Hz', '5x Optical Zoom', 'Blue Titanium'] },
    { brand: 'Apple', name: 'iPhone 15 Pro 128GB', price: 109900, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_15_Pro_Vector.svg/960px-IPhone_15_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A17 Pro', 'Action Button', '48MP Main Camera', 'Natural Titanium'] },
    { brand: 'Apple', name: 'iPhone 15 128GB', price: 58999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/IPhone_15_Vector.svg/960px-IPhone_15_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A16 Bionic', 'Dynamic Island', '48MP Camera', 'USB-C port'] },
    { brand: 'Apple', name: 'iPhone 15 256GB', price: 68999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/IPhone_18_Pro_Vector.svg/960px-IPhone_18_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A16 Bionic', '256GB ROM', 'Super Retina XDR', 'Pastel Blue'] },
    { brand: 'Apple', name: 'iPhone 15 Plus 128GB', price: 69999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/IPhone_15_Vector.svg/960px-IPhone_15_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A16 Bionic', '6.7" Screen', 'Day-long battery', 'Dynamic Island'] },
    { brand: 'Apple', name: 'iPhone 14 128GB', price: 49999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/IPhone_14_vector.svg/960px-IPhone_14_vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A15 Bionic 5-core GPU', 'Photonic Engine', 'Crash Detection', 'Midnight'] },
    { brand: 'Apple', name: 'iPhone 13 128GB', price: 42999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/IPhone_12_Blue.svg/960px-IPhone_12_Blue.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['A15 Bionic', 'Cinematic Mode 1080p', 'OLED display', 'Starlight'] },
    { brand: 'Apple', name: 'iPhone SE (3rd Gen) 64GB', price: 29999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['A15 Bionic', 'Compact 4.7" Retina HD', 'Touch ID', '5G Capable'] },

    // Samsung (20)
    { brand: 'Samsung', name: 'Galaxy S24 Ultra 5G (12GB/256GB)', price: 119999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 3', '200MP Quad Cam', 'Built-in S Pen', 'Titanium Gray'] },
    { brand: 'Samsung', name: 'Galaxy S24 Ultra 5G (12GB/512GB)', price: 129999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Galaxy AI', 'Flat 6.8" QHD+ AMOLED', '5000mAh Battery', 'Titanium Black'] },
    { brand: 'Samsung', name: 'Galaxy S24 Ultra 5G (12GB/1TB)', price: 149999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['1TB UFS 4.0', 'Anti-reflective Armor Glass', '7 Years OS Updates', 'Titanium Violet'] },
    { brand: 'Samsung', name: 'Galaxy S24+ 5G (12GB/256GB)', price: 84999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Exynos 2400 / 8 Gen 3', '6.7" QHD+ 120Hz', '4900mAh Battery', 'Cobalt Violet'] },
    { brand: 'Samsung', name: 'Galaxy S24 5G (8GB/128GB)', price: 64999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Compact 6.2" Dynamic AMOLED', '50MP Triple Cam', 'Galaxy AI Live Translate'] },
    { brand: 'Samsung', name: 'Galaxy S24 5G (8GB/256GB)', price: 69999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['256GB Storage', '4000mAh Battery', 'Armor Aluminum 2.0', 'Onyx Black'] },
    { brand: 'Samsung', name: 'Galaxy Z Fold 6 5G (12GB/256GB)', price: 164999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['7.6" Inner Foldable AMOLED', 'Snapdragon 8 Gen 3', 'Dual Hinge Design', 'Silver Shadow'] },
    { brand: 'Samsung', name: 'Galaxy Z Fold 6 5G (12GB/512GB)', price: 176999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['512GB Storage', 'S Pen Compatible', 'IP48 Water Resistance', 'Navy'] },
    { brand: 'Samsung', name: 'Galaxy Z Flip 6 5G (12GB/256GB)', price: 109999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['3.4" FlexWindow Cover Screen', '50MP Main Cam', 'Vapor Chamber Cooling', 'Mint'] },
    { brand: 'Samsung', name: 'Galaxy S23 Ultra 5G (12GB/256GB)', price: 74999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 2', '200MP Camera', '100x Space Zoom', 'Green'] },
    { brand: 'Samsung', name: 'Galaxy S23 FE 5G (8GB/128GB)', price: 37999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Exynos 2200', '6.4" 120Hz AMOLED', '50MP Triple Camera', 'Mint'] },
    { brand: 'Samsung', name: 'Galaxy A55 5G (8GB/128GB)', price: 36999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Metal Frame', 'Gorilla Glass Victus+', 'Exynos 1480 with AMD GPU', 'Iceblue'] },
    { brand: 'Samsung', name: 'Galaxy A55 5G (12GB/256GB)', price: 42999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['12GB RAM', '256GB ROM', 'IP67 Water Resistance', 'Awesome Navy'] },
    { brand: 'Samsung', name: 'Galaxy A35 5G (8GB/128GB)', price: 27999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Exynos 1380', '6.6" 120Hz Super AMOLED', '50MP OIS', 'Awesome Lilac'] },
    { brand: 'Samsung', name: 'Galaxy M55 5G (8GB/128GB)', price: 22999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7 Gen 1', '45W Super Fast Charging', '50MP Selfie Cam'] },
    { brand: 'Samsung', name: 'Galaxy M35 5G (6GB/128GB)', price: 16999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['6000mAh Monster Battery', 'Exynos 1380', 'Corning Gorilla Glass Victus+'] },
    { brand: 'Samsung', name: 'Galaxy M15 5G (6GB/128GB)', price: 12999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['6000mAh Battery', 'MediaTek Dimensity 6100+', '90Hz sAMOLED Display'] },
    { brand: 'Samsung', name: 'Galaxy F55 5G (8GB/256GB)', price: 26999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Vegan Leather Back', 'Snapdragon 7 Gen 1', '45W Charging', 'Apricot Crush'] },
    { brand: 'Samsung', name: 'Galaxy F15 5G (6GB/128GB)', price: 13499, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['6000mAh Battery', '4 Gen OS Updates', '50MP Triple Camera'] },
    { brand: 'Samsung', name: 'Galaxy A15 5G (8GB/128GB)', price: 17499, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 6100+', '6.5" 90Hz AMOLED', '5000mAh 25W Charging'] },

    // OnePlus (12)
    { brand: 'OnePlus', name: 'OnePlus 12 5G (12GB/256GB)', price: 61999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 3', '2K 120Hz ProXDR Display', 'Hasselblad 4th Gen Cam', '100W SUPERVOOC'] },
    { brand: 'OnePlus', name: 'OnePlus 12 5G (16GB/512GB)', price: 66999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['16GB LPDDR5X RAM', '5400mAh Battery', '50W Wireless Charging', 'Silky Black'] },
    { brand: 'OnePlus', name: 'OnePlus Open 5G (16GB/512GB)', price: 139999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['7.82" Flexi-fluid 120Hz AMOLED', 'Dual ProXDR screens', 'Hasselblad Triple Cam', 'Emerald Dusk'] },
    { brand: 'OnePlus', name: 'OnePlus 12R 5G (8GB/128GB)', price: 37999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 2', '5500mAh Largest Battery', '1.5K 120Hz LTPO4 Display', 'Cool Blue'] },
    { brand: 'OnePlus', name: 'OnePlus 12R 5G (16GB/256GB)', price: 42999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['16GB RAM', '256GB UFS 3.1', '100W Fast Charging', 'Iron Gray'] },
    { brand: 'OnePlus', name: 'OnePlus 11 5G (16GB/256GB)', price: 47999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 2', 'Hasselblad Ambient Photography', 'Cryo-velocity VC Cooling'] },
    { brand: 'OnePlus', name: 'OnePlus Nord 4 5G (8GB/128GB)', price: 29999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Oneplus_Nord_2.jpg/960px-Oneplus_Nord_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['All-Metal Unibody Design', 'Snapdragon 7+ Gen 3', '5500mAh 100W Charging', 'Mercurial Silver'] },
    { brand: 'OnePlus', name: 'OnePlus Nord 4 5G (12GB/256GB)', price: 32999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Oneplus_Nord_2.jpg/960px-Oneplus_Nord_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['12GB RAM', 'Sony 50MP LYT-600 with OIS', '6 Years Software Support', 'Oasis Green'] },
    { brand: 'OnePlus', name: 'OnePlus Nord CE 4 5G (8GB/128GB)', price: 24999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Oneplus_Nord_2.jpg/960px-Oneplus_Nord_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Snapdragon 7 Gen 3', '100W SUPERVOOC Charge', '5500mAh Battery', 'Dark Chrome'] },
    { brand: 'OnePlus', name: 'OnePlus Nord CE 4 5G (8GB/256GB)', price: 26999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Oneplus_Nord_2.jpg/960px-Oneplus_Nord_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['256GB Storage', 'Sony LYT-600 OIS Camera', 'Aqua Surge'] },
    { brand: 'OnePlus', name: 'OnePlus Nord CE 4 Lite 5G (8GB/128GB)', price: 17999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Oneplus_Nord_2.jpg/960px-Oneplus_Nord_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['120Hz AMOLED 2100 nits', '5500mAh 80W Charging', 'Sony LYT-600 OIS', 'Mega Blue'] },
    { brand: 'OnePlus', name: 'OnePlus 10 Pro 5G (12GB/256GB)', price: 39999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 1', 'Hasselblad Dual OIS', '80W SUPERVOOC', 'Emerald Forest'] },

    // Google Pixel (8)
    { brand: 'Google', name: 'Pixel 9 Pro XL (16GB/128GB)', price: 124999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Google Tensor G4', '6.8" Super Actua 120Hz', 'Pro Triple Camera with AI', 'Hazel'] },
    { brand: 'Google', name: 'Pixel 9 Pro XL (16GB/256GB)', price: 134999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Tensor G4', '256GB Storage', 'Gemini Advanced included', 'Obsidian'] },
    { brand: 'Google', name: 'Pixel 9 Pro (16GB/128GB)', price: 109999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Compact 6.3" Pro Form Factor', '50MP Main + 48MP Telephoto', 'Porcelain'] },
    { brand: 'Google', name: 'Pixel 9 (12GB/128GB)', price: 79999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Realme_note_60x.jpg/960px-Realme_note_60x.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Google Tensor G4', '6.3" Actua Display', 'Advanced Gemini AI', 'Peony Pink'] },
    { brand: 'Google', name: 'Pixel 8 Pro (12GB/128GB)', price: 78999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Google Tensor G3', 'Temperature Sensor', 'Best Take & Magic Editor', 'Bay Blue'] },
    { brand: 'Google', name: 'Pixel 8 (8GB/128GB)', price: 54999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/CMF_Phone_2_Pro_%28white%29_2025-05-08.jpg/960px-CMF_Phone_2_Pro_%28white%29_2025-05-08.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Tensor G3', '6.2" Actua 120Hz', 'Audio Magic Eraser', 'Rose'] },
    { brand: 'Google', name: 'Pixel 8a (8GB/128GB)', price: 47999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Tensor G3', '64MP Main Camera', '7 Years OS Updates', 'Aloe Green'] },
    { brand: 'Google', name: 'Pixel 7a (8GB/128GB)', price: 34999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Tensor G2', '64MP Dual Camera', 'Wireless Charging', 'Sea Blue'] },

    // Xiaomi & Redmi (12)
    { brand: 'Xiaomi', name: 'Xiaomi 14 Ultra 5G (16GB/512GB)', price: 99999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Leica Quad 50MP Cameras', '1-inch LYT-900 sensor', 'Snapdragon 8 Gen 3', 'Photography Kit Ready'] },
    { brand: 'Xiaomi', name: 'Xiaomi 14 5G (12GB/512GB)', price: 59999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Compact 6.36" 1.5K LTPO 120Hz', 'Leica Summilux Lens', '90W HyperCharge', 'Jade Green'] },
    { brand: 'Xiaomi', name: 'Xiaomi 13 Pro 5G (12GB/256GB)', price: 52999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['1-inch Sony IMX989', 'Leica 75mm Floating Telephoto', '120W HyperCharge'] },
    { brand: 'Xiaomi', name: 'Redmi Note 13 Pro+ 5G (12GB/512GB)', price: 33999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['200MP OIS Camera', 'Curved 1.5K 120Hz AMOLED', 'IP68 Rating', '120W Charging'] },
    { brand: 'Xiaomi', name: 'Redmi Note 13 Pro+ 5G (8GB/256GB)', price: 29999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 7200-Ultra', '200MP Ultra-clear OIS', 'Fusion Purple'] },
    { brand: 'Xiaomi', name: 'Redmi Note 13 Pro 5G (8GB/128GB)', price: 22999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7s Gen 2', '200MP Camera', '67W Turbo Charge', 'Midnight Black'] },
    { brand: 'Xiaomi', name: 'Redmi Note 13 5G (6GB/128GB)', price: 16999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['108MP 3x In-sensor Zoom', 'Super-slim Bezels 120Hz AMOLED', 'Prism Gold'] },
    { brand: 'Xiaomi', name: 'Redmi 13C 5G (4GB/128GB)', price: 9999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 6100+ 5G', '50MP AI Dual Cam', '5000mAh Battery', 'Starlight Black'] },
    { brand: 'Xiaomi', name: 'Redmi 13C 5G (8GB/256GB)', price: 13499, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['8GB RAM + 8GB Virtual', '256GB Storage', 'Star Shine Green'] },
    { brand: 'Xiaomi', name: 'Redmi 12 5G (6GB/128GB)', price: 11999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 4 Gen 2', 'Crystal Glass Back Design', 'Moonstone Silver'] },
    { brand: 'Xiaomi', name: 'Xiaomi 14 Civi (8GB/256GB)', price: 42999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8s Gen 3', 'Dual 32MP Front Cameras', 'Leica Cinematic Video', 'Matcha Green'] },
    { brand: 'Xiaomi', name: 'Xiaomi 14 Civi (12GB/512GB)', price: 47999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['12GB RAM', '512GB Storage', 'Floating Quad-curved Display', 'Cruise Blue'] },

    // Motorola (9)
    { brand: 'Motorola', name: 'Edge 50 Ultra 5G (16GB/512GB)', price: 54999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8s Gen 3', 'Real Nordic Wood Finish', '125W TurboPower + 50W Wireless', 'Pantone Validated'] },
    { brand: 'Motorola', name: 'Edge 50 Pro 5G (12GB/256GB)', price: 35999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7 Gen 3', '144Hz 1.5K pOLED Display', '125W Charging', 'Luxe Lavender'] },
    { brand: 'Motorola', name: 'Edge 50 Fusion 5G (8GB/128GB)', price: 22999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7s Gen 2', 'Sony LYT-700C OIS Sensor', 'IP68 Underwater Protection', 'Marshmallow Blue'] },
    { brand: 'Motorola', name: 'Edge 50 Fusion 5G (12GB/256GB)', price: 24999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['12GB RAM', '256GB Storage', '144Hz Curved pOLED', 'Hot Pink Vegan Suede'] },
    { brand: 'Motorola', name: 'Razr 50 Ultra 5G (12GB/512GB)', price: 94999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Industry Largest 4.0" Cover Display', 'Snapdragon 8s Gen 3', 'IPX8 Water Resistant', 'Midnight Blue'] },
    { brand: 'Motorola', name: 'Moto G85 5G (8GB/128GB)', price: 17999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Curved 120Hz 3D pOLED', 'Sony LYT-600 OIS Camera', 'Snapdragon 6s Gen 3', 'Olive Green'] },
    { brand: 'Motorola', name: 'Moto G85 5G (12GB/256GB)', price: 19999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['12GB RAM', '256GB ROM', '5000mAh Battery', 'Cobalt Blue'] },
    { brand: 'Motorola', name: 'Moto G64 5G (8GB/128GB)', price: 14999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['MediaTek Dimensity 7025', '6000mAh Battery', '50MP OIS Camera', 'Mint Green'] },
    { brand: 'Motorola', name: 'Moto G45 5G (8GB/128GB)', price: 12999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 6s Gen 3', 'Premium Vegan Leather Design', '120Hz Display', 'Brilliant Blue'] },

    // Vivo & iQOO (10)
    { brand: 'Vivo', name: 'Vivo X100 Pro 5G (16GB/512GB)', price: 89999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['ZEISS 1-inch Main Camera', 'ZEISS APO Telephoto', 'Dimensity 9300', '100W FlashCharge'] },
    { brand: 'Vivo', name: 'Vivo X100 5G (12GB/256GB)', price: 63999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['ZEISS Multifocal Portrait', 'MediaTek Dimensity 9300', '120W Dual-Cell FlashCharge', 'Asteroid Black'] },
    { brand: 'Vivo', name: 'Vivo V30 Pro 5G (12GB/512GB)', price: 46999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['ZEISS Triple 50MP Cameras', 'Studio-quality Aura Light', 'Dimensity 8200', 'Andaman Blue'] },
    { brand: 'Vivo', name: 'Vivo V40 Pro 5G (8GB/256GB)', price: 49999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['ZEISS All Main Camera System', '5500mAh Ultra-thin BlueVolt Battery', 'Ganges Blue'] },
    { brand: 'Vivo', name: 'Vivo T3 5G (8GB/128GB)', price: 19999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['MediaTek Dimensity 7200', 'Sony IMX882 OIS Sensor', '120Hz Turbo AMOLED', 'Cosmic Blue'] },
    { brand: 'iQOO', name: 'iQOO 12 5G (12GB/256GB)', price: 52999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 3', 'Supercomputing Chip Q1', '64MP Periscope Telephoto', 'Legend White'] },
    { brand: 'iQOO', name: 'iQOO 12 5G (16GB/512GB)', price: 57999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['16GB RAM', '512GB UFS 4.0', '120W FlashCharge', 'Alpha Black'] },
    { brand: 'iQOO', name: 'iQOO Neo 9 Pro 5G (8GB/128GB)', price: 34999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8 Gen 2', 'Sony IMX920 Camera', '120W FlashCharge', 'Fiery Red Dual-tone'] },
    { brand: 'iQOO', name: 'iQOO Neo 9 Pro 5G (12GB/256GB)', price: 38999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['12GB LPDDR5X', 'Supercomputing Q1 chip', 'Conqueror Black'] },
    { brand: 'iQOO', name: 'iQOO Z9 5G (8GB/128GB)', price: 19999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 7200', 'Sony IMX882 OIS', '120Hz Ultra Vision AMOLED', 'Brushed Green'] },

    // Realme & Nothing (16)
    { brand: 'Realme', name: 'Realme GT 6 5G (8GB/256GB)', price: 39999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8s Gen 3', '6000 nits Ultra Bright Display', 'Sony LYT-808 OIS', '120W Charge'] },
    { brand: 'Realme', name: 'Realme GT 6 5G (16GB/512GB)', price: 44999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['16GB LPDDR5X', '512GB Storage', 'Fluid Silver Mirror Design'] },
    { brand: 'Realme', name: 'Realme GT 6T 5G (8GB/128GB)', price: 30999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7+ Gen 3', '5500mAh 120W GaN Charging', 'Razor Green'] },
    { brand: 'Realme', name: 'Realme 12 Pro+ 5G (8GB/128GB)', price: 29999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['64MP Periscope Portrait OIS', 'Luxury Watch Design by Ollivier Saveo', 'Submarine Blue'] },
    { brand: 'Realme', name: 'Realme 12 Pro+ 5G (12GB/256GB)', price: 33999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 7s Gen 2', '120x SuperZoom', 'Navigator Beige'] },
    { brand: 'Realme', name: 'Realme 12 Pro 5G (8GB/128GB)', price: 23999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['32MP Telephoto Portrait', '120Hz Curved Vision OLED', '67W SUPERVOOC'] },
    { brand: 'Realme', name: 'Realme 13 Pro+ 5G (8GB/256GB)', price: 32999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Monet Art Inspired Glass Design', 'Dual Sony 50MP OIS AI Camera', 'Monet Gold'] },
    { brand: 'Realme', name: 'Realme Narzo 70 Pro 5G (8GB/128GB)', price: 18999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Sony IMX890 Flagship OIS Sensor', 'Air Gesture Controls', 'Glass Horizon Design'] },
    { brand: 'Realme', name: 'Realme Narzo 70x 5G (6GB/128GB)', price: 13499, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['45W SUPERVOOC Charge', '120Hz Ultra Smooth Display', 'Ice Blue'] },
    { brand: 'Realme', name: 'Realme C65 5G (6GB/128GB)', price: 11499, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 6300 5G', 'Glowing Feather Design', 'Feather Green'] },
    { brand: 'Nothing', name: 'Nothing Phone (2) (12GB/256GB)', price: 36999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Snapdragon 8+ Gen 1', 'Glyph Interface with 33 addressable zones', 'Dual 50MP Sony Sensors', 'Dark Grey'] },
    { brand: 'Nothing', name: 'Nothing Phone (2) (12GB/512GB)', price: 41999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['512GB Storage', 'Nothing OS 2.5', '4700mAh Battery', 'White'] },
    { brand: 'Nothing', name: 'Nothing Phone (2a) (8GB/128GB)', price: 23999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Custom Dimensity 7200 Pro', 'Iconic Transparent Design', 'Flexible 120Hz AMOLED', 'Black'] },
    { brand: 'Nothing', name: 'Nothing Phone (2a) (8GB/256GB)', price: 25999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Special Edition (Red/Yellow/Blue accents)', 'Dual 50MP Cameras', 'Milk White'] },
    { brand: 'Nothing', name: 'Nothing Phone (2a) Plus (8GB/256GB)', price: 27999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Dimensity 7350 Pro 5G', 'Triple 50MP Camera setup (Front & Back)', 'Metallic Grey'] },
    { brand: 'CMF by Nothing', name: 'CMF Phone 1 (6GB/128GB)', price: 15999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Modular Interchangeable Back Covers', 'MediaTek Dimensity 7300', '120Hz Super AMOLED', 'Orange'] }
  ];

  // We have 85 base models. Let's expand variations (colors, storage trims, unlocked editions) to reach 105+
  const result = [];
  phoneModels.forEach((p, idx) => {
    result.push({
      ...p,
      id: `phone-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  // Generate additional official storage/color variants to hit 105
  let variantIndex = 1;
  while (result.length < 105) {
    const base = phoneModels[variantIndex % phoneModels.length];
    const colorModifier = ['Desert Titanium', 'Midnight Blue', 'Starlight Silver', 'Forest Emerald', 'Phantom Black', 'Cosmic Violet'][variantIndex % 6];
    const storageMod = variantIndex % 2 === 0 ? 'Special Edition' : 'Enterprise Dual-SIM';
    const priceShift = (variantIndex % 3 - 1) * 2000;
    result.push({
      brand: base.brand,
      name: `${base.name} (${colorModifier}, ${storageMod})`,
      price: Math.max(10000, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${colorModifier} exclusive finish`],
      id: `phone-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-var-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 2. LAPTOPS GENERATOR (105 items)
function getLaptops() {
  const laptopModels = [
    // Apple MacBooks (16)
    { brand: 'Apple', name: 'MacBook Pro 16 M3 Max (36GB RAM, 1TB SSD)', price: 349900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Max 14-core CPU 30-core GPU', '16.2" Liquid Retina XDR', 'Up to 22h battery', 'Space Black'] },
    { brand: 'Apple', name: 'MacBook Pro 16 M3 Max (48GB RAM, 1TB SSD)', price: 399900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Max 16-core CPU 40-core GPU', '16.2" Liquid Retina XDR', 'Extreme performance for 3D/AI', 'Silver'] },
    { brand: 'Apple', name: 'MacBook Pro 16 M3 Pro (18GB RAM, 512GB SSD)', price: 249900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Pro 12-core CPU 18-core GPU', '120Hz ProMotion XDR', 'Space Black'] },
    { brand: 'Apple', name: 'MacBook Pro 16 M3 Pro (36GB RAM, 512GB SSD)', price: 289900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Pro 12-core CPU', '36GB Unified Memory', 'HDMI 2.1 & MagSafe 3', 'Space Black'] },
    { brand: 'Apple', name: 'MacBook Pro 14 M3 Pro (18GB RAM, 512GB SSD)', price: 199900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Pro 11-core CPU 14-core GPU', '14.2" Liquid Retina XDR', 'Space Black'] },
    { brand: 'Apple', name: 'MacBook Pro 14 M3 Pro (18GB RAM, 1TB SSD)', price: 239900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Pro 12-core CPU 18-core GPU', '1TB High-speed NVMe', 'Silver'] },
    { brand: 'Apple', name: 'MacBook Pro 14 M3 Max (36GB RAM, 1TB SSD)', price: 319900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['M3 Max 14-core CPU 30-core GPU', 'Studio Quality Mics', 'Space Black'] },
    { brand: 'Apple', name: 'MacBook Pro 14 M3 (8GB RAM, 512GB SSD)', price: 169900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Apple M3 chip 8-core CPU 10-core GPU', '14.2" ProMotion', 'Silver'] },
    { brand: 'Apple', name: 'MacBook Pro 14 M3 (16GB RAM, 512GB SSD)', price: 189900, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16GB Unified Memory', 'Up to 22h battery life', 'Space Grey'] },
    { brand: 'Apple', name: 'MacBook Air 15 M3 (8GB RAM, 256GB SSD)', price: 124990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.3" Liquid Retina Display', 'M3 8-core CPU 10-core GPU', 'Dual external monitor support', 'Midnight'] },
    { brand: 'Apple', name: 'MacBook Air 15 M3 (16GB RAM, 512GB SSD)', price: 164990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16GB RAM', '512GB SSD', 'Six-speaker sound system with Spatial Audio', 'Starlight'] },
    { brand: 'Apple', name: 'MacBook Air 13 M3 (8GB RAM, 256GB SSD)', price: 104990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['13.6" Liquid Retina', 'M3 chip', 'Silent fanless design', 'Midnight'] },
    { brand: 'Apple', name: 'MacBook Air 13 M3 (16GB RAM, 512GB SSD)', price: 144990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16GB RAM', '512GB Storage', 'MagSafe 3 & Two Thunderbolt ports', 'Space Grey'] },
    { brand: 'Apple', name: 'MacBook Air 13 M2 (8GB RAM, 256GB SSD)', price: 84990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Apple M2 chip', '13.6" Liquid Retina Display', '1080p FaceTime HD camera', 'Silver'] },
    { brand: 'Apple', name: 'MacBook Air 13 M2 (16GB RAM, 256GB SSD)', price: 104990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16GB Memory Upgrade', 'Backlit Magic Keyboard with Touch ID', 'Midnight'] },
    { brand: 'Apple', name: 'MacBook Air 13 M1 (8GB RAM, 256GB SSD)', price: 62990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Legendary Apple M1 chip', 'Retina display', 'All-day 18-hour battery', 'Gold'] },

    // Dell (16)
    { brand: 'Dell', name: 'XPS 16 9640 (Intel Core Ultra 7 155H, RTX 4070 8GB, 32GB RAM, 1TB SSD)', price: 289990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16.3" 4K+ OLED Touchscreen', 'Intel Core Ultra 7 155H', 'NVIDIA GeForce RTX 4070', 'Platinum'] },
    { brand: 'Dell', name: 'XPS 14 9440 (Intel Core Ultra 7 155H, RTX 4050, 16GB RAM, 512GB SSD)', price: 199990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14.5" 3.2K OLED 120Hz', 'CNC Machined Aluminum & Gorilla Glass 3', 'Graphite'] },
    { brand: 'Dell', name: 'XPS 13 9340 (Intel Core Ultra 7 155H, 16GB RAM, 512GB SSD)', price: 144990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Ultralight 1.19kg', '13.4" FHD+ 120Hz', 'Zero-lattice keyboard with capacitive touch function row'] },
    { brand: 'Dell', name: 'Alienware m18 R2 (Intel Core i9 14900HX, RTX 4090 16GB, 64GB RAM, 2TB SSD)', price: 419990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['18" QHD+ 165Hz Display', 'Cryo-tech Element 31 cooling', 'CherryMX Mechanical Keyboard', 'Dark Metallic Moon'] },
    { brand: 'Dell', name: 'Alienware m16 R2 (Intel Core Ultra 7 155H, RTX 4070 8GB, 16GB RAM, 1TB SSD)', price: 189990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" QHD+ 240Hz', 'Stealth Mode Hotkey', 'Cryo-tech Cooling', 'Dark Metallic Moon'] },
    { brand: 'Dell', name: 'Alienware x14 R2 (Intel Core i7 13620H, RTX 4060, 16GB RAM, 1TB SSD)', price: 164990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['World’s thinnest 14" gaming laptop', 'QHD+ 165Hz', 'Lunar Silver'] },
    { brand: 'Dell', name: 'G15 5530 (Intel Core i7 13650HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 99990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 165Hz', 'Alienware-inspired thermal cooling', 'Dark Shadow Gray'] },
    { brand: 'Dell', name: 'G15 5530 (Intel Core i5 13450HX, RTX 3050 6GB, 16GB RAM, 1TB SSD)', price: 72990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 120Hz', 'G-Key Game Shift technology', 'Quantum White'] },
    { brand: 'Dell', name: 'Inspiron 16 Plus 7630 (Core i7 13700H, RTX 4060, 16GB RAM, 1TB SSD)', price: 124990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" 2.5K Anti-Glare Display', 'Thunderbolt 4', 'Dark Green'] },
    { brand: 'Dell', name: 'Inspiron 15 3530 (Intel Core i5 1334U, 16GB RAM, 512GB SSD)', price: 49990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 120Hz IPS', 'Lift hinge ergonomics', 'Carbon Black'] },
    { brand: 'Dell', name: 'Inspiron 14 5430 (Intel Core i5 1335U, 16GB RAM, 512GB SSD)', price: 61990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" FHD+ 16:10 aspect ratio', 'Dolby Atmos Spatial Audio', 'Platinum Silver'] },
    { brand: 'Dell', name: 'Inspiron 14 2-in-1 7430 (Core i7 1355U, 16GB RAM, 1TB SSD)', price: 84990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['360-degree convertible hinge', 'FHD+ Touchscreen with Dell Active Pen', 'Platinum Silver'] },

    // ASUS (18)
    { brand: 'ASUS', name: 'ROG Zephyrus G16 (Intel Core Ultra 9 185H, RTX 4080 12GB, 32GB RAM, 1TB SSD)', price: 279990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['ROG Nebula OLED 2.5K 240Hz 0.2ms', 'Slash Lighting Aluminum CNC Lid', '1.85kg Thin & Light', 'Eclipse Gray'] },
    { brand: 'ASUS', name: 'ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD)', price: 209990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['3K 120Hz OLED Nebula Display', 'Slash Lighting', '1.5kg Ultraportable Gaming', 'Platinum White'] },
    { brand: 'ASUS', name: 'ROG Strix SCAR 18 (Intel Core i9 14900HX, RTX 4090 16GB, 32GB RAM, 2TB SSD)', price: 359990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['18" 2.5K Mini LED 240Hz 1100 nits', 'Tri-Fan Technology with Conductonaut Extreme liquid metal', 'Off Black'] },
    { brand: 'ASUS', name: 'ROG Strix G16 (Intel Core i7 13650HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 119990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" FHD+ 165Hz ROG Nebula', 'MUX Switch + NVIDIA Advanced Optimus', 'Volt Green'] },
    { brand: 'ASUS', name: 'TUF Gaming A15 (AMD Ryzen 7 7735HS, RTX 4060 8GB, 16GB RAM, 512GB SSD)', price: 89990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Military-grade MIL-STD-810H durability', '15.6" FHD 144Hz 100% sRGB', 'Mecha Gray'] },
    { brand: 'ASUS', name: 'TUF Gaming F15 (Intel Core i7 12700H, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 92990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['90Wh High-capacity Battery', 'FHD 144Hz G-Sync', 'Jaeger Gray'] },
    { brand: 'ASUS', name: 'Zenbook 14 OLED (Intel Core Ultra 7 155H, 16GB RAM, 1TB SSD)', price: 109990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 3K 120Hz ASUS Lumina OLED', '1.2kg All-metal slim chassis', 'Ponder Blue'] },
    { brand: 'ASUS', name: 'Zenbook Duo (Intel Core Ultra 9 185H, Dual 14" 3K 120Hz OLED, 32GB RAM, 1TB SSD)', price: 219990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Dual 14-inch OLED touchscreens', 'Detachable full-size Bluetooth keyboard & kickstand', 'Inkwell Gray'] },
    { brand: 'ASUS', name: 'Vivobook S 15 OLED (Snapdragon X Elite, 16GB RAM, 1TB SSD)', price: 124990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Copilot+ PC with 45 TOPS NPU', '15.6" 3K 120Hz OLED', 'Up to 18 hours battery', 'Cool Silver'] },
    { brand: 'ASUS', name: 'Vivobook 16X (Intel Core i5 12450H, RTX 2050 4GB, 16GB RAM, 512GB SSD)', price: 54990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" WUXGA 16:10 Display', 'Dedicated RTX Graphics for Creators', 'Indie Black'] },
    { brand: 'ASUS', name: 'Vivobook 15 (Intel Core i5 1235U, 16GB RAM, 512GB SSD)', price: 44990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD Anti-Glare', '180° lay-flat hinge', 'Quiet Blue'] },
    { brand: 'ASUS', name: 'Vivobook Go 15 (AMD Ryzen 5 7520U, 16GB RAM, 512GB SSD)', price: 39990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD Display', 'Fast Charging (60% in 49 mins)', 'Mixed Black'] },

    // Lenovo (18)
    { brand: 'Lenovo', name: 'Legion Pro 7i Gen 9 (Intel Core i9 14900HX, RTX 4080 12GB, 32GB RAM, 1TB SSD)', price: 259990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" WQXGA 240Hz 500 nits 100% DCI-P3', 'Lenovo Legion Coldfront: Vapor cooling', 'Onyx Grey'] },
    { brand: 'Lenovo', name: 'Legion Pro 5i Gen 9 (Intel Core i7 14650HX, RTX 4070 8GB, 32GB RAM, 1TB SSD)', price: 169990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" 2.5K 240Hz Display', 'AI Engine+ with LA1 AI chip', 'Eclipse Black'] },
    { brand: 'Lenovo', name: 'Legion Slim 5 (AMD Ryzen 7 7840HS, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 112990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" WQXGA 165Hz IPS', 'Slim aluminum top cover', 'Storm Grey'] },
    { brand: 'Lenovo', name: 'LOQ 15IRX9 (Intel Core i7 13650HX, RTX 4060 8GB, 16GB RAM, 512GB SSD)', price: 89990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 144Hz 100% sRGB', 'Hyperchamber thermal design', 'Luna Grey'] },
    { brand: 'Lenovo', name: 'LOQ 15IAX9 (Intel Core i5 12450HX, RTX 4050 6GB, 16GB RAM, 512GB SSD)', price: 69990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 144Hz', '105W TGP RTX Graphics', 'Luna Grey'] },
    { brand: 'Lenovo', name: 'LOQ 15IAX9 (Intel Core i5 12450HX, RTX 3050 6GB, 16GB RAM, 512GB SSD)', price: 59990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Affordable entry gaming beast', '144Hz Display with G-Sync', 'Luna Grey'] },
    { brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD)', price: 239990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K 120Hz OLED Display', 'Ultra-durable Carbon Fiber & Magnesium', 'Legendary TrackPoint & keyboard', 'Deep Black'] },
    { brand: 'Lenovo', name: 'ThinkPad T14 Gen 4 (AMD Ryzen 7 PRO 7840U, 16GB RAM, 512GB SSD)', price: 109990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['Enterprise security with AMD PRO', '14" WUXGA Low Power', 'Thunder Black'] },
    { brand: 'Lenovo', name: 'Yoga 9i 2-in-1 (Intel Core Ultra 7 155H, 16GB RAM, 1TB SSD)', price: 169990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 4K PureSight OLED Touchscreen', 'Bowers & Wilkins Rotating Soundbar', 'Cosmic Blue'] },
    { brand: 'Lenovo', name: 'Yoga Slim 7x (Snapdragon X Elite, 16GB RAM, 1TB SSD)', price: 139990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14.5" 3K 90Hz OLED 1000 nits', 'Ultra-slim 12.9mm design', 'All-day battery life'] },
    { brand: 'Lenovo', name: 'IdeaPad Slim 5 (Intel Core i5 13500H, 16GB RAM, 512GB SSD)', price: 62990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" WUXGA OLED 100% DCI-P3', 'Military Grade MIL-STD-810H', 'Cloud Grey'] },
    { brand: 'Lenovo', name: 'IdeaPad Slim 3 (Intel Core i3 1215U, 8GB RAM, 512GB SSD)', price: 34990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD Anti-Glare Display', 'Dolby Audio speakers', 'Arctic Grey'] },

    // HP (16)
    { brand: 'HP', name: 'Omen Transcend 14 (Intel Core Ultra 7 155H, RTX 4060, 16GB RAM, 1TB SSD)', price: 164990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K 120Hz OLED 0.2ms', 'World’s lightest 14" gaming laptop at 1.63kg', 'Shadow Black'] },
    { brand: 'HP', name: 'Omen 16 (Intel Core i7 14700HX, RTX 4070 8GB, 16GB RAM, 1TB SSD)', price: 149990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16.1" QHD 240Hz 3ms', 'Tempest Cooling Technology', 'Shadow Black'] },
    { brand: 'HP', name: 'Victus 16 (AMD Ryzen 7 7840HS, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 98990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16.1" FHD 165Hz IPS', 'OMEN Gaming Hub Optimization', 'Mica Silver'] },
    { brand: 'HP', name: 'Victus 15 (Intel Core i5 13420H, RTX 3050 6GB, 16GB RAM, 512GB SSD)', price: 66990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 144Hz Display', 'Dual Speakers by B&O', 'Performance Blue'] },
    { brand: 'HP', name: 'Spectre x360 14 (Intel Core Ultra 7 155H, 16GB RAM, 1TB SSD)', price: 154990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K OLED Touchscreen', '9MP AI Camera with Night Mode', 'Nightfall Black'] },
    { brand: 'HP', name: 'Envy x360 14 2-in-1 (Intel Core Ultra 5 125U, 16GB RAM, 512GB SSD)', price: 89990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K OLED Touch Display', 'Convertible 360 hinge', 'Natural Silver'] },
    { brand: 'HP', name: 'Pavilion Plus 14 (AMD Ryzen 7 7840U, 16GB RAM, 1TB SSD)', price: 77990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K 120Hz OLED Display', 'All-metal aluminum chassis', 'Moonlight Blue'] },
    { brand: 'HP', name: '15s (Intel Core i5 1235U, 16GB RAM, 512GB SSD)', price: 52990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD Micro-edge display', 'HP Fast Charge (50% in 45 mins)', 'Natural Silver'] },

    // Acer & MSI (12)
    { brand: 'Acer', name: 'Predator Helios 16 (Intel Core i9 14900HX, RTX 4080 12GB, 32GB RAM, 1TB SSD)', price: 239990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" WQXGA Mini LED 250Hz', '5th Gen AeroBlade 3D Fan liquid metal cooling', 'Abyssal Black'] },
    { brand: 'Acer', name: 'Nitro 16 (AMD Ryzen 7 7840HS, RTX 4060 8GB, 16GB RAM, 512GB SSD)', price: 94990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" WUXGA 165Hz 100% sRGB', 'Dual-fan dual-intake cooling', 'Obsidian Black'] },
    { brand: 'Acer', name: 'Nitro V 15 (Intel Core i5 13420H, RTX 4050 6GB, 16GB RAM, 512GB SSD)', price: 68990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['15.6" FHD 144Hz', 'NitroSense utility app', 'Black'] },
    { brand: 'Acer', name: 'Swift Go 14 (Intel Core Ultra 5 125H, 16GB RAM, 512GB SSD)', price: 74990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['14" 2.8K 90Hz OLED Display', '1440p QHD webcam', 'Pure Silver'] },
    { brand: 'MSI', name: 'Titan 18 HX A14V (Intel Core i9 14900HX, RTX 4090 16GB, 64GB RAM, 4TB SSD)', price: 479990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/RTX_5090_-_du%C5%BCa_wydajno%C5%9B%C4%87_du%C5%BCym_kosztem_%282160p_30fps_VP9_LQ-96kbit_AAC%29-00.00.04.100.png/960px-RTX_5090_-_du%C5%BCa_wydajno%C5%9B%C4%87_du%C5%BCym_kosztem_%282160p_30fps_VP9_LQ-96kbit_AAC%29-00.00.04.100.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['18" 4K+ 120Hz Mini LED', 'Vapor Chamber Cooler', 'Cherry MX mechanical keys', 'Core Black'] },
    { brand: 'MSI', name: 'Katana 15 (Intel Core i7 13620H, RTX 4060 8GB, 16GB RAM, 1TB SSD)', price: 94990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/VIVANT_TBS_2023.png/960px-VIVANT_TBS_2023.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['15.6" FHD 144Hz IPS', 'Cooler Boost 5 technology', 'Black'] },
    { brand: 'MSI', name: 'Thin 15 (Intel Core i5 12450H, RTX 2050 4GB, 16GB RAM, 512GB SSD)', price: 49990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Intel_-_Compute_Stick_%2817419054735%29.jpg/960px-Intel_-_Compute_Stick_%2817419054735%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['1.86kg lightweight chassis', '144Hz gaming display', 'Cosmos Gray'] },
    { brand: 'MSI', name: 'Prestige 16 AI Studio (Intel Core Ultra 7 155H, RTX 4060, 32GB RAM, 1TB SSD)', price: 169990, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', specs: ['16" 4K UHD+ OLED 100% DCI-P3', 'Magnesium-Aluminum alloy chassis', 'Stellar Gray'] }
  ];

  const result = [];
  laptopModels.forEach((p) => {
    result.push({
      ...p,
      id: `laptop-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = laptopModels[variantIndex % laptopModels.length];
    const ramTrims = ['32GB RAM / 1TB SSD Edition', '16GB RAM / 512GB SSD Upgrade', 'Creator Edition with Stylus', 'Pro Workstation Bundle', 'OLED Color-calibrated Edition'][variantIndex % 5];
    const priceShift = (variantIndex % 3 - 1) * 3500;
    result.push({
      brand: base.brand,
      name: `${base.name.split('(')[0].trim()} (${ramTrims})`,
      price: Math.max(30000, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${ramTrims}`],
      id: `laptop-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-trim-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 3. HEADPHONES & AUDIO GENERATOR (105 items)
function getHeadphones() {
  const audioModels = [
    // Sony (18)
    { brand: 'Sony', name: 'WH-1000XM5 Wireless Noise Cancelling Headphones', price: 25999, img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/DSEE_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled', specs: ['Industry-leading ANC with 8 mics', '30-hour battery life', 'LDAC High-Resolution Audio', 'Black'] },
    { brand: 'Sony', name: 'WH-1000XM5 Wireless Headphones (Silver)', price: 26499, img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/DSEE_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled', specs: ['Auto NC Optimizer', 'Multipoint Connection', 'Speak-to-Chat', 'Silver'] },
    { brand: 'Sony', name: 'WH-1000XM4 Wireless Noise Cancelling Headphones', price: 19999, img: 'https://upload.wikimedia.org/wikipedia/commons/7/79/DSEE_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled', specs: ['Dual Noise Sensor Technology', '30h battery', 'Foldable swivel design', 'Black'] },
    { brand: 'Sony', name: 'WF-1000XM5 True Wireless Earbuds', price: 20999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Dynamic Driver X', 'Dual Feedback Mics', 'Bone Conduction Sensors', 'Black'] },
    { brand: 'Sony', name: 'WH-CH720N Wireless Over-Ear Headphones', price: 7990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Integrated V1 Processor ANC', '50-hour battery', 'Lightweight 192g', 'Blue'] },
    { brand: 'Sony', name: 'WH-ULT900N ULT WEAR Wireless Bass Headphones', price: 14990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['ULT Power Sound button for massive bass', 'Noise Cancelling', 'Forest Gray'] },
    { brand: 'Sony', name: 'LinkBuds S Truly Wireless Earbuds', price: 12990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Never-off smart ambient mode', 'Ultra-small 4.8g fit', 'Earth Blue'] },
    { brand: 'Sony', name: 'MDR-7506 Professional Studio Monitor Headphones', price: 8490, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['40mm neodymium drivers', 'Closed-ear studio design', 'Rugged coiled cable'] },

    // Bose (14)
    { brand: 'Bose', name: 'QuietComfort Ultra Wireless Headphones', price: 34900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['World-class CustomTune ANC', 'Bose Immersive Audio Spatial Sound', '24h battery', 'Black'] },
    { brand: 'Bose', name: 'QuietComfort Ultra Wireless Headphones (White Smoke)', price: 34900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Immersive Audio', 'Luxurious protein leather cushions', 'White Smoke'] },
    { brand: 'Bose', name: 'QuietComfort Wireless Headphones', price: 26900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Legendary noise cancellation', 'Quiet and Aware Modes', 'Chilled Lilac'] },
    { brand: 'Bose', name: 'QuietComfort Ultra True Wireless Earbuds', price: 23900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Spatial audio in an earbud', 'CustomTune acoustic calibration', 'Black'] },
    { brand: 'Bose', name: 'SoundLink Max Portable Bluetooth Speaker', price: 32900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Deep room-filling stereo sound', 'IP67 waterproof', '20-hour battery'] },
    { brand: 'Bose', name: 'SoundLink Flex Bluetooth Speaker (2nd Gen)', price: 14900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['PositionIQ technology', 'Rugged outdoor silicone body', 'Alpine Blue'] },

    // Apple (10)
    { brand: 'Apple', name: 'AirPods Max (USB-C) Space Orange', price: 59900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Apple-designed dynamic driver', 'Pro-level Active Noise Cancellation', 'USB-C Charging', 'Orange'] },
    { brand: 'Apple', name: 'AirPods Max (USB-C) Midnight', price: 59900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Computational audio H1 chip', 'Personalized Spatial Audio', 'Midnight'] },
    { brand: 'Apple', name: 'AirPods Max (USB-C) Starlight', price: 59900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Knit-mesh canopy and memory foam cushions', 'Digital Crown control', 'Starlight'] },
    { brand: 'Apple', name: 'AirPods Pro (2nd Gen) with MagSafe Case (USB-C)', price: 21900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['H2 Chip with Adaptive Audio', 'Loud Sound Reduction', 'Precision Finding speaker'] },
    { brand: 'Apple', name: 'AirPods 4 with Active Noise Cancellation', price: 16900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['First open-ear AirPods with ANC', 'H2 Chip', 'Wireless charging case with speaker'] },
    { brand: 'Apple', name: 'AirPods 4 Standard Edition', price: 12900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['All-new refined acoustic architecture', 'Personalized Spatial Audio', 'USB-C case'] },

    // Sennheiser (12)
    { brand: 'Sennheiser', name: 'Momentum 4 Wireless Noise Cancelling Headphones', price: 24990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Incredible 60-hour battery life', 'Audiophile-inspired 42mm sound system', 'Denim Edition'] },
    { brand: 'Sennheiser', name: 'Accentum Plus Wireless Headphones', price: 14990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Hybrid ANC with touch gestures', '50-hour playback', 'Quick charge 10m for 5h', 'White'] },
    { brand: 'Sennheiser', name: 'HD 660S2 Audiophile Open-Back Headphones', price: 44990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Sub-bass precision tuning', 'Aluminum voice coils', '300-ohm audiophile impedance'] },
    { brand: 'Sennheiser', name: 'HD 560S Reference Audio Headphones', price: 13990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Linear acoustic tuning for mixing', 'Angled transducer design', 'Open ear cups'] },

    // JBL (14)
    { brand: 'JBL', name: 'Tour ONE M2 Wireless Noise Cancelling Headphones', price: 17999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['True Adaptive Noise Cancelling', 'Hi-Res Certified with 40mm drivers', 'Champagne'] },
    { brand: 'JBL', name: 'Live 770NC Wireless Over-Ear ANC Headphones', price: 11999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['JBL Signature Sound with Personi-Fi 2.0', 'Up to 65h battery', 'Blue'] },
    { brand: 'JBL', name: 'Tune 770NC Wireless Over-Ear Headphones', price: 5499, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Adaptive Noise Cancelling with Smart Ambient', '70h battery life', 'Black'] },
    { brand: 'JBL', name: 'Tune 520BT Wireless On-Ear Headphones', price: 3499, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Pure Bass Sound', 'Bluetooth 5.3', '57 hours battery', 'White'] },
    { brand: 'JBL', name: 'Boombox 3 Wi-Fi & Bluetooth Speaker', price: 39999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Monstrous sound and deepest bass', '24 hours play time', 'Dolby Atmos over Wi-Fi'] },

    // Audio-Technica, Marshall, Beats, Beyerdynamic (18)
    { brand: 'Audio-Technica', name: 'ATH-M50x Professional Studio Monitor Headphones', price: 12999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Critically acclaimed sonic performance', '45mm large-aperture drivers', '90° swiveling earcups'] },
    { brand: 'Audio-Technica', name: 'ATH-M50xBT2 Wireless Over-Ear Headphones', price: 17499, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['AK4331 advanced audio DAC', 'LDAC codec support', 'Dual mics with beamforming'] },
    { brand: 'Marshall', name: 'Major IV Wireless On-Ear Headphones', price: 11999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['80+ solid hours of wireless playtime', 'Multi-directional control knob', 'Iconic Marshall styling', 'Brown'] },
    { brand: 'Marshall', name: 'Monitor II A.N.C. Wireless Headphones', price: 21999, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Custom tuned 40mm drivers', 'Active Noise Cancelling', '30h playtime with ANC', 'Black'] },
    { brand: 'Beats', name: 'Studio Pro Wireless Headphones', price: 29900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Lossless audio via USB-C', 'Fully adaptive ANC & Transparency', 'Sandstone'] },
    { brand: 'Beats', name: 'Solo 4 Wireless On-Ear Headphones', price: 19900, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['UltraPlush cushions', 'Up to 50 hours of battery', 'Matte Black'] },
    { brand: 'Beyerdynamic', name: 'DT 990 Pro Over-Ear Studio Headphones 250 Ohm', price: 13990, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Open diffuse-field studio headphone', 'Made in Germany', 'Velour ear pads'] },
    { brand: 'Beyerdynamic', name: 'DT 770 Pro Closed Studio Headphones 80 Ohm', price: 12490, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', specs: ['Exceptional sound isolation', 'Detailed bass reproduction', 'Silver velour pads'] }
  ];

  const result = [];
  audioModels.forEach((p) => {
    result.push({
      ...p,
      id: `audio-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = audioModels[variantIndex % audioModels.length];
    const color = ['Matte Black', 'Glacier Silver', 'Midnight Navy', 'Smoky White', 'Champagne Gold', 'Olive Green'][variantIndex % 6];
    const edition = variantIndex % 2 === 0 ? 'Travel Pack Edition' : 'Audiophile Edition';
    result.push({
      brand: base.brand,
      name: `${base.name} (${color}, ${edition})`,
      price: Math.max(2500, base.price + ((variantIndex % 3 - 1) * 800)),
      img: base.img,
      specs: [...base.specs, `${color} with custom carrying case`],
      id: `audio-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-ver-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 4. SMARTWATCHES GENERATOR (105 items)
function getSmartwatches() {
  const watchModels = [
    // Apple Watch (18)
    { brand: 'Apple', name: 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium', price: 89900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['49mm aerospace titanium case', 'Precision dual-frequency GPS', '3000 nits brightest display', '100m water resistance'] },
    { brand: 'Apple', name: 'Apple Watch Ultra 2 with Black Titanium Milanese Loop', price: 104900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['S9 SiP chip', 'Double tap gesture', 'Up to 72 hours low power mode'] },
    { brand: 'Apple', name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum', price: 44900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['S9 SiP', 'Double tap gesture', '2000 nits Always-On Retina', 'ECG & Blood Oxygen'] },
    { brand: 'Apple', name: 'Apple Watch Series 9 GPS + Cellular 45mm Stainless Steel', price: 74900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Sapphire front crystal', 'Graphite Stainless Steel', 'Cellular standalone calling'] },
    { brand: 'Apple', name: 'Apple Watch Series 9 GPS 41mm Starlight', price: 41900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Crash Detection', 'Cycle tracking with temp sensing', 'Starlight Sport Band'] },
    { brand: 'Apple', name: 'Apple Watch Series 9 GPS 45mm (PRODUCT)RED', price: 44900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Aluminum Case with Sport Band', 'Fast Charging support', 'watchOS 10'] },
    { brand: 'Apple', name: 'Apple Watch SE (2nd Gen) GPS 44mm Midnight', price: 28900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['S8 SiP chip', 'Heart rate notifications', '50m water resistant swimproof'] },
    { brand: 'Apple', name: 'Apple Watch SE (2nd Gen) GPS 40mm Starlight', price: 25900, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Fall detection', 'Emergency SOS', 'Retina display up to 1000 nits'] },

    // Samsung Galaxy Watches (18)
    { brand: 'Samsung', name: 'Galaxy Watch Ultra 47mm LTE Titanium Gray', price: 59999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Grade 4 Titanium with Cushion Design', '3nm Exynos W1000 processor', '10 ATM + IP68 water resistance', 'Dual-frequency GPS'] },
    { brand: 'Samsung', name: 'Galaxy Watch Ultra 47mm LTE Titanium White', price: 59999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['100-hour battery life', 'Emergency Siren up to 86dB', 'Titanium White'] },
    { brand: 'Samsung', name: 'Galaxy Watch 7 44mm Bluetooth Green', price: 32999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['BioActive Sensor with AGEs Index', 'Energy Score with Galaxy AI', 'Sapphire Crystal Glass'] },
    { brand: 'Samsung', name: 'Galaxy Watch 7 44mm LTE Silver', price: 36999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['4G LTE Connectivity', 'Super AMOLED Always On', 'Advanced Sleep Apnea tracking'] },
    { brand: 'Samsung', name: 'Galaxy Watch 7 40mm Bluetooth Cream', price: 29999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Compact 40mm armor aluminum', 'Personalized HR zones', 'Cream'] },
    { brand: 'Samsung', name: 'Galaxy Watch 6 Classic 47mm BT Black', price: 27999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Physical rotating bezel', 'Body Composition analysis (BIA)', 'Sapphire crystal'] },
    { brand: 'Samsung', name: 'Galaxy Watch 6 Classic 43mm Silver', price: 24999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Stainless Steel body', 'ECG and BP monitoring', 'Silver'] },
    { brand: 'Samsung', name: 'Galaxy Watch 6 44mm Graphite', price: 19999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Slimmer bezel larger screen', 'One-click band mechanism', 'Graphite'] },
    { brand: 'Samsung', name: 'Galaxy Watch 4 44mm Bluetooth', price: 9999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Wear OS Powered by Samsung', 'Google Maps & Play Store on wrist'] },

    // Garmin (18)
    { brand: 'Garmin', name: 'Epix Pro (Gen 2) 51mm Sapphire Edition Titanium', price: 111990, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['1.4" Stunning AMOLED display', 'Built-in LED flashlight', 'Up to 31 days battery life in smartwatch mode', 'TopoActive multi-continent maps'] },
    { brand: 'Garmin', name: 'Fenix 7 Pro Solar Sapphire Edition 47mm', price: 99990, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Power Sapphire solar charging lens', 'Endurance score & Hill score', 'Carbon Gray DLC Titanium'] },
    { brand: 'Garmin', name: 'Forerunner 965 Premium GPS Running Watch', price: 67490, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['1.4" Brilliant AMOLED touch display', 'Titanium bezel', 'Full-color built-in mapping', 'Amp Yellow / Black'] },
    { brand: 'Garmin', name: 'Forerunner 265 GPS Running Smartwatch 46mm', price: 50490, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Vibrant AMOLED display', 'Training readiness metric', 'Black and Powder Gray'] },
    { brand: 'Garmin', name: 'Venu 3 GPS Smartwatch Slate Stainless Steel', price: 47990, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Wheelchair mode', 'Nap detection and sleep coaching', 'Speaker and microphone for wrist calls'] },
    { brand: 'Garmin', name: 'Instinct 2X Solar Rugged GPS Watch 50mm', price: 45990, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Infinite battery with solar power in smartwatch mode', 'Multi-band GNSS support', 'Flame Red'] },

    // Google, OnePlus & Amazfit (16)
    { brand: 'Google', name: 'Pixel Watch 3 45mm Matte Black with Obsidian Active Band', price: 43999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Actua 2000 nits display', 'Deep Fitbit integration with Loss of Pulse Detection', '24h battery'] },
    { brand: 'Google', name: 'Pixel Watch 3 41mm Polished Silver with Porcelain Band', price: 39999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['40% larger screen area', 'Personalized cardio load insights', 'Fast charging'] },
    { brand: 'Google', name: 'Pixel Watch 2 Matte Black Aluminum Case', price: 29999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Multi-path cEDA stress sensor', 'Skin temperature monitoring', 'Obsidian'] },
    { brand: 'OnePlus', name: 'OnePlus Watch 2 (Qualcomm Snapdragon W5 + BES2700)', price: 21999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Dual-Engine Architecture for 100-hour battery', 'Stainless steel chassis with sapphire crystal', 'Black Steel'] },
    { brand: 'OnePlus', name: 'OnePlus Watch 2R Forest Green', price: 17999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Wear OS 4 by Google', 'Lightweight matte aluminum alloy body', 'Forest Green'] },
    { brand: 'Amazfit', name: 'Balance Smartwatch with AI Sleep & Fitness Coach', price: 21999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['1.5" HD AMOLED 1500 nits', 'Body Composition measurement', 'Dual-band circularly-polarized GPS antenna'] },
    { brand: 'Amazfit', name: 'Cheetah Pro Premium GPS Running Watch', price: 24999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['MaxTrack industry-leading GPS technology', 'Titanium alloy bezel with nylon strap'] },
    { brand: 'Amazfit', name: 'T-Rex 2 Rugged Outdoor Watch 15 Military Certifications', price: 14999, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', specs: ['Ultra-low temperature operation (-30°C)', '100m waterproof', 'Ember Black'] }
  ];

  const result = [];
  watchModels.forEach((p) => {
    result.push({
      ...p,
      id: `watch-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = watchModels[variantIndex % watchModels.length];
    const strap = ['Sport Loop Band', 'Alpine Trail Loop', 'Leather Link Edition', 'Titanium Bracelet Edition', 'Ocean Diver Strap', 'Silicone Rugged Strap'][variantIndex % 6];
    const priceShift = (variantIndex % 3 - 1) * 1200;
    result.push({
      brand: base.brand,
      name: `${base.name} (${strap})`,
      price: Math.max(8999, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${strap} included`],
      id: `watch-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-strap-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 5. MONITORS GENERATOR (105 items)
function getMonitors() {
  const monitorModels = [
    // LG (18)
    { brand: 'LG', name: 'UltraGear 27GR95QE-B 27" QHD OLED 240Hz Gaming Monitor', price: 68999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['27" QHD 2560x1440 OLED', '0.03ms (GtG) response time', '240Hz refresh rate', 'Anti-glare low reflection'] },
    { brand: 'LG', name: 'UltraGear 34GS95QE 34" 800R Curved OLED 240Hz Ultrawide', price: 104999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['34" WQHD (3440 x 1440) OLED', '800R aggressive curvature', 'VESA DisplayHDR True Black 400'] },
    { brand: 'LG', name: 'UltraGear 45GR95QE-B 45" Curved OLED 240Hz Ultrawide', price: 139999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Massive 45" 21:9 WQHD OLED', '800R curve', 'HDMI 2.1 support for consoles'] },
    { brand: 'LG', name: 'UltraGear 32GS95UE 32" Dual-Mode OLED (4K 240Hz / FHD 480Hz)', price: 129999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Dual-Mode Instant Switch (4K 240Hz or FHD 480Hz)', 'Pixel Sound Technology built into screen'] },
    { brand: 'LG', name: 'UltraGear 27GP850-B 27" QHD Nano IPS 165Hz (O/C 180Hz)', price: 29999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Nano IPS 1ms GtG', 'NVIDIA G-SYNC Compatible', 'HDR400'] },
    { brand: 'LG', name: 'UltraFine 32UN880-B 32" 4K UHD Ergo IPS Monitor', price: 46999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Ergo Stand (extend/retract/swivel/pivot/height/tilt)', 'USB-C 60W Power Delivery', 'DCI-P3 95%'] },
    { brand: 'LG', name: 'DualUp 28MQ780-B 28" 16:18 SDQHD Ergo Monitor', price: 49999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Unique 16:18 aspect ratio (stacked dual 21.5" displays in one)', 'Nano IPS', 'Built-in KVM'] },
    { brand: 'LG', name: '27UL500-W 27" 4K UHD IPS Monitor with HDR10', price: 22999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['3840 x 2160 IPS Panel', 'AMD FreeSync', 'sRGB 98% Color Gamut'] },

    // Samsung (18)
    { brand: 'Samsung', name: 'Odyssey OLED G9 49" Curved Dual QHD 240Hz Gaming Monitor', price: 129999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['49" 32:9 Super Ultrawide (5120 x 1440)', '0.03ms response time', 'Neo Quantum Processor Pro', 'CoreSync RGB'] },
    { brand: 'Samsung', name: 'Odyssey OLED G8 32" 4K UHD 240Hz Gaming Monitor (G80SD)', price: 99999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['4K UHD QD-OLED', 'NQ8 AI Gen3 Processor', 'OLED Safeguard+ cooling system', 'Samsung Smart TV built-in'] },
    { brand: 'Samsung', name: 'Odyssey Neo G8 32" 4K UHD 240Hz 1000R Curved Quantum Mini-LED', price: 82999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Quantum Mini-LED Quantum HDR 2000', '1000R Curvature', '240Hz 1ms'] },
    { brand: 'Samsung', name: 'Odyssey G7 28" 4K UHD 144Hz IPS Gaming Monitor (G70B)', price: 44999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['UHD 3840x2160 IPS', 'HDMI 2.1 4K 120Hz for PS5/Xbox', 'Smart Gaming Hub'] },
    { brand: 'Samsung', name: 'Odyssey G5 27" QHD 165Hz 1000R Curved Gaming Monitor', price: 19999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['2560 x 1440 QHD Resolution', '1000R Curved screen matches human field of view', '1ms MPRT'] },
    { brand: 'Samsung', name: 'Smart Monitor M8 32" 4K UHD with SlimFit Magnetic Camera', price: 42999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['All-in-one Smart TV apps & Office 365', 'IoT Hub with SmartThings', 'Warm White'] },
    { brand: 'Samsung', name: 'ViewFinity S9 27" 5K Studio Display with Matte Screen', price: 99990, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['5K Resolution (5120 x 2880) 218 PPI', '99% DCI-P3 Color Accuracy', 'Thunderbolt 4 90W charging'] },

    // Dell & Alienware (16)
    { brand: 'Dell', name: 'Alienware AW3423DWF 34" Curved QD-OLED 165Hz Gaming Monitor', price: 84999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Quantum Dot OLED panel', 'Infinite contrast ratio with True Black 400', '1800R curve', 'Dark Side of the Moon'] },
    { brand: 'Dell', name: 'Alienware AW3225QF 32" 4K QD-OLED 240Hz Curved Gaming Monitor', price: 99999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['World’s first 4K QD-OLED gaming monitor', '1700R curvature', 'Dolby Vision HDR', 'eARC support'] },
    { brand: 'Dell', name: 'Alienware AW2725DF 27" 360Hz QD-OLED QHD Esports Monitor', price: 74999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Insane 360Hz refresh rate', '0.03ms response time', '0.03ms GtG esports perfection'] },
    { brand: 'Dell', name: 'UltraSharp U2724D 27" QHD IPS Black 120Hz Monitor', price: 34999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['IPS Black technology with 2000:1 contrast ratio', '120Hz smooth refresh rate', 'Ambient Light Sensor'] },
    { brand: 'Dell', name: 'UltraSharp U3224KB 32" 6K UHD IPS Black Monitor with 4K Webcam', price: 199999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['6K Resolution (6144 x 3456)', 'Built-in 4K dual gain HDR webcam', 'Thunderbolt 4 140W hub'] },
    { brand: 'Dell', name: 'S2722QC 27" 4K UHD USB-C Lifestyle Monitor', price: 29999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['4K UHD 3840x2160 IPS', 'USB-C single cable solution (65W)', 'Platinum Silver textured back'] },

    // ASUS, BenQ & Gigabyte (16)
    { brand: 'ASUS', name: 'ROG Swift OLED PG32UCDM 32" 4K 240Hz QD-OLED Gaming Monitor', price: 124999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['3rd Gen QD-OLED with custom heatsink and graphene film', 'Uniform Brightness setting', 'Type-C 90W'] },
    { brand: 'ASUS', name: 'ROG Swift PG27AQDM 27" QHD 240Hz OLED Gaming Monitor', price: 82999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['OLED Anti-glare micro-texture coating', 'Intelligent voltage optimization', 'Aura Sync RGB'] },
    { brand: 'ASUS', name: 'TUF Gaming VG27AQ 27" QHD 165Hz IPS Gaming Monitor', price: 23999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['ELMB Sync (Extreme Low Motion Blur and Adaptive Sync simultaneously)', 'HDR10', 'Ergonomic Stand'] },
    { brand: 'BenQ', name: 'PD3205U 32" 4K UHD Designer Monitor with USB-C', price: 54990, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['AQCOLOR Technology factory calibrated 99% sRGB/Rec.709', 'Hotkey Puck G2', 'DualView mode'] },
    { brand: 'BenQ', name: 'ZOWIE XL2546K 24.5" 240Hz Esports Gaming Monitor', price: 39990, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['DyAc+ Technology eliminates motion blur in FPS tournaments', 'Shield hood included', 'Black eQualizer'] },
    { brand: 'Gigabyte', name: 'M27Q 27" 170Hz 1440P KVM Gaming Monitor', price: 21999, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', specs: ['Built-in hardware KVM button', '0.5ms SuperSpeed IPS', '92% DCI-P3'] }
  ];

  const result = [];
  monitorModels.forEach((p) => {
    result.push({
      ...p,
      id: `monitor-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = monitorModels[variantIndex % monitorModels.length];
    const standOptions = ['Ergonomic Arm Mount Included', 'Factory Calibrated Color Profile', 'Dual HDMI 2.1 Console Pack', 'Anti-Glare Pro Shield Edition', 'Zero-Dead-Pixel Guarantee Edition'][variantIndex % 5];
    const priceShift = (variantIndex % 3 - 1) * 1500;
    result.push({
      brand: base.brand,
      name: `${base.name} (${standOptions})`,
      price: Math.max(12000, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, standOptions],
      id: `monitor-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-pack-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 6. GAMING GENERATOR (105 items)
function getGaming() {
  const gamingModels = [
    // Consoles & Handhelds (14)
    { brand: 'Sony', name: 'PlayStation 5 Slim Console (Disc Edition) 1TB', price: 54990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['1TB Ultra-high speed SSD', 'Ray tracing 4K 120Hz output', 'Tempest 3D AudioTech', 'DualSense wireless controller included'] },
    { brand: 'Sony', name: 'PlayStation 5 Slim Digital Edition 1TB', price: 44990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['All-digital disc-free slim chassis', '1TB Custom NVMe SSD', 'Haptic feedback & adaptive triggers'] },
    { brand: 'Sony', name: 'PlayStation Portal Remote Player for PS5 Console', price: 18990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/PlayStation_Portal.jpg/960px-PlayStation_Portal.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['8" 1080p 60fps LCD Screen', 'Stream games from your PS5 over Wi-Fi', 'Full DualSense haptics'] },
    { brand: 'Microsoft', name: 'Xbox Series X 1TB Console', price: 52990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Xbox_Series_X_S_color.svg/960px-Xbox_Series_X_S_color.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['12 Teraflops GPU processing power', 'True 4K Gaming up to 120 FPS', 'Quick Resume between multiple games'] },
    { brand: 'Microsoft', name: 'Xbox Series S 512GB All-Digital Console', price: 32990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Xbox_Series_X_S_color.svg/960px-Xbox_Series_X_S_color.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Next-gen speed and performance at an accessible price', '1440p up to 120 FPS', 'Robot White'] },
    { brand: 'Nintendo', name: 'Nintendo Switch OLED Model White Set', price: 29999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Nintendo_Switch_logo.svg/960px-Nintendo_Switch_logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['7-inch Vibrant OLED Screen', 'Wide adjustable tabletop kickstand', 'Wired LAN port in dock', '64GB storage'] },
    { brand: 'Nintendo', name: 'Nintendo Switch OLED Mario Red Edition', price: 31999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Nintendo_Switch_logo.svg/960px-Nintendo_Switch_logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Signature Mario Red console, dock & Joy-Con', 'Hidden coin silhouette easter egg'] },
    { brand: 'Valve', name: 'Steam Deck OLED 512GB Handheld Gaming PC', price: 56999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Steam_Deck_%28front%29.png/960px-Steam_Deck_%28front%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['7.4" 90Hz HDR OLED (1000 nits)', '6nm AMD APU', 'Wi-Fi 6E', 'Up to 12 hours battery'] },
    { brand: 'Valve', name: 'Steam Deck OLED 1TB with Anti-Glare Etched Glass', price: 68999, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Steam_Deck_%28front%29.png/960px-Steam_Deck_%28front%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Premium anti-glare glass', '1TB High-speed NVMe', 'Exclusive carrying case and liner'] },
    { brand: 'ASUS', name: 'ROG Ally X Handheld Gaming Console (AMD Z1 Extreme, 24GB RAM, 1TB SSD)', price: 89990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/ROG_Xbox_Ally.png/960px-ROG_Xbox_Ally.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Huge 80Wh Battery', '24GB LPDDR5X RAM', 'Full-size M.2 2280 1TB SSD', '120Hz FreeSync Premium Display'] },
    { brand: 'Lenovo', name: 'Legion Go 8.8" QHD Handheld (AMD Z1 Extreme, 16GB RAM, 512GB SSD)', price: 69990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Lenovo_Legion_Go.jpg/960px-Lenovo_Legion_Go.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['8.8" QHD+ 144Hz 16:10 Display', 'Detachable Legion TrueStrike controllers with FPS mouse mode'] },

    // Graphics Cards (16)
    { brand: 'ZOTAC', name: 'Gaming GeForce RTX 4090 Trinity OC White Edition 24GB', price: 184990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png/960px-NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['24GB GDDR6X 384-bit', 'IceStorm 3.0 Advanced Cooling', 'SPECTRA 2.0 RGB Lighting', 'Spectacular 4K ray tracing'] },
    { brand: 'ASUS', name: 'ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X', price: 219990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/ASUSTeK_Computer_headquarters_20150711.jpg/960px-ASUSTeK_Computer_headquarters_20150711.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Patented milled vapor chamber', 'Axial-tech fans scaled up for 23% more airflow', 'Diecast metal frame'] },
    { brand: 'ZOTAC', name: 'Gaming GeForce RTX 4080 Super Trinity Black Edition 16GB', price: 99990, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png/960px-NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['16GB GDDR6X 256-bit', 'DLSS 3 Frame Generation', 'IceStorm 3.0 cooling'] },
    { brand: 'MSI', name: 'GeForce RTX 4070 Ti Super 16G Gaming X Slim White', price: 87990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['TRI FROZR 3 Thermal Design', 'TORX Fan 5.0', 'Airflow Control heatsink'] },
    { brand: 'ASUS', name: 'Dual GeForce RTX 4070 Super EVO OC Edition 12GB GDDR6X', price: 63990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Two proven Axial-tech fans', '2.56-slot compact design', '0dB technology'] },
    { brand: 'ZOTAC', name: 'Gaming GeForce RTX 4060 8GB Twin Edge OC', price: 28490, img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png/960px-NVIDIA_Titan_RTX_%28%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan%29_001.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail', specs: ['Compact size 2-slot fit', 'Freeze Fan Stop', 'DLSS 3 AI Acceleration'] },
    { brand: 'MSI', name: 'GeForce RTX 4060 Ventus 2X Black 8G OC', price: 28990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Dual fan design with TORX Fan 4.0', 'Reinforcing backplate', 'Extreme performance'] },
    { brand: 'Sapphire', name: 'Pulse AMD Radeon RX 7800 XT Gaming 16GB GDDR6', price: 51990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['RDNA 3 architecture', 'Dual-X Cooling Technology', 'Fuse Protection & Intelligent Fan Control'] },

    // Peripherals, Controllers & Mice (20)
    { brand: 'Sony', name: 'DualSense Edge Wireless Controller for PS5', price: 18990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Replaceable stick modules', 'Mappable back buttons', 'Adjustable trigger travel stops', 'Braided cable with lockable housing'] },
    { brand: 'Microsoft', name: 'Xbox Elite Wireless Controller Series 2', price: 15990, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Adjustable-tension thumbsticks', 'Wrap-around rubberized grip', 'Up to 40 hours of rechargeable battery'] },
    { brand: 'Logitech', name: 'G PRO X SUPERLIGHT 2 Wireless Gaming Mouse (White)', price: 14995, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Ultralight 60 grams weight', 'HERO 2 32,000 DPI Sensor', 'LIGHTFORCE Hybrid Optical-Mechanical Switches', '4000Hz polling rate'] },
    { brand: 'Logitech', name: 'G502 X PLUS Wireless RGB Gaming Mouse', price: 12995, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['LIGHTSPEED wireless', 'LIGHTSYNC full-spectrum 8-LED lighting', 'Dual-mode hyperfast scroll wheel'] },
    { brand: 'Razer', name: 'DeathAdder V3 Pro Wireless Gaming Mouse', price: 13999, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['63g Ultra-lightweight ergonomic shape', 'Focus Pro 30K Optical Sensor', 'Optical Mouse Switches Gen-3'] },
    { brand: 'Razer', name: 'Viper V3 Pro Wireless Esports Gaming Mouse', price: 15499, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['True 8000Hz wireless polling rate', '54g Featherlight balanced chassis', '95h battery life'] },
    { brand: 'SteelSeries', name: 'Apex Pro TKL Wireless Mechanical Gaming Keyboard', price: 23999, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['OmniPoint 2.0 Adjustable HyperMagnetic Switches (0.1mm - 4.0mm)', 'Rapid Trigger feature', 'OLED Smart Display'] },
    { brand: 'Razer', name: 'Huntsman V3 Pro TKL Esports Optical Gaming Keyboard', price: 21999, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Analog Optical Switches Gen-2', 'Rapid Trigger mode with adjustable actuation', 'Multi-function digital dial'] },
    { brand: 'SteelSeries', name: 'Arctis Nova Pro Wireless Multi-System Gaming Headset', price: 34999, img: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', specs: ['Infinity Power System with 2 hot-swappable batteries', 'Active Noise Cancellation', 'GameDAC Gen 2 Base Station'] }
  ];

  const result = [];
  gamingModels.forEach((p) => {
    result.push({
      ...p,
      id: `gaming-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = gamingModels[variantIndex % gamingModels.length];
    const bundle = ['RGB Battlestation Bundle', 'Competitive Tournament Edition', 'Streamer Pro Kit with Mat', 'Limited Stealth Edition', 'Overclocked Performance Pack'][variantIndex % 5];
    const priceShift = (variantIndex % 3 - 1) * 1200;
    result.push({
      brand: base.brand,
      name: `${base.name} (${bundle})`,
      price: Math.max(3999, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${bundle}`],
      id: `gaming-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bndl-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 7. CAMERAS GENERATOR (105 items)
function getCameras() {
  const cameraModels = [
    // Sony (18)
    { brand: 'Sony', name: 'Alpha 7 IV Full-Frame Mirrorless Camera (Body Only)', price: 209990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['33MP Full-Frame Exmor R CMOS Sensor', 'BIONZ XR image processing engine', '4K 60p 10-bit 4:2:2 recording', 'S-Cinetone color profile'] },
    { brand: 'Sony', name: 'Alpha 7 IV with 28-70mm Zoom Lens Kit', price: 224990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Versatile 28-70mm OSS Kit Lens', 'Real-time Eye AF for humans/animals/birds', 'Variable angle LCD'] },
    { brand: 'Sony', name: 'Alpha 7R V High-Resolution Full-Frame Camera', price: 349990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['61MP Full-Frame Exmor R Sensor', 'Dedicated AI processing unit for subject recognition', '8K 24p & 4K 60p video', '8-stop in-body stabilization'] },
    { brand: 'Sony', name: 'Alpha 7C II Compact Full-Frame Mirrorless Camera', price: 189990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Compact 514g body', '33MP Full-frame sensor with AI tracking', 'Silver/Black two-tone'] },
    { brand: 'Sony', name: 'FX3 Cinema Line Full-Frame Camera', price: 379990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['12.1MP Full-Frame sensor optimized for low light (ISO 409600)', 'Internal cooling fan for unlimited 4K 120p recording', 'XLR handle included'] },
    { brand: 'Sony', name: 'ZV-E1 Full-Frame Vlogging Camera', price: 199990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['AI-based Auto Framing for creators', 'Full-Frame 4K 60p/120p', 'Directional 3-capsule mic with windscreen'] },
    { brand: 'Sony', name: 'Alpha 6700 APS-C Flagship Mirrorless Camera', price: 129990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['26MP BSI APS-C Sensor', 'AI subject detection', '4K 120p video from 6K oversampling'] },
    { brand: 'Sony', name: 'ZV-1 II Pocket Vlogging Camera with 18-50mm Wide Lens', price: 69990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['1-inch Exmor RS sensor', 'Wide 18-50mm zoom lens', 'Product Showcase setting & Bokeh switch'] },

    // Canon (18)
    { brand: 'Canon', name: 'EOS R5 Mark II Full-Frame Mirrorless Camera Body', price: 399995, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['45MP Back-Illuminated Stacked CMOS', 'Accelerated Capture with DIGIC Accelerator', '8K 60p RAW video', 'Eye Control AF'] },
    { brand: 'Canon', name: 'EOS R6 Mark II Full-Frame Mirrorless Camera Body', price: 215995, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['24.2MP CMOS sensor', '40 fps electronic shutter burst shooting', '6K oversampled uncropped 4K 60p', 'Dual Pixel CMOS AF II'] },
    { brand: 'Canon', name: 'EOS R8 Full-Frame Mirrorless Camera with 24-50mm Lens', price: 139995, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Lightweight 461g full-frame body', '24.2MP sensor', 'Uncropped 4K 60p video', 'Canon Log 3'] },
    { brand: 'Canon', name: 'EOS R50 APS-C Mirrorless Content Creator Kit', price: 68995, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['24.2MP APS-C sensor', 'Tripod Grip HG-100TBR & Stereo Mic DM-E100', '6K oversampled 4K 30p'] },
    { brand: 'Canon', name: 'EOS R10 with RF-S 18-150mm IS STM Lens', price: 104995, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['High-speed 23 fps burst shooting', '24.2MP APS-C', 'Versatile all-in-one travel zoom lens'] },

    // Nikon (14)
    { brand: 'Nikon', name: 'Z8 Full-Frame Professional Mirrorless Camera Body', price: 329990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['45.7MP Stacked BSI CMOS', 'Baby Z9 flagship power in a 30% smaller body', '8.3K 60p N-RAW & 4K 120p', 'Real-Life blackout-free EVF'] },
    { brand: 'Nikon', name: 'Z6 III Full-Frame Mirrorless Camera with 24-70mm f/4 S Lens', price: 279990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['World’s first partially-stacked CMOS sensor', 'Brightest 4000-nit EVF in its class', '6K 60p N-RAW video'] },
    { brand: 'Nikon', name: 'Zf Vintage Design Full-Frame Mirrorless Camera (Black)', price: 179990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Iconic brass mechanical dials & magnesium body', 'EXPEED 7 processor', 'Pixel-Shift 96MP shooting mode', 'Dedicated B&W monochrome lever'] },
    { brand: 'Nikon', name: 'Z50 APS-C Mirrorless with Dual Lens Kit (16-50mm + 50-250mm)', price: 89990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['20.9MP DX-format sensor', '11 fps continuous shooting', 'Flip-down selfie touchscreen'] },

    // Fujifilm (12)
    { brand: 'Fujifilm', name: 'X-T5 Mirrorless Camera with XF 16-80mm f/4 Lens', price: 209999, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['40.2MP X-Trans CMOS 5 HR sensor', '3-dial manual control layout', '19 iconic Film Simulation modes', '7-stop in-body stabilization'] },
    { brand: 'Fujifilm', name: 'X100VI Premium Compact Fixed Lens Camera (Silver)', price: 169999, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['40.2MP Sensor with Fujinon 23mm f/2.0 II lens', '6-stop IBIS for the first time in an X100', 'Hybrid Optical / Electronic Viewfinder', 'REALA ACE simulation'] },
    { brand: 'Fujifilm', name: 'X-S20 Mirrorless Camera with XC 15-45mm Lens Kit', price: 124999, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Deep handgrip with long-lasting NP-W235 battery', '6.2K 30p open-gate video', 'Dedicated Vlog Mode'] },

    // Action Cams, Drones & 360 (20)
    { brand: 'DJI', name: 'Osmo Pocket 3 Creator Combo Handheld Gimbal Camera', price: 58990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['1-inch CMOS & 4K 120fps recording', '2-inch rotatable OLED touchscreen', '3-axis mechanical gimbal stabilization', 'DJI Mic 2 transmitter included'] },
    { brand: 'DJI', name: 'Osmo Action 4 Adventure Combo Waterproof Camera', price: 37990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['1/1.3-inch image sensor for incredible low-light performance', '10-bit D-Log M color', '18m native waterproof', '3 extreme batteries with multifunctional case'] },
    { brand: 'DJI', name: 'Mini 4 Pro Fly More Combo Plus (DJI RC 2)', price: 109990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Under 249g ultralight drone', 'Omnidirectional obstacle sensing', '4K 60fps HDR true vertical shooting', '20km FHD video transmission'] },
    { brand: 'GoPro', name: 'HERO12 Black Creator Edition Waterproof Action Camera', price: 54990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Volta battery grip, Media Mod & Light Mod included', '5.3K 60fps & 4K 120fps video', 'HyperSmooth 6.0 stabilization with 360° Horizon Lock'] },
    { brand: 'GoPro', name: 'HERO12 Black Action Camera', price: 37990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['HDR Video & Photo', 'Bluetooth audio support for AirPods/mics', 'Rugged & waterproof to 10m (33ft)'] },
    { brand: 'Insta360', name: 'X4 8K 360 Degree Waterproof Action Camera', price: 53990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Unbeatable 8K 30fps 360° video', 'Invisible selfie stick effect for third-person angles', 'FlowState stabilization', 'AI gesture control'] },
    { brand: 'Insta360', name: 'Ace Pro 8K Action Camera Co-Engineered with Leica', price: 44990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['1/1.3" Flagship Leica sensor with 5nm AI chip', '2.4" Flip screen', 'PureVideo mode for superior low light'] },
    { brand: 'Insta360', name: 'GO 3S Tiny Action Camera 128GB (White)', price: 38990, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', specs: ['Thumb-sized 39g camera', 'Crisp 4K 30fps video', 'Magnetic body mounting anywhere', 'Action Pod with flip screen'] }
  ];

  const result = [];
  cameraModels.forEach((p) => {
    result.push({
      ...p,
      id: `camera-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = cameraModels[variantIndex % cameraModels.length];
    const kit = ['Pro Filmmaker Kit with Cage', 'Vlogger Bundle with Dual Mics', 'Landscape Explorer with Carbon Tripod', 'Extra High-Capacity Battery Pack', 'Studio Lighting & SD Card Bundle'][variantIndex % 5];
    const priceShift = (variantIndex % 3 - 1) * 2500;
    result.push({
      brand: base.brand,
      name: `${base.name} (${kit})`,
      price: Math.max(25000, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${kit}`],
      id: `camera-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-kit-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// 8. ACCESSORIES GENERATOR (105 items)
function getAccessories() {
  const accessoryModels = [
    // Chargers & Power Banks (18)
    { brand: 'Anker', name: '737 Power Bank (PowerCore 24K) 140W Portable Charger', price: 11999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['140W ultra-fast two-way charging', 'Smart digital color display', '24,000mAh capacity charges MacBook Pro', 'PowerIQ 4.0'] },
    { brand: 'Anker', name: 'Prime 100W GaN Wall Charger (3-Port Fast Charger)', price: 5999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['100W Max output with 2 USB-C & 1 USB-A', 'ActiveShield 2.0 safety system', '43% smaller than original 96W charger'] },
    { brand: 'Anker', name: 'Prime 20,000mAh Power Bank (200W Output)', price: 12999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Simultaneous 100W dual USB-C charging', 'Anker App compatible for wireless monitoring', 'Ultra-compact'] },
    { brand: 'Anker', name: 'MagGo 3-in-1 Foldable Qi2 Wireless Charging Station (15W)', price: 8999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Certified Qi2 15W MagSafe charging', 'Folds into pocket size for travel', 'Charges iPhone, Apple Watch & AirPods'] },
    { brand: 'Apple', name: '20W USB-C Power Adapter (Official)', price: 1900, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Fast charging compatible with iPhone 15/16 & iPad', 'Universal USB-PD support'] },
    { brand: 'Apple', name: 'MagSafe Charger (2m) Fast Wireless Charger', price: 4500, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Up to 25W wireless charging with 30W adapter', 'Perfect magnetic alignment for iPhone'] },
    { brand: 'Belkin', name: 'BoostCharge Pro 3-in-1 Wireless Charging Stand with MagSafe 15W', price: 13999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Architectural chrome tree stand', 'Fast charges Apple Watch Series 7/8/9/Ultra', 'White'] },
    { brand: 'Samsung', name: '45W Super Fast Charging 2.0 Power Adapter with 5A Cable', price: 2999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Power Delivery 3.0 PPS', 'Full speed for Galaxy S24 Ultra and Book laptops'] },

    // Storage: Portable SSDs & NVMe (18)
    { brand: 'Samsung', name: 'T7 Shield 2TB Portable SSD (IP65 Rugged Rubber)', price: 17499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Up to 1050 MB/s read and 1000 MB/s write', 'Water, dust and 3-meter drop resistant', 'Beige'] },
    { brand: 'Samsung', name: 'T7 Shield 1TB Portable SSD (Black)', price: 9999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['High-tech rubber outer shell with Dynamic Thermal Guard', 'USB 3.2 Gen 2 (10Gbps)'] },
    { brand: 'Samsung', name: 'T9 2TB Portable SSD (USB 3.2 Gen 2x2 20Gbps)', price: 22999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Blazing speeds up to 2000 MB/s', 'Carbon pattern curved body', 'Direct ProRes 4K 60fps recording on iPhone 15/16 Pro'] },
    { brand: 'SanDisk', name: 'Extreme Portable SSD 1TB (Up to 1050MB/s)', price: 9499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Carabiner loop for securing to belt or backpack', 'IP55 water and dust resistance', '2-meter drop protection'] },
    { brand: 'SanDisk', name: 'Extreme PRO Portable SSD 2TB (2000MB/s)', price: 21999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Forged aluminum chassis acts as heatsink', 'Password protection with 256-bit AES hardware encryption'] },
    { brand: 'Crucial', name: 'X9 Pro 2TB Portable SSD (Micron TLC NAND)', price: 16499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Pocket-sized 65 x 50 mm anodized aluminum', 'Integrated activity LED', '1050 MB/s'] },
    { brand: 'WD_BLACK', name: 'SN850X 2TB NVMe Internal SSD with Heatsink for PS5 & PC', price: 18999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['PCIe Gen4 speeds up to 7300 MB/s read', 'Officially licensed for PlayStation 5 expansion', 'Custom heatsink'] },

    // Docks, Keyboards, Mice & Desk Setup (20)
    { brand: 'CalDigit', name: 'TS4 Thunderbolt 4 Dock (18 Ports, 98W Charging)', price: 44990, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['18 ports of extreme connectivity', 'Up to single 8K or dual 6K 60Hz displays', '2.5GbE Ethernet', '98W host charging'] },
    { brand: 'Anker', name: '575 USB-C Docking Station (13-in-1, Triple Display 85W)', price: 17999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Dual HDMI and DisplayPort', '85W high-speed laptop charging', 'Gigabit Ethernet & SD Card slot'] },
    { brand: 'Logitech', name: 'MX Master 3S Wireless Performance Mouse (Pale Grey)', price: 9495, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Quiet Clicks 90% less noise', '8000 DPI track-on-glass sensor', 'MagSpeed electromagnetic scrolling 1000 lines/sec', 'Pale Grey'] },
    { brand: 'Logitech', name: 'MX Master 3S Wireless Mouse (Graphite)', price: 9495, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Ergonomic thumb rest with gesture button', 'Flow cross-computer control', 'USB-C quick charge'] },
    { brand: 'Logitech', name: 'MX Mechanical Wireless Illuminated Keyboard (Tactile Quiet)', price: 14995, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['Low-profile mechanical switches', 'Smart backlighting with hand proximity detection', 'Multi-device pairing up to 3 screens'] },
    { brand: 'Keychron', name: 'Q3 Pro Special Edition QMK/VIA Wireless Custom Mechanical Keyboard', price: 21999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['CNC machined full aluminum body', 'Double-gasket mount design', 'Hot-swappable switches', 'Bluetooth 5.1 & Type-C'] },
    { brand: 'Keychron', name: 'K2 Version 2 75% Wireless Mechanical Keyboard (RGB Backlight)', price: 8999, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['84-key compact layout with dedicated arrow keys', 'Mac and Windows keycaps included', '4000mAh battery'] },
    { brand: 'BenQ', name: 'ScreenBar Halo LED Monitor Light Bar with Wireless Controller', price: 16990, img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop', specs: ['No screen glare asymmetrical optical design', 'Backlight ambient light for eye comfort', 'Precision wireless control dial'] }
  ];

  const result = [];
  accessoryModels.forEach((p) => {
    result.push({
      ...p,
      id: `acc-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    });
  });

  let variantIndex = 1;
  while (result.length < 105) {
    const base = accessoryModels[variantIndex % accessoryModels.length];
    const bundle = ['Braided 2m Cable Bundle', 'Heavy-Duty Travel Case Edition', 'Desktop Organizer Edition', 'Dual-Pack Value Set', 'Titanium Edition'][variantIndex % 5];
    const priceShift = (variantIndex % 3 - 1) * 500;
    result.push({
      brand: base.brand,
      name: `${base.name} (${bundle})`,
      price: Math.max(999, base.price + priceShift),
      img: base.img,
      specs: [...base.specs, `${bundle}`],
      id: `acc-${base.brand.toLowerCase()}-${base.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-item-${variantIndex}`
    });
    variantIndex++;
  }

  return result.slice(0, 105);
}

// Assemble all products with full metadata
console.log('Generating catalog...');
const rawCategories = [
  { id: 'smartphones', fn: getSmartphones },
  { id: 'laptops', fn: getLaptops },
  { id: 'headphones', fn: getHeadphones },
  { id: 'smartwatches', fn: getSmartwatches },
  { id: 'monitors', fn: getMonitors },
  { id: 'gaming', fn: getGaming },
  { id: 'cameras', fn: getCameras },
  { id: 'accessories', fn: getAccessories }
];

const allProducts = [];

rawCategories.forEach(cat => {
  const products = cat.fn();
  console.log(`Category "${cat.id}": generated ${products.length} products`);

  products.forEach((p, index) => {
    const currentPrice = p.price;
    // Generate realistic 90D average & historical extremes
    const priceDropChance = (index % 4 === 0) || (index % 7 === 0);
    const dropPercent = priceDropChance ? Math.round(5 + (index % 15) + Math.random() * 5) : 0;
    
    const avgPrice90D = dropPercent > 0 
      ? Math.round(currentPrice * (1 + dropPercent / 100) / 10) * 10
      : Math.round(currentPrice * (1 + (Math.random() * 0.05)) / 10) * 10;
    
    const historicalLow = Math.round(currentPrice * (0.92 - (Math.random() * 0.06)) / 10) * 10;
    const historicalHigh = Math.round(avgPrice90D * (1.12 + (Math.random() * 0.08)) / 10) * 10;

    const rating = Math.round((4.0 + (index % 10) * 0.09) * 10) / 10;
    const reviews = 50 + ((index * 97) % 5200);
    const storeCount = 3 + (index % 6);

    const storeOffers = generateStoreOffers(currentPrice, storeCount);

    allProducts.push({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: cat.id,
      image: p.img,
      images: [
        p.img,
        p.img,
        p.img,
        p.img
      ],
      rating: Math.min(4.9, Math.max(3.8, rating)),
      reviews: reviews,
      currentPrice: currentPrice,
      avgPrice90D: avgPrice90D,
      historicalLow: historicalLow,
      historicalHigh: historicalHigh,
      priceDropPercentage: dropPercent > 0 ? dropPercent : undefined,
      storeCount: storeOffers.length,
      specs: p.specs || [],
      description: `${p.name} - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.`,
      stores: storeOffers
    });
  });
});

console.log(`Total products generated: ${allProducts.length}`);

// Write to src/data/products.ts
const fileHeader = `// AUTO-GENERATED PRODUCT CATALOG FOR COMPARIO
// Minimum 100 products per category (Total: ${allProducts.length} items)

export interface StoreOffer {
  store: string;
  logo: string;
  price: number;
  shipping: string;
  seller: string;
  available: boolean;
  updated: string;
  best: boolean;
  link: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  currentPrice: number;
  avgPrice90D: number;
  historicalLow: number;
  historicalHigh: number;
  priceDropPercentage?: number;
  storeCount: number;
  specs: string[];
  description: string;
  stores: StoreOffer[];
}

export interface ProductFilters {
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  stores?: string[];
  hasPriceDrop?: boolean;
  minRating?: number;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'drop-desc' | 'rating-desc';
}

export const PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)};

// Fast lookup indices
export const PRODUCT_BY_ID = new Map<string, Product>(PRODUCTS.map(p => [p.id, p]));

// Query helpers
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCT_BY_ID.get(id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter(p => p.category === categoryId);
}

export function getTrendingProducts(limit = 8): Product[] {
  // Select popular top-tier flagships across categories
  const featuredIds = [
    'phone-apple-iphone-16-128gb',
    'audio-sony-wh-1000xm5-wireless-noise-cancelling-headphones',
    'laptop-apple-macbook-air-13-m3-8gb-ram-256gb-ssd',
    'gaming-zotac-gaming-geforce-rtx-4060-8gb-twin-edge-oc',
    'watch-apple-apple-watch-ultra-2-gps-cellular-49mm-titanium',
    'monitor-lg-ultragear-27gr95qe-b-27-qhd-oled-240hz-gaming-monitor',
    'camera-sony-alpha-7-iv-full-frame-mirrorless-camera-body-only',
    'acc-anker-737-power-bank-powercore-24k-140w-portable-charger'
  ];
  const featured = featuredIds.map(id => PRODUCT_BY_ID.get(id)).filter((p): p is Product => Boolean(p));
  if (featured.length < limit) {
    const others = PRODUCTS.slice(0, limit - featured.length);
    return [...featured, ...others];
  }
  return featured.slice(0, limit);
}

export function getPriceDropProducts(limit = 24): Product[] {
  return PRODUCTS
    .filter(p => p.priceDropPercentage && p.priceDropPercentage > 0)
    .sort((a, b) => (b.priceDropPercentage || 0) - (a.priceDropPercentage || 0))
    .slice(0, limit);
}

export function searchProducts(query?: string, categoryId?: string, filters?: ProductFilters): Product[] {
  let results = PRODUCTS;

  if (categoryId && categoryId !== 'all') {
    results = results.filter(p => p.category.toLowerCase() === categoryId.toLowerCase());
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.some(s => s.toLowerCase().includes(q))
    );
  }

  if (filters) {
    if (filters.brands && filters.brands.length > 0) {
      const brandSet = new Set(filters.brands.map(b => b.toLowerCase()));
      results = results.filter(p => brandSet.has(p.brand.toLowerCase()));
    }

    if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
      results = results.filter(p => p.currentPrice >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice) && filters.maxPrice > 0) {
      results = results.filter(p => p.currentPrice <= filters.maxPrice!);
    }

    if (filters.hasPriceDrop) {
      results = results.filter(p => p.priceDropPercentage && p.priceDropPercentage > 0);
    }

    if (filters.minRating) {
      results = results.filter(p => p.rating >= filters.minRating!);
    }

    if (filters.stores && filters.stores.length > 0) {
      const storeSet = new Set(filters.stores.map(s => s.toLowerCase()));
      results = results.filter(p => p.stores.some(s => storeSet.has(s.store.toLowerCase())));
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          results = [...results].sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price-desc':
          results = [...results].sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'drop-desc':
          results = [...results].sort((a, b) => (b.priceDropPercentage || 0) - (a.priceDropPercentage || 0));
          break;
        case 'rating-desc':
          results = [...results].sort((a, b) => b.rating - a.rating);
          break;
        case 'relevance':
        default:
          break;
      }
    }
  }

  return results;
}

export function getCategoryProductCount(categoryId: string): number {
  return PRODUCTS.filter(p => p.category === categoryId).length;
}

export function getAllCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of PRODUCTS) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}
`;

const outputPath = path.resolve(__dirname, '../src/data/products.ts');
fs.writeFileSync(outputPath, fileHeader, 'utf-8');
console.log(`Successfully written ${allProducts.length} products to ${outputPath}`);
