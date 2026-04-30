# Realtime Coding LinkedIn Posts — Codex-Spark

---

The coding world has gone from writing all code by hand to some developers writing almost none. But most of us missed something in that transition: slow AI models trained us to leave.

Prompt. Wait 30-60 seconds. Open another project. Come back. Re-read. Re-engage. We called this efficient. It is actually a coping mechanism for slow inference.

I spent weeks working with Codex-Spark on Cerebras hardware. It runs at over 1000 tokens per second — 15x faster than standard Codex. That speed changes something that faster hardware is not supposed to change: your relationship to the work.

At one second response time you do not switch away. The output is already there. You read it. You are still in context. You prompt again. I ran a 40-minute session in a single codebase without opening another tab. That had not happened in months of AI-assisted development.

Speed is not just faster output. It is the thing that keeps you in flow.

---

There is a mental model that forms when you use slow AI models long enough.

AI as contractor. You write the spec. You submit. You wait. You review the deliverable. The feedback loop is minutes long. You are a manager, not a developer.

I tested Spark on my vllm-studio codebase and noticed the mental model shift immediately. When the response arrives before your hand leaves the keyboard, you are not managing anymore. You are in a conversation.

Short questions instead of long specs. Continuous iteration instead of batch-and-review. The model handles execution at speed while you hold the architectural intent.

This is closer to pair programming than delegation. With standard Codex I prompt and walk away. With Spark I prompt and read. That distinction sounds minor. In practice it changes everything.

The bottleneck is not the model anymore. It is your ability to think clearly and describe precisely. That is a better problem to have.

---

For two years my AI-assisted coding setup looked like this: three terminal windows, three repos, one agent per repo, rotating between them as each one finished a task.

It felt efficient. Things were always happening somewhere. I was never idle.

What I was actually doing: paying the re-engagement cost every time I came back to each codebase. Neuroscience puts that cost at 10-25 minutes for deep work. Three repos, four rotations each — I was spending a significant portion of my cognitive budget just catching back up.

The multitasking habit formed because the alternative was sitting idle while a slow model ran. It was the rational response to a real constraint.

Spark at 1000+ tokens per second eliminated the constraint. At one second per response there is no gap to fill. You stay.

Since switching I work on one codebase at a time with my full attention. The model keeps up with my thinking. I keep up with the model. The session stays coherent because I stay coherent.

One problem done well is worth more than four problems managed in rotation. Speed made me realize I never believed that until the gap that caused multitasking stopped existing.

---
