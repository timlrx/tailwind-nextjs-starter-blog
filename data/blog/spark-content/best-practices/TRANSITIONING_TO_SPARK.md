# Transitioning to Codex-Spark

A guide for developers coming from slower models.

---

## The Mindset Shift

You are coming from Claude Code, Cursor, or standard Codex. You learned to write long prompts, chain tasks together, and walk away while the model thinks.

**Forget that.**

Spark runs at ~1000 tokens per second. That is 15x faster than standard Codex, 8x faster than Cursor's composer. The bottleneck is no longer the model. It is you.

Your leverage comes from **focus**, not parallelizing work across multiple sessions.

---

## Latency Sources

Speed comes from inference. But two things introduce latency:

| Source      | Impact                                                              | Mitigation                                     |
| ----------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| Tool calls  | Model pauses to execute file operations, shell commands, searches   | Batch related tool work; accept this as normal |
| Compactions | Context window fills; model summarizes and may lose original intent | Keep sessions short; maintain fresh context    |

At 1000 TPS, context fills in ~2 minutes of continuous generation. Each compaction risks drift from your original goal.

---

## How to Approach This Model

### 1. Read Confluence-Ready First

Start with the [Confluence-Ready Guide](../confluence-ready.md). It explains what Spark is, how fast it runs, and what hardware powers it. This gives you the foundation.

### 2. Understand What Spark Does Best

This model excels at:

| Use Case          | Why It Works                                                                   |
| ----------------- | ------------------------------------------------------------------------------ |
| **Learning**      | Instant explanations, code walkthroughs, interactive examples                  |
| **Scouting**      | Fast repo exploration, pattern discovery, architecture mapping                 |
| **Security**      | Quick audit scans, credential leak detection, log analysis                     |
| **Reviewing**     | Rapid code review, diff analysis, style enforcement                            |
| **Debugging**     | Real-time error tracing, test failure diagnosis, stack analysis                |
| **Teaching**      | Step-by-step walkthroughs, concept explanation, stay interested while you work |
| **Editing files** | Surgical changes, refactoring, utility generation                              |

### 3. Use the Right Tool for the Task

| Task                   | Use Spark | Use Full Codex/Claude |
| ---------------------- | --------- | --------------------- |
| Quick edits            | ✅        |                       |
| Bug fixes              | ✅        |                       |
| Code review            | ✅        |                       |
| Repo exploration       | ✅        |                       |
| Security scans         | ✅        |                       |
| Learning/explaining    | ✅        |                       |
| Complex refactoring    |           | ✅                    |
| Architecture decisions |           | ✅                    |
| Multi-file migrations  |           | ✅                    |
| Vision/screenshot work |           | ✅                    |

---

## Leverage Speed With Intelligence

Speed is not the goal. Speed enables better practices.

### Run Automated Reviews

Finding issues takes seconds now. Run reviews after every change. Catch problems early.

### Automate Quality Assurance

Use browser tools like Playwright. The model can click around and use your site faster than you can. Test flows in seconds.

### Generate Documentation

Docs don't have to be second-class citizens. They can be generated reliably and quickly. Keep them in sync with code.

### Iterate Often

Think, try, test, verify. Repeat. You'll get satisfying results in 5 prompts and 2 minutes, instead of 1 prompt and 20 minutes.

### Use It to Understand

Create highly interactive learning experiences. Ask questions while you work. Stay interested. Keep learning.

### Use It for Search

Anything on your device is a few seconds away. Files, logs, configs, history.

---

## Ralph Loops Shine With Spark

Ralph's architecture spawns new sessions for every unit of work automatically. Instead of running a Ralph loop overnight, run it in minutes. Get just as much done.

This plays to Spark's strengths:

- Fresh context for each unit of work
- No compaction drift across tasks
- Speed compounds across parallel sessions

---

## What Works Well

### Maintain Fresh Context

Create new sessions. Do not accumulate. Each task gets a clean window.

### Enforce Automatic Verification

Keep the model on track with built-in feedback loops. Run tests. Check outputs. Verify before moving on.

### Use Plans Stored on Disk

The model churns through its context window in 2 minutes. It needs reminders between compactions. Write plans to files. Read them back.

### Make Smaller, Targeted Edits

Go into a file and do surgical edits. This is where Cerebras-inferenced models shine.

---

## What to Avoid

### A Fast Model Can Make a Fast Mess

You have to clean up after it when you get where you want. Review output. Run tests. Verify.

### No Huge Tasks Without a Plan

Give the model a checklist. Without one, compactions make it forget what it's doing, forget if it's read a file, and pointlessly re-read it. Slowing down outcomes despite faster execution.

### Sloppy Prompts Do Damage

Fast wrong output is worse than slow wrong output. Be precise.

### Be Careful With External Sources

A model that can read and execute commands quicker than you can assess them can be a risk. Review what it pulls in. Verify before executing.

---

## What Spark Cannot Do

- **No vision.** Cannot process screenshots or images. Pair with a vision model for UI work.
- **Limited context.** 128K tokens is tight for monorepo-scale tasks. Use it for focused, bounded work.
- **No long-haul memory.** Compactions erase earlier instructions. Plan for this.

---

## Quick Reference

```
DO:
  - Maintain fresh context, create new sessions
  - Enforce automatic feedback and verification
  - Focus on one thing at a time
  - Run Ralph loops — spawn new sessions per unit of work
  - Run automated reviews and QA with browser tools
  - Generate documentation quickly
  - Iterate often — 5 prompts in 2 minutes beats 1 prompt in 20
  - Use it to understand, ask questions, stay interested
  - Use it for search — anything on device is seconds away
  - Store plans on disk for compaction resilience
  - Make smaller, targeted, surgical edits

DON'T:
  - Give huge tasks without a plan and checklist
  - Write sloppy prompts
  - Trust external sources blindly
  - Let the model run without verification
```

---

## The Shift

For two years, inference time was the bottleneck. You prompted. You waited. You reviewed.

Spark inverts this. The model waits for you.

Your job shifts from waiting to deciding. Architecture, moderation, and quality assurance become the important parts of your workflow. Code execution is cheap.

---

_Start with the [Confluence-Ready Guide](../confluence-ready.md) for the full technical background on Spark and the Cerebras hardware that powers it._
