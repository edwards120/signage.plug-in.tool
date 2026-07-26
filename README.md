# SignSpec Studio

**Field survey, estimating, and specification tools for sign professionals.**

SignSpec Studio is a practical signage workflow tool being developed by New Era Designs. The goal is to turn field measurements, storefront photos, sign-type decisions, material assumptions, and production notes into something organized enough to estimate, specify, present, and eventually hand off for fabrication.

I work between design and production, and that middle space gets messy fast. A project can begin with one photo and a few dimensions, then spread across Illustrator files, PDFs, emails, markups, material notes, pricing sheets, permit questions, and client approvals. SignSpec Studio is being built to connect those decisions before they become expensive mistakes.

This is not a replacement for a sign designer, fabricator, architect, engineer, permit reviewer, or accessibility specialist. It is a decision-support system: calculations, warnings, estimate logic, and repeatable documentation that help professionals work more clearly.

## Intended workflow

A sign-shop employee, freelance designer, architect, property manager, or environmental-graphics team can:

1. Create a project and record the site conditions.
2. Upload or reference storefront, doorway, interior, and survey photographs.
3. Select a sign type.
4. Enter measured dimensions and production assumptions.
5. Receive calculated areas, quantities, material allowances, and preliminary mounting notes.
6. Review deterministic ADA, visibility, and specification warnings.
7. Build labor, material, markup, and profit estimates.
8. Generate a branded proposal or specification summary.
9. Share the project for review and approval.

## V1 calculators

The initial product direction includes:

- ADA room signs
- Dimensional letters
- Wall cabinets
- Vinyl graphics
- Wayfinding panels
- Monument panels

## Current repository status

This repository now contains the first implementation of the rules layer. The code intentionally begins with transparent calculations rather than an opaque AI model.

Current starter rules include:

- Viewing-distance and letter-height guidance
- Sign-face and material-area calculations
- Vinyl square footage
- Waste allowance
- Mounting-height range checks
- Labor, material, markup, and selling-price calculations

The full project-intake interface, photo measurement workflow, proposal generator, approval links, permit logic, and host-software plug-ins are still planned.

## Repository structure

```text
src/
  index.ts          Public exports
  rules.ts          Signage calculations and warnings
  types.ts          Shared input and result types
examples/
  storefront.ts     Example calculation workflow
docs/
  PRODUCT.md        Product definition and boundaries
  ROADMAP.md        Development phases
.github/workflows/
  ci.yml            TypeScript validation and build check
```

## Development

```bash
npm install
npm run check
npm run build
```

Run the example after building:

```bash
npm run example
```

## Important limitations

- Results are preliminary guidance, not stamped engineering.
- Local codes, landlord criteria, electrical requirements, wind loads, structural attachment, fire access, and permitting must be independently verified.
- ADA-related outputs are prompts for review, not legal certification.
- Real material and labor pricing must come from the shop, vendor, or project team using the tool.

## Product direction

The calculation layer is intended to become a reusable `signspec-rules` package that can support a web application and, later, carefully scoped integrations for tools such as Illustrator, CorelDRAW, SketchUp, CAD, and production-management systems.

Built by **New Era Designs** in Houston, Texas.
