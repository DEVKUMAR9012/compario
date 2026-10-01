import { Smartphone, Laptop, Headphones, Watch, Monitor, Gamepad2, Camera, Cable, type LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  featuredBrands: string[];
  bannerGradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: Smartphone,
    description: 'Compare latest 5G phones, flagships, foldables & budget champions',
    featuredBrands: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Motorola', 'Vivo', 'Realme'],
    bannerGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'laptops',
    name: 'Laptops',
    icon: Laptop,
    description: 'Find best prices for ultrabooks, gaming rigs, MacBooks & creator workstations',
    featuredBrands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Samsung'],
    bannerGradient: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'headphones',
    name: 'Headphones',
    icon: Headphones,
    description: 'Active noise cancelling headphones, audiophile cans & wireless earbuds',
    featuredBrands: ['Sony', 'Bose', 'Apple', 'Sennheiser', 'JBL', 'Audio-Technica', 'Beats', 'Marshall'],
    bannerGradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    icon: Watch,
    description: 'Smart fitness trackers, rugged GPS watches & everyday wearables',
    featuredBrands: ['Apple', 'Samsung', 'Garmin', 'Google', 'Amazfit', 'OnePlus', 'Fitbit', 'Noise'],
    bannerGradient: 'from-pink-600 to-rose-600',
  },
  {
    id: 'monitors',
    name: 'Monitors',
    icon: Monitor,
    description: '4K displays, high refresh rate gaming monitors, OLED & ultrawides',
    featuredBrands: ['LG', 'Samsung', 'Dell', 'ASUS', 'BenQ', 'Acer', 'MSI', 'Gigabyte'],
    bannerGradient: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    description: 'Next-gen consoles, graphics cards, handhelds, controllers & peripherals',
    featuredBrands: ['Sony', 'Microsoft', 'Nintendo', 'NVIDIA', 'ASUS', 'Logitech', 'Razer', 'Corsair'],
    bannerGradient: 'from-violet-600 to-purple-800',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    icon: Camera,
    description: 'Mirrorless cameras, action cams, vlogging cameras, drones & creator gear',
    featuredBrands: ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'Panasonic', 'DJI', 'GoPro', 'Insta360'],
    bannerGradient: 'from-amber-600 to-orange-600',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Cable,
    description: 'GaN fast chargers, portable SSDs, docks, mechanical keyboards & desk gear',
    featuredBrands: ['Anker', 'Samsung', 'SanDisk', 'Apple', 'Belkin', 'Keychron', 'Logitech', 'Crucial'],
    bannerGradient: 'from-cyan-600 to-blue-700',
  },
];

export const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.id, c]));
