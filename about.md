---
layout: page
title: About
permalink: /about/
show_title: false
---

<div class="about-header">
  <img src="{{ site.author_image | default: '/assets/images/avatar-placeholder.svg' | relative_url }}" alt="Mandar" class="about-photo">
  <div class="about-intro">
    <h1 class="about-name">Mandar Limaye</h1>
    <p class="about-tagline">Technology, Software, and AI</p>
    <div class="about-social">
      {% if site.twitter_username %}
      <a href="https://twitter.com/{{ site.twitter_username }}" class="btn btn-secondary btn-icon" target="_blank" rel="noopener">
        {% include icons/twitter.svg %}
        Twitter
      </a>
      {% endif %}
      {% if site.github_username %}
      <a href="https://github.com/{{ site.github_username }}" class="btn btn-secondary btn-icon" target="_blank" rel="noopener">
        {% include icons/github.svg %}
        GitHub
      </a>
      {% endif %}
      {% if site.linkedin_username %}
      <a href="https://linkedin.com/in/{{ site.linkedin_username }}" class="btn btn-secondary btn-icon" target="_blank" rel="noopener">
        {% include icons/linkedin.svg %}
        LinkedIn
      </a>
      {% endif %}
    </div>
  </div>
</div>

<div class="about-content" markdown="1">

## Hello!

Welcome to my corner of the internet. I write about technology, software engineering, and artificial intelligence — exploring how these forces are shaping our world and what the future might hold.

## What I Write About

My writing covers a range of topics at the intersection of technology and its impact:

- **Artificial Intelligence**: From practical applications to broader implications of AI systems
- **Software Engineering**: Best practices, architecture decisions, and lessons learned
- **Technology Industry**: Analysis of trends, companies, and the evolving tech landscape

## Get in Touch

The best way to reach me is via [Twitter](https://twitter.com/{{ site.twitter_username }}) or [email](mailto:{{ site.email }}). I'm always happy to discuss ideas, answer questions, or just chat about technology.

If you enjoy my writing, consider subscribing to stay updated when I publish new posts.

</div>
