# Best Practices: Spark + Browser Automation

Two weeks of running Spark inside browser harnesses. These are the patterns that worked.

## Harness Selection

**Use Claude in Chrome for interactive work.** When you want to stay in the loop — redirect, approve, intervene — Claude in Chrome is the right harness.

**Use Browser Use for delegated research.** For workflows you want to walk away from, the Browser Use Python library with Spark via API is cleaner. No visual overhead. Runs headless. Output lands in your terminal.

**Use Nanobrowser for local model workflows.** BYOK. Runs locally. Multi-agent planner-navigator-validator architecture.

## Prompt Design for Speed

**Specify the output format explicitly.** Spark generates output so fast that a vague format request produces a long response before you can redirect. Tell it exactly what you want: markdown table, JSON, numbered list.

**Front-load the uncertainty acknowledgment.** Add this to research prompts: "If you cannot find a field explicitly stated, write 'not documented' rather than guessing." Spark moves so fast it will infer and present inferences as facts unless told otherwise.

**Leave room for synthesis.** Do not over-specify research tasks. Specify the goal and the output format. Let the model decide the path. At 1000 TPS the space you leave is where the most useful emergent outputs come from.

## Context Management

**Watch the 128K window.** At 1000 TPS you fill context fast. A 20-page research workflow can consume 60-80K tokens. Monitor usage. Start a new session before you hit compaction.

**Checkpoint after major phases.** For long workflows, save output after each major phase. If the workflow fails at step 15, you restart from the last checkpoint, not from the beginning.

**Clear between unrelated tasks.** Do not carry context from a GitHub research task into a competitor analysis task. Fresh context for each unrelated workflow.

## Retry Loop Design

**Build retry loops explicitly.** Do not hope the workflow succeeds on the first attempt. Build the retry logic. At Spark speeds retries cost almost nothing.

**Add verification steps at decision points.** Not after every action. At the critical junctures. Before form submission. After navigation to a new page. After data extraction.

**Set confidence thresholds.** Ask the model to rate its own confidence on extracted data. Flag low-confidence outputs for review.

## Parallel Workflow Patterns

**Run 10, keep 3.** For research and data extraction tasks, run multiple parallel attempts. The variance across attempts surfaces which data is reliable.

**Cherry-pick by structure, not just content.** Pick the output with the best structure and coverage, not just the one that looks most polished.

## Common Failure Modes

**Deferred DOM rendering.** Fast models read the page before JavaScript has rendered the content. Add "wait 2-3 seconds after page load before reading content" to prompts for SPAs.

**Compound errors on long chains.** An error at step 3 can silently corrupt steps 4-15. Trace back to the earliest decision point.

**Overconfident synthesis.** The model presents inferences as facts when moving fast. Treat any unsolicited synthesis as a hypothesis. Verify before acting.

**Bot detection on headless automation.** Sites with aggressive bot detection will block headless browser workflows. Use Claude in Chrome instead.

## The Core Mental Model

Stop thinking about automation reliability. Start thinking about automation speed plus correction speed.

A system that fails 10% of the time but corrects in under a second is more productive than a system that fails 2% of the time but corrects in 25 seconds.

Build for fast correction. Not for zero failure.

That is the shift Spark enables.

## What I Would Tell You

1. **Pick the right harness.** Claude in Chrome for interactive. Browser Use for delegated. Nanobrowser for local.

2. **Specify format upfront.** Vague format requests produce verbose output before you can redirect.

3. **Build retry loops.** At Spark speeds retries are nearly free.

4. **Run parallel and cherry-pick.** 10 workflows in 6 minutes. Keep the best.

5. **Verify emergent outputs.** The model synthesizes well but not perfectly. Check before you act.

6. **Speed plus correction beats perfect reliability.** This is the key insight.
