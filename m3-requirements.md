This is a sophisticated design challenge. By accepting the default Material 3 (M3) geometry (which is inherently playful and digital-native) and pairing it with a "heritage luxury" aesthetic, we are creating a design language known as **"Soft Modernism."**

This approach mirrors trends seen in high-end skincare and boutique hospitality, where organic shapes are disciplined by rigorous typography and color.

Here is your comprehensive Design System Guidelines document.

---

# Weaver-Yuwono Design System Guidelines

**Version 1.0 | Status: Active**

## 1. Brand Ethos: Soft Modernism

The Weaver-Yuwono visual identity is built on a philosophy of **disciplined contrast**. We embrace the organic, human-centric geometry of Material 3 (rounded corners, bubbly interactive states) but ground it with the authority of heritage editorial design.

* **The Tension:** Our UI components are soft and approachable (Round). Our Typography and Layout are rigid, sharp, and authoritative (Sharp).
* **The Result:** A digital experience that feels like a high-end architectural digest—inviting yet undeniably exclusive. It is not "tech"; it is digital stewardship.

---

## 2. Typography System

Typography is our primary vehicle for luxury. Because our UI buttons and cards are round, our type must provide the structural skeleton. We utilize a **High-Contrast Serif** for voice and a **Geometric Sans** for utility.

### Typeface Selection

* **Primary (Display & Headings):** **Playfair Display**. A high-contrast Didone. Its sharp terminals and delicate hairlines cut visually through the rounded UI shapes.
* **Secondary (Body & UI):** **DM Sans**. A low-contrast geometric sans-serif that complements M3’s geometry while remaining legible and professional at small sizes.

### The Type Scale & Tracking Rules

*Crucial Design Rule:* Standard M3 tracking is too tight for luxury. We will loosen the tracking (letter-spacing) to create an "airier," more expensive feel.

| Role | M3 Token Mapping | Font Family | Weight | Size (rem) | Letter Spacing | Case |
| --- | --- | --- | --- | --- | --- | --- |
| **Display Large** | `display-large` | Playfair Display | Regular (400) | 4.5 | -0.02em | Sentence |
| **Headline Medium** | `headline-medium` | Playfair Display | Medium (500) | 2.5 | 0em | Sentence |
| **Title Medium** | `title-medium` | Playfair Display | Regular (400) | 1.5 | 0em | Sentence |
| **Body Large** | `body-large` | DM Sans | Regular (400) | 1.125 | 0.01em | Sentence |
| **Label/Overline** | `label-large` | DM Sans | Medium (500) | 0.875 | **0.1em** | **ALL CAPS** |
| **Button Text** | `label-large` | DM Sans | Medium (500) | 1.0 | 0.05em | Sentence |

> **Creative Director's Note:** The **Label/Overline** style (All Caps + Wide Spacing) is the "architectural girder" of our page. Use it above headlines (e.g., "ASSET ALLOCATION" above "Q3 Performance") to mechanically offset the roundness of the cards.

---

## 3. Color System (Heritage & Clay)

We reject the hyper-saturated defaults of standard Android apps. We utilize a **Warm Neutral** foundation with a **Deep Heritage** accent. This palette mimics the paper stock and ink of prestige print magazines.

### The Seed Strategy

* **Seed Color:** **Hunter Green (`#2C4C3B`)**.
* **Neutral Base:** **Warm Clay/Taupe**.

### Token Mapping (CSS Custom Properties)

We override the M3 standard mappings to force a "Paper and Ink" aesthetic.

```css
:root {
  /* THE HERITAGE ACCENTS (Primary) */
  /* Deep Hunter Green - used for FABs, Active States, Key Actions */
  --md-sys-color-primary: #2C4C3B;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #E8F5E9; /* Very pale green wash */
  
  /* THE WARM FOUNDATION (Surfaces) */
  /* Warm Beige/Alabaster - The "Paper" tone. NOT pure white. */
  --md-sys-color-background: #FDFBF7; 
  --md-sys-color-surface: #F5F2EA; /* Slightly darker taupe for cards */
  --md-sys-color-on-surface: #1A1C18; /* Soft Charcoal, never pure black */
  
  /* SECONDARY (Support) */
  /* Muted Gold/Bronze for subtle highlights */
  --md-sys-color-secondary: #8C7E70;
  --md-sys-color-on-secondary: #FFFFFF;

  /* BORDERS & DIVIDERS */
  --md-sys-color-outline: #D7D3C8;
  --md-sys-color-outline-variant: #EBE5DE;
}

```

---

## 4. Layout & Spacing (The Editorial Layer)

Standard Material Design is "dense" to fit information on small screens. Luxury is defined by the **abundance of space**. We will use an "Expansive" density strategy.

### The "Gallery Frame" Concept

Do not pack components together. Treat every rounded card as an art piece hanging on a gallery wall.

* **Page Margins:** * **Desktop:** Minimum `120px` (or `15vw`). The content should sit in the center, breathing comfortably.
* **Mobile:** `24px`.


* **Component Spacing (Gap):**
* Increase standard M3 vertical rhythm from `16px` to `48px` or `64px` between sections.
* **Internal Padding:** Double the internal padding of M3 Cards. If standard is `16px`, force `32px`. This prevents the text from feeling "trapped" by the rounded corners.



### The Grid

Use a **12-column grid** but rarely span all 12.

* *Text Columns:* Max-width `65ch` (characters) for readability.
* *Asymmetry:* Offset images and text blocks. Avoid perfect symmetry to maintain the "Magazine Layout" feel.

---

## 5. Component Usage Rules

### Geometry (The Constraint)

* **Rule:** We respect the M3 Shape Scale.
* **Implementation:** Do not override `--md-sys-shape-corner-*`.
* *Buttons:* Full capsule (rounded).
* *Cards:* Medium round (`12px` or `16px`).


* **Why:** The contrast between the *perfectly round* button and the *sharp* Playfair typeface is our signature look.

### Elevation & Depth (The Polish)

Luxury interfaces are generally flat. High elevation (deep shadows) looks messy and "app-like."

* **Default State:** **Elevation Level 0 (Flat)**.
* Cards should use the `Surface` color (`#F5F2EA`) against the `Background` color (`#FDFBF7`) to create separation via *tone*, not shadow.
* Use a 1px solid border (`--md-sys-color-outline-variant`) if contrast is too low.


* **Hover/Active State:** **Elevation Level 1**.
* Use a very soft, diffuse shadow only on interaction.



### Imagery

* **Aspect Ratios:** Use classic photography ratios (4:5 or 3:2). Avoid 16:9 (looks too "video").
* **Corner Radius:** Images inside cards must inherit the card's border radius. Standalone images should have a small radius (`4px`) to soften the edges, or distinct rounded corners (`16px`) if acting as a hero element.

---

## 6. Voice & Tone Guidelines

The interface copy acts as the "Butler" or "Chief of Staff."

* **Tone:** Competent, Discretionary, Essential.
* **Style:**
* **Concise:** Never use two sentences when one will do.
* **Objective:** Avoid marketing fluff ("Exciting," "Amazing"). Use data-driven descriptors ("Steady," "Diversified," "Historic").
* **Examples:**
* *Bad:* "Check out our amazing new portfolio performance!"
* *Good:* "Q3 Portfolio Performance."
* *Bad:* "We help you manage your money better."
* *Good:* "Strategic wealth preservation."





---

## 7. Governance & Maintenance

To ensure this system scales without losing its "Luxury" fidelity:

1. **The Token File:** All developers must use the CSS Variables defined in Section 3. Hard-coded hex values are strictly prohibited.
2. **The Type Check:** During QA, specific attention must be paid to `letter-spacing`. If the Caps labels look bunched, the design is broken.
3. **Review Cycle:** Any introduction of a new UI component must be reviewed to ensure it adheres to the "Soft Modernism" (Round Shape + Sharp Type) ethos.

---

### Sample HTML/CSS snippet of a "Hero Section" incorporating the Playfair font, the Hunter Green palette, and the rounded M3 button styling**
see @sample-styling.html


