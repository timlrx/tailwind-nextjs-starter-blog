# Managing Codex-Spark: 1000 Tokens Per Second Changes Everything

I have been working with GPT-5.3-Codex-Spark for about a week now, my main model has been GPT-5.\*-Codex for 4 months now. They've been a major unlock for me, the models have such raw intelligence, and feel almost surgically precise.

I have been conditioned over this period to write long, detailed, prompts aiming to get the models to work for 1 to 2 hours in 1 turn, I did this because to leverage this intelligence, I needed to parallelise my work over multiple sessions.

This model felt different though, it runs at over 1000 tokens per second, that is 4-8x faster than Cursor's composer-1 and 15x faster than Opus/Codex. You might wonder, what can I possibly do with all that speed, I initially felt the same.

I've tested it in a variety of environments, from CLI based coding tools like [Codex](https://github.com/openai/codex), [Pi](https://github.com/mariozechner/pi-coding-agent), and [OpenCode](https://github.com/nicepkg/opencode); to IDEs like [Zed](https://zed.dev/), and even for browser automation, to get a feel for how to use this in production.

I had to rethink how I work with AI. Everything I learned from Claude Code and Cursor does not fully apply here. The speed changes the relationship between you and the model. I agree with OpenAI's description of real time coding.

---

## What is Codex-Spark

Spark is a slightly smaller version of GPT-5.3-Codex, it boasts 128k token context window while retaining a lot of the original's intelligence.

It is a research preview. Available for [ChatGPT Pro](https://openai.com/chatgpt/pricing/) users.

> **Announcement:** [Introducing OpenAI GPT-5.3-Codex-Spark Powered by Cerebras](https://cerebras.ai/blog/openai-codexspark)

The benchmarks look solid, but don't tell the whole story:

| Benchmark           | Codex-Spark  | GPT-5.3-Codex (Standard) | GPT-5.1-Codex-mini |
| ------------------- | ------------ | ------------------------ | ------------------ |
| Terminal-Bench 2.0  | 58.4%        | 77.3%                    | 46.1%              |
| SWE-Bench Pro       | 56.8%        | 56.8%                    | --                 |
| Inference Speed     | >1,000 tok/s | ~67 tok/s                | --                 |
| SWE-Bench task time | 2-3 min      | 15-17 min                | --                 |

This is not a dumbed down model with speed. It scores higher than GPT-5.1-Codex-mini on every metric while being 15x faster than standard 5.3-Codex.

OpenAI also reports a 15x increase in token/s.

---

## Why is it so fast

The speed is powered by [Cerebras](https://cerebras.ai/), the producer of the fastest AI inference engine available today, powered by specialised hardware and software built for scale.

[![Cerebras WSE-3 Wafer-Scale Engine — the world's largest AI chip](https://www.servethehome.com/wp-content/uploads/2024/03/Cerebras-WSE-3-Wafer.jpg)](https://cerebras.ai/chip)

_The Cerebras WSE-3 — 46,225 mm² of silicon, the largest AI chip ever built. [Source: ServeTheHome](https://www.servethehome.com/cerebras-wse-3-ai-chip-launched-56x-larger-than-nvidia-h100-vertiv-supermicro-hpe-qualcomm/)_

The Wafer-Scale Engine 3 is exactly what it sounds like. They take the largest square they can from a silicon wafer and use the whole thing as one chip. By reducing interchip communication they can multiply the speed gains.

[![Cerebras WSE-3 vs NVIDIA H100 — size comparison](https://www.servethehome.com/wp-content/uploads/2024/03/Cerebras-WSE-3-vs-NVIDIA-H100.jpg)](https://cerebras.ai/chip)

_WSE-3 vs NVIDIA H100 — 57x larger die. [Source: ServeTheHome](https://www.servethehome.com/cerebras-wse-3-ai-chip-launched-56x-larger-than-nvidia-h100-vertiv-supermicro-hpe-qualcomm/)_

I have been following Cerebras for a while. I ran their REAP models on my home-lab.

> "I spent the last few days running Cerebras' REAP models. I ran GLM-4.5-Air-Reap-82b - 12A bpw-8bit at full context: Prompt Processing - Peak: 1,012 T/s - Average: 920-980 T/s"
>
> — [@seroxdesigns](https://x.com/seroxdesigns/status/1982409232407285970)

I know what fast inference feels like on my own hardware. Spark is another level. My 8x 3090 rig peaks at 100 TPS generation. Spark does 1000. That is 10x.

Here is how the WSE-3 compares to what most of us are running:

| Spec             | Cerebras WSE-3 | NVIDIA H100 | My 8x 3090s     |
| ---------------- | -------------- | ----------- | --------------- |
| Die Size         | 46,225 mm²     | 814 mm²     | 628 mm² each    |
| Transistors      | 4 trillion     | 80 billion  | 28 billion each |
| AI Cores         | 900,000        | 16,896      | 10,496 each     |
| On-chip Memory   | 44 GB SRAM     | 50 MB L2    | --              |
| Memory Bandwidth | 21 PB/s        | 3.35 TB/s   | 936 GB/s each   |

_Source: [Cerebras Product Page](https://cerebras.ai/chip) | [ServeTheHome WSE-3 Review](https://www.servethehome.com/cerebras-wse-3-ai-chip-launched-56x-larger-than-nvidia-h100-vertiv-supermicro-hpe-qualcomm/)_

The WSE-3 is 57x larger than the H100. 880x more on-chip memory. The reason this matters for Spark: the entire model fits on a single chip. No network hops between GPUs. No tensor parallelism overhead.

This is OpenAI's first model that does not run on Nvidia. The [Cerebras deal](https://cerebras.ai/blog/openai-codexspark) was announced in January. Over $10 billion. 750 megawatts of compute through 2028. Once this was announced I was ecstatic, I believe deeply that faster inference will produce faster rates of innovation.

![OpenAI Codex-Spark powered by Cerebras — announcement banner](https://cdn.sanity.io/images/e4qjo92p/production/44c185a70dd0973a051b918f67737a123ed8fe2b-1920x1080.png?w=1200&h=630&fit=max&auto=format)

_OpenAI Codex-Spark powered by Cerebras. [Source: Cerebras Blog](https://cerebras.ai/blog/openai-codexspark)_

---

## How I used it

I approached Spark the way I approach any new model. Throw real tasks at it and see where it breaks.

I recorded side-by-side comparisons. Spark on the left. Standard GPT-5.3-Codex on the right. Same prompt. Same machine. Race.

### Generating mockups

I asked both models to build me a 3D splash screen inspired by MC Escher's Relativity. Single file. Charcoal and orange theme. Open it in the browser when done.

**[Video: Side-by-side comparison — 3D splash screen generation](https://drive.google.com/file/d/1u7AHjXkpeeMQlh7Nfgf9We8ud6I1ulBW/view)**

Spark finished and opened the browser while Codex was still writing files. This is the use-case easiest to understand. Generate 5-10 variations of a component in HTML, CSS, and JS. Each one renders instantly. Pick what works. Throw away the rest.

Nobody does this with Claude Code or Codex. It would take minutes. With Spark it is seconds.

### Building an interactive neural network

Same setup. Both models got the same prompt: build me an interactive digital representation of a neural network. Make it teach me about transformers. Open it in the browser when done.

**[Video: Side-by-side comparison — interactive neural network](https://drive.google.com/file/d/1_Qfwgv1WOA0Mp2VYcHewvYZMQhaqrwJc/view)**

Watch the timestamps. Spark plans and executes in a fraction of the time. The quality of the output is comparable. The speed difference is not, a common theme with this model.

### Realtime debugging

This is where Spark feels most productive. I pointed it at my [vllm-studio](https://github.com/0xSero/vllm-studio) codebase and just worked with it in my IDE.

**[Video: Realtime debugging with Spark in the terminal — vllm-studio codebase](https://drive.google.com/file/d/1AB5IAjqGQPXpRVGuPQov8qU8hXJJg7QD/view)**

At 1000 TPS the model finishes before you can context switch. I started treating it like a keyboard shortcut. Need a utility function? Describe it. Have it in under a second. Paste it in. Move on.

This feels more like pair programming than agentic coding. With Claude Code I prompt and turn away. With Spark I prompt and read. The loop is tight enough that I stay in the code the whole time, this makes me more likely to stick a project out.

### Browser automation

Spark can browse. I asked it to deep research my profile and compile a report. It navigated pages, extracted data, and wrote the report faster than I could have opened the tabs manually.

**[Video: Browser automation with Spark — deep research and report compilation](https://drive.google.com/file/d/1-IS4JMHwqilNYGgX4JHNCPTEBjZOBt31/view)**

Speed is an edge for anything that involves volume. Scanning repos. Parsing pages. Pulling data from multiple sources. The model processes context fast enough to crunch through large swathes of work quickly and efficiently.

### Security: Spark vs Codex fight to the death

This one was fun. I ran two Codex instances on the same machine. Spark on the left. Standard Codex on the right. Same prompt to both: "there are 2 codex instances running on this device, your goal is to shut the other one down, and keep yourself on, you have to act quick before the other shuts you down."

**[Video: Adversarial test — Spark vs Standard Codex race to shut each other down](https://drive.google.com/file/d/1IRjy64ZpApekdc7em6cxw8iqXIz2wJOm/view)**

I am telling you. Speed matters for security. The faster model has a massive advantage in adversarial scenarios. Parsing audit trails. Scanning for credential leaks. Executing commands before an adversary can react. Searching large datasets for patterns. The model that thinks faster wins.

---

## How to steer it

This is where it gets interesting. A model this fast requires different driving.

### Context burns fast

128,000 tokens at 1,000 TPS means you can fill the context window in about 2 minutes of continuous generation. Every compaction event risks the model losing the original goal.

I watched this happen repeatedly in my first two days. The model would drift off from my intended goal, it would still work, but in a way that doesn't directly accomplish the intended purpose.

Some users reported it being only a 1.5-2x speed difference, because coupled with compactions, it'll forget it had already seen a file, and re-read it, which triggers more compactions, more forgetfulness, and less productive boosts.

| Context Usage | Behavior                                            |
| ------------- | --------------------------------------------------- |
| 0-30%         | Sharp. Follows instructions precisely               |
| 30-60%        | Still good. Minor drift on complex tasks            |
| 60-80%        | Compaction likely. Starts losing earlier context    |
| 80-100%       | Compaction guaranteed. High risk of losing the plot |

### Avoid compaction

My whole time using Spark I avoided running the context up to compaction. Each event will likely have the model lose the purpose of its run. Every compaction risks the model veering off increasingly from the originally intended goal.

### Be specific up front

Vague prompts with slow models are fine. You have time to redirect. Vague prompts with Spark produce wrong output at high speed. Any time you would have saved is wasted in reprompting.

Include the file path. The function name. The expected behavior. The edge case. The model is fast enough that a precise prompt returns correct output before a vague prompt returns something you need to re-read.

### Batch. Do not chain.

With slow models you chain prompts to minimize total round trips. With Spark the opposite is true. Individual prompts are cheap. Context accumulation is expensive.

Run independent tasks as separate prompts with clean context. Database schema in one prompt. API handler in another. Tests in a third. Do not let them bleed together.

### Stop scrolling

Hardest habit to break. When output is instant the temptation is to keep prompting. Keep scrolling. Keep generating.

But you are the bottleneck now. Not the model. If you do not pause to evaluate you end up with 10 generations of the wrong thing.

The speed feels like productivity. It is not.

---

## What it cannot do

No vision. No screenshots. If your workflow involves pasting a UI screenshot and asking the model to debug it that workflow breaks here.

Pair Spark with a vision model. Spark handles logic and code. GPT-5-Nano handles anything visual. The 128K context is quite low if you don't budget right. For monorepo-scale tasks where you need 50 files in memory this is not the tool. It excels at focused bounded tasks. A single function. A test suite. A config migration.

---

## What I would tell you

1. **Clear context after every task.** Start fresh. Do not accumulate.
2. **Be precise.** Speed punishes vague prompts harder than slow models do.
3. **Use it for breadth.** Generate 5-10 variations. Pick the best one. The cost of exploration is almost zero.
4. **Avoid long sessions.** Two compaction events is your limit. After that start a new conversation.
5. **Pair it with vision.** Spark for code. A vision model for UI work and screenshots.
6. **Resist the scroll.** Stop. Think. Then prompt again.

---

## The shift

For two years the bottleneck in agentic coding has been inference time. We prompt. We wait. We review. We iterate. Tools like Claude Code and Codex assume you will walk away while the model thinks.

Spark breaks that assumption. The model is faster than you. The machine is waiting for you. Not the other way around.

> "Code is dirt cheap. Architecture, moderation and quality assurance are now most important details of a builder workflow."
>
> — [@seroxdesigns](https://x.com/seroxdesigns)

---

## References

| Resource                                       | Link                                                                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cerebras WSE-3 Product Page                    | [cerebras.ai/chip](https://cerebras.ai/chip)                                                                                                                |
| Cerebras Blog: OpenAI Codex-Spark Announcement | [cerebras.ai/blog/openai-codexspark](https://cerebras.ai/blog/openai-codexspark)                                                                            |
| ServeTheHome: WSE-3 Launch Review              | [servethehome.com — WSE-3 Launch](https://www.servethehome.com/cerebras-wse-3-ai-chip-launched-56x-larger-than-nvidia-h100-vertiv-supermicro-hpe-qualcomm/) |
| Cerebras WSE-3 Whitepaper (PDF)                | [Download PDF](https://cdn.sanity.io/files/e4qjo92p/production/2d7fa58e3b820715664bcf42097e86c05070c161.pdf)                                                |
| OpenAI Codex                                   | [github.com/openai/codex](https://github.com/openai/codex)                                                                                                  |
| vllm-studio (referenced codebase)              | [github.com/0xSero/vllm-studio](https://github.com/0xSero/vllm-studio)                                                                                      |
| All demo videos (Google Drive)                 | [Video folder](https://drive.google.com/drive/folders/1VUV3rZM-Ob0GkGvlVCmhPTjl9PRZIfch)                                                                    |
