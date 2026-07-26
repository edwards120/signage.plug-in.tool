# SignSpec Studio — Product Definition

## Purpose

SignSpec Studio is a field-survey, estimating, and specification system for signage and environmental-graphics work.

It is being designed for the part of the workflow where a project is real enough to require dimensions, materials, mounting logic, labor assumptions, warnings, and client-facing documentation—but still early enough that information is fragmented and mistakes are easy to make.

## Intended users

- Sign-shop designers and project managers
- Freelance signage and environmental-graphics designers
- Architects and interior teams coordinating signage
- Property managers collecting preliminary site information
- Estimators and production coordinators
- New Era Designs and its collaborators

## Core product principles

1. **Deterministic before generative** — calculations and warnings must be traceable.
2. **Field conditions matter** — photographs, dimensions, substrate, access, power, visibility, and installation context belong in the project record.
3. **One source of project truth** — survey information, estimate assumptions, specification notes, and approvals should stay connected.
4. **Warnings, not false certification** — the tool should surface review points without claiming to replace licensed professionals or authorities.
5. **Fabrication-aware output** — dimensions, materials, returns, mounting, illumination, access, and install assumptions should be visible before presentation.
6. **Human approval remains required** — no calculation should silently become a final production instruction.

## V1 product areas

### Project intake

- Client and site information
- Survey date and surveyor
- Address and installation context
- Photographs and annotations
- Known dimensions and missing dimensions
- Substrate, access, electrical, and visibility notes

### Sign calculators

- ADA room sign
- Dimensional letters
- Wall cabinet
- Vinyl graphic
- Wayfinding panel
- Monument panel

### Rules and warning engine

- Missing-measurement warnings
- Viewing-distance and preliminary letter-height guidance
- Configurable mounting-height checks
- Material-area and quantity calculations
- Waste allowances
- Labor, material, markup, and gross-margin calculations
- Review flags for code, engineering, electrical, access, landlord, and permitting questions

### Estimate builder

- Material costs
- Waste factors
- Labor hours and rates
- Equipment, permit, freight, and subcontract costs
- Markup and selling price
- Assumption and exclusion notes

### Documentation

- Survey summary
- Sign schedule
- Preliminary specification sheet
- Estimate or proposal
- Client approval record

## Explicitly outside the current scope

- Stamped structural or electrical engineering
- Permit approval
- Final ADA or building-code certification
- Automatic measurement from an uncalibrated photograph
- Fabrication release without human review
- Guaranteed material, vendor, or labor pricing
- Production-ready integrations that have not been tested against the host application

## Long-term integration direction

The rules package may later support interfaces or plug-ins for Illustrator, CorelDRAW, SketchUp, CAD, production-management systems, and browser-based project tools. Each integration should remain a separate adapter around the shared calculation and project-data layer.
