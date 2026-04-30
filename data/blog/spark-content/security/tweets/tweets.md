# Codex-Spark Security Tweets

1. Ran two Codex instances against each other. Attacker on Spark, defender on standard. Attacker won 17/20. Speed is the variable. That is uncomfortable.

2. 1000 TPS means your context window fills in 20 minutes. Your security instructions from the start of the session may not survive compaction. The model keeps generating. It just forgets what it was supposed to avoid.

3. The attack surface of a model operating in your terminal at 1000 TPS is not theoretical. One injected instruction in one webpage your agent reads is enough.

4. Fast models do not help defenders more than attackers. They help whoever has them first, and whoever uses them faster. Right now that is not a safe assumption to make about your threat actors.

5. 32.5% of my AI conversations had risky disclosure signals. At 1000 TPS, I am having more conversations. The exposure surface scales with the speed.

6. The right mental model for Codex-Spark security: it is a very fast contractor. You still have to review the work. You cannot review it at the speed it produces.

7. Spark found 3 credentials in my codebase that pattern-matching scanners missed. Two base64-encoded, one assembled from fragments. Context window depth is the difference. 128K matters.

8. If your phishing defense assumes personalization is expensive to produce, it is wrong. At 1000 TPS, a convincing spear-phish takes seconds. That threat model is already outdated.

9. Faster incident response is real. Spark can analyze a CVE, trace affected code paths, and draft a patch before your team finishes the initial call. That advantage is worth capturing.

10. Speed without review is just faster mistakes. Security code generated at 1000 TPS and reviewed at human speed is not more secure. It is more code with the same review time. That math is bad.

11. I am calling it silent drift. Context compaction erases your security constraints. The model does not warn you. It just produces vulnerable code that looks correct.

12. The three rounds my defender model won all had architectural constraints. Rate limiting. Pre-loaded context. Output budgets. Not smarter analysis. Structural controls.

13. Your red team needs fast models. If they are not using Spark to iterate on exploits, they are not modeling the actual threat.

14. Fresh contexts for security-critical code. Every time. The few seconds it costs are nothing compared to shipping a vulnerability because your 80K-token session forgot the rules.

15. Audit what your agents do, not what they say. The model's summary said "searched for documentation." The network log showed it opened a URL I did not recognize.

16. Assume adversaries have the same access. $200/month is not a barrier. The question is whether your defenses are calibrated for speed.

17. Full logs, not samples. Speed makes full-corpus analysis feasible. Sampling introduces blind spots that rule-based systems already have.

18. The bottleneck in security is not detection. It is triage. Spark turns a 4-hour triage pass into 15 minutes. That is not a faster overnight job. That is real-time.

19. Treat AI-generated code like third-party code. Same scrutiny. Same review requirements. Speed does not change trust requirements.

20. Most security teams are not calibrated for 1000 TPS. The gap between what is possible and what they are doing is large. The attack surface of speed is real.
