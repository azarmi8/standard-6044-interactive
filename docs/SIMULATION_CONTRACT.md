# SIMULATION_CONTRACT — Standard 6044 Interactive

## Purpose
Define one shared contract for engineering simulations in the 6044:1397 interactive book.

## Required layers
1. **SOURCE** — exact standard basis: chapter/clause/table/page where available.
2. **SCENARIO** — user-entered educational data; never presented as source data.
3. **CALCULATION** — deterministic formula/decision logic derived from SOURCE.
4. **RESULT** — calculated values and decision.
5. **EXPLANATION** — plain-language interpretation; must not add requirements.
6. **VALIDATION** — known test cases and input constraints.

## Rules
- No invented acceptance limits.
- Units must be explicit.
- Source thresholds/formulas must be versioned in content/docs.
- Ambiguous source values stay blocked until source-page verification.
- Invalid input fails closed; never silently coerces missing data.
- Scenario data may be hypothetical and must be labeled.
- Display wording may be Persian; calculation logic must remain deterministic.
- Every simulation must be usable without AI or paid services.
- Reduced-motion/accessibility must not remove the simulation's information.
- Educational simulation output is not a project acceptance certificate.

## Minimum implementation shape
A simulation should expose:
- `id`
- `source`
- `inputs`
- `validate(inputs)`
- `calculate(inputs)`
- `format(result)`
- `testCases`

## Chapter 11 pilot
**ID:** `ch11-compressive-conformity`

**SOURCE:** Chapter 11, clauses 11-1/11-2; source pages 28–30.

**Criteria implemented:**
- mean of three consecutive sampling results >= `fc`
- no individual specimen result < `0.9 fc`

**Scenario inputs:** `fc`, `r1`, `r2`, `r3`, all in MPa.

**Educational validation cases:**
- 30, 29, 31, 30 -> mean 30 -> PASS
- 30, 26, 31, 30 -> mean 29 -> FAIL (individual criterion)
- 30, 27, 30, 30 -> mean 29 -> PASS
- 30, 20, 40, 40 -> mean 33.33 -> FAIL (individual criterion)

These are hypothetical test cases derived from the source criteria, not source measurements.

## Exit gate
A simulation is complete only when its source basis, deterministic logic, validation cases, UI labeling and QA coverage are present.
