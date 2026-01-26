# Component Adaptation Prompt - Now in Prompts Library

**The component adaptation workflow is now accessible from your prompts library!**

---

## Quick Access

**Prompts Library:** http://localhost:8000

**Prompt Location:**
- Category: **Productivity** 
- Title: **Component Adaptation (Design System)**
- Icon: 🧩 widgets

---

## How It Works

### Traditional Way (Before):
1. Remember the workflow steps
2. Manually describe component to adapt
3. Hope you cover all requirements
4. Multiple iterations fixing issues

### New Way (With Prompt Library):
1. Open prompts library
2. Fill in 3 fields (screenshot, code, context)
3. Click "Generate"
4. Paste in Cursor
5. Get automated Playwright-verified component

---

## The Prompt Structure

When you fill in the form and generate, you get:

```
Screenshot: [your description]

Original Code:
[your pasted code]

Context: [your usage notes]

---

I need to adapt this component to my m3-design-v2 design system.

[Complete 6-phase workflow with Playwright automation]
```

---

## Cross-Project Integration

This creates a bridge between two of your projects:

```
prompts-library              m3-design-v2
(Prompt Generator)    →      (Component Implementation)
     ↓                              ↓
Fill form                    Execute workflow
Generate text                Run Playwright tests
Copy prompt         →        Adapt component
                             Verify with automation
                             Return working code
```

---

## Files in Both Projects

### In prompts-library:
- `prompts-for-implementation/component-adaptation.txt` - Workflow text
- `prompts.json` - Registry entry
- `COMPONENT-ADAPTATION-USAGE.md` - Usage guide

### In m3-design-v2:
- `COMPONENT-ADAPTATION-WORKFLOW.md` - Full methodology
- `COMPONENT-ADAPTATION-PROMPT.md` - Structured prompt
- `COMPONENT-ADAPTATION-INDEX.md` - Documentation index
- `skills/component-adaptation/test-component.py` - Test automation
- `skills/component-adaptation/SKILL.md` - Agent instructions
- Plus 4 other documentation files

---

## Testing the Integration

Try this flow:

1. **Open:** http://localhost:8000
2. **Navigate:** Productivity → Component Adaptation (Design System)
3. **Fill in:**
   - Screenshot: "Simple card with rounded corners"
   - Code: `<div style="background: #f5f5f5; padding: 20px;">...</div>`
   - Context: "Info card"
4. **Generate** the prompt
5. **Copy** and paste in Cursor
6. **Watch** automation execute the full workflow!

---

## What You Get

Every time you use this prompt, you receive:

✅ **Complete Web Component** (100% design tokens)  
✅ **Playwright Test Results** (automated verification)  
✅ **Visual Proof** (screenshots showing match)  
✅ **Token Mapping** (original → design system)  
✅ **Dark Mode Tested** (both color schemes)  
✅ **Integration Ready** (build + deploy instructions)  

---

## Status

- ✅ Prompt added to prompts-library
- ✅ 3 input variables configured
- ✅ Workflow text includes Playwright automation
- ✅ JSON validation passed
- ✅ Server running at localhost:8000
- ✅ Ready to use immediately

**Refresh your browser to see the new prompt!**

---

## Documentation

**Quick Start:** [COMPONENT-ADAPTATION-USAGE.md](COMPONENT-ADAPTATION-USAGE.md) in prompts-library

**Full Workflow:** See m3-design-v2 documentation files for complete methodology

**Your workflow is now part of your prompt library ecosystem!** 🎉
