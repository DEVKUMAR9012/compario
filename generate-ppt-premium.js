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
  border: "E5E7EB"
};

const FONTS = {
  main: "Inter",
  fallback: "Helvetica"
};

pptx.defineSlideMaster({
  title: "COMPARIO_MASTER",
  background: { color: COLORS.bg },
  objects: [
    // Footer line
    { rect: { x: 0.5, y: 7.1, w: 9.0, h: 0.01, fill: { color: COLORS.border } } },
    // Footer text
    { text: { text: "Compario", options: { x: 0.5, y: 7.15, w: 2, fontSize: 10, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main } } },
    { text: { text: "Compare smarter. Buy better.", options: { x: 1.2, y: 7.15, w: 3, fontSize: 10, color: COLORS.textSecondary, fontFace: FONTS.main } } },
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
  x: 2.0, y: 2.0, w: 6.0, h: 3.5,
  fill: { color: COLORS.surface },
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.05,
  shadow: { type: 'outer', color: '000000', opacity: 0.03, blur: 10, offset: 5 }
});

// Subtle comparison arrows (Left and Right)
slide1.addShape(pptx.ShapeType.leftArrow, { x: 3.2, y: 2.9, w: 0.3, h: 0.2, fill: { color: COLORS.primary } });
slide1.addShape(pptx.ShapeType.rightArrow, { x: 6.5, y: 2.9, w: 0.3, h: 0.2, fill: { color: COLORS.primary } });

slide1.addText("Compario", { x: 2.0, y: 2.6, w: 6.0, fontSize: 48, bold: true, align: "center", color: COLORS.textPrimary, fontFace: FONTS.main });
slide1.addText("Compare smarter. Buy better.", { x: 2.0, y: 3.4, w: 6.0, fontSize: 18, align: "center", color: COLORS.textSecondary, fontFace: FONTS.main });


// ---------------------------------------------------------
// SLIDE 2: PLATFORM INTERFACE
// ---------------------------------------------------------
let slide2 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide2, "Platform Interface", "Clean, premium, and data-rich user experience.");

// Browser wrapper
slide2.addShape(pptx.ShapeType.roundRect, { 
  x: 0.5, y: 1.7, w: 9.0, h: 5.0, 
  fill: { color: COLORS.surface }, 
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.05,
  shadow: { type: 'outer', color: '000000', opacity: 0.05, blur: 8, offset: 4 }
});
// Browser Top Bar
slide2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.7, w: 9.0, h: 0.25, fill: { color: "F3F4F6" } });
// Browser Dots (Mac style)
slide2.addShape(pptx.ShapeType.ellipse, { x: 0.65, y: 1.78, w: 0.08, h: 0.08, fill: { color: "E11D48" } });
slide2.addShape(pptx.ShapeType.ellipse, { x: 0.80, y: 1.78, w: 0.08, h: 0.08, fill: { color: "F59E0B" } });
slide2.addShape(pptx.ShapeType.ellipse, { x: 0.95, y: 1.78, w: 0.08, h: 0.08, fill: { color: COLORS.success } });

// Insert the actual homepage screenshot
try {
  slide2.addImage({ path: 'compario_homepage.png', x: 0.52, y: 1.95, w: 8.96, h: 4.73, sizing: { type: 'contain' } });
} catch (e) {
  slide2.addText("Missing compario_homepage.png", { x: 0.52, y: 1.95, w: 8.96, h: 4.73, align: "center", color: COLORS.textSecondary });
}


// ---------------------------------------------------------
// SLIDE 3: SYSTEM ARCHITECTURE
// ---------------------------------------------------------
let slide3 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide3, "System Architecture", "High-level data flow and processing pipeline.");

const flow = [
  { text: "Amazon API\nFlipkart Affiliate\nThird-Party Feeds", x: 0.5, y: 2.0, w: 2.5, h: 0.8 },
  { text: "Marketplace Adapters", x: 3.7, y: 2.0, w: 2.5, h: 0.8 },
  { text: "Product Normalization", x: 6.9, y: 2.0, w: 2.5, h: 0.8 },
  
  { text: "Price Data Processing", x: 6.9, y: 3.5, w: 2.5, h: 0.8 },
  { text: "Cron Jobs / Workers", x: 3.7, y: 3.5, w: 2.5, h: 0.8 },
  { text: "MongoDB", x: 0.5, y: 3.5, w: 2.5, h: 0.8 },
  
  { text: "Node.js + Express API", x: 0.5, y: 5.0, w: 2.5, h: 0.8 },
  { text: "React + Vite", x: 3.7, y: 5.0, w: 2.5, h: 0.8 },
  { text: "Compario UI", x: 6.9, y: 5.0, w: 2.5, h: 0.8, isPrimary: true }
];

// Draw nodes
flow.forEach(node => {
  slide3.addShape(pptx.ShapeType.roundRect, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    fill: { color: node.isPrimary ? COLORS.primary : COLORS.surface },
    line: { color: node.isPrimary ? COLORS.primary : COLORS.border, width: 1 },
    rectRadius: 0.05,
    shadow: { type: 'outer', color: node.isPrimary ? COLORS.primary : '000000', opacity: 0.05, blur: 5, offset: 2 }
  });
  slide3.addText(node.text, {
    x: node.x, y: node.y, w: node.w, h: node.h,
    align: "center", valign: "middle",
    fontSize: 12, bold: true, color: node.isPrimary ? "FFFFFF" : COLORS.textPrimary, fontFace: FONTS.main
  });
});

// Draw connecting arrows
const arrowColor = "9CA3AF";
// Row 1 (Right)
slide3.addShape(pptx.ShapeType.rightArrow, { x: 3.1, y: 2.3, w: 0.5, h: 0.2, fill: { color: arrowColor } });
slide3.addShape(pptx.ShapeType.rightArrow, { x: 6.3, y: 2.3, w: 0.5, h: 0.2, fill: { color: arrowColor } });
// Down
slide3.addShape(pptx.ShapeType.downArrow, { x: 8.0, y: 2.9, w: 0.2, h: 0.5, fill: { color: arrowColor } });
// Row 2 (Left)
slide3.addShape(pptx.ShapeType.leftArrow, { x: 6.3, y: 3.8, w: 0.5, h: 0.2, fill: { color: arrowColor } });
slide3.addShape(pptx.ShapeType.leftArrow, { x: 3.1, y: 3.8, w: 0.5, h: 0.2, fill: { color: arrowColor } });
// Down
slide3.addShape(pptx.ShapeType.downArrow, { x: 1.6, y: 4.4, w: 0.2, h: 0.5, fill: { color: arrowColor } });
// Row 3 (Right)
slide3.addShape(pptx.ShapeType.rightArrow, { x: 3.1, y: 5.3, w: 0.5, h: 0.2, fill: { color: arrowColor } });
slide3.addShape(pptx.ShapeType.rightArrow, { x: 6.3, y: 5.3, w: 0.5, h: 0.2, fill: { color: arrowColor } });

// Tech Stack Footer
slide3.addText("Core Technologies:", { x: 0.5, y: 6.4, w: 2, fontSize: 11, bold: true, color: COLORS.textSecondary, fontFace: FONTS.main });
const techs = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Recharts", "Framer Motion"];
techs.forEach((tech, i) => {
  slide3.addText(tech, { x: 2.2 + (i * 1.2), y: 6.35, w: 1.1, h: 0.3, align: "center", valign: "middle", fontSize: 10, color: COLORS.textPrimary, border: { type: 'solid', color: COLORS.border, pt: 1 }, fill: { color: COLORS.surface }, fontFace: FONTS.main });
});


// ---------------------------------------------------------
// SLIDE 4: THE PROBLEM
// ---------------------------------------------------------
let slide4 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide4, "The Problem", "Why online shopping is broken today.");

const problems = [
  { title: "Fragmented Pricing", desc: "Users manually compare multiple marketplaces.", x: 0.5 },
  { title: "Misleading Discounts", desc: "Discount percentages don't always explain the actual price history.", x: 3.5 },
  { title: "Timing the Market", desc: "Users don't know whether the current price is historically low or high.", x: 6.5 }
];

problems.forEach(p => {
  slide4.addShape(pptx.ShapeType.roundRect, {
    x: p.x, y: 2.5, w: 2.8, h: 3.0,
    fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 },
    rectRadius: 0.05, shadow: { type: 'outer', color: '000000', opacity: 0.04, blur: 10, offset: 4 }
  });
  // Simple accent block at top of card
  slide4.addShape(pptx.ShapeType.rect, { x: p.x, y: 2.5, w: 2.8, h: 0.1, fill: { color: COLORS.primary } });
  
  slide4.addText(p.title, { x: p.x + 0.2, y: 3.0, w: 2.4, fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main });
  slide4.addText(p.desc, { x: p.x + 0.2, y: 3.5, w: 2.4, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main, lineSpacing: 20 });
});


// ---------------------------------------------------------
// SLIDE 5: THE SOLUTION
// ---------------------------------------------------------
let slide5 = pptx.addSlide({ masterName: "COMPARIO_MASTER" });
addSlideTitle(slide5, "The Compario Solution", "How we empower the modern shopper.");

const solutions = [
  { num: "01", title: "Centralized Comparison", desc: "One search across multiple verified sources.", y: 2.0 },
  { num: "02", title: "Price Intelligence", desc: "Current price | 90-Day Average | Historical Low | Historical High", y: 3.5 },
  { num: "03", title: "Smart Price Alerts", desc: "Notify users when their target price is reached.", y: 5.0 }
];

solutions.forEach(s => {
  slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: s.y, w: 9.0, h: 1.2, fill: { color: COLORS.surface }, line: { color: COLORS.border, width: 1 } });
  
  // Number block
  slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: s.y, w: 1.2, h: 1.2, fill: { color: "EEF2FF" } });
  slide5.addText(s.num, { x: 0.5, y: s.y, w: 1.2, h: 1.2, align: "center", valign: "middle", fontSize: 24, bold: true, color: COLORS.primary, fontFace: FONTS.main });
  
  slide5.addText(s.title, { x: 2.0, y: s.y + 0.1, w: 7.0, h: 0.5, fontSize: 20, bold: true, color: COLORS.textPrimary, fontFace: FONTS.main });
  slide5.addText(s.desc, { x: 2.0, y: s.y + 0.6, w: 7.0, h: 0.5, fontSize: 14, color: COLORS.textSecondary, fontFace: FONTS.main });
});


// ---------------------------------------------------------
// SLIDE 6: CONCLUSION
// ---------------------------------------------------------
let slide6 = pptx.addSlide();
slide6.background = { color: COLORS.bg };

slide6.addText("Compario", { x: 1.5, y: 2.0, w: 7, fontSize: 40, bold: true, align: "center", color: COLORS.textPrimary, fontFace: FONTS.main });
slide6.addText("Compare smarter. Buy better.", { x: 1.5, y: 2.6, w: 7, fontSize: 18, align: "center", color: COLORS.textSecondary, fontFace: FONTS.main });

slide6.addText("Any Questions?", { x: 1.5, y: 4.0, w: 7, fontSize: 28, bold: true, align: "center", color: COLORS.primary, fontFace: FONTS.main });

slide6.addText("GitHub Repository  |  Live Demo  |  Project Architecture", { x: 1.5, y: 5.5, w: 7, fontSize: 12, bold: true, align: "center", color: COLORS.textSecondary, fontFace: FONTS.main, charSpacing: 1 });


pptx.writeFile({ fileName: "Compario_Final_Pitch_Deck.pptx" }).then(() => {
    console.log('Final presentation created successfully.');
}).catch(err => {
    console.error('Error creating presentation:', err);
});
