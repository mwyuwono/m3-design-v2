# Component Adaptation System - Complete Index

**Everything you need to adapt external components to the m3-design-v2 design system**

---

## 📖 Documentation Structure

### 1️⃣ **Start Here**
**[QUICK-START-COMPONENT-ADAPTATION.md](QUICK-START-COMPONENT-ADAPTATION.md)**
- Copy/paste prompt for component adaptations
- Quick reference guide
- Example usage

👉 **This is what you'll use most often**

---

### 2️⃣ **Full Methodology**
**[COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md)**
- Complete 6-phase workflow
- Detailed checklist for each phase
- Code examples and patterns
- Quality gates and success criteria

👉 **Reference for complex adaptations**

---

### 3️⃣ **Structured Prompt**
**[COMPONENT-ADAPTATION-PROMPT.md](COMPONENT-ADAPTATION-PROMPT.md)**
- Formatted prompt template
- Requirements specification
- Deliverables checklist

👉 **Alternative prompt format**

---

### 4️⃣ **Overview Guide**
**[README-COMPONENT-ADAPTATION.md](README-COMPONENT-ADAPTATION.md)**
- System overview
- Benefits and workflow diagram
- Testing instructions
- Learning resources

👉 **Understanding the system**

---

## 🛠️ Tools Created

### Automated Testing Script
**`skills/component-adaptation/test-component.py`**

**Purpose:** Automated Playwright testing for adapted components

**Usage:**
```bash
python3 skills/component-adaptation/test-component.py \
  --url http://localhost:5173/test-page.html \
  --selector wy-component-name \
  --output /tmp/component-test
```

**What it does:**
- ✅ Captures screenshots (light + dark mode)
- ✅ Measures layout dimensions
- ✅ Detects hardcoded values
- ✅ Tests interactive states
- ✅ Verifies dark mode theming
- ✅ Checks Material Icons loading

**Output:**
- Screenshots in specified output directory
- Console report of findings
- Pass/fail status for quality gates

---

### Agent Skill
**`skills/component-adaptation/SKILL.md`**

**Purpose:** Instructions for AI agent when adapting components

**Contains:**
- Step-by-step workflow
- Quality gates
- Common pitfalls to avoid
- Success criteria

---

## 🎯 How to Use

### Simple Workflow (Most Common):

1. **You find** a component you like (screenshot + code)

2. **You paste** the prompt from [QUICK-START-COMPONENT-ADAPTATION.md](QUICK-START-COMPONENT-ADAPTATION.md)

3. **I execute:**
   - Analyze screenshot and code
   - Map values to design tokens
   - Implement as Web Component
   - **Run Playwright automated tests**
   - Provide component + test results

4. **You verify** screenshots match your expectations

5. **Done!** Component is integrated and tested

### Advanced Workflow (Complex Components):

Follow the complete [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md) with:
- Custom Playwright test scripts
- Design system extensions
- Multiple component variations
- Comprehensive documentation

---

## 📊 What Automation Eliminates

### Before (Manual):
```
❌ Visual inspection only
❌ "Does this look right to you?"
❌ Missing issues until deployed
❌ Multiple rounds of fixes
❌ Subjective quality assessment
```

### After (Automated):
```
✅ Programmatic verification
✅ Objective measurements
✅ Issues caught immediately
✅ Fixed before showing you
✅ Proof via screenshots + tests
```

---

## 🧪 Playwright Test Examples

### Basic Test:
```bash
python3 skills/component-adaptation/test-component.py \
  --url http://localhost:5173/test.html \
  --selector wy-button \
  --output /tmp/button-test
```

### Custom Test (Python):
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/test.html')
    
    # Your custom checks
    component = page.query_selector('wy-component')
    
    # Measure specific properties
    width = page.evaluate('''(el) => 
        el.getBoundingClientRect().width
    ''', component)
    
    print(f"Width: {width}px")
    
    browser.close()
```

---

## 📋 Complete File Inventory

```
m3-design-v2/
├── COMPONENT-ADAPTATION-INDEX.md          ← You are here
├── QUICK-START-COMPONENT-ADAPTATION.md    ← Copy/paste prompt
├── COMPONENT-ADAPTATION-WORKFLOW.md       ← Full methodology
├── COMPONENT-ADAPTATION-PROMPT.md         ← Structured prompt
├── README-COMPONENT-ADAPTATION.md         ← Overview guide
└── skills/
    └── component-adaptation/
        ├── SKILL.md                       ← Agent instructions
        └── test-component.py              ← Automated testing
```

**All files are in the m3-design-v2 repository root (except skills/).**

---

## 🎓 Learning Path

1. **Start:** Read [README-COMPONENT-ADAPTATION.md](README-COMPONENT-ADAPTATION.md) for overview
2. **Practice:** Use [QUICK-START-COMPONENT-ADAPTATION.md](QUICK-START-COMPONENT-ADAPTATION.md) with simple example
3. **Master:** Study [COMPONENT-ADAPTATION-WORKFLOW.md](COMPONENT-ADAPTATION-WORKFLOW.md) for complex adaptations
4. **Customize:** Modify `test-component.py` for project-specific tests

---

## ✨ Key Benefits

1. **Automated Quality** - Playwright catches issues before you see them
2. **Visual Proof** - Screenshots show exact match to original
3. **Token Compliance** - 100% design system token usage enforced
4. **Dark Mode** - Automatically tested in both color schemes
5. **Consistency** - Same workflow for every adaptation
6. **Speed** - No back-and-forth describing issues
7. **Documentation** - Every adaptation includes test results

---

## 🚀 Next Steps

**Ready to adapt your first component?**

1. Go to [QUICK-START-COMPONENT-ADAPTATION.md](QUICK-START-COMPONENT-ADAPTATION.md)
2. Copy the prompt
3. Paste with your screenshot + code
4. Let automation handle the rest!

---

**Questions?** All workflows include detailed examples and troubleshooting guides.
