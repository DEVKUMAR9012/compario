import pptxgen from "pptxgenjs";

let pptx = new pptxgen();

// Slide 1: Title
let slide1 = pptx.addSlide();
slide1.addText("Compario", { x: 1.5, y: 1.5, w: 7, fontSize: 44, bold: true, align: "center", color: "4338CA" });
slide1.addText("Compare smarter. Buy better.", { x: 1.5, y: 2.5, w: 7, fontSize: 24, align: "center", color: "6B7280" });
slide1.addText("Project Presentation", { x: 1.5, y: 3.5, w: 7, fontSize: 18, align: "center", color: "111318" });

// Slide 2: What is Compario
let slide2 = pptx.addSlide();
slide2.addText("What is Compario?", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide2.addText([
  { text: "A Multi-Marketplace Price Intelligence Platform." },
  { text: "Search for any product and instantly see its price across top e-commerce websites (Amazon, Flipkart, Croma, etc.)." },
  { text: "Track price history over time to understand market trends." },
  { text: "Set personalized price drops and alerts." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 3: The Problem
let slide3 = pptx.addSlide();
slide3.addText("The Problem with Online Shopping Today", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide3.addText([
  { text: "Fragmented Pricing: Users must manually open multiple apps to find the best deal." },
  { text: "Misleading Discounts: Sellers artificially inflate prices before sales to show fake discounts." },
  { text: "Timing the Market: Buyers don't know if the current price is a 'good' price." },
  { text: "Missed Deals: Flash sales and price drops happen quickly and are easily missed." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 4: Our Solution
let slide4 = pptx.addSlide();
slide4.addText("The Compario Solution", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide4.addText([
  { text: "Centralized Dashboard: One search bar to rule them all—fetching data from verified sellers." },
  { text: "Price Transparency: We expose the '90-Day Average Price' and 'Historical Low'." },
  { text: "Automated Tracking: The platform watches the prices for you 24/7." },
  { text: "Smart Alerts: Users are notified via Email or Browser when their target price is hit." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 5: Features
let slide5 = pptx.addSlide();
slide5.addText("Key Features", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide5.addText([
  { text: "Marketplace Comparison Table: Side-by-side comparison of price, shipping, and seller trust." },
  { text: "Interactive Price Charts: Visualizing 7-day to 1-year price trends." },
  { text: "Personalized Wishlist: Track target prices for future purchases." },
  { text: "Live Dashboard: Overview of potential savings and active alerts." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 6: Architecture
let slide6 = pptx.addSlide();
slide6.addText("System Architecture & Workflow", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide6.addText([
  { text: "Data Ingestion: System securely connects to official APIs and third-party feeds." },
  { text: "Data Processing: A background worker aggregates and normalizes the data." },
  { text: "User Interface: The React frontend fetches this standardized data." },
  { text: "Alert Engine: Alerts are triggered when new fetched prices hit target thresholds." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 7: Tech Stack
let slide7 = pptx.addSlide();
slide7.addText("Technology Stack", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide7.addText([
  { text: "Frontend Framework: React.js & Vite" },
  { text: "Styling & UI: Tailwind CSS" },
  { text: "Icons & Assets: Lucide React" },
  { text: "Data Visualization: Recharts" },
  { text: "Routing & State: React Router & TanStack Query" },
  { text: "Animations: Framer Motion" }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 8: UI/UX
let slide8 = pptx.addSlide();
slide8.addText("UI/UX Design Philosophy", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide8.addText([
  { text: "Design Direction: Light, Clean, Premium, and Data-Rich." },
  { text: "Focus on Typography (Inter font) and strict visual hierarchy." },
  { text: "Avoided generic templates to create a product that feels like a real startup." },
  { text: "Fully responsive layout (Desktop, Tablet, Mobile optimized)." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 9: Future Scope
let slide9 = pptx.addSlide();
slide9.addText("Future Enhancements", { x: 0.5, y: 0.5, fontSize: 32, bold: true, color: "4338CA" });
slide9.addText([
  { text: "Browser Extension: Show Compario prices while browsing Amazon/Flipkart." },
  { text: "AI Product Reviews: Summarizing thousands of reviews using AI." },
  { text: "Mobile App: Releasing native iOS and Android applications." }
], { x: 0.5, y: 1.5, w: 8.5, fontSize: 18, bullet: true, color: "111318" });

// Slide 10: Conclusion
let slide10 = pptx.addSlide();
slide10.addText("Thank You", { x: 1.5, y: 2.0, w: 7, fontSize: 44, bold: true, align: "center", color: "4338CA" });
slide10.addText("Any Questions?", { x: 1.5, y: 3.0, w: 7, fontSize: 24, align: "center", color: "6B7280" });

pptx.writeFile({ fileName: "Compario_Presentation.pptx" }).then(() => {
    console.log('Presentation created successfully as Compario_Presentation.pptx');
}).catch(err => {
    console.error('Error creating presentation:', err);
});
