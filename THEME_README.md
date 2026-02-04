# Minimalist Scholar Theme

A clean, modular Jekyll theme designed for thought leadership and technical writing.

## Features

- **Minimalist Design**: Clean typography with serif body text for a scholarly feel
- **Modular Architecture**: Easy to customize via CSS variables
- **Newsletter Integration**: Built-in newsletter signup component
- **Social Sharing**: Share buttons for Twitter, LinkedIn, and copy link
- **Projects Page**: Showcase your work with a card-based layout
- **Responsive**: Works beautifully on all devices
- **Dark Mode Ready**: CSS variables make theme switching easy

## File Structure

```
_sass/
├── _variables.scss    # Design tokens (colors, fonts, spacing)
├── _base.scss         # Reset and typography foundations
├── _layout.scss       # Header, footer, containers
├── _components.scss   # Buttons, cards, forms
├── _posts.scss        # Blog post styles
└── _pages.scss        # Static page styles

_layouts/
├── default.html       # Base layout with head, header, footer
├── home.html          # Homepage with post listing
├── post.html          # Individual blog post
├── page.html          # Static pages (About, etc.)
└── projects.html      # Projects showcase page

_includes/
├── header.html        # Site header and navigation
├── footer.html        # Site footer with social links
├── newsletter.html    # Newsletter signup form
├── share-buttons.html # Social sharing buttons
└── author-bio.html    # Author bio component

_data/
└── projects.yml       # Project data for /projects/ page
```

## Customization

### Changing Colors

Edit `_sass/_variables.scss` to modify the color palette:

```scss
$color-accent: #2563eb;        // Primary accent color
$color-background: #ffffff;    // Background color
$color-text-primary: #1a1a1a;  // Main text color
```

### Switching to Dark Mode

Create a new variables file or modify the existing one:

```scss
$color-background: #0f172a;
$color-text-primary: #f1f5f9;
$color-accent: #3b82f6;
```

### Adding Projects

Edit `_data/projects.yml`:

```yaml
- name: "Project Name"
  description: "Brief description"
  url: "/projects/project-name"
  tags:
    - Python
    - AI
```

### Newsletter Setup

1. Sign up for a newsletter service (Buttondown, ConvertKit, etc.)
2. Add your form action URL to `_config.yml`:

```yaml
newsletter_form_action: "https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME"
```

## Configuration Options

In `_config.yml`:

| Option | Description |
|--------|-------------|
| `show_newsletter_on_home` | Show newsletter on homepage |
| `show_newsletter_on_posts` | Show newsletter after posts |
| `show_share_buttons` | Enable social sharing |
| `show_author_bio` | Show author bio on posts |
| `author_name` | Your name |
| `author_bio` | Short bio text |
| `author_image` | Path to profile photo |

## Future Theme Options

The modular architecture makes it easy to create alternative themes:

1. **Modern Analyst**: Add hero images, branded accent colors
2. **Tech Futurist**: Dark mode, vibrant accents, code-focused

To switch themes, create new variable files and import them in `main.scss`.
