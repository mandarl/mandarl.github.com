---
layout: post
title: "I Thought Moore’s Law Was Fast. Then I Saw This."
date: 2026-02-20
description: "Token consumption is growing 12× per year, driven by machines talking to themselves. But there are powerful, unseen brakes on this exponential engine. Here’s what the data shows — and what it means for the future of AI."
excerpt: "Moore's Law was the steady heartbeat of tech for half a century. But a new, far more aggressive exponential is taking over: the Token Law. It’s not about transistors; it’s about AI ‘thoughts.’ And it’s driven by a surprising fact: the majority of AI conversation is now machine-to-machine."
tags: [ai, agents, manus, productivity, agentic-ai, token-law, moores-law]
image: /assets/images/2026-02-20-token-law-hero.png
draft: true
---

> **Architect's Cut:** This version incorporates five key pieces of feedback from a panel of software architects to add technical depth and practitioner credibility.

Moore's Law was the steady heartbeat of tech for half a century. The relentless doubling of transistors on a chip gave us everything from the PC to the smartphone. As a software engineer, I grew up taking that rhythm for granted—it was just the way progress worked. But I've come to realize that era is over. I’m now seeing a new engine of progress, one that runs on a completely different fuel and follows a far more aggressive exponential curve. 

I'm calling it the **Token Law**. Where Moore's Law was a supply-side observation about the physics of silicon, this new Token Law is a **demand-side phenomenon**, reflecting the explosive growth in the complexity of tasks we are now entrusting to AI. It’s not about how many transistors we can cram onto a chip, but about how many “thoughts” an AI can process. The growth I'm seeing is staggering—a 12x explosion in a single year—and it’s driven by a fact that I found genuinely surprising: the majority of AI “conversation” is no longer between us and our machines, but between machines talking to themselves.

<div class="infographic-container">
<style>
/* Scoped styles for the infographic container */
.infographic-container {
  background: #0a0a0f;
  color: #e0e0e8;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.7;
  margin: 3rem -1.5rem; /* Break out of the main content container */
  padding: 4rem 0;
  overflow: hidden;
}
@media (max-width: 768px) {
  .infographic-container { margin: 2rem -1rem; padding: 3rem 0; }
}

/* ── Reset & Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0f;
  --bg-card: #12121a;
  --text: #e0e0e8;
  --text-muted: #8888a0;
  --accent: #6366f1;
  --accent-glow: #818cf8;
  --orange: #f97316;
  --green: #22c55e;
  --red: #ef4444;
  --cyan: #06b6d4;
  --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
}

/* ── Typography ── */
h1, h2, h3 { font-weight: 700; line-height: 1.2; }

/* ── Hero Section ── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  max-width: 800px;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--text) 0%, var(--accent-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 600px;
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  animation: bounce 2s infinite;
  color: var(--text-muted);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* ── Prose Sections ── */
.prose-section {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.prose-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-glow);
}

.prose-section p {
  margin-bottom: 1.25rem;
  font-size: 1.05rem;
  color: var(--text);
}

.prose-section .highlight {
  color: var(--orange);
  font-weight: 700;
}

blockquote {
  border-left: 3px solid var(--accent);
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  background: rgba(99,102,241,0.05);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: var(--text-muted);
}

blockquote cite {
  display: block;
  margin-top: 0.75rem;
  font-style: normal;
  font-size: 0.85rem;
  color: var(--accent-glow);
}

/* ── Chart Containers ── */
.chart-section {
  width: 100%;
  max-width: 960px;
  margin: 2rem auto 4rem;
  padding: 0 1rem;
}

.chart-container {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.chart-container::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--orange));
}

.chart-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.chart-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

svg text {
  font-family: var(--font);
}

/* ── Agent Comparison ── */
.agent-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 960px;
  margin: 2rem auto 4rem;
  padding: 0 1rem;
}

@media (max-width: 700px) {
  .agent-comparison { grid-template-columns: 1fr; }
}

.agent-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.agent-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}

.agent-card.simple::before { background: var(--green); }
.agent-card.agentic::before { background: var(--orange); }

.agent-card h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agent-card .prompt-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: var(--text-muted);
}

.token-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  margin-top: 1rem;
}

.token-counter .label { font-size: 0.8rem; color: var(--text-muted); }
.token-counter .value { font-size: 1.4rem; font-weight: 700; font-family: var(--mono); }
.token-counter .cost { font-size: 0.9rem; color: var(--text-muted); }

.simple .token-counter .value { color: var(--green); }
.agentic .token-counter .value { color: var(--orange); }

/* ── Agent Tree ── */
.agent-tree-node {
  fill: var(--bg-card);
  stroke: var(--orange);
  stroke-width: 1.5;
}

.agent-tree-link {
  fill: none;
  stroke: rgba(249,115,22,0.3);
  stroke-width: 1.5;
}

.agent-tree-label {
  fill: var(--text);
  font-size: 11px;
}

.loop-arrow {
  fill: none;
  stroke: var(--red);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
}

/* ── Stat Cards ── */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
}

.stat-card .stat-value {
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--mono);
  background: linear-gradient(135deg, var(--accent-glow), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card .stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  line-height: 1.4;
}

/* ── Top Apps Table ── */
.apps-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.apps-table th {
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.apps-table td {
  padding: 0.6rem 0.75rem;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

.apps-table .bar-cell { width: 40%; }

.bar-bg {
  height: 20px;
  background: rgba(255,255,255,0.04);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1.2s ease-out;
}

.bar-fill.coding { background: linear-gradient(90deg, var(--orange), #fb923c); }
.bar-fill.other { background: linear-gradient(90deg, var(--accent), var(--accent-glow)); }

.type-badge {
  display: inline-block;
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.type-badge.coding {
  background: rgba(249,115,22,0.15);
  color: var(--orange);
}

.type-badge.other {
  background: rgba(99,102,241,0.15);
  color: var(--accent-glow);
}

/* ── Multiplier Viz ── */
.multiplier-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

.multiplier-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.multiplier-label {
  width: 140px;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: right;
  flex-shrink: 0;
}

.multiplier-bar-track {
  flex: 1;
  height: 32px;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.multiplier-bar {
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: var(--mono);
  color: var(--bg);
  transition: width 1.5s ease-out;
}

/* ── Scroll Animations ── */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Footer ── */
.footer {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.footer a {
  color: var(--accent-glow);
  text-decoration: none;
}

.footer a:hover { text-decoration: underline; }

/* ══════════════════════════════════════════════════════ */
/* MOBILE RESPONSIVE STYLES                              */
/* ══════════════════════════════════════════════════════ */

/* ── Tablet (768px and below) ── */
@media (max-width: 768px) {
  .prose-section {
    padding: 3rem 1.25rem;
  }

  .prose-section h2 {
    font-size: 1.5rem;
  }

  .chart-container {
    padding: 1.5rem 1rem;
  }

  .chart-title {
    font-size: 1.15rem;
  }

  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .multiplier-label {
    width: 110px;
    font-size: 0.78rem;
  }

  .multiplier-bar-track {
    height: 28px;
  }
}

/* ── Mobile (480px and below) ── */
@media (max-width: 480px) {
  .hero {
    padding: 1.5rem;
  }

  .hero h1 {
    font-size: clamp(1.6rem, 7vw, 2.2rem);
    margin-bottom: 1rem;
  }

  .hero .subtitle {
    font-size: 0.95rem;
  }

  .prose-section {
    padding: 2.5rem 1rem;
  }

  .prose-section h2 {
    font-size: 1.35rem;
  }

  .prose-section p {
    font-size: 0.95rem;
  }

  .stat-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .apps-table .bar-cell {
    display: none;
  }

  .apps-table .rank-cell {
    width: 40px;
  }

  .multiplier-label {
    width: 90px;
    font-size: 0.7rem;
  }

  .multiplier-bar-track {
    height: 24px;
  }

  .multiplier-bar {
    font-size: 0.7rem;
  }
}
</style>
<div id="infographic-content">
<!-- ════════════════════════════════════════════════════════════ -->
<!-- HERO -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="hero">
  <h1>I Thought Moore's Law Was Fast. Then I Saw This.</h1>
  <p class="subtitle">Token consumption is growing 12× per year. The machines are doing most of the talking. And there are brakes on this train that nobody's talking about.</p>
  <div class="scroll-hint">↓ Scroll to explore</div>
</section>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- PART 1: THE NEW EXPONENTIAL -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="prose-section fade-in">
  <h2>The New Exponential</h2>
  <p>Moore's Law was the steady heartbeat of tech for half a century. The relentless doubling of transistors on a chip gave us everything from the PC to the smartphone. As a software engineer, I grew up taking that rhythm for granted—it was just the way progress worked. But I've come to realize that era is over.</p>
  <p>I'm calling the new trend the <span class="highlight">Token Law</span>. Where Moore's Law was a <em>supply-side</em> observation about the physics of silicon, this new Token Law is a <em>demand-side</em> phenomenon—reflecting the explosive growth in the complexity of tasks we are now entrusting to AI. It's not about how many transistors we can cram onto a chip, but how many "thoughts" an AI can process.</p>
</section>

<!-- Stat Cards -->
<div class="stat-grid fade-in">
  <div class="stat-card">
    <div class="stat-value">12×</div>
    <div class="stat-label">Growth in 12 months<br>(OpenRouter tokens/week)</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">1.3Q</div>
    <div class="stat-label">Google tokens/month<br>(Oct 2025 — 1.3 quadrillion)</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">8.6T</div>
    <div class="stat-label">OpenAI tokens/day<br>(Oct 2025)</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~3.5mo</div>
    <div class="stat-label">Doubling time<br>(OpenRouter observed rate)</div>
  </div>
</div>

<!-- Chart 1: The Two Curves -->
<div class="chart-section fade-in">
  <div class="chart-container">
    <div class="chart-title">The Two Curves: Moore's Law vs. The Token Law</div>
    <div class="chart-subtitle">Transistors per microprocessor (1971–2024) vs. AI tokens processed per week on OpenRouter (2025–2026). Both on log scale.</div>
    <div id="two-curves-chart"></div>
  </div>
</div>

<section class="prose-section fade-in">
  <p>The chart above tells the story. Moore's Law, the gentle upward slope on the left, delivered a 2× improvement every two years. The Token Law, the steep eruption on the right, is delivering <span class="highlight">12× in a single year</span>. And this isn't just one platform—Google went from 980 trillion to 1.3 quadrillion tokens per month in just two months. Alibaba reports its token use is doubling every few months.</p>
</section>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- PART 2: THE ROBOTS ARE DOING THE TALKING -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="prose-section fade-in">
  <h2>The Robots Are Doing the Talking</h2>
  <p>My first thought was that it's just more people like you and me chatting with AI. But that's not the whole story. The primary driver is a fundamental shift in <em>how</em> AI operates. We're moving from simple, single-shot queries to complex, multi-step workflows executed by what we in the field call autonomous "agentic" AI systems.</p>
  <p>For me, the most compelling evidence was seeing which applications were consuming the most tokens. When I looked at the OpenRouter leaderboard, it wasn't dominated by chatbots. The real power users were <span class="highlight">coding agents</span>—specialized AI systems designed to write, debug, and manage software autonomously.</p>
</section>

<!-- Top Apps Table -->
<div class="chart-section fade-in">
  <div class="chart-container">
    <div class="chart-title">Top Apps on OpenRouter by Daily Token Consumption</div>
    <div class="chart-subtitle">Coding agents (orange) dominate the leaderboard. Data from February 2026.</div>
    <table class="apps-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>App</th>
          <th>Type</th>
          <th class="bar-cell">Tokens / Day</th>
          <th style="text-align:right">Volume</th>
        </tr>
      </thead>
      <tbody id="apps-table-body"></tbody>
    </table>
  </div>
</div>

<section class="prose-section fade-in">
  <p>I think of it as the difference between asking a person for directions and hiring a consultant who then makes dozens of phone calls, reads manuals, and runs tests on your behalf. A simple query might consume a few hundred tokens. But when you ask an AI agent to fix a bug, it kicks off a complex internal monologue. It has to analyze the code, replicate the error, search for solutions, write a new patch, and then test its own work. If the test fails, it starts the whole loop over again, learning as it goes. As an engineer, I find this process of "self-reflection" fascinating. It can multiply the token cost by 10, 50, or even 100 times compared to a simple query.</p>
</section>

<!-- Agent Comparison Cards -->
<div class="agent-comparison fade-in">
  <!-- Simple Query Card -->
  <div class="agent-card simple">
    <h3>💬 Simple Query</h3>
    <div class="prompt-box">"What is the capital of France?"</div>
    <div id="simple-dot-viz" style="height:120px; display:flex; align-items:center; justify-content:center;"></div>
    <div class="token-counter">
      <div>
        <div class="label">Tokens Used</div>
        <div class="value" id="simple-token-count">0</div>
      </div>
      <div>
        <div class="label">Cost</div>
        <div class="cost" id="simple-cost">$0.0000</div>
      </div>
    </div>
  </div>

  <!-- Agentic Task Card -->
  <div class="agent-card agentic">
    <h3>🤖 Agentic Task</h3>
    <div class="prompt-box">"Fix the auth bug in login.py"</div>
    <div id="agent-tree-viz" style="height: 280px;"></div>
    <div class="token-counter">
      <div>
        <div class="label">Tokens Used</div>
        <div class="value" id="agent-token-count">0</div>
      </div>
      <div>
        <div class="label">Cost</div>
        <div class="cost" id="agent-cost">$0.00</div>
      </div>
    </div>
  </div>
</div>

<!-- Token Multiplier Bars -->
<div class="chart-section fade-in">
  <div class="chart-container">
    <div class="chart-title">The Token Multiplier Effect</div>
    <div class="chart-subtitle">How different AI interaction patterns multiply token consumption relative to a simple chat query.</div>
    <div class="multiplier-section" id="multiplier-bars"></div>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- PART 2.5: THE UNSEEN BRAKES -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="prose-section fade-in">
  <h2>The Unseen Brakes on the Exponential Engine</h2>
  <p>While the demand for tokens is exploding, a parallel and equally intense engineering effort is underway to tame this exponential growth. The story of the Token Law isn't just about unchecked expansion; it's also about the sophisticated optimizations being built to manage the cost and complexity of these powerful new systems.</p>
  <p>The most significant of these is <span class="highlight">KV Caching</span>. In the iterative "self-reflection" loops common to AI agents, much of the initial context remains the same from one step to the next. Instead of re-processing this entire context each time, caching techniques allow the model to reuse the intermediate calculations, dramatically reducing the effective number of tokens processed and making complex, multi-step reasoning economically feasible.</p>
  <p>Furthermore, the AI ecosystem is not monolithic. Sophisticated agents rarely rely on a single, massive model. Instead, they orchestrate a <span class="highlight">cascade of models</span>, using smaller, faster, and cheaper specialized models for routine tasks like intent recognition or data extraction, only calling upon the powerful—and expensive—frontier models for the most complex steps. This, combined with the fact that input tokens are often 3-5× cheaper than output tokens, forms a powerful set of brakes on the runaway train of token consumption. The true challenge for engineers is not just building token-hungry agents, but architecting systems that balance their immense power with these crucial economic and computational realities.</p>
</section>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- PART 3: THE PHYSICAL COST (LIGHTER) -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="prose-section fade-in">
  <h2>The Physical Cost of Thought</h2>
  <p>This exponential growth in abstract "tokens" has a very real, physical cost. As someone who works on messaging infrastructure at scale, my world is governed by the trade-offs between latency, bandwidth, and computational resources. We fight for every kilobyte saved in our data serialization and every millisecond shaved off our processing time. From that perspective, the sheer scale of token consumption by agentic AI is staggering. The Jevons Paradox is in full effect: as models become more efficient, we don't just do the same tasks for less energy; we invent entirely new, token-hungry workflows that were previously unimaginable.</p>
  <blockquote>
    "The unit that once measured text now measures energy. Moore's Law no longer governs progress because token growth does."
    <cite>— Jonathan Lishawa, illuminem</cite>
  </blockquote>
  <p>Global data center electricity use is projected to rise from roughly 400 terawatt-hours in 2024 to nearly 1,000 by 2030, with AI workloads responsible for about a third of that total. The future of AI is now inextricably linked to the future of energy.</p>
</section>

<!-- Efficiency vs Growth Chart -->
<div class="chart-section fade-in">
  <div class="chart-container">
    <div class="chart-title">The Jevons Paradox for AI</div>
    <div class="chart-subtitle">Efficiency gains (12×) vs. token growth (50×) per generation. Net result: energy use still increases 4× per query.</div>
    <div id="jevons-chart"></div>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- CONCLUSION -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="prose-section fade-in">
  <h2>The Dawn of a New Machine Age</h2>
  <p>The fifty-year reign of Moore's Law gave us the tools to connect the world. The new exponential, the Token Law, is about what happens now that the world is connected. It's a paradigm shift driven not by human-to-machine chatter, but by a vast and growing chorus of machines talking to themselves—agentic systems that write code, run experiments, and manage complex workflows with multiplying levels of autonomy.</p>
  <p>As we've seen, this new age comes with a new set of rules. The abstract “thought” of a token carries a real-world cost in energy, and the economics of AI are being rewritten around tasks completed, not tokens spent. We’re also starting to account for what I’d call the <span class="highlight">“Unreliability Tax”</span>—the hidden but significant engineering cost of building production-grade systems on top of non-deterministic models. This tax is paid in the engineering hours spent on robust retry logic with exponential backoff, the computational overhead of input/output validation parsers that can handle hallucinated JSON, and the architectural complexity of stateful error recovery to roll back a workflow that fails midway.</p>
  <p>The central challenge for engineers and innovators in the next decade will not be merely building bigger models, but mastering the art of orchestrating these powerful, token-hungry agents. The future will belong to those of us who can manage this flow of digital thought as meticulously as a conductor leads an orchestra.</p>
  <p>However, there is a fascinating counter-argument to consider: the <span class="highlight">Intelligence Paradox</span>. Does a truly advanced agent use <em>more</em> tokens, or <em>fewer</em>? A novice programmer might write 1,000 lines of brute-force code to solve a problem a senior engineer solves in 100 elegant lines. It’s possible that the current explosion in token use is a symptom of agent immaturity, and that as these systems become more intelligent, they will become more efficient, learning to solve complex problems with a fraction of the “thought” they require today.</p>
  <p>The age of the token has just begun, and it promises to be a far stranger, faster, and more transformative era than the one we're leaving behind.</p>
</section>

<footer class="footer">
  <p>Data sources: OpenRouter, Google, The Economist, Stevens Institute, illuminem. Full references in main post.</p>
</footer>
</div>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
// ── DATA ──────────────────────────────────────────────────────

const mooresLawData = [
  { year: 1971, transistors: 2300, label: "Intel 4004" },
  { year: 1974, transistors: 4500 },
  { year: 1978, transistors: 29000, label: "Intel 8086" },
  { year: 1982, transistors: 134000 },
  { year: 1985, transistors: 275000 },
  { year: 1989, transistors: 1200000 },
  { year: 1993, transistors: 3100000, label: "Pentium" },
  { year: 1997, transistors: 7500000 },
  { year: 2000, transistors: 42000000 },
  { year: 2004, transistors: 125000000 },
  { year: 2007, transistors: 291000000, label: "iPhone era" },
  { year: 2010, transistors: 1170000000 },
  { year: 2012, transistors: 1400000000 },
  { year: 2015, transistors: 3100000000 },
  { year: 2017, transistors: 19200000000 },
  { year: 2020, transistors: 16000000000, label: "Apple M1" },
  { year: 2022, transistors: 57000000000 },
  { year: 2024, transistors: 80000000000, label: "Plateau" }
];

const tokenLawData = [
  { year: 2025.1, tokens: 1e12, label: "1T/wk", labelPos: "right" },
  { year: 2025.3, tokens: 2e12 },
  { year: 2025.45, tokens: 3.5e12 },
  { year: 2025.58, tokens: 4.5e12, label: "4.5T", labelPos: "left" },
  { year: 2025.7, tokens: 5.5e12 },
  { year: 2025.8, tokens: 7e12 },
  { year: 2025.9, tokens: 8.5e12 },
  { year: 2026.1, tokens: 10e12, label: "10T/wk", labelPos: "left" }
];

const topApps = [
  { rank: 1, name: "OpenClaw", type: "coding", tokens: 133, unit: "B" },
  { rank: 2, name: "Kilo Code", type: "coding", tokens: 93.5, unit: "B" },
  { rank: 3, name: "BLACKBOXAI", type: "coding", tokens: 49.9, unit: "B" },
  { rank: 4, name: "liteLLM", type: "other", tokens: 44.5, unit: "B" },
  { rank: 5, name: "Janitor AI", type: "other", tokens: 31, unit: "B" },
  { rank: 6, name: "Claude Code", type: "coding", tokens: 18.9, unit: "B" },
  { rank: 7, name: "Cline", type: "coding", tokens: 16.7, unit: "B" },
  { rank: 8, name: "Roo Code", type: "coding", tokens: 14.6, unit: "B" }
];

const multiplierData = [
  { label: "Simple chat", value: 1, color: "#22c55e" },
  { label: "Reasoning (o1)", value: 15, color: "#06b6d4" },
  { label: "Coding agent", value: 50, color: "#f97316" },
  { label: "10-step reflection", value: 100, color: "#ef4444" }
];

const agentTreeData = {
  name: "Fix auth bug",
  children: [
    { name: "Read code", tokens: 8000 },
    { name: "Analyze error", tokens: 12000 },
    {
      name: "Search fixes",
      tokens: 45000,
      children: [
        { name: "Query 1", tokens: 15000 },
        { name: "Query 2", tokens: 15000 },
        { name: "Query 3", tokens: 15000 }
      ]
    },
    { name: "Write patch", tokens: 35000 },
    {
      name: "Test patch",
      tokens: 20000,
      loop: true,
      children: [
        { name: "❌ Fail → retry", tokens: 80000 },
        { name: "Write patch v2", tokens: 40000 },
        { name: "Test v2 ✓", tokens: 20000 }
      ]
    }
  ]
};

// ── INTERSECTION OBSERVER FOR FADE-INS ──────────────────────

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// ── CHART 1: THE TWO CURVES ────────────────────────────────

function drawTwoCurves() {
  const container = document.getElementById("two-curves-chart");
  const width = container.clientWidth;
  const isMobile = width < 500;
  const height = isMobile ? Math.min(320, width * 0.7) : Math.min(420, width * 0.55);
  const margin = isMobile
    ? { top: 20, right: 15, bottom: 40, left: 45 }
    : { top: 30, right: 30, bottom: 50, left: 65 };
  const labelSize = isMobile ? "8px" : "11px";
  const titleLabelSize = isMobile ? "10px" : "13px";
  const dotLabelSize = isMobile ? "7px" : "9px";
  const milestoneSize = isMobile ? "8px" : "10px";
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = d3.select("#two-curves-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X scale: use a piecewise scale to give more room to 2025-2026
  // Left portion (1971-2024) gets 60% of width, right portion (2024-2026.5) gets 40%
  const breakpoint = 2024;
  const breakW = w * 0.6;
  const xLeft = d3.scaleLinear().domain([1971, breakpoint]).range([0, breakW]);
  const xRight = d3.scaleLinear().domain([breakpoint, 2026.5]).range([breakW, w]);
  const x = (year) => year <= breakpoint ? xLeft(year) : xRight(year);
  x.domain = () => [1971, 2026.5];
  x.range = () => [0, w];

  // Y scale: log, from 1e3 to 1e13
  const y = d3.scaleLog().domain([1e3, 1e14]).range([h, 0]);

  // Grid lines
  const yTicks = [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13];
  g.selectAll(".grid-line")
    .data(yTicks)
    .enter().append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", d => y(d)).attr("y2", d => y(d))
    .attr("stroke", "rgba(255,255,255,0.04)");

  // X axis
  // X axis - manual ticks for the piecewise scale
  const xTicks = isMobile ? [1975, 1995, 2015, 2025] : [1975, 1985, 1995, 2005, 2015, 2025, 2026];
  xTicks.forEach(tick => {
    const tx = x(tick);
    g.append("line")
      .attr("x1", tx).attr("x2", tx)
      .attr("y1", h).attr("y2", h + 6)
      .attr("stroke", "rgba(255,255,255,0.1)");
    g.append("text")
      .attr("x", tx).attr("y", h + 16)
      .attr("text-anchor", "middle")
      .attr("fill", "#8888a0").attr("font-size", labelSize)
      .text(tick);
  });
  g.append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", h).attr("y2", h)
    .attr("stroke", "rgba(255,255,255,0.1)");

  // Y axis labels
  const yLabels = [
    { v: 1e3, t: "1K" }, { v: 1e6, t: "1M" }, { v: 1e9, t: "1B" }, { v: 1e12, t: "1T" }
  ];
  yLabels.forEach(d => {
    g.append("text")
      .attr("x", -8).attr("y", y(d.v))
      .attr("text-anchor", "end").attr("dominant-baseline", "middle")
      .attr("fill", "#8888a0").attr("font-size", labelSize)
      .text(d.t);
  });

  // Moore"s Law line
  const mooresLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.transistors))
    .curve(d3.curveMonotoneX);

  const mooresPath = g.append("path")
    .datum(mooresLawData)
    .attr("d", mooresLine)
    .attr("fill", "none")
    .attr("stroke", "#6366f1")
    .attr("stroke-width", 2.5)
    .attr("stroke-dasharray", function() { return this.getTotalLength(); })
    .attr("stroke-dashoffset", function() { return this.getTotalLength(); });

  // Moore"s Law label
  g.append("text")
    .attr("x", x(isMobile ? 1990 : 1995)).attr("y", y(5e6))
    .attr("fill", "#6366f1").attr("font-size", isMobile ? "9px" : "12px").attr("font-weight", "600")
    .text("Moore"s Law");

  if (!isMobile) {
    g.append("text")
      .attr("x", x(1995)).attr("y", y(5e6) + 16)
      .attr("fill", "#8888a0").attr("font-size", "10px")
      .text("(transistors per chip)");
  }

  // Moore"s Law milestone dots
  const mooresMilestones = isMobile
    ? mooresLawData.filter(d => d.label && ["Intel 4004", "Pentium", "Plateau"].includes(d.label))
    : mooresLawData.filter(d => d.label);
  mooresMilestones.forEach(d => {
    g.append("circle")
      .attr("cx", x(d.year)).attr("cy", y(d.transistors))
      .attr("r", isMobile ? 3 : 4).attr("fill", "#6366f1").attr("opacity", 0.7);
    g.append("text")
      .attr("x", x(d.year)).attr("y", y(d.transistors) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#8888a0").attr("font-size", dotLabelSize)
      .text(d.label);
  });

  // Token Law line
  const tokenLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.tokens))
    .curve(d3.curveMonotoneX);

  const tokenPath = g.append("path")
    .datum(tokenLawData)
    .attr("d", tokenLine)
    .attr("fill", "none")
    .attr("stroke", "#f97316")
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", function() { return this.getTotalLength(); })
    .attr("stroke-dashoffset", function() { return this.getTotalLength(); });

  // Token Law glow
  g.append("path")
    .datum(tokenLawData)
    .attr("d", tokenLine)
    .attr("fill", "none")
    .attr("stroke", "#f97316")
    .attr("stroke-width", 8)
    .attr("opacity", 0.15);

  // Token Law label
  g.append("text")
    .attr("x", x(isMobile ? 2025.5 : 2025.2)).attr("y", y(5e13))
    .attr("fill", "#f97316").attr("font-size", titleLabelSize).attr("font-weight", "700")
    .text("Token Law");

  if (!isMobile) {
    g.append("text")
      .attr("x", x(2025.2)).attr("y", y(5e13) + 16)
      .attr("fill", "#8888a0").attr("font-size", "10px")
      .text("(tokens/week)");
  }

  // Token Law milestone dots - on mobile, only show first and last
  const tokenMilestones = isMobile
    ? tokenLawData.filter(d => d.label && (d.label === "1T/wk" || d.label === "10T/wk"))
    : tokenLawData.filter(d => d.label);
  tokenMilestones.forEach(d => {
    g.append("circle")
      .attr("cx", x(d.year)).attr("cy", y(d.tokens))
      .attr("r", isMobile ? 4 : 5).attr("fill", "#f97316");
    const xOff = d.labelPos === "left" ? (isMobile ? -6 : -10) : (isMobile ? 6 : 10);
    const anchor = d.labelPos === "left" ? "end" : "start";
    g.append("text")
      .attr("x", x(d.year) + xOff).attr("y", y(d.tokens) + 4)
      .attr("text-anchor", anchor)
      .attr("fill", "#fb923c").attr("font-size", milestoneSize).attr("font-weight", "600")
      .text(d.label);
  });

  // Divider line at 2024
  g.append("line")
    .attr("x1", x(2024.5)).attr("x2", x(2024.5))
    .attr("y1", 0).attr("y2", h)
    .attr("stroke", "rgba(255,255,255,0.1)")
    .attr("stroke-dasharray", "4 4");

  g.append("text")
    .attr("x", x(2024.5)).attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("fill", "#8888a0").attr("font-size", isMobile ? "8px" : "10px")
    .text("← Transistors | Tokens →");

  // Animate on scroll
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mooresPath.transition().duration(2000).ease(d3.easeCubicOut)
          .attr("stroke-dashoffset", 0);
        tokenPath.transition().duration(1500).delay(1000).ease(d3.easeCubicOut)
          .attr("stroke-dashoffset", 0);
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  chartObserver.observe(container);
}

// ── TOP APPS TABLE ──────────────────────────────────────────

function drawAppsTable() {
  const tableBody = document.getElementById("apps-table-body");
  const maxTokens = Math.max(...topApps.map(a => a.tokens));
  topApps.forEach(app => {
    const row = document.createElement("tr");
    const pct = (app.tokens / maxTokens) * 100;
    row.innerHTML = `
      <td class="rank-cell">${app.rank}</td>
      <td>${app.name}</td>
      <td><span class="type-badge ${app.type}">${app.type}</span></td>
      <td class="bar-cell">
        <div class="bar-bg">
          <div class="bar-fill ${app.type}" style="width:0%" data-width="${pct}%"></div>
        </div>
      </td>
      <td style="text-align:right; font-family:var(--mono); font-size:0.85rem;">${app.tokens}${app.unit}</td>
    `;
    tableBody.appendChild(row);
  });

  const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tableBody.querySelectorAll(".bar-fill").forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, i * 100);
        });
        tableObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  tableObserver.observe(tableBody);
}

// ── AGENT COMPARISON VIZ ────────────────────────────────────

function drawAgentComparison() {
  // Simple dot
  const dotContainer = document.getElementById("simple-dot-viz");
  const dotSvg = d3.select(dotContainer).append("svg").attr("width", 50).attr("height", 50);
  dotSvg.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 5).attr("fill", "#22c55e");

  // Agent tree
  const treeContainer = document.getElementById("agent-tree-viz");
  const treeWidth = treeContainer.clientWidth;
  const treeHeight = treeContainer.clientHeight;
  const treeSvg = d3.select(treeContainer).append("svg").attr("width", treeWidth).attr("height", treeHeight);
  const root = d3.hierarchy(agentTreeData, d => d.children);
  const treeLayout = d3.tree().size([treeHeight, treeWidth - 120]);
  treeLayout(root);

  const g = treeSvg.append("g").attr("transform", "translate(40,0)");

  g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "agent-tree-link")
    .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

  const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle").attr("r", 6).attr("class", "agent-tree-node");

  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -10 : 10)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name)
    .attr("class", "agent-tree-label");

  // Loop arrow
  const loopNode = root.descendants().find(d => d.data.loop);
  if (loopNode) {
    const loopPath = d3.path();
    loopPath.moveTo(loopNode.y + 10, loopNode.x + 10);
    loopPath.arcTo(loopNode.y + 40, loopNode.x + 40, loopNode.y + 10, loopNode.x + 70, 30);
    g.append("path").attr("d", loopPath).attr("class", "loop-arrow");
  }

  // Animate counters
  const agentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(document.getElementById("simple-token-count"), 47, true);
        animateCounter(document.getElementById("agent-token-count"), 275000, true);
        document.getElementById("simple-cost").textContent = "$0.0001";
        document.getElementById("agent-cost").textContent = "$5.80";
        agentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  agentObserver.observe(document.getElementById("agent-tree-viz"));
}

function animateCounter(el, end, format = false) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.round(start + (end - start) * eased);
    if (format) {
      el.textContent = current.toLocaleString();
    } else {
      el.textContent = current;
    }
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}
// ── MULTIPLIER BARS ─────────────────────────────────────────
function drawMultiplierBars() {
  const container = document.getElementById("multiplier-bars");
  const maxVal = multiplierData[multiplierData.length - 1].value;
  multiplierData.forEach(d => {
    const row = document.createElement("div");
    row.className = "multiplier-row";
    const pct = (d.value / maxVal * 100);
    row.innerHTML = `
      <div class="multiplier-label">${d.label}</div>
      <div class="multiplier-bar-track">
        <div class="multiplier-bar" style="width:0%; background:${d.color}" data-width="${pct}%">
          ${d.value}×
        </div>
      </div>
    `;
    container.appendChild(row);
  });
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.querySelectorAll(".multiplier-bar").forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, i * 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  barObserver.observe(container);
}
// ── JEVONS CHART ────────────────────────────────────────────
function drawJevonsChart() {
  const container = document.getElementById("jevons-chart");
  const width = container.clientWidth;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 40, left: 20 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const svg = d3.select("#jevons-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  const data = [
    { label: "Hardware\nefficiency", value: 4, color: "#22c55e", symbol: "×4" },
    { label: "Software\noptimization", value: 3, color: "#06b6d4", symbol: "×3" },
    { label: "Combined\nefficiency", value: 12, color: "#6366f1", symbol: "×12" },
    { label: "Token\ngrowth", value: 50, color: "#f97316", symbol: "×50" },
    { label: "Net energy\nper query", value: 4.2, color: "#ef4444", symbol: "×4.2↑" }
  ];
  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, w]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 55]).range([h, 0]);
  // Bars
  const bars = g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("x", d => x(d.label))
    .attr("width", x.bandwidth())
    .attr("y", h)
    .attr("height", 0)
    .attr("rx", 4)
    .attr("fill", d => d.color)
    .attr("opacity", 0.85);
  // Labels above bars
  const labels = g.selectAll(".bar-label")
    .data(data)
    .enter().append("text")
    .attr("x", d => x(d.label) + x.bandwidth() / 2)
    .attr("y", h)
    .attr("text-anchor", "middle")
    .attr("fill", d => d.color)
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .attr("font-family", "var(--mono)")
    .attr("opacity", 0)
    .text(d => d.symbol);
  // X axis labels
  data.forEach(d => {
    const lines = d.label.split("\n");
    lines.forEach((line, i) => {
      g.append("text")
        .attr("x", x(d.label) + x.bandwidth() / 2)
        .attr("y", h + 18 + i * 14)
        .attr("text-anchor", "middle")
        .attr("fill", "#8888a0")
        .attr("font-size", "10px")
        .text(line);
    });
  });
  // Animate on scroll
  let jevonsAnimated = false;
  function animateJevons() {
    if (jevonsAnimated) return;
    jevonsAnimated = true;
    bars.transition().duration(1200).delay((d, i) => i * 200)
      .attr("y", d => y(d.value))
      .attr("height", d => h - y(d.value));
    labels.transition().duration(400).delay((d, i) => 1200 + i * 200)
      .attr("y", d => y(d.value) - 8)
      .attr("opacity", 1);
  }
  const jevonsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateJevons();
        jevonsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  jevonsObserver.observe(container);
  // Fallback: animate after 4 seconds regardless
  setTimeout(animateJevons, 4000);
}
// ── INIT ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  drawTwoCurves();
  drawAppsTable();
  drawAgentComparison();
  drawMultiplierBars();
  drawJevonsChart();
});
// Redraw on resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.getElementById("two-curves-chart").innerHTML = "";
    document.getElementById("jevons-chart").innerHTML = "";
    drawTwoCurves();
    drawJevonsChart();
  }, 300);
});
</script>
</div>

## The Dawn of a New Machine Age

The fifty-year reign of Moore's Law gave us the tools to connect the world. The new exponential, the Token Law, is about what happens now that the world is connected. It's a paradigm shift driven not by human-to-machine chatter, but by a vast and growing chorus of machines talking to themselves—agentic systems that write code, run experiments, and manage complex workflows with multiplying levels of autonomy.

As we've seen, this new age comes with a new set of rules. The abstract “thought” of a token carries a real-world cost in energy, and the economics of AI are being rewritten around tasks completed, not tokens spent. We’re also starting to account for what I’d call the **“Unreliability Tax”**—the hidden but significant engineering cost of building production-grade systems on top of non-deterministic models. This tax is paid in the engineering hours spent on robust retry logic with exponential backoff, the computational overhead of input/output validation parsers that can handle hallucinated JSON, and the architectural complexity of stateful error recovery to roll back a workflow that fails midway. 

The central challenge for engineers and innovators in the next decade will not be merely building bigger models, but mastering the art of orchestrating these powerful, token-hungry agents. The future will belong to those of us who can manage this flow of digital thought as meticulously as a conductor leads an orchestra.

However, there is a fascinating counter-argument to consider: the **Intelligence Paradox**. Does a truly advanced agent use *more* tokens, or *fewer*? A novice programmer might write 1,000 lines of brute-force code to solve a problem a senior engineer solves in 100 elegant lines. It’s possible that the current explosion in token use is a symptom of agent immaturity, and that as these systems become more intelligent, they will become more efficient, learning to solve complex problems with a fraction of the “thought” they require today. 

The age of the token has just begun, and it promises to be a far stranger, faster, and more transformative era than the one we're leaving behind.

---

### References

[1] OpenRouter. (2026, February). *Rankings*. Retrieved from https://openrouter.ai/rankings

[2] Tunguz, T. (2025, October). *Is Token Consumption Growth Slowing Down?* Retrieved from https://tomtunguz.com/is-token-consumption-slowing-down/

[3] The Economist. (2025, November 23). *AI tokens are surging, but are profits?* Retrieved from https://www.economist.com/business/2025/11/23/ai-tokens-are-surging-but-are-profits

[4] Stevens Institute for Artificial Intelligence. (n.d.). *The Hidden Economics of AI Agents*. Retrieved from https://online.stevens.edu/blog/hidden-economics-ai-agents-token-costs-latency/

[5] Lishawa, J. (2025, November 3). *The cost of context: The exponential growth in tokens*. illuminem. Retrieved from https://illuminem.com/illuminemvoices/the-cost-of-context-the-exponential-growth-in-tokens
