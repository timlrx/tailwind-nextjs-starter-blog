# Realtime Coding Best Practices — Codex-Spark

I spent three weeks coding with Spark. Here is what works.

The core insight: speed changes the workflow, not just the pace. Everything you learned about using slow models is wrong for fast ones.

## Stay in One Codebase

The entire value of realtime coding is focus. Open one repo. Close the others.

The temptation is to run multiple agents across multiple projects the way you would with slow models. Do not. Spark is fast enough that you can make real progress on one problem in a single session. Spreading attention across repos wastes the focus advantage.

If you need to work on multiple things, batch them into separate focused sessions, not simultaneous ones.

## Break the Walk-Away Reflex

Two years of slow models conditioned every developer to leave while the model thinks. That reflex is now a habit that works against you.

When you prompt Spark, look at the screen before you do anything else. The answer is almost certainly already there. Read it. Respond to it. Stay in the conversation.

The walk-away reflex breaks the tight loop that makes realtime coding work. Catch it deliberately until the new habit forms.

## Prompt Short

Long prompts with slow models were rational. You batched everything into one ask to minimize the number of 60-second waits.

With Spark the cost of an additional prompt is under one second. There is no reason to batch. Describe one thing. Get it. Describe the next thing.

Short prompts are also more precise. A one-sentence description of a function is easier to write correctly than a five-sentence specification.

## Be Specific, Not Verbose

Speed punishes vague prompts more than slow models do. With a slow model you have time to redirect. With Spark you see the wrong output instantly.

Include the file path. The function name. The exact expected behavior. The edge case. Not in a long paragraph — in precise terms.

"Add error handling to the parse_response function in api/client.py for null values" beats "improve error handling in the API layer."

## Stay Surgical — One Change at a Time

Resist the urge to ask for large autonomous refactors. With slow models a big diff at the end of a long agent run was unavoidable. With Spark it is a choice.

Make one targeted change. Review it in full. Make the next one. The speed means this is not slower — it is faster because you catch problems before they compound.

If you cannot fully understand a diff in 30 seconds, it is too large. Tighten the scope.

## You Handle Architecture — Let the Model Handle Execution

This is the division that works.

Architecture decisions require your judgment: what goes where, what abstractions to use, what changes affect the structure of the system. Make these yourself before you describe anything to the model.

Execution is what you describe: write this function, convert this format, add these tests, handle this error. The model does this faster than you would and you stay focused on the next decision.

## Watch Context Usage

128,000 tokens at 1000 TPS means you can fill the context in a short session. Monitor usage actively.

| Context Range | Behavior                                          |
| ------------- | ------------------------------------------------- |
| 0-30%         | Sharp, precise, follows instructions well         |
| 30-60%        | Good with some drift on complex multi-step tasks  |
| 60-80%        | Compaction risk, earlier context starting to fade |
| 80%+          | Start a new conversation                          |

Do not wait for compaction to happen. End sessions before they degrade.

## Generate Multiple Variations — Then Choose

With slow models generating 5 variations of a component costs 5 minutes. Nobody does it.

With Spark it costs 5 seconds. Use that.

When you are uncertain about an implementation, describe it and ask for two or three versions. Read them. Pick the one that fits. The exploration cost is near zero.

## Resist the Scroll

Speed creates a specific failure mode. You keep prompting because prompting feels like progress. Output keeps appearing. You keep scrolling.

But you are the bottleneck now. If you do not pause to evaluate, you generate waste at high speed instead of progress.

After each response, stop. Actually read it. Decide what the next thing is before you type it. The pause is productive. The scroll is not.

## End Sessions Before You Drift

Fatigue and context saturation create the same symptom: prompts get sloppier, outputs get worse, you start re-prompting the same things.

The session is done when your prompts start getting vague. Not when the context hits 80%. When you notice your own precision dropping.

Fresh session, fresh context, fresh thinking. The speed means starting over is not expensive. Use that.

## What I Would Tell You

1. **One repo per session.** Close everything else.

2. **Break the walk-away habit.** Look at the screen. The answer is already there.

3. **Prompt short.** One thing at a time. Batching is for slow models.

4. **Stay surgical.** Small diffs, full review, next change.

5. **You decide, it executes.** Architecture is yours. Execution is the model's.

6. **Watch context.** Start fresh before you hit 80%.

7. **Resist the scroll.** Stop. Read. Think. Then prompt again.

Speed is the mechanism. Focus is the output. Treat them that way.
