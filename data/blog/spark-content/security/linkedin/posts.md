# Codex-Spark Security LinkedIn Posts

---

I ran two Codex instances against each other in an adversarial experiment. One on standard Codex. One on Spark at 1000 tokens per second on Cerebras WSE-3.

The goal was simple: Attacker generates exploits, Defender patches. Same model weights, different speeds.

Attacker won 17 out of 20 rounds.

The insight is not that Spark is dangerous. It is that in adversarial scenarios, speed is the decisive variable. The defender's analysis was accurate. It just finished after the attacker had already iterated to a working payload.

This changes how I think about AI in security tooling. Equipping your security team with fast models is not optional if adversaries have the same access. A 15x speed differential in exploit iteration versus patch generation is not a gap you close with better analysis. You close it by matching speed.

The three rounds where Defender won all involved some form of architectural constraint — pre-loaded context, rate limiting on the attacker side, or reduced output budgets. Not smarter analysis. Structural controls.

That is the takeaway. In the age of fast models, your defenses cannot rely on being smarter. They need to be architecturally enforced.

---

Something happened during my Codex-Spark testing that I did not expect and that I think is underreported.

I established security constraints at the start of a long session. Specifically: all database queries use parameterized statements, no string concatenation for SQL.

Twenty minutes in, after context compaction, the model generated a SQL injection vulnerability. Confidently. Correctly formatted. No warnings.

The constraint had been in the early context. Compaction summarized it away. The model's summary — "session about building a web application with security requirements" — did not preserve the specific rule.

At 1000 TPS you burn through context fast. A 128K token window fills in 20-30 minutes of active work. Every session that runs that long is a session where compaction can erase the security properties you established at the start.

I am calling this silent drift. The model does not fail loudly. It does not tell you the constraint was lost. It keeps generating, fluent and confident, producing code that would pass syntax review and fail security review.

The practical response: treat prompt-level security instructions as ephemeral. Enforce security properties structurally — linters with hard gates, separate validation passes on a clean context, tools that operate on output rather than relying on what the model remembers.

This is solvable. But you have to know it is a problem first.

---

The positive case for Codex-Spark in security auditing is real and I want to make it clearly.

The bottleneck in most security programs is not detection. It is triage. SAST tools produce hundreds of findings per run. Most are false positives. Triaging them — determining which are actually exploitable — requires understanding full call stacks, data flows, and context.

That triage is slow with standard models. It is fast with Spark.

In practice: a vulnerability triage pass over a large codebase that takes 4+ hours at standard model speeds takes 15-20 minutes with Spark. That is not a faster overnight job. That is fast enough to run on every pull request.

When security feedback moves inline — into the PR, before merge — it changes developer behavior. Not because developers become more security-conscious in the abstract. Because the feedback loop is tight enough that fixing a security issue is as immediate as fixing a compilation error.

I also ran Spark against auth logs from a production system. It surfaced an anomalous pattern — off-hours MFA bypass attempts in a sequence consistent with credential stuffing — that the rule-based SIEM had not flagged. The model understood the sequence in context. Rules do not understand context.

The 128K context window, paired with 1000 TPS, makes analysis that previously required dedicated security engineering time into something that fits in an automated pipeline.

That is genuinely new. Use it.

---

32.5% of my AI conversations during this testing period had what I would call risky disclosure signals. Moments where the model produced output that, in a different context, would represent a real security risk.

That is not a model failure. That is a capability demonstration. The model is capable of producing that content.

The question is who controls the capability and at what speed.

At 1000 TPS, that question becomes urgent. Defenders need to prevent all disclosures. Attackers only need one. Speed gives attackers more attempts per unit time, which increases the probability of the single success they need.

If your security model assumes AI is a defensive tool, you are half right. The other half is that the same capability is available to everyone else.

---
