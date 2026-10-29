# Website Build Prompt — PureRoot Natural Foods

Build a modern, very clean and sharp single-page website for **PureRoot Natural Foods** using **plain HTML, CSS and JavaScript** (no frameworks). It must be fully responsive on every device: mobile (320px+), tablet, laptop and large desktop, **including the header and footer**.

## Brand
- **Name:** PureRoot Natural Foods (Jaipur, Rajasthan)
- **Taglines:** "Pure by Nature · Healthy by Choice", "Pure Taste · Healthy Life", "Nature's Golden Goodness"
- **Hindi line:** प्रकृति की शुद्धता आपके परिवार के लिए
- **Logo colours:** green leaf + "Pure" in green, "Root" in gold/amber
- **Palette:** forest green `#0E3B23`, green `#1F7A3E`, leaf `#5CB82E`, gold `#C8900F`, ivory background `#FBF8F1`, navy `#0F1C35` (dry-fruit range)
- **Fonts:** Fraunces (headings, serif), Manrope (body), Tiro Devanagari Hindi (Hindi text)

## Business details
- **WhatsApp / phone:** +91 93524 54356 (`https://wa.me/919352454356`)
- **Email:** purerootsnaturalfoods@gmail.com
- **Website:** www.purerootsnaturalfoods.com
- **Address:** 27 A1 Arihant Vatika-C, Dhawas, Jaipur, Rajasthan 302021
- **FSSAI licence:** 22226083000608
- **Marketing & manufacturing:** Kaneriya And Sons
- **Promises:** 100% Natural · No Added Colours · No Preservatives · Premium Quality · Ethically Packed · FSSAI Certified

## Products
| Product | Hindi | Size | Price |
|---|---|---|---|
| Red Chilli Powder | लाल मिर्च पाउडर | 200g | on WhatsApp |
| Haldi (Turmeric) Powder | हल्दी पाउडर | 100g | MRP ₹100 |
| Coriander Powder | धनिया पाउडर | 200g | on WhatsApp |
| Garam Masala | गरम मसाला | 200g | on WhatsApp |
| Kaju Premium Cashews | काजू | Whole | on WhatsApp |
| Badam Premium Almonds | बादाम | 250g | on WhatsApp |
| Kismis Premium Raisins (no added sugar) | किशमिश | 250g | on WhatsApp |
| Walnut Kernels | अखरोट | 1kg | MRP ₹1,099 |

Haldi nutrition (per 100g): Energy 312 kcal, Protein 8.9g, Carbs 67.1g, Fat 4.2g, Fiber 21.1g. Benefits: boosts immunity, rich in antioxidants, supports digestion, good for heart.

## Assets
- `asset/logo/` — brand logo (dark-green version + background-removed version)
- `asset/media/` — product banners/posters (Kaju, Kismis, Badam, Walnut, Haldi 360° view, spice range) and 3 product videos (2× Red Chilli, 1× Haldi)
- `asset/dripfunnel/` — agency logo for the footer credit

## Reference sites (category leaders)
Happilo, Tata Nutrikorner / Tata Sampann, Farmley, Nutraj. Borrow their patterns: announcement bar, icon trust strip, category tiles, clean product cards with tags, reel-style video section, rich footer with FSSAI number.

## Page structure
1. Scrolling announcement bar (natural, FSSAI number, WhatsApp number)
2. Sticky header: logo, nav (Home, Products, Haldi, Our Story, FAQ, Contact), "Order on WhatsApp" button; slide-in drawer + hamburger on mobile
3. Hero: headline, Hindi tagline, CTAs, product video in a framed card with floating badges
4. Trust strip (5 promises with icons)
5. Shop by category (Spices / Dry Fruits) tiles that filter the product grid
6. Auto-playing, swipeable banner slider of the dry-fruit banners
7. Product grid with All / Spices / Dry Fruits filter; each card has image, Hindi name, size, price, **Order Now** → WhatsApp with prefilled message, and a zoom button opening the full poster in a lightbox
8. Haldi spotlight: video, benefits, nutrition table, price, 360° pack view
9. "Purity you can see" reels section (3 videos, play when visible, mute toggle)
10. Our Story (Jaipur, Kaneriya And Sons, key facts)
11. How to order (3 steps)
12. FAQ accordion
13. Contact: details + enquiry form that opens WhatsApp with the message, Google Map embed
14. Footer: logo, quick links, products, contact, FSSAI, copyright, "Designed & developed by DripFunnel"

## Must-haves
- **Floating WhatsApp button fixed bottom-right** (pulse ring, tooltip on desktop) plus a back-to-top button
- Fully responsive, no horizontal scroll at any width; tap targets ≥ 44px
- Scroll-reveal animations, respecting `prefers-reduced-motion`
- Lazy-loaded images/videos, semantic HTML, alt text, keyboard-accessible menu/lightbox
- SEO meta + Open Graph tags
