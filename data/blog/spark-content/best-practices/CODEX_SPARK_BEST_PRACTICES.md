# Codex-Spark Best Practices & Tips

Three weeks of testing. Here is what I learned.

## Model-Specific Observations

### Speed Characteristics

| Spec                      | Value                                 |
| ------------------------- | ------------------------------------- |
| Speed                     | 1000+ tokens/second on Cerebras WSE-3 |
| Speedup vs standard Codex | ~15x                                  |
| Context window            | 128K tokens (text only, no vision)    |
| SWE-Bench Pro             | 56.8%                                 |

### Context Management

At 1000 TPS, context fills fast. A 128K token window can fill in 2-3 minutes of continuous generation.

| Context Usage | Behavior                                         |
| ------------- | ------------------------------------------------ |
| 0-30%         | Sharp. Follows instructions precisely.           |
| 30-60%        | Good. Minor drift on complex tasks.              |
| 60-80%        | Compaction likely. Losing earlier context.       |
| 80-100%       | Compaction guaranteed. Start a new conversation. |

**Rule:** Stay under 60% context usage. Clear after every task.

## Top Tips

### 1. Clear context after every task

Start fresh. Do not accumulate. Each new task gets a clean context window.

### 2. Be precise up front

Vague prompts with Spark produce wrong output at high speed. Include file paths, function names, expected behavior, edge cases.

### 3. Batch, do not chain

Run independent tasks as separate prompts with clean context. Database schema in one prompt. API handler in another. Tests in a third.

### 4. Use it for breadth

Generate 5-10 variations. Pick the best one. The cost of exploration is almost zero at this speed.

### 5. Avoid long sessions

Two compaction events is your limit. After that, start a new conversation.

### 6. Pair it with vision

Spark is text-only. Use a vision model (Claude, GLM-4.5V) for UI work and screenshots.

### 7. Resist the scroll

Speed feels like productivity. It is not. Stop. Think. Then prompt again.

### 8. Use Spark for 80% of daily coding

Quick edits, bug fixes, code review annotations, utility functions, test generation. Switch to full Codex for architecture decisions, security audits, legacy migrations.

### 9. Treat it like a keyboard shortcut

At 1000 TPS the model finishes before you can context switch. Describe a utility function, have it in under a second, paste it in, move on.

### 10. Monitor for silent drift

The model drifts subtly, not obviously. It still produces code — just not the code you asked for. Read output carefully even when it arrives instantly.

## What Spark Does Best

- Real-time code editing with instant feedback
- Live pair programming sessions
- Quick bug fixes and code review
- Generating multiple UI/component mockups for selection
- Browser automation at speed
- Utility function generation (keyboard-shortcut speed)

## What to Use Full Codex For

- Complex multi-file refactoring
- Architecture design decisions
- Security audits
- Legacy code migrations
- Tasks requiring >60% context window

## Hardware Context

Runs on Cerebras WSE-3. 46,225 mm² die. 4 trillion transistors. 900K AI cores.

Entire model fits on single chip — no inter-GPU communication overhead.

First OpenAI model not running on NVIDIA hardware.

## What I Would Tell You

1. **Speed changes workflow, not just pace.** Everything you learned about slow models is wrong for fast ones.

2. **Stay in one context.** The focus advantage is the real win.

3. **Prompt short.** One thing at a time. Batching is for slow models.

4. **Generate many, pick the best.** Exploration cost is near zero.

5. **Clear context before compaction.** 60% is your limit.

6. **You decide, it executes.** Architecture is yours. Execution is the model's.

7. **Speed is the mechanism. Focus is the output.** Treat them that way.
