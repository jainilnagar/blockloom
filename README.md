# Blockloom

A collection of lightweight, zero-dependency Gutenberg blocks for WordPress. Built entirely on native WordPress APIs (`@wordpress/block-editor`, `@wordpress/components`, `@wordpress/scripts`) with Font Awesome Free icons rendered as inline SVG.

![WordPress](https://img.shields.io/badge/WordPress-6.3%2B-blue?style=flat-square)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple?style=flat-square)
![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square)
![WPCS](https://img.shields.io/badge/WPCS-Compliant-brightgreen?style=flat-square)

---

## Blocks

| Block | Render | Description |
|---|---|---|
| **Icon** | JS | Single FA icon with link, accessibility label, background shape, hover colour and animation |
| **Icon List** | JS | Vertical or horizontal list of icon + text items with responsive wrapping |
| **Icon List Item** | PHP | Individual item inside an Icon List — server-side rendered |
| **Info Box** | JS | Icon + title + description card with three layout modes and optional CTA |
| **FAQs** | JS | Accessible accordion FAQ with smooth animation and JSON-LD schema |
| **FAQ Item** | JS | Individual item inside a FAQs block |
| **Team Member** | JS | Profile card with photo, bio, seven social networks and Person schema |
| **Rating** | JS | Star or bar rating with half-star support and AggregateRating schema |
| **Progress Bar** | JS | Animated progress bar with striped fill, scroll animation and custom label |

---

## Requirements

| Requirement | Version |
|---|---|
| WordPress | 6.3+ |
| PHP | 7.4+ |
| Node.js | 18+ (development only) |
| Composer | 2.0+ (development only) |

---

## Installation

### From ZIP

1. Download `blockloom.zip`
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload and activate

### From Source

```bash
cd wp-content/plugins/
git clone https://github.com/your-repo/blockloom.git
cd blockloom

# Install JS dependencies
npm install

# Generate Font Awesome icon data
npm run generate-icons

# Build for production
npm run build

# Install PHP dev tools
composer install
```

Then activate in **Plugins → Installed Plugins**.

---

## Development

```bash
# Watch mode with live rebuild
npm start

# Production build
npm run build

# Regenerate Font Awesome icon data
npm run generate-icons

# Lint JavaScript (ESLint)
npm run lint:js

# Auto-fix JavaScript lint issues
npm run lint:js -- --fix

# Lint styles (Stylelint)
npm run lint:style

# Auto-fix style lint issues
npm run lint:style -- --fix

# Check PHP coding standards (WPCS)
composer phpcs

# Auto-fix PHP coding standards
composer phpcbf

# PHP syntax check (all PHP files)
composer lint

# PHP static analysis (PHPStan)
composer phpstan
```

---

## Icon System

Blockloom uses **Font Awesome Free** icons rendered as inline SVG — no icon fonts, no CDN, no API key required.

The `src/data/icons.json` file is generated from the FA Free metadata at build time:

```bash
npm run generate-icons
```

This produces ~2,141 icons across three categories:

| Category | Examples |
|---|---|
| **Solid** | star, check, arrow-right, house, user, gear |
| **Regular** | heart, bell, calendar, envelope, file |
| **Brands** | linkedin-in, x-twitter, github, facebook-f, instagram, youtube |

Icons are only loaded in the **editor** (admin). On the frontend, only the SVG path of the selected icon is output inline in the HTML — zero extra weight per page.

### Icon CSS keys

Icons are referenced by `style/name` — for example:
- `solid/star`
- `solid/check`
- `brands/github`
- `regular/heart`

---
## Block Details

### Icon

**Settings tab**
- Icon picker — searchable FA Free grid with Solid / Regular / Brands filter and load more
- Size (px)
- Background padding (px) — additive, grows wrapper around the icon
- Background shape — None / Rounded / Circle
- Hover animation — None / Scale Up / Rotate / Fade
- Accessibility label — rendered as `aria-label`, not visible on page
- Link URL, open in new tab, custom `rel` attribute

**Styles tab**
- Icon colour — Normal / Hover
- Background colour — Normal / Hover

---

### Icon List

**Settings tab**
- Direction — Vertical / Horizontal
- Columns (horizontal) — controls `flex-basis` for responsive wrapping
- Gap between items (px)
- Icon size (px)
- Icon position — Before / After text
- Icon / text spacing (px)
- Divider toggle

**Styles tab**
- Icon colour
- Text colour
- Divider colour
- Line height

Each Icon List Item has its own icon picker. All sizing and colour is inherited from the parent Icon List. Items are rendered server-side via `render.php` using `blockloom_get_icon_svg()`.

---

### Info Box

**Settings tab**
- Icon position — Icon Top / Icon Left / Icon Right
- Content alignment — Left / Center / Right
- Title tag — H2 / H3 / H4 / H5 / P
- Icon picker, size, background padding, background shape
- CTA link — text, URL, new tab

**Styles tab**
- Icon colour — Normal / Hover
- Icon background — Normal / Hover
- Title colour — Normal / Hover
- Description colour — Normal / Hover
- CTA colour — Normal / Hover
- Card background — Normal / Hover
- Card border colour — Normal / Hover
- Card border width, border radius, box shadow
- Padding — linked / unlinked sides

---

### FAQs

**Settings tab**
- Allow multiple open at once
- Default state — All Closed / First Open
- FAQ Schema (JSON-LD) toggle
- Icon style — Chevron / Plus / Arrow
- Icon position — Before / After question

**Styles tab**
- Question colour
- Answer colour
- Item background
- Active item background
- Border colour, border radius
- Icon colour

Uses `grid-template-rows: 0fr → 1fr` CSS animation for smooth open/close to any content height. Icon style is passed to FAQ Items via block context so the editor preview updates live.

---

### Team Member

**Settings tab**
- Image position - Top / Left
- Image shape — Square / Rounded / Circle
- Image size (px)
- Visibility toggles — Designation / Bio / Social Links
- Social links — LinkedIn, X/Twitter, GitHub, Facebook, Instagram, YouTube, Custom
- Icons only toggle, social icon gap (px), social icon shape (Default / Square / Rounded / Circle)
- Person Schema (JSON-LD) toggle

**Styles tab**
- Name, designation, bio colours
- Social icon colour — Normal / Hover
- Card background, border, box shadow
- Padding — linked / unlinked sides

---

### Rating

**Settings tab**
- Display style — Stars / Bar
- Rating — 0–5, step 0.5 (half star support)
- Star size (px) — shown for stars style
- Bar height (px) and border radius — shown for bar style
- Animate on scroll — bar fills when scrolled into view
- Show numeric value toggle
- Numeric format — `4.5` / `4.5 / 5` / `4.5 out of 5`
- Title text and title tag
- AggregateRating Schema toggle — item name and rating count fields

**Styles tab**
- Filled colour (stars or bar fill)
- Empty colour (unfilled stars or bar track)
- Numeric value colour
- Title colour

Numeric font size is auto-calculated from star/bar size. The rating row uses `flex-wrap: wrap` so the numeric value stacks naturally on narrow containers without breakpoints.

---

### Progress Bar

**Settings tab**
- Fill percentage — 0–100, step 1
- Custom label — overrides auto percentage when filled; leave empty to show percentage
- Bar height (px) — 4–40px
- Border radius (px)
- Label position — Above bar / Below bar
- Animate on scroll toggle
- Striped fill toggle
- Animate stripes toggle — stripes move continuously (CSS only)

**Styles tab**
- Fill colour
- Track colour
- Title colour
- Value colour

---

## Architecture

```
blockloom/
├── blockloom.php                    # Main plugin file
├── package.json                     # No runtime dependencies
├── webpack.config.js                # Per-block entries, sass deprecation fix
├── phpcs.xml.dist                   # WordPress Coding Standards config
├── phpstan.neon                     # PHPStan static analysis config
├── composer.json                    # PHP dev tools only
├── readme.txt                       # WordPress.org readme
├── README.md                        # This file
├── CHANGELOG.md                     # Changelog file
├── license.txt                      # License text
├── LICENSE.md                       # License file
├── docs/
│   └── screenshots/                 # Block screenshots for README
├── scripts/
│   ├── generate-icons.js            # Generates src/data/icons.json from FA Free
│   └── lint-php.php                 # Cross-platform PHP syntax checker
├── includes/
│   ├── block-category.php           # Registers "Blockloom" inserter category
│   └── icon-helper.php              # PHP SVG renderer with static caching
└── src/
    ├── frontend.js                  # FAQ accordion, animations, JSON-LD schemas
    ├── data/
    │   └── icons.json               # Generated FA Free icon data (gitignored)
    ├── components/
    │   ├── IconPicker.js            # Searchable FA icon picker (editor only)
    │   ├── getIconSVG.js            # Inline SVG renderer for save.js files
    │   ├── ColorControl.js          # Theme palette + Normal/Hover colour picker
    │   ├── PaddingControl.js        # Linked/unlinked padding control
    │   └── StarRating.js            # SVG star renderer (full/half/empty)
    └── blocks/
        ├── icon/
        ├── icon-list/
        ├── icon-list-item/          # render.php — server-side rendered
        ├── info-box/
        ├── faqs/
        ├── faq-item/
        ├── team-member/
        ├── rating/
        └── progress-bar/
            ├── block.json           # Block metadata and attributes
            ├── index.js             # Block registration
            ├── edit.js              # Editor component
            ├── save.js              # Saved HTML output
            ├── style.scss           # Frontend styles (structural, minimal)
            └── editor.scss          # Editor-only styles
```

---

## Design Philosophy

**Zero external runtime dependencies**
Only `@wordpress/scripts` and Font Awesome Free as dev tools. Nothing extra ships to the browser — FA icons are extracted to inline SVG at authoring time.

**Font Awesome Free as inline SVG**
Icons are selected in the editor from a searchable grid. Only the chosen icon's SVG path is saved in the block HTML — not a font file, not a CSS class, not a CDN request. The frontend gets clean semantic SVG.

**Minimal frontend CSS**
Structural layout only. Colours, typography, and spacing inherit from your theme. Everything is overridable via CSS custom properties.

**CSS custom properties on the block wrapper**
All colour and spacing values are set as CSS custom properties on the outer `blockProps` div — serialized correctly by WordPress, not React (which silently drops `--custom-*` from inner style props). Child elements read them via `var()` in the stylesheet.

**Server-side rendering where it matters**
Icon List Item uses `render.php` so its output is always fresh and never requires block validation. The PHP icon helper uses static caching so the 2MB `icons.json` is read and decoded only once per request regardless of how many items are on the page.

**Conditional asset loading**
Dashicons are not used. The frontend script and block styles are only enqueued on pages that contain a Blockloom block via `has_block()` checks.

**Accessible by default**
- FAQ accordion uses native `<button>` with `aria-expanded`
- Icons use `aria-hidden="true"` — visible icons are decorative
- Optional `aria-label` via Accessibility Label field on the Icon block
- Correct heading hierarchy via title tag selector on Info Box and Rating
- Keyboard navigation — Escape key closes open FAQ items
- Rating rows use `role="img"` with descriptive `aria-label`

---

## CSS Custom Properties Reference

### Icon
| Property | Description |
|---|---|
| `--bl-icon-color` | Normal icon colour |
| `--bl-icon-bg` | Normal background colour |
| `--bl-icon-hover-color` | Hover icon colour |
| `--bl-icon-hover-bg` | Hover background colour |

### Icon List
| Property | Description |
|---|---|
| `--bl-list-icon-color` | Icon colour for all items |
| `--bl-list-text-color` | Text colour for all items |
| `--bl-list-icon-size` | Icon size passed to render.php items |
| `--bl-list-icon-spacing` | Gap between icon and text |
| `--bl-list-divider-color` | Divider line colour |
| `--bl-list-item-basis` | Flex basis for horizontal columns |
| `--bl-list-grid-cols` | Grid columns for editor layout |

### Info Box
| Property | Description |
|---|---|
| `--bl-ib-hover-bg` | Card hover background colour |
| `--bl-ib-hover-border` | Card hover border colour |
| `--bl-icon-hover-color` | Icon hover colour |
| `--bl-icon-hover-bg` | Icon background hover colour |

### FAQs
| Property | Description |
|---|---|
| `--bl-faq-question-color` | Question text colour |
| `--bl-faq-answer-color` | Answer text colour |
| `--bl-faq-bg` | Item background colour |
| `--bl-faq-active-bg` | Open item background colour |
| `--bl-faq-border-color` | Border colour |
| `--bl-faq-border-radius` | Border radius |
| `--bl-faq-icon-color` | Accordion icon colour |

### Team Member
| Property | Description |
|---|---|
| `--bl-tm-social-color` | Social icon normal colour |
| `--bl-tm-social-hover-color` | Social icon hover colour |
| `--bl-tm-social-gap` | Gap between social icons |

### Rating
| Property | Description |
|---|---|
| `--bl-rating-filled` | Filled star / bar fill colour |
| `--bl-rating-empty` | Empty star / bar track colour |
| `--bl-rating-numeric` | Numeric value colour |

### Progress Bar
| Property | Description |
|---|---|
| `--bl-pb-filled` | Bar fill colour |
| `--bl-pb-track` | Bar track colour |
| `--bl-pb-title` | Title text colour |
| `--bl-pb-value` | Value text colour |

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history.

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/my-feature`
3. Run `npm install && npm run generate-icons && npm run build`
4. Run `composer install` for PHP dev tools
5. Make your changes
6. Run `npm run lint:js && npm run lint:style` for JS/CSS
7. Run `composer phpcs && composer lint && composer phpstan` for PHP
8. Commit and open a pull request

---

## License

GPL-2.0-or-later — see [LICENSE.md](LICENSE.md) for details.
