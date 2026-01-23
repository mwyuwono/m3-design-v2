Role: Act as a Senior Frontend Architect and Technical Product Manager.

Goal: Create a comprehensive "Technical Requirements & Implementation Guide" for the Weaver-Yuwono Family Office website. This is a portfolio-first, responsive static site using a Modern Build setup (Vite + Node.js) and Material Web Components (MWC - Material 3 standard).

Project Context: The website serves two family members, Matt Weaver-Yuwono and Stanton Yuwono. The aesthetic is "High-End Editorial/Luxury"—minimalist, understated, and traditional, heavily relying on typography and whitespace. We are using a JSON-based data approach to populate content, ensuring modularity and easy updates.

Please provide a detailed response covering the following 5 sections:

1. Technical Setup (Modern Build)
Provide a step-by-step guide to initializing the project using Vite.

Explain how to install and configure Material Web Components (Material 3) via npm.

Detail the folder structure, specifically separating src/components, src/data (for JSON content), and src/styles.

2. Design System & Theming Strategy, see @m3-requirements.md. 
Objective: Map a luxury/editorial brand identity to Material 3 tokens without fighting the framework.

Deliverable: Define a strategy for CSS Custom Properties (Design Tokens) consistent with the requirements in @m3-requirements.md.

Constraint: Explain how to apply these tokens globally while keeping styles scoped to avoid conflicts.

3. The "Living Reference" Page (Design System Artifact)
Requirement: We need a dedicated internal page (/design-system.html) that serves as a living catalog of used components.

Structure: Outline the HTML/JS structure for this page to display MWC components in isolation (Buttons, Cards, Lists) showing all states (Default, Hover, Focus, Disabled).

Note: This replaces Storybook. It must be simple and run within the main build.

4. Modular Page & Component Architecture
Define the requirements for the following pages, explaining how to use JSON data to populate the specific components dynamically:

A. Landing Page:

Header: Centered Monogram Logo (SVG) + "Weaver-Yuwono" text.

Content: Two "Profile Cards" (Photo, Name, Role) linking to individual profiles.

B. Profile Page (Modular):

Data Structure: Explain how the JSON should look to support "switching on/off" modules.

Modules:

Bio Card: Photo, Name, Role, Short Bio, LinkedIn.

Project List Card: Categorized lists of projects.

C. Project Detail Page:

Hero Section: Image, Headline, Sub-headline.

Content: Modular sections for project documentation (text, images, PDFs).

5. Customization Analysis (Risk Assessment)
Identify areas where a "Luxury/Editorial" look usually clashes with standard Material Design (e.g., custom card layouts, non-standard navigation).

For each clash:

(a) Suggest a Low-Effort Alternative using standard MWC slots/properties.

(b) Explain the High-Effort Customization path and explicitly state the "Cost of Customization" (e.g., "Requires shadow DOM piercing," "Breaks accessibility," or "Hard to maintain").

Output Format: Organize the response logically with clear headings, code snippets for the JSON structure and CSS tokens, and bullet points for the requirements.

6. Documentation 
Implement a plan to ensure documentaton is maintained and up-to-date at all times. a single source of truth (such as claude.md) should be maintained and supplemental documentation should be cross referenced in the source of truth so LLM coding tools always maintain visibility. 

7. Install relevant agent skills for this project, including front-end design skills. See: plugins/frontend-design/skills/frontend-design/SKILL.md

also review and install for this project: plugins/frontend-design/skills/frontend-design/SKILL.md