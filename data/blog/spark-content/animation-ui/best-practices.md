# Best Practices: Animation & UI Rendering with Codex-Spark

Practical patterns for rapid UI iteration. These are things that worked.

## Core Principle: Exploration is Free, Commitment is Expensive

With standard tooling, the cost of generating a bad output is minutes. You protect against that by over-speccing prompts.

With Spark, the cost of generating a bad output is seconds. The protection you need is the opposite: generate many outputs, evaluate, discard what does not work.

Recalibrate your instincts. Stop optimizing prompts for single-shot accuracy. Start optimizing for cheap exploration.

## Single-File Prototyping

**Always start with HTML/CSS/JS in one file.**

No build step. No dependency resolution. Browser opens it directly. The feedback cycle is: generate, open, look, decide.

Structure with:

- All CSS in a `<style>` block at the top
- All JavaScript in a `<script>` block at the bottom
- Inline SVG for complex graphics
- No external dependencies

Use a watcher script that opens the file automatically when it changes.

## Iteration Volume

**Generate more variations than feels necessary.**

The target: five to ten variations before evaluating anything. Do not stop at the first one that works.

The best design option is often not the first one. It is the third or fifth.

**Practical session structure:**

1. Write a loose prompt. Do not over-specify.
2. Generate five variations without evaluating mid-stream.
3. Look at all five. Note what works in each.
4. Generate five more, informed by what you saw.
5. Pick the best from the full ten.

## Ralph Loops: Automated Review Cycles

Use automated generate-review-fix-test cycles for components with clear correctness criteria.

**Requirements:**

- A clear spec. What the component does, inputs, states.
- Testable review criteria. Does the animation trigger on mount? Does it handle 320px viewport?
- A feedback format the model can use. Structured error output.
- A stop condition. All criteria pass, or maximum five iterations.

## The Breadth/Depth Split

**Rule: use Spark for direction, use full Codex for destination.**

| Task                          | Tool       | Reason                                   |
| ----------------------------- | ---------- | ---------------------------------------- |
| Exploring layout options      | Spark      | High iteration count, loose requirements |
| Tuning animation timing       | Spark      | Empirical, needs many small iterations   |
| Building production component | Full Codex | Coherence, edge cases, integration       |
| Generating variation set      | Spark      | Speed is the entire point                |

Apply the rule at the task level, not the session level.

## Visual Work Requires Running Code

**Never evaluate CSS animations, SVG transitions, or Canvas drawing from static output.**

You cannot reason your way to the right animation timing curve. You have to see it move.

For all visual work: evaluate live. Generate, open, watch, decide.

## Prompt Strategies for Visual Generation

**Be concrete about what you want to see, loose about implementation.**

Good: "Animated data table where rows slide in with staggered timing when data loads"
Bad: "Use CSS transitions with animation-delay incrementing by 50ms per row"

Let Spark choose implementation. You evaluate the outcome.

**For animation:**

- Describe the feeling, not the curve: "snappy and responsive"
- State the trigger: on mount, on hover, on scroll
- State the content range: "handles 0 to 200 rows"

## Session Hygiene

**Keep iterations isolated until you find the winner.**

When running multiple variations, save each to a separate file: `v1.html`, `v2.html`, etc. Do not overwrite.

**Track what you tried, not just what you kept.**

After picking a winner, write two sentences about why you picked it and what did not work in the others.

**Know when to stop exploring.**

If variations eight through ten are not adding new information, you have found the local optimum. Move to the depth phase.

## What Not to Use Spark For

**Long-form integration work.** Spark can lose coherence across very long, architecturally complex generations.

**Tasks requiring precise context fidelity.** If the model needs to deeply understand an existing system, use full Codex.

**Final production code in regulated environments.** Security-sensitive, compliance-relevant code needs human review regardless of model speed.

## What I Would Tell You

1. **Start with single-file prototypes.** No build step. Browser opens directly.

2. **Generate five to ten variations before evaluating.** The best option is rarely the first.

3. **Evaluate live, not static.** You cannot see animation timing in code.

4. **Use Spark for breadth, full Codex for depth.** Two different tools for two different phases.

5. **Leave room in your prompts.** Over-specifying kills emergence.

6. **Stop when variations stop adding new information.** Move to the depth phase.

Speed is the mechanism. Exploration is the output. Treat them that way.
