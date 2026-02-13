# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog/website hosted on GitHub Pages at mandar.dev. It uses a custom "Minimalist Scholar" theme with a modular architecture designed for thought leadership and technical writing.

## Development Commands

### Local Development Server
```bash
bundle exec jekyll serve
```
Or on Windows:
```bash
run_dev_server.bat
```

The site will be available at `http://localhost:4000`.

### Dependency Management
```bash
bundle install          # Install Ruby dependencies
bundle update           # Update dependencies
```

## Architecture

### Directory Structure

**Content:**
- `_posts/` - Blog posts in markdown (format: `YYYY-MM-DD-title.md`)
- `_drafts/` - Unpublished blog drafts
- `_data/projects.yml` - Projects data for the /projects/ page
- `projects/` - Individual project folders (e.g., susies-quest/, market-heatmap/)

**Theme/Layout:**
- `_layouts/` - Page templates (default, home, post, page, projects, redirected)
- `_includes/` - Reusable components (header, footer, newsletter, share-buttons, author-bio, conversation)
- `_sass/` - Modular SCSS files organized by purpose:
  - `_variables.scss` - Design tokens (colors, fonts, spacing)
  - `_base.scss` - Reset and typography foundations
  - `_layout.scss` - Header, footer, containers
  - `_components.scss` - Buttons, cards, forms
  - `_posts.scss` - Blog post styles
  - `_pages.scss` - Static page styles
  - `_animations.scss` - Animation definitions
- `assets/` - Static assets (images, compiled CSS)

### Configuration

Primary configuration in `_config.yml` includes:
- Site metadata (title, description, URL)
- Author information
- Social links
- Newsletter settings
- Plugins (jekyll-feed, jekyll-sitemap, jekyll-redirect-from)
- Permalink structure
- Build settings

## Adding Content

### New Blog Post

Create a file in `_posts/` with format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: "Brief description for SEO and social cards"
snippet: "Short summary for sharing (1-2 sentences)"  # Optional
image: /assets/images/post-image.png  # Optional
twitter_url: "https://twitter.com/username/status/ID"  # Optional - link to discussion thread
hackernews_url: "https://news.ycombinator.com/item?id=ID"  # Optional - link to HN discussion
tags:
  - tag1
  - tag2
---

Post content here...
```

**Discussion Links:**
- If `twitter_url` is provided, the "Discuss on Twitter" button links to that specific thread
- If `twitter_url` is not provided, it falls back to a tweet intent with the post title
- If `hackernews_url` is provided, a "Discuss on Hacker News" button appears
- Both fields are optional and can be added after publishing

### New Project

1. Add project data to `_data/projects.yml`:
```yaml
- name: "Project Name"
  description: "Brief description"
  url: "/projects/project-name"
  tags:
    - Technology
    - Category
  icon: '<img src="/projects/project-name/icon.png" alt="..." style="...">'
  external: true  # Optional, opens in new tab
```

2. Create project folder in `projects/project-name/` with its own files

## Theme Customization

The modular Sass architecture allows easy customization:

1. **Colors/Fonts** - Edit `_sass/_variables.scss`
2. **Layout Changes** - Edit `_sass/_layout.scss`
3. **Component Styles** - Edit `_sass/_components.scss`
4. **Typography** - Edit `_sass/_base.scss`

All SCSS files are imported in `assets/css/main.scss`.

## Deployment

The site is deployed to GitHub Pages automatically when changes are pushed to the `site` branch. No manual build step is required - GitHub Pages runs Jekyll automatically.

## Plugin Configuration

The site uses several Jekyll plugins configured in Gemfile:
- `jekyll-feed` - RSS feed generation
- `jekyll-sitemap` - Automatic sitemap generation
- `jekyll-redirect-from` - URL redirects (see `_layouts/redirected.html`)
- `jekyll-paginate` - Post pagination

Shortlinks (e.g., /linkedin, /twitter) are managed via markdown files in `shortlinks/` with redirect_to frontmatter.
