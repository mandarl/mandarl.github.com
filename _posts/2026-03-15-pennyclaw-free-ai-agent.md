---
layout: post
title: "I Built a Personal AI Agent That Runs for Free, Forever. You Can Too."
date: 2026-03-15
description: "Announcing PennyClaw, an open-source AI agent built in Go that runs 24/7 on GCP's free tier e2-micro VM. One-click deploy, zero cost, forever."
excerpt: "I was tired of paying for servers I barely use. GCP gives everyone a free VM — so I built an AI agent that fits inside it. Today, I'm open-sourcing it."
tags: [open-source, ai, golang, gcp, side-projects, pennyclaw]
image: /assets/images/2026-03-15-pennyclaw-hero.png
---

![A flat illustration of a laptop displaying green checkmarks and $0.00/mo, with a copper penny bearing claw marks beside it](/assets/images/2026-03-15-pennyclaw-hero.png)

I was tired of paying for servers I barely use. Like many developers, I love experimenting with AI, but the cost of a dedicated VPS to run a personal AI agent 24/7 always felt like a needless expense. GCP gives every user a free `e2-micro` VM, so I asked myself: could I build an agent that fits inside it?

Today, I'm excited to open-source the answer: **[PennyClaw](https://github.com/mandarl/pennyclaw)**.

PennyClaw is a lightweight AI agent I built from scratch in Go. It's designed specifically to run comfortably within the tight constraints of Google Cloud's "Always Free" tier, which means you can have a personal AI assistant running around the clock for **$0 per month**.

## Built for the Free Tier

The biggest challenge was resource consumption. Most self-hosted AI agents can be memory-hungry, quickly overwhelming a small VM. I engineered PennyClaw to be incredibly frugal, using less than 50MB of RAM when idle. This efficiency is the key to unlocking the power of the free tier.

But I also wanted it to be easy. That's why I created a one-click deployment script. It runs 24 pre-flight checks to make sure your setup is eligible for the free tier, automatically configures the environment, and gets your agent running in under five minutes. No surprises, no hidden costs.

## More Than Just a Chatbot

Despite its small footprint, PennyClaw is a capable tool.

- **Connect to any LLM:** It supports OpenAI, Anthropic, Google Gemini, OpenRouter, and any other OpenAI-compatible API.
- **Runs tools securely:** It can execute shell commands, manage files, search the web, and make API requests from a sandboxed environment.
- **Persistent memory:** It remembers your conversations across restarts, thanks to a local SQLite database.
- **Simple Web UI:** It includes a clean, self-contained web interface for easy interaction.

## Try It Yourself

This project was a personal challenge that grew into something I believe many developers will find useful. If you've ever wanted a personal AI agent without the monthly bill, this is for you.

Head over to the [PennyClaw GitHub repository](https://github.com/mandarl/pennyclaw) and hit the "Deploy to GCP" button. Your own free, forever-running AI agent is just a few clicks away.

This is just the beginning, and I'm excited to see what the community builds with it. What's the first thing you would automate with your own personal AI agent?
