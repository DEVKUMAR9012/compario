import pptxgen from "pptxgenjs";

let pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";

// Define Light & Clean Premium Theme matching Compario UI
const COLORS = {
  bg: "F7F8FA",
  surface: "FFFFFF",
  primary: "4338CA", 
  textPrimary: "111318",
  textSecondary: "6B7280",
  success: "16A34A",
  warning: "D97706",
  border: "E5E7EB",
  accent: "8B5CF6" // Secondary purple
};

const FONTS = {
  main: "Inter",
  fallback: "Helvetica"
};

pptx.defineSlideMaster({
  title: "COMPARIO_MASTER",
  background: { color: COLORS.bg },
  objects: [
    // Header accent line
    { rect: { x: 0, y: 0, w: 10.0, h: 0.05, fill: { color: COLORS.primary } } },
    // Footer line
    { rect: { x: 0.5, y: 7.1, w: 9.0, h: 0.01, fill: { color: COLORS.border } } },
    // Footer text
    { text: { text: "Compario", options: { x: 0.5, y: 7.15, w: 2, fontSize: 10, bold: true, color: COLORS.primary, fontFace: FONTS.main } } },
    { text: { text: "Architecture & Scalability Report", options: { x: 1.2, y: 7.15, w: 4, fontSize: 10, color: COLORS.textSecondary, fontFace: FONTS.main } } },
    { text: { text: "CONFIDENTIAL", options: { x: 8.0, y: 7.15, w: 1.5, fontSize: 9, color: COLORS.textSecondary, align: "right", fontFace: FONTS.main } } }
  ]
});

// Helper function for standard titles
function addSlideTitle(slide, title, subtitle = "") {
  slide.addText(title, { x: 0.5, y: 0.5, w: 9, h: 0.6, fontSize: 32, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main });
  if (subtitle) {
    slide.addText(subtitle, { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main });
  }
}

// ---------------------------------------------------------
// SLIDE 1: TITLE SLIDE
// ---------------------------------------------------------
let slide1 = pptx.addSlide();
slide1.background = { color: COLORS.bg };

// Clean surface card in the middle
slide1.addShape(pptx.ShapeType.roundRect, {
  x: 1.5, y: 1.5, w: 7.0, h: 4.5,
  fill: { color: COLORS.surface },
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.05,
  shadow: { type: 'outer', color: '000000', opacity: 0.04, blur: 12, offset: 6 }
});

// Accent gradient block
slide1.addShape(pptx.ShapeType.rect, {
  x: 1.5, y: 1.5, w: 7.0, h: 0.15,
  fill: { color: COLORS.primary }
});

slide1.addText("System Architecture", { x: 1.5, y: 2.2, w: 7.0, fontSize: 16, bold: true, align: "center", color: COLORS.accent, fontFace: FONTS.main });
slide1.addText("Compario", { x: 1.5, y: 2.7, w: 7.0, fontSize: 56, bold: true, align: "center", color: COLORS.textPrimary, fontFace: FONTS.main });
slide1.addText("Frontend, Authentication, Backend Integration & Scaling", { x: 1.5, y: 3.8, w: 7.0, fontSize: 18, align: "center", color: COLORS.textSecondary, fontFace: FONTS.main });


// ---------------------------------------------------------
// SLIDE 2: CURRENT STATE & FRONTEND
// ---------------------------------------------------------
let slide2 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide2, "Current Frontend Architecture", "High-performance React interface without persistent storage.");

slide2.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.0, w: 4.2, h: 4.5, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05, shadow: { type: 'outer', color: '000000', opacity: 0.03, blur: 10, offset: 5 } });
slide2.addText("Technologies", { x: 0.8, y: 2.2, w: 3.6, fontSize: 18, bold: true, color: COLORS.primary, fontFace: FONTS.main });
slide2.addText([
  { text: "React 19 & Vite: ", options: { bold: true } }, { text: "Blazing fast dev server and builds." },
  { text: "\nTailwind CSS: ", options: { bold: true } }, { text: "Utility-first, responsive styling." },
  { text: "\nReact Router DOM: ", options: { bold: true } }, { text: "Client-side routing." },
  { text: "\nTanStack Query: ", options: { bold: true } }, { text: "Data fetching and caching readiness." }
], { x: 0.8, y: 2.7, w: 3.6, h: 3.5, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main, bullet: true, lineSpacing: 25 });

slide2.addShape(pptx.ShapeType.roundRect, { x: 5.3, y: 2.0, w: 4.2, h: 4.5, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05, shadow: { type: 'outer', color: '000000', opacity: 0.03, blur: 10, offset: 5 } });
slide2.addText("Current Data Flow", { x: 5.6, y: 2.2, w: 3.6, fontSize: 18, bold: true, color: COLORS.warning, fontFace: FONTS.main });
slide2.addText([
  { text: "Data loads directly from ", options: { color: COLORS.textSecondary } },
  { text: "src/data/products.ts", options: { bold: true, color: COLORS.textPrimary } },
  { text: ".\n\n", options: { color: COLORS.textSecondary } },
  { text: "Limitation:\n", options: { bold: true, color: COLORS.danger } },
  { text: "Without a backend, user preferences (Wishlists, Alerts) are lost on page refresh.", options: { color: COLORS.textSecondary } }
], { x: 5.6, y: 2.7, w: 3.6, h: 3.5, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main });


// ---------------------------------------------------------
// SLIDE 3: AUTHENTICATION FLOW
// ---------------------------------------------------------
let slide3 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide3, "Authentication Strategy", "Securing user data with JWT and OAuth integration.");

const authFlow = [
  { text: "User Action\n(Login/Register)", x: 0.5, y: 3.0, w: 2.0, h: 1.0, isPrimary: true },
  { text: "Frontend\n(React App)", x: 3.0, y: 3.0, w: 2.0, h: 1.0, isPrimary: false },
  { text: "Backend API\n(Node.js)", x: 5.5, y: 3.0, w: 2.0, h: 1.0, isPrimary: false },
  { text: "Database\n(PostgreSQL)", x: 8.0, y: 3.0, w: 1.5, h: 1.0, isPrimary: false }
];

authFlow.forEach((node, idx) => {
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    fill: { color: node.isPrimary ? COLORS.primary : COLORS.surface },
    line: { color: node.isPrimary ? COLORS.primary : COLORS.border, width: 1 },
    rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.05, blur: 6, offset: 3 }
  });
  slide3.addText(node.text, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    align: "center", valign: "middle",
    fontSize: 12, bold: true, color: node.isPrimary ? "FFFFFF" : COLORS.textPrimary, fontFace: FONTS.main
  });
});

// Arrows
slide3.addShape(pptx.ShapeType.rightArrow, { x: 2.5, y: 3.4, w: 0.4, h: 0.2, fill: { color: COLORS.textSecondary } });
slide3.addShape(pptx.ShapeType.rightArrow, { x: 5.0, y: 3.4, w: 0.4, h: 0.2, fill: { color: COLORS.textSecondary } });
slide3.addShape(pptx.ShapeType.rightArrow, { x: 7.5, y: 3.4, w: 0.4, h: 0.2, fill: { color: COLORS.textSecondary } });

slide3.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 4.8, w: 9.0, h: 1.8, fill: { color: COLORS.bg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05 });
slide3.addText("Implementation Steps:", { x: 0.8, y: 5.0, w: 8.4, fontSize: 14, bold: true, color: COLORS.primary, fontFace: FONTS.main });
slide3.addText([
  { text: "Auth Context: Wrap app to hold session state." },
  { text: "Protected Routes: Redirect to /login if !isAuthenticated." },
  { text: "Axios Interceptors: Automatically attach JWT Token as Bearer header." }
], { x: 0.8, y: 5.3, w: 8.4, h: 1.2, fontSize: 12, color: COLORS.textSecondary, fontFace: FONTS.main, bullet: true });


// ---------------------------------------------------------
// SLIDE 4: ADDING A BACKEND & DB SCHEMA
// ---------------------------------------------------------
let slide4 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide4, "Backend & Data Storage", "Transitioning to a dynamic, database-driven platform.");

slide4.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.0, w: 4.2, h: 4.5, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05, shadow: { type: 'outer', color: '000000', opacity: 0.03, blur: 10, offset: 5 } });
slide4.addText("Proposed Tech Stack", { x: 0.8, y: 2.2, w: 3.6, fontSize: 18, bold: true, color: COLORS.primary, fontFace: FONTS.main });
slide4.addText([
  { text: "Runtime: Node.js (Express.js or NestJS)" },
  { text: "Database: PostgreSQL (Relational)" },
  { text: "ORM: Prisma or Drizzle (Type-safe queries)" },
  { text: "Caching: Redis (Fast price lookups)" }
], { x: 0.8, y: 2.7, w: 3.6, h: 3.0, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main, bullet: true, lineSpacing: 20 });

// Database Schema Visual
slide4.addShape(pptx.ShapeType.roundRect, { x: 5.3, y: 2.0, w: 4.2, h: 4.5, fill: { color: "F3F4F6" }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05 });
slide4.addText("Core Database Entities", { x: 5.6, y: 2.2, w: 3.6, fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main });

const tables = [
  { name: "Users", desc: "Profiles, credentials" },
  { name: "Products", desc: "Catalog data, specs" },
  { name: "Prices", desc: "Time-series price history" },
  { name: "Alerts", desc: "User target prices" }
];

tables.forEach((t, idx) => {
  slide4.addShape(pptx.ShapeType.rect, { x: 5.6, y: 2.8 + (idx * 0.8), w: 3.6, h: 0.6, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 } });
  slide4.addText(t.name, { x: 5.7, y: 2.8 + (idx * 0.8), w: 1.5, h: 0.6, fontSize: 14, bold: true, color: COLORS.primary, fontFace: FONTS.main });
  slide4.addText(t.desc, { x: 7.0, y: 2.8 + (idx * 0.8), w: 2.0, h: 0.6, fontSize: 12, color: COLORS.textSecondary, fontFace: FONTS.main });
});

// ---------------------------------------------------------
// SLIDE 5: 3-TIER ARCHITECTURE
// ---------------------------------------------------------
let slide5 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide5, "Target Architecture Diagram", "Complete End-to-End System Flow.");

const archNodes = [
  { text: "React + Vite\n(Frontend UI)", x: 0.5, y: 2.5, w: 2.5, h: 1.2, isPrimary: true },
  { text: "Node.js API\n(Express/GraphQL)", x: 3.7, y: 2.5, w: 2.5, h: 1.2, isPrimary: false },
  { text: "PostgreSQL\n(Main Database)", x: 6.9, y: 2.5, w: 2.5, h: 1.2, isPrimary: false },
  
  { text: "Redis Cache", x: 3.7, y: 4.5, w: 2.5, h: 1.2, isPrimary: false },
  { text: "Price Scraper\n(Background Workers)", x: 6.9, y: 4.5, w: 2.5, h: 1.2, isPrimary: false },
];

archNodes.forEach(node => {
  slide5.addShape(pptx.ShapeType.roundRect, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    fill: { color: node.isPrimary ? COLORS.primary : COLORS.surface },
    line: { color: node.isPrimary ? COLORS.primary : COLORS.border, width: 1 },
    rectRadius: 0.1,
    shadow: { type: 'outer', color: node.isPrimary ? COLORS.primary : '000000', opacity: 0.05, blur: 5, offset: 2 }
  });
  slide5.addText(node.text, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    align: "center", valign: "middle",
    fontSize: 14, bold: true, color: node.isPrimary ? "FFFFFF" : COLORS.textPrimary, fontFace: FONTS.main
  });
});

slide5.addShape(pptx.ShapeType.rightArrow, { x: 3.1, y: 3.0, w: 0.5, h: 0.2, fill: { color: COLORS.textSecondary } });
slide5.addShape(pptx.ShapeType.rightArrow, { x: 6.3, y: 3.0, w: 0.5, h: 0.2, fill: { color: COLORS.textSecondary } });

slide5.addShape(pptx.ShapeType.upArrow, { x: 4.8, y: 3.9, w: 0.2, h: 0.5, fill: { color: COLORS.textSecondary } }); // Redis to API
slide5.addShape(pptx.ShapeType.upArrow, { x: 8.0, y: 3.9, w: 0.2, h: 0.5, fill: { color: COLORS.textSecondary } }); // Scraper to DB

// ---------------------------------------------------------
// SLIDE 6: FUTURE SCALABILITY
// ---------------------------------------------------------
let slide6 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide6, "Future Scalability Roadmap", "Preparing Compario for millions of users and tracking queries.");

slide6.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 2.0, w: 9.0, h: 4.5, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.05, shadow: { type: 'outer', color: '000000', opacity: 0.03, blur: 10, offset: 5 } });

const roadmap = [
  { title: "Microservices", desc: "Split the monolith into Auth Service, Product API, and Scraping Engine." },
  { title: "Message Queues", desc: "Use RabbitMQ or Kafka to queue scraping tasks so the system doesn't crash under peak load." },
  { title: "ElasticSearch", desc: "Replace standard SQL text searches with ElasticSearch for lightning-fast, typo-tolerant queries." },
  { title: "WebSockets", desc: "Implement WebSockets (Socket.io) to push live price drops to users instantly." }
];

roadmap.forEach((item, idx) => {
  slide6.addShape(pptx.ShapeType.ellipse, { x: 1.0, y: 2.5 + (idx * 0.9), w: 0.3, h: 0.3, fill: { color: COLORS.success } });
  slide6.addText(`${idx + 1}`, { x: 1.0, y: 2.5 + (idx * 0.9), w: 0.3, h: 0.3, align: "center", valign: "middle", fontSize: 10, bold: true, color: "FFFFFF" });
  
  slide6.addText(item.title, { x: 1.5, y: 2.45 + (idx * 0.9), w: 2.5, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main });
  slide6.addText(item.desc, { x: 3.5, y: 2.45 + (idx * 0.9), w: 5.5, h: 0.4, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main });
});

// Save Presentation
pptx.writeFile({ fileName: "Compario_Architecture_Premium.pptx" }).then(() => {
  console.log("Extreme Level Architecture PPT generated successfully!");
}).catch((err) => {
  console.error("Error generating PPT:", err);
});
