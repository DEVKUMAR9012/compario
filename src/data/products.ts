// AUTO-GENERATED PRODUCT CATALOG FOR COMPARIO
// Minimum 100 products per category (Total: 840 items)

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

export const PRODUCTS: Product[] = [
  {
    "id": "phone-apple-iphone-16-pro-max-256gb",
    "name": "iPhone 16 Pro Max 256GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/001_Apple_iPhone_16_Pro_Max_256GB.jpg",
    "images": [
      "/images/products/Smartphones/001_Apple_iPhone_16_Pro_Max_256GB.jpg",
      "/images/products/Smartphones/001_Apple_iPhone_16_Pro_Max_256GB.jpg",
      "/images/products/Smartphones/001_Apple_iPhone_16_Pro_Max_256GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4,
    "reviews": 50,
    "currentPrice": 144900,
    "avgPrice90D": 157940,
    "historicalLow": 130400,
    "historicalHigh": 187520,
    "priceDropPercentage": 9,
    "storeCount": 3,
    "specs": [
      "A18 Pro chip",
      "6.9\" Super Retina XDR OLED",
      "48MP Fusion Camera",
      "Titanium Build"
    ],
    "description": "iPhone 16 Pro Max 256GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 144900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 149040,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 154100,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-pro-max-512gb",
    "name": "iPhone 16 Pro Max 512GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/002_Apple_iPhone_16_Pro_Max_512GB.jpg",
    "images": [
      "/images/products/Smartphones/002_Apple_iPhone_16_Pro_Max_512GB.jpg",
      "/images/products/Smartphones/002_Apple_iPhone_16_Pro_Max_512GB.jpg",
      "/images/products/Smartphones/002_Apple_iPhone_16_Pro_Max_512GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.1,
    "reviews": 147,
    "currentPrice": 164900,
    "avgPrice90D": 171470,
    "historicalLow": 145570,
    "historicalHigh": 201100,
    "storeCount": 4,
    "specs": [
      "A18 Pro chip",
      "6.9\" Super Retina XDR",
      "Camera Control button",
      "USB-C 3.0"
    ],
    "description": "iPhone 16 Pro Max 512GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 164900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 170700,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 173940,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 175060,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-pro-max-1tb",
    "name": "iPhone 16 Pro Max 1TB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/003_Apple_iPhone_16_Pro_Max_1TB.jpg",
    "images": [
      "/images/products/Smartphones/003_Apple_iPhone_16_Pro_Max_1TB.jpg",
      "/images/products/Smartphones/003_Apple_iPhone_16_Pro_Max_1TB.jpg",
      "/images/products/Smartphones/003_Apple_iPhone_16_Pro_Max_1TB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.2,
    "reviews": 244,
    "currentPrice": 184900,
    "avgPrice90D": 185380,
    "historicalLow": 169440,
    "historicalHigh": 216780,
    "storeCount": 5,
    "specs": [
      "A18 Pro chip",
      "1TB NVMe Storage",
      "4K 120fps Dolby Vision",
      "Desert Titanium"
    ],
    "description": "iPhone 16 Pro Max 1TB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 184900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 192640,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 193750,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": false,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 196070,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 203510,
        "shipping": "₹99",
        "seller": "Authorized Retailer 4",
        "available": false,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-pro-128gb",
    "name": "iPhone 16 Pro 128GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/004_Apple_iPhone_16_Pro_128GB.jpg",
    "images": [
      "/images/products/Smartphones/004_Apple_iPhone_16_Pro_128GB.jpg",
      "/images/products/Smartphones/004_Apple_iPhone_16_Pro_128GB.jpg",
      "/images/products/Smartphones/004_Apple_iPhone_16_Pro_128GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.3,
    "reviews": 341,
    "currentPrice": 119900,
    "avgPrice90D": 123770,
    "historicalLow": 109200,
    "historicalHigh": 146850,
    "storeCount": 5,
    "specs": [
      "A18 Pro chip",
      "6.3\" ProMotion 120Hz",
      "5x Telephoto zoom",
      "Natural Titanium"
    ],
    "description": "iPhone 16 Pro 128GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 119900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 125860,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": false,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 126690,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 128890,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 132690,
        "shipping": "₹99",
        "seller": "Authorized Retailer 4",
        "available": true,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-pro-256gb",
    "name": "iPhone 16 Pro 256GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/005_Apple_iPhone_16_Pro_256GB.jpg",
    "images": [
      "/images/products/Smartphones/005_Apple_iPhone_16_Pro_256GB.jpg",
      "/images/products/Smartphones/005_Apple_iPhone_16_Pro_256GB.jpg",
      "/images/products/Smartphones/005_Apple_iPhone_16_Pro_256GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.4,
    "reviews": 438,
    "currentPrice": 129900,
    "avgPrice90D": 144190,
    "historicalLow": 111750,
    "historicalHigh": 168600,
    "priceDropPercentage": 11,
    "storeCount": 5,
    "specs": [
      "A18 Pro chip",
      "6.3\" ProMotion 120Hz",
      "48MP Ultra Wide",
      "Black Titanium"
    ],
    "description": "iPhone 16 Pro 256GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 129900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 135670,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 136570,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 139190,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 141790,
        "shipping": "Free",
        "seller": "Authorized Retailer 4",
        "available": true,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-pro-512gb",
    "name": "iPhone 16 Pro 512GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/006_Apple_iPhone_16_Pro_512GB.jpg",
    "images": [
      "/images/products/Smartphones/006_Apple_iPhone_16_Pro_512GB.jpg",
      "/images/products/Smartphones/006_Apple_iPhone_16_Pro_512GB.jpg",
      "/images/products/Smartphones/006_Apple_iPhone_16_Pro_512GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/960px-IPhone_16_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.5,
    "reviews": 535,
    "currentPrice": 149900,
    "avgPrice90D": 154970,
    "historicalLow": 132750,
    "historicalHigh": 178450,
    "storeCount": 5,
    "specs": [
      "A18 Pro chip",
      "512GB Storage",
      "Ray Tracing Gaming",
      "White Titanium"
    ],
    "description": "iPhone 16 Pro 512GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 149900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 153750,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": false,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 156220,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 158900,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 163870,
        "shipping": "Free",
        "seller": "Authorized Retailer 4",
        "available": true,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-plus-128gb",
    "name": "iPhone 16 Plus 128GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/007_Apple_iPhone_16_Plus_128GB.jpg",
    "images": [
      "/images/products/Smartphones/007_Apple_iPhone_16_Plus_128GB.jpg",
      "/images/products/Smartphones/007_Apple_iPhone_16_Plus_128GB.jpg",
      "/images/products/Smartphones/007_Apple_iPhone_16_Plus_128GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.5,
    "reviews": 632,
    "currentPrice": 89900,
    "avgPrice90D": 92820,
    "historicalLow": 78030,
    "historicalHigh": 110320,
    "storeCount": 3,
    "specs": [
      "A18 Bionic",
      "6.7\" Super Retina XDR",
      "Dynamic Island",
      "Action Button"
    ],
    "description": "iPhone 16 Plus 128GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 89900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 94050,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 93520,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-plus-256gb",
    "name": "iPhone 16 Plus 256GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/008_Apple_iPhone_16_Plus_256GB.jpg",
    "images": [
      "/images/products/Smartphones/008_Apple_iPhone_16_Plus_256GB.jpg",
      "/images/products/Smartphones/008_Apple_iPhone_16_Plus_256GB.jpg",
      "/images/products/Smartphones/008_Apple_iPhone_16_Plus_256GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.6,
    "reviews": 729,
    "currentPrice": 99900,
    "avgPrice90D": 112890,
    "historicalLow": 89980,
    "historicalHigh": 134230,
    "priceDropPercentage": 13,
    "storeCount": 4,
    "specs": [
      "A18 Bionic",
      "6.7\" Super Retina XDR",
      "Ultramarine Blue",
      "48MP 2x Telephoto"
    ],
    "description": "iPhone 16 Plus 256GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 99900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 102230,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 106490,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 107710,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-128gb",
    "name": "iPhone 16 128GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/009_Apple_iPhone_16_128GB.jpg",
    "images": [
      "/images/products/Smartphones/009_Apple_iPhone_16_128GB.jpg",
      "/images/products/Smartphones/009_Apple_iPhone_16_128GB.jpg",
      "/images/products/Smartphones/009_Apple_iPhone_16_128GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/960px-IPhone_16_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.7,
    "reviews": 826,
    "currentPrice": 79900,
    "avgPrice90D": 93480,
    "historicalLow": 69730,
    "historicalHigh": 110140,
    "priceDropPercentage": 17,
    "storeCount": 5,
    "specs": [
      "A18 chip",
      "6.1\" OLED Display",
      "Camera Control",
      "Teal Green"
    ],
    "description": "iPhone 16 128GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 79900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 83860,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 84070,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 86310,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 87160,
        "shipping": "Free",
        "seller": "Authorized Retailer 4",
        "available": true,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  },
  {
    "id": "phone-apple-iphone-16-256gb",
    "name": "iPhone 16 256GB",
    "brand": "Apple",
    "category": "smartphones",
    "image": "/images/products/Smartphones/010_Apple_iPhone_16_256GB.jpg",
    "images": [
      "/images/products/Smartphones/010_Apple_iPhone_16_256GB.jpg",
      "/images/products/Smartphones/010_Apple_iPhone_16_256GB.jpg",
      "/images/products/Smartphones/010_Apple_iPhone_16_256GB.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/IPhone_18_Pro_Vector.svg/960px-IPhone_18_Pro_Vector.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
    ],
    "rating": 4.8,
    "reviews": 923,
    "currentPrice": 89900,
    "avgPrice90D": 90390,
    "historicalLow": 77950,
    "historicalHigh": 107430,
    "storeCount": 5,
    "specs": [
      "A18 chip",
      "256GB Storage",
      "Pink Finish",
      "Spatial Audio Capture"
    ],
    "description": "iPhone 16 256GB - Compare prices across top Indian retailers including Amazon, Flipkart, Croma, Reliance Digital and more. Track price drops, 90-day averages, and historical lowest prices to buy at the best deal.",
    "stores": [
      {
        "store": "Amazon",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "price": 89900,
        "shipping": "Free",
        "seller": "Amazon Verified",
        "available": true,
        "updated": "3 min ago",
        "best": true,
        "link": "https://amazon.in"
      },
      {
        "store": "Flipkart",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg",
        "price": 93390,
        "shipping": "Free",
        "seller": "Authorized Retailer 1",
        "available": true,
        "updated": "6 min ago",
        "best": false,
        "link": "https://flipkart.com"
      },
      {
        "store": "Blinkit",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        "price": 93660,
        "shipping": "Free",
        "seller": "Authorized Retailer 2",
        "available": true,
        "updated": "9 min ago",
        "best": false,
        "link": "https://blinkit.com"
      },
      {
        "store": "Reliance Digital",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg",
        "price": 95580,
        "shipping": "Free",
        "seller": "Authorized Retailer 3",
        "available": true,
        "updated": "12 min ago",
        "best": false,
        "link": "https://reliancedigital.in"
      },
      {
        "store": "eBay",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        "price": 98780,
        "shipping": "Free",
        "seller": "Authorized Retailer 4",
        "available": true,
        "updated": "15 min ago",
        "best": false,
        "link": "https://ebay.com"
      }
    ]
  }
];

const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  'phone-apple-iphone-16-pro-max-256gb': '/images/products/Smartphones/iphone-16-pro-max.jpg',
  'phone-apple-iphone-16-pro-max-512gb': '/images/products/Smartphones/iphone-16-pro-max.jpg',
  'phone-apple-iphone-16-pro-max-1tb': '/images/products/Smartphones/iphone-16-pro-max.jpg',
  'phone-apple-iphone-16-pro-128gb': '/images/products/Smartphones/iphone-16-pro.jpg',
  'phone-apple-iphone-16-pro-256gb': '/images/products/Smartphones/iphone-16-pro.jpg',
  'phone-apple-iphone-16-pro-512gb': '/images/products/Smartphones/iphone-16-pro.jpg',
  'phone-apple-iphone-16-plus-128gb': '/images/products/Smartphones/iphone-16-plus.jpg',
  'phone-apple-iphone-16-plus-256gb': '/images/products/Smartphones/iphone-16-plus.jpg',
  'phone-apple-iphone-16-128gb': '/images/products/Smartphones/iphone-16.jpg',
  'phone-apple-iphone-16-256gb': '/images/products/Smartphones/iphone-16.jpg',
};

for (const product of PRODUCTS) {
  const image = PRODUCT_IMAGE_OVERRIDES[product.id];
  if (image) {
    product.image = image;
    product.images = [image, image, image, image];
  }
}



// 10 demo products — full catalog goes here for production

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
  return PRODUCTS.slice(0, Math.min(limit, PRODUCTS.length));
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
