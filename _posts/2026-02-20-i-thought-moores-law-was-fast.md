---
layout: post
title: "The Machines Are Talking to Themselves"
date: 2026-02-20
description: "OpenRouter data shows that AI agents now consume more tokens than humans. Here's what that means for the future of computing."
excerpt: "AI agents now consume more tokens than humans. The Token Law — a demand-side exponential far steeper than Moore's Law — is reshaping the economics of computing. Here's what the data shows."
tags: [ai, agents, manus, productivity, agentic-ai, token-law, moores-law]
image: /assets/images/2026-02-20-token-law-hero.png
draft: false
body_class: infographic-post
---

<div class="infographic-container">
<style>
/* ── Infographic Post: Hide redundant Jekyll header ── */
  .infographic-post .post-header {
    display: none !important;
  }

  /* Float nav bar transparently over the hero */
  .infographic-post .site-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
    border-bottom: none;
    margin-bottom: 0;
  }

  /* Ensure nav links are readable over the light hero gradient */
  .infographic-post .site-title {
    color: #1a1a2e;
  }

  .infographic-post .nav-link {
    color: #4b5563;
  }

  .infographic-post .nav-link:hover {
    color: #1a1a2e;
  }

  /* Mobile nav dropdown needs a solid background when open */
  @media (max-width: 768px) {
    .infographic-post .site-nav.is-open {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  }

  /* Remove top padding from the post content container */
  .infographic-post .post.content-container {
    padding-top: 0;
  }

  /* Ensure site-main has no top margin so hero starts at viewport top */
  .infographic-post .site-main {
    padding-top: 0;
  }

  /* Break out of blog content-container width constraint */
  .infographic-container {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }


  /* ── Reset & Base ── */
  .infographic-container *, .infographic-container *::before, .infographic-container *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .infographic-container {
    --bg: #ffffff;
    --bg-card: #f8f9fa;
    --text: #1a1a2e;
    --text-muted: #6b7280;
    --accent: #4f46e5;
    --accent-glow: #6366f1;
    --orange: #ea580c;
    --orange-text: #c2410c; /* Darker orange for text — passes WCAG AA on white */
    --green: #16a34a;
    --red: #dc2626;
    --cyan: #0891b2;
    --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
    --mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  }

  .infographic-container { scroll-behavior: smooth; }

  .infographic-container {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── Typography ── */
  .infographic-container h1, .infographic-container h2, .infographic-container h3 { font-weight: 700; line-height: 1.2; text-wrap: balance; }

  /* ── Hero Section ── */
  .infographic-container .hero {
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height — accounts for mobile address bar */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .infographic-container .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 120% 60% at 50% 110%, rgba(234,88,12,0.18) 0%, rgba(234,88,12,0.08) 30%, transparent 70%),
      radial-gradient(ellipse 80% 40% at 50% 105%, rgba(220,38,38,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.04) 0%, transparent 40%);
    pointer-events: none;
  }

  .infographic-container .hero h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    max-width: 800px;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #1a1a2e 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .infographic-container .hero .subtitle {
    font-size: 1.15rem;
    color: #4b5563;
    max-width: 600px;
  }

  .infographic-container .scroll-hint {
    position: absolute;
    bottom: 2rem;
    bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
    animation: bounce 2s infinite;
    color: #4b5563;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── Hero Metadata Overlay ── */
  .infographic-container .hero-meta {
    position: absolute;
    top: 5rem; /* Clear the floating nav bar (~64px + breathing room) */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--font);
    font-size: 0.85rem;
    color: #6b7280;
    z-index: 10;
    opacity: 0.85;
  }

  .infographic-container .hero-date,
  .infographic-container .hero-reading-time {
    letter-spacing: 0.02em;
  }

  .infographic-container .hero-separator {
    color: #d1d5db;
    font-weight: 300;
  }

  .infographic-container .hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-left: 0.5rem;
  }

  .infographic-container .hero-tag {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 500;
    color: #6b7280;
    background: rgba(0, 0, 0, 0.04);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.02em;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }

  /* ── Prose Sections ── */
  .infographic-container .prose-section {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }

  .infographic-container .prose-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--accent-glow);
  }

  .infographic-container .prose-section p {
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
    color: var(--text);
    text-align: left;
    max-width: 65ch;
  }

  .infographic-container .prose-section .highlight {
    color: var(--orange-text);
    font-weight: 700;
  }

  .infographic-container blockquote {
    border-left: 3px solid var(--accent);
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    background: rgba(79,70,229,0.06);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: var(--text-muted);
  }

  .infographic-container blockquote cite {
    display: block;
    margin-top: 0.75rem;
    font-style: normal;
    font-size: 0.85rem;
    color: var(--accent-glow);
  }

  /* ── Chart Containers ── */
  .infographic-container .chart-section {
    width: 100%;
    max-width: 960px;
    margin: 0 auto 4rem;
    padding: 0 1rem;
  }

  .infographic-container .chart-container {
    background: var(--bg-card);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .infographic-container .chart-container::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--orange));
  }

  .infographic-container .chart-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .infographic-container .chart-subtitle {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .infographic-container svg text {
    font-family: var(--font);
  }

  /* ── Agent Comparison ── */
  .infographic-container .agent-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 960px;
    margin: 2rem auto 4rem;
    padding: 0 1rem;
  }

  @media (max-width: 700px) {
    .infographic-container .agent-comparison { grid-template-columns: 1fr; }
  }

  .infographic-container .agent-card {
    background: var(--bg-card);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 16px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .infographic-container .agent-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .infographic-container .agent-card.simple::before { background: var(--green); }
  .infographic-container .agent-card.agentic::before { background: var(--orange); }

  .infographic-container .agent-card h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .infographic-container .agent-card .prompt-box {
    background: rgba(0,0,0,0.03);
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-family: var(--mono);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: var(--text-muted);
  }

  .infographic-container .token-counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(0,0,0,0.03);
    border-radius: 8px;
    margin-top: 1rem;
  }

  .infographic-container .token-counter .label { font-size: 0.8rem; color: var(--text-muted); }
  .infographic-container .token-counter .value { font-size: 1.6rem; font-weight: 800; font-family: var(--mono); }
  .infographic-container .token-counter .cost { font-size: 1.1rem; color: var(--text-muted); font-weight: 600; }

  .infographic-container .simple .token-counter .value { color: var(--green); }
  .infographic-container .agentic .token-counter .value { color: var(--orange-text); }

  /* ── Agent Tree ── */
  .infographic-container .agent-tree-node {
    fill: var(--bg-card);
    stroke: var(--orange);
    stroke-width: 1.5;
  }

  .infographic-container .agent-tree-link {
    fill: none;
    stroke: rgba(249,115,22,0.3);
    stroke-width: 1.5;
  }

  .infographic-container .agent-tree-label {
    fill: var(--text);
    font-size: 11px;
  }

  .infographic-container .loop-arrow {
    fill: none;
    stroke: var(--red);
    stroke-width: 1.5;
    stroke-dasharray: 4 3;
  }

  /* ── Stat Cards ── */
  .infographic-container .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 960px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .infographic-container .stat-card {
    background: var(--bg-card);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 16px;
    padding: 1.25rem;
    text-align: center;
  }

  .infographic-container .stat-card .stat-value {
    font-size: 2rem;
    font-weight: 800;
    font-family: var(--mono);
    background: linear-gradient(135deg, var(--accent), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .infographic-container .stat-card .stat-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  /* ── Top Apps Table ── */
  .infographic-container .apps-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .infographic-container .apps-table th {
    text-align: left;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  .infographic-container .apps-table td {
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .infographic-container .apps-table .bar-cell { width: 40%; }

  .infographic-container .bar-bg {
    height: 20px;
    background: rgba(0,0,0,0.04);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .infographic-container .bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1.2s ease-out;
  }

  .infographic-container .bar-fill.coding { background: linear-gradient(90deg, var(--orange), #fb923c); }
  .infographic-container .bar-fill.other { background: linear-gradient(90deg, var(--accent), var(--accent-glow)); }

  .infographic-container .type-badge {
    display: inline-block;
    font-size: 0.65rem;
    padding: 0.15rem 0.5rem;
    border-radius: 99px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .infographic-container .type-badge.coding {
    background: rgba(249,115,22,0.15);
    color: var(--orange-text);
  }

  .infographic-container .type-badge.other {
    background: rgba(99,102,241,0.15);
    color: var(--accent-glow);
  }

  /* ── Multiplier Viz ── */
  .infographic-container .multiplier-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .infographic-container .multiplier-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .infographic-container .multiplier-label {
    width: 140px;
    font-size: 0.85rem;
    color: var(--text-muted);
    text-align: right;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 32px;
  }

  .infographic-container .multiplier-bar-track {
    flex: 1;
    height: 32px;
    background: rgba(0,0,0,0.03);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }

  .infographic-container .multiplier-bar {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: var(--mono);
    color: #ffffff;
    transition: width 1.5s ease-out;
    min-width: 42px;
  }

  /* ── Scroll Animations ── */
  .infographic-container .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .infographic-container .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Footer ── */
  .infographic-container .section-divider {
    max-width: 720px;
    margin: 0 auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent);
  }

  .infographic-container .footer {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    border-top: none;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .infographic-container .footer a {
    color: var(--accent-glow);
    text-decoration: none;
  }

  .infographic-container .footer a:hover { text-decoration: underline; }

  /* ══════════════════════════════════════════════════════ */
  /* MOBILE RESPONSIVE STYLES                              */
  /* ══════════════════════════════════════════════════════ */

  /* ── Tablet (768px and below) ── */
  @media (max-width: 768px) {
    .infographic-container .prose-section {
      padding: 3rem 1.25rem;
    }

    .infographic-container .prose-section h2 {
      font-size: 1.5rem;
    }

    .infographic-container .chart-container {
      padding: 1.5rem 1rem;
    }

    .infographic-container .chart-title {
      font-size: 1.15rem;
    }

    .infographic-container .stat-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .infographic-container .multiplier-label {
      width: 110px;
      font-size: 0.78rem;
    }

    .infographic-container .multiplier-bar-track {
      height: 28px;
    }
  }

  /* ── Mobile (480px and below) ── */
  @media (max-width: 480px) {
    .infographic-container .hero {
      padding: 1.5rem;
    }

    .infographic-container .hero-meta {
      top: 4.5rem; /* Clear floating nav bar on mobile */
      font-size: 0.75rem;
      gap: 0.35rem;
      padding: 0 1rem;
      width: 100%;
    }

    .infographic-container .hero-tags {
      display: none; /* Hide tags on mobile to save space */
    }

    .infographic-container .hero h1 {
      font-size: clamp(1.6rem, 7vw, 2.2rem);
      margin-bottom: 1rem;
    }

    .infographic-container .hero .subtitle {
      font-size: 1rem;
    }

    .infographic-container .prose-section {
      padding: 2.5rem 1rem;
    }

    .infographic-container .prose-section h2 {
      font-size: 1.35rem;
    }

    .infographic-container .prose-section p {
      font-size: 0.95rem;
      line-height: 1.7;
    }

    .infographic-container .stat-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .infographic-container .stat-card .stat-value {
      font-size: 1.6rem;
    }

    .infographic-container .chart-section {
      padding: 0 0.5rem;
      margin: 1.5rem auto 3rem;
    }

    .infographic-container .chart-container {
      padding: 1.25rem 0.75rem;
      border-radius: 12px;
    }

    .infographic-container .chart-title {
      font-size: 1.05rem;
    }

    .infographic-container .chart-subtitle {
      font-size: 0.8rem;
    }

    /* ── Apps Table: Mobile Layout ── */
    .infographic-container .apps-table {
      font-size: 0.8rem;
    }

    .infographic-container .apps-table th {
      font-size: 0.65rem;
      padding: 0.4rem 0.4rem;
    }

    .infographic-container .apps-table td {
      padding: 0.5rem 0.4rem;
      font-size: 0.8rem;
    }

    /* Hide the bar chart column on mobile to prevent overflow */
    .apps-table .bar-cell,
    .infographic-container .apps-table td:nth-child(4) {
      display: none;
    }

    .infographic-container .apps-table th:nth-child(4) {
      display: none;
    }

    .infographic-container .type-badge {
      font-size: 0.55rem;
      padding: 0.1rem 0.35rem;
    }

    /* ── Agent Comparison: Stack vertically ── */
    .infographic-container .agent-comparison {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0 0.5rem;
      margin: 1.5rem auto 3rem;
    }

    .infographic-container .agent-card {
      padding: 1.25rem;
      border-radius: 12px;
    }

    .infographic-container .agent-card .prompt-box {
      font-size: 0.78rem;
      padding: 0.6rem 0.75rem;
    }

    .infographic-container .token-counter .value {
      font-size: 1.15rem;
    }

    .infographic-container #agent-tree-viz {
      height: 260px !important;
      overflow: hidden;
    }

    .infographic-container .agent-card {
      overflow: hidden;
    }

    /* ── Multiplier Bars: Compact ── */
    .infographic-container .multiplier-row {
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .infographic-container .multiplier-label {
      width: 90px;
      font-size: 0.72rem;
    }

    .infographic-container .multiplier-bar-track {
      height: 26px;
    }

    .infographic-container .multiplier-bar {
      font-size: 0.7rem;
    }

    /* ── Jevons Chart ── */
    .infographic-container #jevons-chart {
      min-height: 180px;
    }

    /* ── Blockquote ── */
    .infographic-container blockquote {
      padding: 0.75rem 1rem;
      margin: 1.5rem 0;
      font-size: 0.9rem;
    }

    /* ── Footer ── */
    .infographic-container .footer {
      padding: 2rem 1rem;
      font-size: 0.75rem;
    }
  }

</style>
<script src="https://d3js.org/d3.v7.min.js"></script>


<!-- ════════════════════════════════════════════════════════════ -->
<!-- HERO -->
<!-- ════════════════════════════════════════════════════════════ -->
<section class="hero">
  <div class="hero-meta">
    <span class="hero-date">February 20, 2026</span>
    <span class="hero-separator">·</span>
    <span class="hero-reading-time">47 min read</span>
    <div class="hero-tags">
      <span class="hero-tag">ai</span>
      <span class="hero-tag">agents</span>
      <span class="hero-tag">manus</span>
      <span class="hero-tag">productivity</span>
      <span class="hero-tag">agentic-ai</span>
      <span class="hero-tag">token-law</span>
      <span class="hero-tag">moores-law</span>
    </div>
  </div>
  <h1>The Machines Are Talking to Themselves</h1>
  <p class="subtitle">OpenRouter data shows that AI agents now consume more tokens than humans. Here's what that means for the future of computing.</p>
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
    <div class="chart-subtitle">Transistors per microprocessor (1971–2024) vs. AI tokens processed per week on OpenRouter (2025–2026). Log scale. Note: x-axis is compressed — 53 years on the left, 2 years on the right.</div>
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
  <p>As we've seen, this new age comes with a new set of rules. The abstract "thought" of a token carries a real-world cost in energy, and the economics of AI are being rewritten around tasks completed, not tokens spent. We're also starting to account for what I'd call the <span class="highlight">"Unreliability Tax"</span>—the hidden but significant engineering cost of building production-grade systems on top of non-deterministic models. This tax is paid in the engineering hours spent on robust retry logic with exponential backoff, the computational overhead of input/output validation parsers that can handle hallucinated JSON, and the architectural complexity of stateful error recovery to roll back a workflow that fails midway.</p>
  <p>The central challenge for engineers and innovators in the next decade will not be merely building bigger models, but mastering the art of orchestrating these powerful, token-hungry agents. The future will belong to those of us who can manage this flow of digital thought as meticulously as a conductor leads an orchestra.</p>
  <p>However, there is a fascinating counter-argument to consider: the <span class="highlight">Intelligence Paradox</span>. Does a truly advanced agent use <em>more</em> tokens, or <em>fewer</em>? A novice programmer might write 1,000 lines of brute-force code to solve a problem a senior engineer solves in 100 elegant lines. It's possible that the current explosion in token use is a symptom of agent immaturity, and that as these systems become more intelligent, they will become more efficient, learning to solve complex problems with a fraction of the "thought" they require today.</p>
  <p>The age of the token has just begun, and it promises to be a far stranger, faster, and more transformative era than the one we're leaving behind.</p>
</section>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- FOOTER -->
<!-- ════════════════════════════════════════════════════════════ -->
<div class="footer">
  <p><strong>Sources:</strong>
    <a href="https://openrouter.ai/rankings" target="_blank">OpenRouter Rankings</a> ·
    <a href="https://a16z.com/state-of-ai/" target="_blank">a16z State of AI</a> ·
    <a href="https://tomtunguz.com/is-token-consumption-slowing-down/" target="_blank">Tomasz Tunguz</a> ·
    <a href="https://www.economist.com/business/2025/11/23/ai-tokens-are-surging-but-are-profits" target="_blank">The Economist</a> ·
    <a href="https://illuminem.com/illuminemvoices/the-cost-of-context-the-exponential-growth-in-tokens" target="_blank">illuminem</a> ·
    <a href="https://online.stevens.edu/blog/hidden-economics-ai-agents-token-costs-latency/" target="_blank">Stevens Institute</a>
  </p>
</div>

<!-- ════════════════════════════════════════════════════════════ -->
<!-- JAVASCRIPT -->
<!-- ════════════════════════════════════════════════════════════ -->
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
  { label: "Simple chat", value: 1, color: "#6ee7b7" },
  { label: "Reasoning (o1)", value: 15, color: "#f59e0b" },
  { label: "Coding agent", value: 50, color: "#ea580c" },
  { label: "Deep research", value: 100, color: "#dc2626" }
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
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── CHART 1: THE TWO CURVES ────────────────────────────────

function drawTwoCurves() {
  const container = document.getElementById('two-curves-chart');
  const width = container.clientWidth;
  const isMobile = width < 500;
  const height = isMobile ? Math.min(320, width * 0.7) : Math.min(420, width * 0.55);
  const margin = isMobile
    ? { top: 20, right: 15, bottom: 40, left: 45 }
    : { top: 30, right: 30, bottom: 50, left: 65 };
  const labelSize = isMobile ? '10px' : '11px';
  const titleLabelSize = isMobile ? '11px' : '13px';
  const dotLabelSize = isMobile ? '9px' : '9px';
  const milestoneSize = isMobile ? '10px' : '10px';
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = d3.select('#two-curves-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

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
  g.selectAll('.grid-line')
    .data(yTicks)
    .enter().append('line')
    .attr('x1', 0).attr('x2', w)
    .attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', 'rgba(0,0,0,0.06)');

  // X axis
  // X axis - manual ticks for the piecewise scale
  const xTicks = isMobile ? [1975, 1995, 2015, 2025] : [1975, 1985, 1995, 2005, 2015, 2025, 2026];
  xTicks.forEach(tick => {
    const tx = x(tick);
    g.append('line')
      .attr('x1', tx).attr('x2', tx)
      .attr('y1', h).attr('y2', h + 6)
      .attr('stroke', 'rgba(0,0,0,0.12)');
    g.append('text')
      .attr('x', tx).attr('y', h + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280').attr('font-size', labelSize)
      .text(tick);
  });
  g.append('line')
    .attr('x1', 0).attr('x2', w)
    .attr('y1', h).attr('y2', h)
    .attr('stroke', 'rgba(0,0,0,0.12)');

  // Y axis labels
  const yLabels = [
    { v: 1e3, t: "1K" }, { v: 1e6, t: "1M" }, { v: 1e9, t: "1B" }, { v: 1e12, t: "1T" }
  ];
  yLabels.forEach(d => {
    g.append('text')
      .attr('x', -8).attr('y', y(d.v))
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', '#4b5563').attr('font-size', isMobile ? '10px' : '12px')
      .attr('font-weight', '500')
      .text(d.t);
  });

  // Moore's Law line
  const mooresLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.transistors))
    .curve(d3.curveMonotoneX);

  const mooresPathLen = g.append('path')
    .datum(mooresLawData)
    .attr('d', mooresLine)
    .attr('fill', 'none')
    .attr('stroke', 'none')
    .node().getTotalLength();

  const mooresPath = g.append('path')
    .datum(mooresLawData)
    .attr('d', mooresLine)
    .attr('fill', 'none')
    .attr('stroke', '#4f46e5')
    .attr('stroke-width', 2.5)
    .attr('stroke-dasharray', mooresPathLen)
    .attr('stroke-dashoffset', mooresPathLen);

  // Moore's Law label — positioned below the curve to avoid overlap
  g.append('text')
    .attr('x', x(isMobile ? 1990 : 2000)).attr('y', y(isMobile ? 2e4 : 5e4))
    .attr('fill', '#4f46e5').attr('font-size', isMobile ? '9px' : '12px').attr('font-weight', '600')
    .text("Moore's Law");

  if (!isMobile) {
    g.append('text')
      .attr('x', x(2000)).attr('y', y(5e4) + 16)
      .attr('fill', '#6b7280').attr('font-size', '10px')
      .text("(transistors per chip)");
  }

  // Moore's Law milestone dots
  const mooresMilestones = isMobile
    ? mooresLawData.filter(d => d.label && ['Intel 4004', 'Pentium', 'Plateau'].includes(d.label))
    : mooresLawData.filter(d => d.label);
  mooresMilestones.forEach(d => {
    g.append('circle')
      .attr('cx', x(d.year)).attr('cy', y(d.transistors))
      .attr('r', isMobile ? 3 : 4).attr('fill', '#4f46e5').attr('opacity', 0.7);
    g.append('text')
      .attr('x', x(d.year)).attr('y', y(d.transistors) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280').attr('font-size', dotLabelSize)
      .text(d.label);
  });

  // Token Law line
  const tokenLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.tokens))
    .curve(d3.curveMonotoneX);

  const tokenPath = g.append('path')
    .datum(tokenLawData)
    .attr('d', tokenLine)
    .attr('fill', 'none')
    .attr('stroke', '#ea580c')
    .attr('stroke-width', 3.5)
    .attr('stroke-dasharray', function() { return this.getTotalLength(); })
    .attr('stroke-dashoffset', function() { return this.getTotalLength(); });

  // Token Law glow
  g.append('path')
    .datum(tokenLawData)
    .attr('d', tokenLine)
    .attr('fill', 'none')
    .attr('stroke', '#ea580c')
    .attr('stroke-width', 8)
    .attr('opacity', 0.15);

  // Token Law label
  g.append('text')
    .attr('x', x(isMobile ? 2025.5 : 2025.2)).attr('y', y(5e13))
    .attr('fill', '#c2410c').attr('font-size', titleLabelSize).attr('font-weight', '700')
    .text("Token Law");

  if (!isMobile) {
    g.append('text')
      .attr('x', x(2025.2)).attr('y', y(5e13) + 16)
      .attr('fill', '#6b7280').attr('font-size', '10px')
      .text("(tokens/week)");
  }

  // Token Law milestone dots - on mobile, only show first and last
  const tokenMilestones = isMobile
    ? tokenLawData.filter(d => d.label && (d.label === '1T/wk' || d.label === '10T/wk'))
    : tokenLawData.filter(d => d.label);
  tokenMilestones.forEach(d => {
    g.append('circle')
      .attr('cx', x(d.year)).attr('cy', y(d.tokens))
      .attr('r', isMobile ? 4 : 5).attr('fill', '#ea580c');
    const xOff = d.labelPos === 'left' ? (isMobile ? -6 : -10) : (isMobile ? 6 : 10);
    const anchor = d.labelPos === 'left' ? 'end' : 'start';
    g.append('text')
      .attr('x', x(d.year) + xOff).attr('y', y(d.tokens) + 4)
      .attr('text-anchor', anchor)
      .attr('fill', '#c2410c').attr('font-size', milestoneSize).attr('font-weight', '600')
      .text(d.label);
  });

  // Doubling time annotation for Moore's Law
  if (!isMobile) {
    const mAnnoteX = x(1990);
    const mAnnoteY = y(1e5);
    g.append('rect')
      .attr('x', mAnnoteX - 72).attr('y', mAnnoteY - 10)
      .attr('width', 144).attr('height', 22)
      .attr('rx', 4)
      .attr('fill', 'rgba(79,70,229,0.08)')
      .attr('stroke', 'rgba(79,70,229,0.2)').attr('stroke-width', 1);
    g.append('text')
      .attr('x', mAnnoteX).attr('y', mAnnoteY + 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#4f46e5').attr('font-size', '11px').attr('font-weight', '600')
      .text('Doubles every ~2 years');
  }

  // Doubling time annotation for Token Law
  const tAnnoteX = x(isMobile ? 2025.8 : 2025.6);
  const tAnnoteY = y(isMobile ? 5e10 : 2e11);
  if (!isMobile) {
    g.append('rect')
      .attr('x', tAnnoteX - 82).attr('y', tAnnoteY - 10)
      .attr('width', 164).attr('height', 22)
      .attr('rx', 4)
      .attr('fill', 'rgba(234,88,12,0.08)')
      .attr('stroke', 'rgba(234,88,12,0.2)').attr('stroke-width', 1);
  }
  g.append('text')
    .attr('x', tAnnoteX).attr('y', tAnnoteY + 5)
    .attr('text-anchor', 'middle')
    .attr('fill', '#c2410c').attr('font-size', isMobile ? '9px' : '11px').attr('font-weight', '600')
    .text(isMobile ? '~3.5mo doubling' : 'Doubles every ~3.5 months');

  // Divider line at 2024
  g.append('line')
    .attr('x1', x(2024.5)).attr('x2', x(2024.5))
    .attr('y1', 0).attr('y2', h)
    .attr('stroke', 'rgba(0,0,0,0.12)')
    .attr('stroke-dasharray', '4 4');

  g.append('text')
    .attr('x', x(2024.5)).attr('y', -10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#6b7280').attr('font-size', isMobile ? '8px' : '10px')
    .text("← 53 years | 2 years →");

  // Animate on scroll
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mooresPath.transition().duration(2000).ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0);
        tokenPath.transition().delay(1500).duration(1500).ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0);
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  chartObserver.observe(container);
}

// ── TOP APPS TABLE ──────────────────────────────────────────

function drawAppsTable() {
  const maxTokens = topApps[0].tokens;
  const tbody = document.getElementById('apps-table-body');

  topApps.forEach((app, i) => {
    const pct = (app.tokens / maxTokens * 100).toFixed(1);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="color:var(--text-muted)">${app.rank}</td>
      <td style="font-weight:600">${app.name}</td>
      <td><span class="type-badge ${app.type}">${app.type === 'coding' ? '⚡ Coding' : '💬 Other'}</span></td>
      <td class="bar-cell">
        <div class="bar-bg">
          <div class="bar-fill ${app.type}" style="width:0%" data-width="${pct}%"></div>
        </div>
      </td>
      <td style="text-align:right; font-family:var(--mono); font-size:0.85rem">${app.tokens}${app.unit}</td>
    `;
    tbody.appendChild(row);
  });

  // Animate bars
  const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar-fill').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, i * 80);
        });
        tableObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  tableObserver.observe(tbody.closest('.chart-container'));
}

// ── AGENT COMPARISON ANIMATION ──────────────────────────────

function drawAgentComparison() {
  // Simple query: just a dot
  const simpleSvg = d3.select('#simple-dot-viz')
    .append('svg')
    .attr('width', '100%')
    .attr('height', 120);

  const dotGroup = simpleSvg.append('g')
    .attr('transform', 'translate(50%, 60)');

  simpleSvg.append('circle')
    .attr('cx', '50%').attr('cy', 60)
    .attr('r', 0)
    .attr('fill', '#16a34a')
    .attr('opacity', 0.8)
    .transition().delay(500).duration(600)
    .attr('r', 8);

  simpleSvg.append('text')
    .attr('x', '50%').attr('y', 90)
    .attr('text-anchor', 'middle')
    .attr('fill', '#16a34a').attr('font-size', '12px')
    .attr('opacity', 0)
    .text('"Paris"')
    .transition().delay(1000).duration(400)
    .attr('opacity', 1);

  // Animate simple counter
  const simpleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('simple-token-count', 0, 47, 800, false);
        setTimeout(() => {
          document.getElementById('simple-cost').textContent = '$0.0001';
          document.getElementById('simple-token-count').textContent = '47';
        }, 850);
        simpleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  simpleObserver.observe(document.querySelector('.agent-card.simple'));

  // Agent tree
  drawAgentTree();

  // Animate agent counter
  const agentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('agent-token-count', 0, 2900000, 2500, true);
        setTimeout(() => {
          document.getElementById('agent-cost').textContent = '$5.80';
          document.getElementById('agent-token-count').textContent = '2,900,000';
        }, 2600);
        agentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  agentObserver.observe(document.querySelector('.agent-card.agentic'));
}

function drawAgentTree() {
  const container = document.getElementById('agent-tree-viz');
  const width = container.clientWidth;
  const isMobileTree = width < 400;
  const height = isMobileTree ? 240 : 320;

  // On mobile, use a simplified tree (collapse leaf children)
  let treeData = agentTreeData;
  if (isMobileTree) {
    treeData = {
      name: agentTreeData.name,
      children: agentTreeData.children.map(c => ({
        name: c.name,
        tokens: c.tokens,
        loop: c.loop
        // omit grandchildren on mobile
      }))
    };
  }

  const svg = d3.select('#agent-tree-viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const pad = isMobileTree ? 10 : 20;
  const g = svg.append('g').attr('transform', `translate(${pad}, ${pad})`);

  const treeLayout = d3.tree()
    .size([width - pad * 2, height - pad * 2 - 20])
    .separation((a, b) => a.parent === b.parent ? (isMobileTree ? 1 : 1.5) : 2);
  const root = d3.hierarchy(treeData);
  treeLayout(root);

  // Links
  g.selectAll('.agent-tree-link')
    .data(root.links())
    .enter().append('path')
    .attr('class', 'agent-tree-link')
    .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y))
    .attr('stroke', d => d.target.data.loop ? '#ef4444' : 'rgba(249,115,22,0.3)')
    .attr('stroke-dasharray', d => d.target.data.loop ? '4 3' : 'none');

  // Nodes
  const nodes = g.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  nodes.append('circle')
    .attr('r', d => d.depth === 0 ? 6 : 5)
    .attr('fill', d => {
      if (d.data.loop) return '#ef4444';
      if (d.data.name.includes('❌')) return '#ef4444';
      if (d.data.name.includes('✓')) return '#22c55e';
      return '#c2410c';
    })
    .attr('opacity', 0.9);

  // Labels: alternate above/below for leaf nodes to avoid overlap
  let leafIndex = 0;
  nodes.append('text')
    .attr('dy', d => {
      if (d.children) return -14;
      leafIndex++;
      return (leafIndex % 2 === 0) ? -14 : 20;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', '#6b7280')
    .attr('font-size', '8px')
    .text(d => {
      const name = d.data.name;
      if (name.length > 14) return name.slice(0, 12) + '…';
      return name;
    });
}

function animateCounter(id, start, end, duration, format) {
  const el = document.getElementById(id);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
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
  const container = document.getElementById('multiplier-bars');
  const maxVal = multiplierData[multiplierData.length - 1].value;

  multiplierData.forEach(d => {
    const row = document.createElement('div');
    row.className = 'multiplier-row';
    const pct = (d.value / maxVal * 100);
    const textColor = d.value <= 15 ? '#1a1a2e' : '#ffffff';
    row.innerHTML = `
      <div class="multiplier-label">${d.label}</div>
      <div class="multiplier-bar-track">
        <div class="multiplier-bar" style="width:0%; background:${d.color}; color:${textColor}" data-width="${Math.max(pct, 3)}%">
          ${d.value}×
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.querySelectorAll('.multiplier-bar').forEach((bar, i) => {
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
  const container = document.getElementById('jevons-chart');
  const width = container.clientWidth;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 40, left: 20 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = d3.select('#jevons-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Y-axis label
  svg.append('text')
    .attr('x', 12)
    .attr('y', margin.top - 6)
    .attr('fill', '#6b7280')
    .attr('font-size', '10px')
    .text('Multiplier (×)');

  const data = [
    { label: "Hardware\nefficiency", value: 4, color: "#16a34a", symbol: "×4" },
    { label: "Software\noptimization", value: 3, color: "#0891b2", symbol: "×3" },
    { label: "Combined\nefficiency", value: 12, color: "#4f46e5", symbol: "×12" },
    { label: "Token\ngrowth", value: 50, color: "#ea580c", symbol: "×50" },
    { label: "Net energy\nper query", value: 4.2, color: "#dc2626", symbol: "×4.2↑" }
  ];

  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, w]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 55]).range([h, 0]);

  // Bars
  const bars = g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('x', d => x(d.label))
    .attr('width', x.bandwidth())
    .attr('y', h)
    .attr('height', 0)
    .attr('rx', 4)
    .attr('fill', d => d.color)
    .attr('opacity', 0.85);

  // Labels above bars
  const labels = g.selectAll('.bar-label')
    .data(data)
    .enter().append('text')
    .attr('x', d => x(d.label) + x.bandwidth() / 2)
    .attr('y', h)
    .attr('text-anchor', 'middle')
    .attr('fill', d => d.color)
    .attr('font-size', '14px')
    .attr('font-weight', '700')
    .attr('font-family', 'var(--mono)')
    .attr('opacity', 0)
    .text(d => d.symbol);

  // X axis labels
  const jevonsLabelSize = width < 400 ? '9px' : '11px';
  const jevonsLabelSpacing = width < 400 ? 11 : 13;
  data.forEach((d, i) => {
    const lines = d.label.split('\n');
    lines.forEach((line, j) => {
      g.append('text')
        .attr('x', x(d.label) + x.bandwidth() / 2)
        .attr('y', h + 18 + j * jevonsLabelSpacing)
        .attr('text-anchor', 'middle')
        .attr('fill', '#4b5563').attr('font-size', jevonsLabelSize)
        .text(line);
    });
  });

  // Animate on scroll
  let jevonsAnimated = false;
  function animateJevons() {
    if (jevonsAnimated) return;
    jevonsAnimated = true;
    bars.transition().duration(1200).delay((d, i) => i * 200)
      .attr('y', d => y(d.value))
      .attr('height', d => h - y(d.value));
    labels.transition().duration(400).delay((d, i) => 1200 + i * 200)
      .attr('y', d => y(d.value) - 8)
      .attr('opacity', 1);
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

document.addEventListener('DOMContentLoaded', () => {
  drawTwoCurves();
  drawAppsTable();
  drawAgentComparison();
  drawMultiplierBars();
  drawJevonsChart();
});

// Redraw on resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.getElementById('two-curves-chart').innerHTML = '';
    document.getElementById('jevons-chart').innerHTML = '';
    drawTwoCurves();
    drawJevonsChart();
  }, 300);
});
</script>


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
  { label: "Simple chat", value: 1, color: "#6ee7b7" },
  { label: "Reasoning (o1)", value: 15, color: "#f59e0b" },
  { label: "Coding agent", value: 50, color: "#ea580c" },
  { label: "Deep research", value: 100, color: "#dc2626" }
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
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── CHART 1: THE TWO CURVES ────────────────────────────────

function drawTwoCurves() {
  const container = document.getElementById('two-curves-chart');
  const width = container.clientWidth;
  const isMobile = width < 500;
  const height = isMobile ? Math.min(320, width * 0.7) : Math.min(420, width * 0.55);
  const margin = isMobile
    ? { top: 20, right: 15, bottom: 40, left: 45 }
    : { top: 30, right: 30, bottom: 50, left: 65 };
  const labelSize = isMobile ? '10px' : '11px';
  const titleLabelSize = isMobile ? '11px' : '13px';
  const dotLabelSize = isMobile ? '9px' : '9px';
  const milestoneSize = isMobile ? '10px' : '10px';
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = d3.select('#two-curves-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

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
  g.selectAll('.grid-line')
    .data(yTicks)
    .enter().append('line')
    .attr('x1', 0).attr('x2', w)
    .attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', 'rgba(0,0,0,0.06)');

  // X axis
  // X axis - manual ticks for the piecewise scale
  const xTicks = isMobile ? [1975, 1995, 2015, 2025] : [1975, 1985, 1995, 2005, 2015, 2025, 2026];
  xTicks.forEach(tick => {
    const tx = x(tick);
    g.append('line')
      .attr('x1', tx).attr('x2', tx)
      .attr('y1', h).attr('y2', h + 6)
      .attr('stroke', 'rgba(0,0,0,0.12)');
    g.append('text')
      .attr('x', tx).attr('y', h + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280').attr('font-size', labelSize)
      .text(tick);
  });
  g.append('line')
    .attr('x1', 0).attr('x2', w)
    .attr('y1', h).attr('y2', h)
    .attr('stroke', 'rgba(0,0,0,0.12)');

  // Y axis labels
  const yLabels = [
    { v: 1e3, t: "1K" }, { v: 1e6, t: "1M" }, { v: 1e9, t: "1B" }, { v: 1e12, t: "1T" }
  ];
  yLabels.forEach(d => {
    g.append('text')
      .attr('x', -8).attr('y', y(d.v))
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', '#4b5563').attr('font-size', isMobile ? '10px' : '12px')
      .attr('font-weight', '500')
      .text(d.t);
  });

  // Moore's Law line
  const mooresLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.transistors))
    .curve(d3.curveMonotoneX);

  const mooresPathLen = g.append('path')
    .datum(mooresLawData)
    .attr('d', mooresLine)
    .attr('fill', 'none')
    .attr('stroke', 'none')
    .node().getTotalLength();

  const mooresPath = g.append('path')
    .datum(mooresLawData)
    .attr('d', mooresLine)
    .attr('fill', 'none')
    .attr('stroke', '#4f46e5')
    .attr('stroke-width', 2.5)
    .attr('stroke-dasharray', mooresPathLen)
    .attr('stroke-dashoffset', mooresPathLen);

  // Moore's Law label — positioned below the curve to avoid overlap
  g.append('text')
    .attr('x', x(isMobile ? 1990 : 2000)).attr('y', y(isMobile ? 2e4 : 5e4))
    .attr('fill', '#4f46e5').attr('font-size', isMobile ? '9px' : '12px').attr('font-weight', '600')
    .text("Moore's Law");

  if (!isMobile) {
    g.append('text')
      .attr('x', x(2000)).attr('y', y(5e4) + 16)
      .attr('fill', '#6b7280').attr('font-size', '10px')
      .text("(transistors per chip)");
  }

  // Moore's Law milestone dots
  const mooresMilestones = isMobile
    ? mooresLawData.filter(d => d.label && ['Intel 4004', 'Pentium', 'Plateau'].includes(d.label))
    : mooresLawData.filter(d => d.label);
  mooresMilestones.forEach(d => {
    g.append('circle')
      .attr('cx', x(d.year)).attr('cy', y(d.transistors))
      .attr('r', isMobile ? 3 : 4).attr('fill', '#4f46e5').attr('opacity', 0.7);
    g.append('text')
      .attr('x', x(d.year)).attr('y', y(d.transistors) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6b7280').attr('font-size', dotLabelSize)
      .text(d.label);
  });

  // Token Law line
  const tokenLine = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.tokens))
    .curve(d3.curveMonotoneX);

  const tokenPath = g.append('path')
    .datum(tokenLawData)
    .attr('d', tokenLine)
    .attr('fill', 'none')
    .attr('stroke', '#ea580c')
    .attr('stroke-width', 3.5)
    .attr('stroke-dasharray', function() { return this.getTotalLength(); })
    .attr('stroke-dashoffset', function() { return this.getTotalLength(); });

  // Token Law glow
  g.append('path')
    .datum(tokenLawData)
    .attr('d', tokenLine)
    .attr('fill', 'none')
    .attr('stroke', '#ea580c')
    .attr('stroke-width', 8)
    .attr('opacity', 0.15);

  // Token Law label
  g.append('text')
    .attr('x', x(isMobile ? 2025.5 : 2025.2)).attr('y', y(5e13))
    .attr('fill', '#c2410c').attr('font-size', titleLabelSize).attr('font-weight', '700')
    .text("Token Law");

  if (!isMobile) {
    g.append('text')
      .attr('x', x(2025.2)).attr('y', y(5e13) + 16)
      .attr('fill', '#6b7280').attr('font-size', '10px')
      .text("(tokens/week)");
  }

  // Token Law milestone dots - on mobile, only show first and last
  const tokenMilestones = isMobile
    ? tokenLawData.filter(d => d.label && (d.label === '1T/wk' || d.label === '10T/wk'))
    : tokenLawData.filter(d => d.label);
  tokenMilestones.forEach(d => {
    g.append('circle')
      .attr('cx', x(d.year)).attr('cy', y(d.tokens))
      .attr('r', isMobile ? 4 : 5).attr('fill', '#ea580c');
    const xOff = d.labelPos === 'left' ? (isMobile ? -6 : -10) : (isMobile ? 6 : 10);
    const anchor = d.labelPos === 'left' ? 'end' : 'start';
    g.append('text')
      .attr('x', x(d.year) + xOff).attr('y', y(d.tokens) + 4)
      .attr('text-anchor', anchor)
      .attr('fill', '#c2410c').attr('font-size', milestoneSize).attr('font-weight', '600')
      .text(d.label);
  });

  // Doubling time annotation for Moore's Law
  if (!isMobile) {
    const mAnnoteX = x(1990);
    const mAnnoteY = y(1e5);
    g.append('rect')
      .attr('x', mAnnoteX - 72).attr('y', mAnnoteY - 10)
      .attr('width', 144).attr('height', 22)
      .attr('rx', 4)
      .attr('fill', 'rgba(79,70,229,0.08)')
      .attr('stroke', 'rgba(79,70,229,0.2)').attr('stroke-width', 1);
    g.append('text')
      .attr('x', mAnnoteX).attr('y', mAnnoteY + 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#4f46e5').attr('font-size', '11px').attr('font-weight', '600')
      .text('Doubles every ~2 years');
  }

  // Doubling time annotation for Token Law
  const tAnnoteX = x(isMobile ? 2025.8 : 2025.6);
  const tAnnoteY = y(isMobile ? 5e10 : 2e11);
  if (!isMobile) {
    g.append('rect')
      .attr('x', tAnnoteX - 82).attr('y', tAnnoteY - 10)
      .attr('width', 164).attr('height', 22)
      .attr('rx', 4)
      .attr('fill', 'rgba(234,88,12,0.08)')
      .attr('stroke', 'rgba(234,88,12,0.2)').attr('stroke-width', 1);
  }
  g.append('text')
    .attr('x', tAnnoteX).attr('y', tAnnoteY + 5)
    .attr('text-anchor', 'middle')
    .attr('fill', '#c2410c').attr('font-size', isMobile ? '9px' : '11px').attr('font-weight', '600')
    .text(isMobile ? '~3.5mo doubling' : 'Doubles every ~3.5 months');

  // Divider line at 2024
  g.append('line')
    .attr('x1', x(2024.5)).attr('x2', x(2024.5))
    .attr('y1', 0).attr('y2', h)
    .attr('stroke', 'rgba(0,0,0,0.12)')
    .attr('stroke-dasharray', '4 4');

  g.append('text')
    .attr('x', x(2024.5)).attr('y', -10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#6b7280').attr('font-size', isMobile ? '8px' : '10px')
    .text("← 53 years | 2 years →");

  // Animate on scroll
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mooresPath.transition().duration(2000).ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0);
        tokenPath.transition().delay(1500).duration(1500).ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0);
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  chartObserver.observe(container);
}

// ── TOP APPS TABLE ──────────────────────────────────────────

function drawAppsTable() {
  const maxTokens = topApps[0].tokens;
  const tbody = document.getElementById('apps-table-body');

  topApps.forEach((app, i) => {
    const pct = (app.tokens / maxTokens * 100).toFixed(1);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="color:var(--text-muted)">${app.rank}</td>
      <td style="font-weight:600">${app.name}</td>
      <td><span class="type-badge ${app.type}">${app.type === 'coding' ? '⚡ Coding' : '💬 Other'}</span></td>
      <td class="bar-cell">
        <div class="bar-bg">
          <div class="bar-fill ${app.type}" style="width:0%" data-width="${pct}%"></div>
        </div>
      </td>
      <td style="text-align:right; font-family:var(--mono); font-size:0.85rem">${app.tokens}${app.unit}</td>
    `;
    tbody.appendChild(row);
  });

  // Animate bars
  const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar-fill').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, i * 80);
        });
        tableObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  tableObserver.observe(tbody.closest('.chart-container'));
}

// ── AGENT COMPARISON ANIMATION ──────────────────────────────

function drawAgentComparison() {
  // Simple query: just a dot
  const simpleSvg = d3.select('#simple-dot-viz')
    .append('svg')
    .attr('width', '100%')
    .attr('height', 120);

  const dotGroup = simpleSvg.append('g')
    .attr('transform', 'translate(50%, 60)');

  simpleSvg.append('circle')
    .attr('cx', '50%').attr('cy', 60)
    .attr('r', 0)
    .attr('fill', '#16a34a')
    .attr('opacity', 0.8)
    .transition().delay(500).duration(600)
    .attr('r', 8);

  simpleSvg.append('text')
    .attr('x', '50%').attr('y', 90)
    .attr('text-anchor', 'middle')
    .attr('fill', '#16a34a').attr('font-size', '12px')
    .attr('opacity', 0)
    .text('"Paris"')
    .transition().delay(1000).duration(400)
    .attr('opacity', 1);

  // Animate simple counter
  const simpleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('simple-token-count', 0, 47, 800, false);
        setTimeout(() => {
          document.getElementById('simple-cost').textContent = '$0.0001';
          document.getElementById('simple-token-count').textContent = '47';
        }, 850);
        simpleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  simpleObserver.observe(document.querySelector('.agent-card.simple'));

  // Agent tree
  drawAgentTree();

  // Animate agent counter
  const agentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('agent-token-count', 0, 2900000, 2500, true);
        setTimeout(() => {
          document.getElementById('agent-cost').textContent = '$5.80';
          document.getElementById('agent-token-count').textContent = '2,900,000';
        }, 2600);
        agentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  agentObserver.observe(document.querySelector('.agent-card.agentic'));
}

function drawAgentTree() {
  const container = document.getElementById('agent-tree-viz');
  const width = container.clientWidth;
  const isMobileTree = width < 400;
  const height = isMobileTree ? 240 : 320;

  // On mobile, use a simplified tree (collapse leaf children)
  let treeData = agentTreeData;
  if (isMobileTree) {
    treeData = {
      name: agentTreeData.name,
      children: agentTreeData.children.map(c => ({
        name: c.name,
        tokens: c.tokens,
        loop: c.loop
        // omit grandchildren on mobile
      }))
    };
  }

  const svg = d3.select('#agent-tree-viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const pad = isMobileTree ? 10 : 20;
  const g = svg.append('g').attr('transform', `translate(${pad}, ${pad})`);

  const treeLayout = d3.tree()
    .size([width - pad * 2, height - pad * 2 - 20])
    .separation((a, b) => a.parent === b.parent ? (isMobileTree ? 1 : 1.5) : 2);
  const root = d3.hierarchy(treeData);
  treeLayout(root);

  // Links
  g.selectAll('.agent-tree-link')
    .data(root.links())
    .enter().append('path')
    .attr('class', 'agent-tree-link')
    .attr('d', d3.linkVertical().x(d => d.x).y(d => d.y))
    .attr('stroke', d => d.target.data.loop ? '#ef4444' : 'rgba(249,115,22,0.3)')
    .attr('stroke-dasharray', d => d.target.data.loop ? '4 3' : 'none');

  // Nodes
  const nodes = g.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x},${d.y})`);

  nodes.append('circle')
    .attr('r', d => d.depth === 0 ? 6 : 5)
    .attr('fill', d => {
      if (d.data.loop) return '#ef4444';
      if (d.data.name.includes('❌')) return '#ef4444';
      if (d.data.name.includes('✓')) return '#22c55e';
      return '#c2410c';
    })
    .attr('opacity', 0.9);

  // Labels: alternate above/below for leaf nodes to avoid overlap
  let leafIndex = 0;
  nodes.append('text')
    .attr('dy', d => {
      if (d.children) return -14;
      leafIndex++;
      return (leafIndex % 2 === 0) ? -14 : 20;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', '#6b7280')
    .attr('font-size', '8px')
    .text(d => {
      const name = d.data.name;
      if (name.length > 14) return name.slice(0, 12) + '…';
      return name;
    });
}

function animateCounter(id, start, end, duration, format) {
  const el = document.getElementById(id);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
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
  const container = document.getElementById('multiplier-bars');
  const maxVal = multiplierData[multiplierData.length - 1].value;

  multiplierData.forEach(d => {
    const row = document.createElement('div');
    row.className = 'multiplier-row';
    const pct = (d.value / maxVal * 100);
    const textColor = d.value <= 15 ? '#1a1a2e' : '#ffffff';
    row.innerHTML = `
      <div class="multiplier-label">${d.label}</div>
      <div class="multiplier-bar-track">
        <div class="multiplier-bar" style="width:0%; background:${d.color}; color:${textColor}" data-width="${Math.max(pct, 3)}%">
          ${d.value}×
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.querySelectorAll('.multiplier-bar').forEach((bar, i) => {
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
  const container = document.getElementById('jevons-chart');
  const width = container.clientWidth;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 40, left: 20 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = d3.select('#jevons-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Y-axis label
  svg.append('text')
    .attr('x', 12)
    .attr('y', margin.top - 6)
    .attr('fill', '#6b7280')
    .attr('font-size', '10px')
    .text('Multiplier (×)');

  const data = [
    { label: "Hardware\nefficiency", value: 4, color: "#16a34a", symbol: "×4" },
    { label: "Software\noptimization", value: 3, color: "#0891b2", symbol: "×3" },
    { label: "Combined\nefficiency", value: 12, color: "#4f46e5", symbol: "×12" },
    { label: "Token\ngrowth", value: 50, color: "#ea580c", symbol: "×50" },
    { label: "Net energy\nper query", value: 4.2, color: "#dc2626", symbol: "×4.2↑" }
  ];

  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, w]).padding(0.3);
  const y = d3.scaleLinear().domain([0, 55]).range([h, 0]);

  // Bars
  const bars = g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('x', d => x(d.label))
    .attr('width', x.bandwidth())
    .attr('y', h)
    .attr('height', 0)
    .attr('rx', 4)
    .attr('fill', d => d.color)
    .attr('opacity', 0.85);

  // Labels above bars
  const labels = g.selectAll('.bar-label')
    .data(data)
    .enter().append('text')
    .attr('x', d => x(d.label) + x.bandwidth() / 2)
    .attr('y', h)
    .attr('text-anchor', 'middle')
    .attr('fill', d => d.color)
    .attr('font-size', '14px')
    .attr('font-weight', '700')
    .attr('font-family', 'var(--mono)')
    .attr('opacity', 0)
    .text(d => d.symbol);

  // X axis labels
  const jevonsLabelSize = width < 400 ? '9px' : '11px';
  const jevonsLabelSpacing = width < 400 ? 11 : 13;
  data.forEach((d, i) => {
    const lines = d.label.split('\n');
    lines.forEach((line, j) => {
      g.append('text')
        .attr('x', x(d.label) + x.bandwidth() / 2)
        .attr('y', h + 18 + j * jevonsLabelSpacing)
        .attr('text-anchor', 'middle')
        .attr('fill', '#4b5563').attr('font-size', jevonsLabelSize)
        .text(line);
    });
  });

  // Animate on scroll
  let jevonsAnimated = false;
  function animateJevons() {
    if (jevonsAnimated) return;
    jevonsAnimated = true;
    bars.transition().duration(1200).delay((d, i) => i * 200)
      .attr('y', d => y(d.value))
      .attr('height', d => h - y(d.value));
    labels.transition().duration(400).delay((d, i) => 1200 + i * 200)
      .attr('y', d => y(d.value) - 8)
      .attr('opacity', 1);
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

document.addEventListener('DOMContentLoaded', () => {
  drawTwoCurves();
  drawAppsTable();
  drawAgentComparison();
  drawMultiplierBars();
  drawJevonsChart();
});

// Redraw on resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.getElementById('two-curves-chart').innerHTML = '';
    document.getElementById('jevons-chart').innerHTML = '';
    drawTwoCurves();
    drawJevonsChart();
  }, 300);
});
</script>

</div>


## The New Exponential

When I first dug into the data, the evidence for this new exponential was overwhelming. I was looking at data from OpenRouter, a platform that aggregates usage across hundreds of AI models, and the growth curve just blew me away. In early 2025, the platform was processing just under 1 trillion tokens per week. By early 2026, that number had skyrocketed by more than 12x to over 12 trillion tokens per week [1]. That’s not just a doubling; it’s a twelve-fold increase in a single year. It makes the two-year doubling cycle of Moore’s Law, which I once thought was the pinnacle of speed, seem almost quaint.

This isn't an isolated trend. I saw it mirrored across the industry at the largest scales. In August 2025, Google announced it was processing 980 trillion tokens per month. Just two months later, in October, that figure had climbed to 1.3 quadrillion (1,300 trillion) tokens [2]. In China, I read that internet giant Alibaba is seeing its token use double every few months [3]. The age of linear growth is over. We’re in the exponential age of the token.

This tenfold explosion in a single year begs the question: where is this demand coming from? The answer reveals a fundamental shift in how we use AI.

---

## The Robots Are Doing the Talking

My first thought was that it’s just more people like you and me chatting with AI. But that’s not the whole story. The primary driver is a fundamental shift in how AI operates. We’re moving from simple, single-shot queries to complex, multi-step workflows executed by what we in the field call autonomous “agentic” AI systems.

For me, the most compelling evidence for this shift was seeing which applications were consuming the most tokens. When I looked at the OpenRouter leaderboard, it wasn’t dominated by chatbots. The real power users were coding assistants—specialized AI agents that I can imagine using myself to write, debug, and manage software. Apps like OpenClaw (consuming a staggering 282 billion tokens per day) and Kilo Code (at 160 billion tokens per day) are the heavyweights in this new ecosystem [1].

I think of it as the difference between asking a person for directions and hiring a consultant who then makes dozens of phone calls, reads manuals, and runs tests on your behalf. A simple query to an AI might cost a few hundred tokens. But when you ask an AI agent to fix a bug, it kicks off a complex internal monologue. It has to analyze the code, replicate the error, search for solutions, write a new patch, and then test its own work. If the test fails, it starts the whole loop over again, learning as it goes. As an engineer, I find this process of “self-reflection” fascinating. It can multiply the token cost by 10, 50, or even 100 times compared to a simple query [4].

---

## The Unseen Brakes on the Exponential Engine

While the demand for tokens is exploding, a parallel and equally intense engineering effort is underway to tame this exponential growth. The story of the Token Law isn't just about unchecked expansion; it's also about the sophisticated optimizations being built to manage the cost and complexity of these powerful new systems.

The most significant of these is **KV Caching**. In the iterative “self-reflection” loops common to AI agents, much of the initial context remains the same from one step to the next. Instead of re-processing this entire context each time, caching techniques allow the model to reuse the intermediate calculations, dramatically reducing the effective number of tokens processed and making complex, multi-step reasoning economically feasible.

Furthermore, the AI ecosystem is not monolithic. Sophisticated agents rarely rely on a single, massive model. Instead, they orchestrate a **cascade of models**, using smaller, faster, and cheaper specialized models for routine tasks like intent recognition or data extraction, only calling upon the powerful—and expensive—frontier models for the most complex steps. This, combined with the fact that input tokens are often 3-5x cheaper than output tokens, forms a powerful set of brakes on the runaway train of token consumption. The true challenge for engineers is not just building token-hungry agents, but architecting systems that balance their immense power with these crucial economic and computational realities.

---

## The Physical Cost of Thought

This exponential growth in abstract “tokens” has a very real, physical cost. As someone who works on messaging infrastructure at scale, my world is governed by the trade-offs between latency, bandwidth, and computational resources. We fight for every kilobyte saved in our data serialization and every millisecond shaved off our processing time. From that perspective, the sheer scale of token consumption by agentic AI is staggering. It’s not just about the energy cost, which is significant, but also about the architectural challenges it creates. The Jevons Paradox is in full effect: as models become more efficient, we don't just do the same tasks for less energy; we invent entirely new, token-hungry workflows that were previously unimaginable. This creates a feedback loop where the demand for AI computation is perpetually outpacing the efficiency gains, a challenge that feels very familiar to anyone who has worked on a rapidly scaling software system.

I was reading a recent analysis that showed while hardware and software improvements can create a combined 12x efficiency gain with each new AI generation, the number of tokens used in complex tasks can expand by more than 50x in the same period. The net result is a fourfold increase in the energy used for each query [5]. It made me pause and think. As one analyst aptly put it, “The unit that once measured text now measures energy. Moore’s Law no longer governs progress because token growth does” [5].

---

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
