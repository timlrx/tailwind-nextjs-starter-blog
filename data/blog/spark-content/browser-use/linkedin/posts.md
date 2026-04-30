# LinkedIn Posts — Spark + Browser Automation

---

I spent two weeks running Codex-Spark inside browser harnesses. Here is the clearest way I can explain what changed.

A fast model without a browser harness is a brain in a jar. Extraordinary intelligence. No way to act on the world. A browser harness without speed is a car with no engine. The infrastructure exists. Nothing moves.

Spark at 1000 tokens per second is the fuel the car needed.

I tested this on real research workflows. Deep research a GitHub profile, scan 10 competitor sites, extract structured data from documentation pages. What used to take 45 minutes takes 4. What used to feel like watching paint dry now feels like delegation.

The combination matters more than either component alone. This is worth understanding if you are building AI into knowledge work. The model capability discussion is mostly solved. The harness question is where the real work is now.

---

For two years I evaluated browser automation tools by error rate. How often does the model misclick. How often does it go off course.

I was measuring the wrong thing.

At 67 tokens per second, an error in a browser workflow costs 15-25 seconds of recovery time. At 1000 tokens per second, a misclick recovery costs under a second. The error rate stays the same. The cost of errors drops by roughly 15x.

This changes what is viable. Tasks I wrote off as too complex for AI automation are now straightforward. Not because the model got smarter. Because imperfection got cheap.

The right mental model: stop optimizing for zero errors. Build fast-correcting systems. Let the retry loop handle the edge cases. At Spark speeds the retry loop costs almost nothing.

I run 10 parallel browser workflows now and cherry-pick the results I want. 6 minutes for 10 research reports. That is not a workflow you design with a slow model.

---

I gave Spark a structured research task. Collect specific data from a GitHub profile. Standard extraction work.

What came back was not what I specified. It was better.

The model returned everything I asked for, plus a section I did not request: an analysis of contribution patterns inferred from the public commit graph, a note on the developer's apparent focus area based on repository naming, and a flag on a high-star repository that appeared dormant.

I did not prompt for any of that. The model synthesized it from browser context it had accumulated across multiple pages. It was working fast enough to hold all of those pages clearly in memory when it wrote the summary.

This is what changes at 1000 tokens per second. The model visits more pages before context pressure builds. It holds more data clearly when it draws conclusions. The outputs that emerge from that are qualitatively different.

The practical implication: do not over-specify the prompt. Leave room for the model to synthesize. At Spark speeds, that space is where the most useful outputs come from.
