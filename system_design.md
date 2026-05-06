# Boba’s Brews Design System

## 1. Brand North Star

**Brand idea:** A cozy magical boba shop for curious creatures, night owls, cozy gamers, and anyone who wants a drink that feels a little enchanted.

**Personality:** Warm, playful, whimsical, and handmade. The brand should feel like a tiny spellbook found inside a tea shop, not a polished corporate café.

**Core feeling:** Moonlit comfort with a pinch of wonder.

**Design keywords:** magical, cozy, soft glow, storybook, handwritten, black cat mascot, floating stars, potion-shop menu, creamy boba, purple moonlight.

## 2. Visual Direction

The visual language should feel hand-drawn and slightly imperfect. Avoid sharp corporate geometry, pure white backgrounds, or overly glossy gradients. Use textured edges, soft glow effects, rounded shapes, warm gold text, and purple magical accents.

**Primary motif:** Boba, the black magic cat, brewing drinks with a star wand.

**Secondary motifs:**

* Crescent moons
* Sparkles and tiny stars
* Spell trails
* Potion labels
* Hanging wooden signs
* Boba pearls
* Scroll-like menu cards
* Witch hat shapes
* Cat paw details

## 3. Color System

### Core Palette

| Token             |              Name |       Hex | Usage                            |
| ----------------- | ----------------: | --------: | -------------------------------- |
| `--color-night`   | Midnight Cauldron | `#030204` | Main background                  |
| `--color-ink`     |           Cat Ink | `#09070B` | Dark panels, deep shadows        |
| `--color-plum`    |        Spell Plum | `#533758` | Primary purple surfaces          |
| `--color-violet`  |       Wand Violet | `#694B89` | Buttons, highlights, active nav  |
| `--color-orchid`  |       Moon Orchid | `#8D64B3` | Hover states, magical accents    |
| `--color-gold`    |      Toasted Gold | `#E5BC8A` | Main text, borders, icons        |
| `--color-cream`   |    Milk Tea Cream | `#F8DFB2` | High-emphasis text, drink fills  |
| `--color-caramel` |       Brown Sugar | `#B28375` | Secondary accents, cup shadows   |
| `--color-mocha`   |        Boba Brown | `#80664A` | Type shadows, pearls, warm depth |
| `--color-glow`    |         Star Glow | `#FFDFA2` | Glow effects and spell trails    |

### Semantic Tokens

| Token                |                       Value | Usage                    |
| -------------------- | --------------------------: | ------------------------ |
| `--bg-primary`       |        `var(--color-night)` | Page background          |
| `--bg-card`          |                   `#120B18` | Menu cards and panels    |
| `--bg-card-soft`     |                   `#21132B` | Nested panels            |
| `--text-primary`     |        `var(--color-cream)` | Main readable text       |
| `--text-brand`       |         `var(--color-gold)` | Headlines and logo text  |
| `--text-muted`       |                   `#CBA17F` | Subtitles, helper text   |
| `--accent-primary`   |       `var(--color-violet)` | Buttons, selected states |
| `--accent-secondary` |         `var(--color-gold)` | Lines, sparkles, borders |
| `--border-soft`      | `rgba(229, 188, 138, 0.35)` | Soft dividers            |
| `--shadow-glow`      | `rgba(255, 223, 162, 0.45)` | Golden glow              |
| `--shadow-purple`    |  `rgba(105, 75, 137, 0.55)` | Purple glow              |

### Color Rules

Use black and near-black as the stage. Let gold and purple act like glowing props. Cream is for readable copy. Gold is for magical emphasis. Purple is for interaction.

Avoid:

* Pure white text
* Neon purple
* Flat gray UI panels
* Bright daytime colors
* Large blocks of saturated orange

## 4. Typography

### Brand Typography Roles

**Logo / Display:** rounded, chunky, handmade lettering.

Suggested fonts:

* `Chewy`
* `Cherry Bomb One`
* `Baloo 2`
* `Cooper Black` style alternatives

**Headings:** friendly, rounded, readable.

Suggested fonts:

* `Baloo 2`
* `Nunito`
* `Quicksand`
* `Fredoka`

**Body:** soft and readable.

Suggested fonts:

* `Nunito`
* `Quicksand`
* `Atkinson Hyperlegible`

**Accent / Magical Labels:** handwritten but legible.

Suggested fonts:

* `Patrick Hand`
* `Gaegu`
* `Short Stack`

### Type Scale

| Token                 |                      Size | Line Height | Usage          |
| --------------------- | ------------------------: | ----------: | -------------- |
| `--font-size-xs`      |                 `0.75rem` |      `1rem` | Labels, badges |
| `--font-size-sm`      |                `0.875rem` |   `1.25rem` | Secondary text |
| `--font-size-base`    |                    `1rem` |    `1.6rem` | Body copy      |
| `--font-size-lg`      |                 `1.25rem` |   `1.75rem` | Card titles    |
| `--font-size-xl`      |                  `1.5rem` |      `2rem` | Section titles |
| `--font-size-2xl`     |                    `2rem` |    `2.5rem` | Page headings  |
| `--font-size-display` | `clamp(4rem, 10vw, 8rem)` |       `0.9` | Hero logo      |

### Typography Rules

* Headlines should feel chunky and soft.
* Body copy should stay clean and readable.
* Use slight letter spacing for nav and labels.
* Keep the handmade fonts for short phrases only.
* Large display text can use warm shadows for depth.

Example:

```css
font-family: "Baloo 2", "Nunito", system-ui, sans-serif;
```

## 5. Spacing and Layout

### Spacing Tokens

| Token       |  Value | Usage             |
| ----------- | -----: | ----------------- |
| `--space-1` |  `4px` | Tiny gaps         |
| `--space-2` |  `8px` | Icon spacing      |
| `--space-3` | `12px` | Compact padding   |
| `--space-4` | `16px` | Default spacing   |
| `--space-5` | `24px` | Card padding      |
| `--space-6` | `32px` | Section gaps      |
| `--space-7` | `48px` | Large layout gaps |
| `--space-8` | `72px` | Hero spacing      |
| `--space-9` | `96px` | Page sections     |

### Layout Rules

* Use a spacious hero section with asymmetrical illustration placement.
* Keep the mascot on the right or as a floating guide character.
* Use magical trails as visual connectors between sections.
* Cards should feel like potion labels, scrolls, or hanging signs.
* Avoid rigid boxed layouts unless softened with curves and texture.

### Grid

Desktop:

* Max width: `1180px` to `1280px`
* 12-column grid
* Section padding: `clamp(48px, 8vw, 120px)`

Tablet:

* 8-column grid
* Reduce mascot size and center hero content

Mobile:

* 4-column grid
* Stack content vertically
* Use smaller decorative sparkles
* Keep order button fixed or clearly visible

## 6. Shape System

| Token           |   Value | Usage                |
| --------------- | ------: | -------------------- |
| `--radius-sm`   |   `8px` | Small tags           |
| `--radius-md`   |  `14px` | Buttons, chips       |
| `--radius-lg`   |  `22px` | Cards                |
| `--radius-xl`   |  `32px` | Large feature panels |
| `--radius-pill` | `999px` | Pills, bubbles       |

### Shape Rules

* Corners should be rounded but not sterile.
* Cards can use uneven border-radius values for a handmade look.
* Buttons can feel like charms or wooden signs.
* The “Order” CTA can use a hanging sign shape.

Example:

```css
border-radius: 22px 26px 20px 28px;
```

## 7. Shadows, Glow, and Texture

### Glow Tokens

```css
--glow-gold-sm: 0 0 8px rgba(255, 223, 162, 0.45);
--glow-gold-md: 0 0 18px rgba(255, 223, 162, 0.55);
--glow-purple-md: 0 0 24px rgba(105, 75, 137, 0.55);
--shadow-card: 0 18px 50px rgba(0, 0, 0, 0.45);
```

### Texture Rules

Use subtle grain, watercolor edges, or hand-painted noise. Texture should be barely visible, like the page has been dusted with stardust.

Recommended overlays:

* Radial gold glow behind active objects
* Purple mist around magic trails
* Tiny stars on black background
* Low-opacity paper texture on menu cards

Avoid heavy noise that reduces readability.

## 8. Illustration Style

### Mascot Rules

Boba should be:

* A small black cat with oversized cream eyes
* Friendly, curious, and magical
* Wearing a purple wizard hat or cape
* Drawn with soft outlines and warm gold highlights
* Simple enough to reproduce on cups, stickers, menus, and signage

### Illustration Line Rules

* Use warm cream or gold outlines, not pure white.
* Keep outlines slightly imperfect.
* Use minimal facial details.
* Use glowing stars as focal points.
* Use flat shapes with soft shaded edges.

### Mascot Poses

Core poses to create:

1. Wand casting hero pose
2. Sitting with boba cup
3. Peeking over menu board
4. Sleeping on a moon pillow
5. Holding a tiny potion bottle
6. Surprised by exploding boba pearls
7. Stirring a cauldron
8. Waving from a hanging sign

## 9. Iconography

Icons should look hand-drawn and simple. Use rounded stroke caps, uneven star shapes, and tiny magical accents.

### Icon Set

Needed icons:

* Menu
* About
* Magic
* Contact
* Order
* Milk tea
* Fruit tea
* Seasonal drink
* Dairy-free
* Caffeine-free
* Sweetness level
* Ice level
* Rewards
* Location
* Hours

### Icon Rules

* Stroke width: `2px` to `2.5px`
* Stroke color: `var(--color-gold)`
* Hover color: `var(--color-cream)`
* Add tiny purple glow on active icons

## 10. Components

## Navigation

### Desktop Nav

A top-left logo mark, followed by warm gold nav links. Active nav uses a purple underline with a glow.

**Default:** Gold text

**Hover:** Cream text with small sparkle

**Active:** Purple underline and slight glow

```css
.nav-link {
  color: var(--color-gold);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.nav-link[data-active="true"]::after {
  background: var(--color-violet);
  box-shadow: var(--glow-purple-md);
}
```

## Buttons

### Primary CTA: Hanging Sign Button

Used for “Order”.

Visual traits:

* Purple wooden sign
* Gold text
* Small stars
* Rope detail when possible
* Slight swing animation on hover

States:

| State    | Style                              |
| -------- | ---------------------------------- |
| Default  | Purple sign, gold text             |
| Hover    | Lighter purple, stronger gold glow |
| Pressed  | Moves down `2px`, glow shrinks     |
| Disabled | Desaturated purple, muted text     |

### Secondary Button: Spell Pill

Used for “View Menu”, “Learn More”, “See Specials”.

```css
.button-secondary {
  border: 1px solid var(--border-soft);
  color: var(--color-cream);
  background: rgba(83, 55, 88, 0.38);
  border-radius: var(--radius-pill);
}
```

## Cards

### Drink Card

Visual traits:

* Dark plum panel
* Thin gold border
* Cream drink name
* Muted description
* Small icon or cup illustration
* Optional sparkle badge

Content structure:

* Drink name
* Flavor notes
* Toppings
* Sweetness recommendation
* Price
* CTA

### Seasonal Special Card

Name idea: **Boba’s Curious Concoction**

Visual traits:

* More dramatic glow
* “Try at your own risk” badge
* Cauldron or potion-bottle illustration
* Limited-time label

## Badges

Badge examples:

* `Seasonal Spell`
* `Cat’s Pick`
* `Low Caffeine`
* `Dairy-Free`
* `Try at Your Own Risk`

```css
.badge {
  color: var(--color-night);
  background: var(--color-gold);
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  font-size: var(--font-size-xs);
  font-weight: 800;
}
```

## Forms

Inputs should look like potion labels.

Default:

* Dark plum background
* Gold border
* Cream text
* Muted placeholder

Focus:

* Gold border
* Purple outer glow
* Tiny sparkle icon optional

Error:

* Warm rose color, not harsh red
* Clear text message

```css
.input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(229, 188, 138, 0.18), var(--glow-purple-md);
}
```

## 11. Menu System

### Drink Categories

Recommended categories:

* **Moon Milk Teas**
* **Fruit Familiars**
* **Cream Cloud Brews**
* **Potion Specials**
* **Boba’s Curious Concoction**
* **Little Charms** for toppings

### Naming Style

Drink names should feel magical but still understandable.

Examples:

* Moonlit Brown Sugar
* Taro Stardust
* Matcha Familiar
* Strawberry Spellcloud
* Mango Moonbeam
* Black Sesame Eclipse
* Lavender Milk Moon
* Peach Potion Pop

### Menu Card Voice

Use short sensory descriptions.

Example:

**Taro Stardust**
Velvety taro milk tea with brown sugar pearls and a soft vanilla finish.

Avoid names that are too vague or hard to order.

## 12. Motion System

Motion should feel floaty, magical, and soft. Nothing should snap aggressively.

### Motion Tokens

```css
--motion-fast: 140ms;
--motion-base: 220ms;
--motion-slow: 420ms;
--ease-magic: cubic-bezier(0.22, 1, 0.36, 1);
--ease-bounce-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Motion Rules

* Sparkles fade in and drift upward.
* Buttons slightly float on hover.
* The hanging order sign can gently sway.
* Magic trail can animate on scroll.
* Drink cards can rise by `4px` on hover.
* Mascot blink can loop slowly.

Avoid constant large movement. The site should feel alive, not dizzy.

### Example Animations

```css
@keyframes sparkleFloat {
  0% { opacity: 0; transform: translateY(8px) scale(0.8); }
  35% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-18px) scale(1.05); }
}

@keyframes signSway {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1.5deg); }
}
```

## 13. Accessibility

### Contrast

The brand uses dark backgrounds, which helps contrast, but gold-on-purple and muted purple text need testing.

Rules:

* Body text should usually be cream on black or cream on dark plum.
* Do not use purple text on black for body copy unless it is large and bright enough.
* Use gold for headings, labels, borders, and accents.
* Interactive elements need visible focus rings.

### Reduced Motion

Respect reduced motion settings.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

### Touch Targets

* Minimum button height: `44px`
* Minimum icon button size: `44px` by `44px`
* Keep enough spacing between nav items on mobile

## 14. Responsive Behavior

### Desktop

* Full magical trail hero
* Mascot on the right
* Hanging order sign in top-right
* Large display type

### Tablet

* Shrink mascot slightly
* Keep magic trail but reduce particle density
* Order sign becomes normal CTA button if space is tight

### Mobile

* Stack logo, headline, mascot, CTA
* Use bottom sticky order button or top compact button
* Hide large decorative trails behind content
* Keep stars subtle
* Use collapsible menu categories

## 15. CSS Starter Tokens

```css
:root {
  color-scheme: dark;

  --color-night: #030204;
  --color-ink: #09070B;
  --color-plum: #533758;
  --color-violet: #694B89;
  --color-orchid: #8D64B3;
  --color-gold: #E5BC8A;
  --color-cream: #F8DFB2;
  --color-caramel: #B28375;
  --color-mocha: #80664A;
  --color-glow: #FFDFA2;

  --bg-primary: var(--color-night);
  --bg-card: #120B18;
  --bg-card-soft: #21132B;

  --text-primary: var(--color-cream);
  --text-brand: var(--color-gold);
  --text-muted: #CBA17F;

  --accent-primary: var(--color-violet);
  --accent-secondary: var(--color-gold);
  --border-soft: rgba(229, 188, 138, 0.35);

  --font-display: "Chewy", "Baloo 2", system-ui, sans-serif;
  --font-heading: "Baloo 2", "Nunito", system-ui, sans-serif;
  --font-body: "Nunito", "Quicksand", system-ui, sans-serif;
  --font-accent: "Patrick Hand", "Short Stack", cursive;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-display: clamp(4rem, 10vw, 8rem);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 72px;
  --space-9: 96px;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-pill: 999px;

  --glow-gold-sm: 0 0 8px rgba(255, 223, 162, 0.45);
  --glow-gold-md: 0 0 18px rgba(255, 223, 162, 0.55);
  --glow-purple-md: 0 0 24px rgba(105, 75, 137, 0.55);
  --shadow-card: 0 18px 50px rgba(0, 0, 0, 0.45);

  --motion-fast: 140ms;
  --motion-base: 220ms;
  --motion-slow: 420ms;
  --ease-magic: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-bounce-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## 16. Component CSS Examples

```css
body {
  margin: 0;
  background:
    radial-gradient(circle at 70% 30%, rgba(105, 75, 137, 0.22), transparent 28%),
    radial-gradient(circle at 20% 70%, rgba(229, 188, 138, 0.12), transparent 30%),
    var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
}

.hero-title {
  color: var(--text-brand);
  font-family: var(--font-display);
  font-size: var(--font-size-display);
  line-height: 0.88;
  text-shadow:
    0 3px 0 rgba(128, 102, 74, 0.35),
    0 0 18px rgba(229, 188, 138, 0.18);
}

.card {
  background: linear-gradient(180deg, rgba(33, 19, 43, 0.92), rgba(18, 11, 24, 0.95));
  border: 1px solid var(--border-soft);
  border-radius: 22px 26px 20px 28px;
  box-shadow: var(--shadow-card), var(--glow-purple-md);
  padding: var(--space-5);
}

.primary-button {
  background: linear-gradient(180deg, var(--color-orchid), var(--color-violet));
  color: var(--color-cream);
  border: 1px solid rgba(248, 223, 178, 0.45);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card), var(--glow-purple-md);
  font-family: var(--font-heading);
  font-weight: 800;
  min-height: 44px;
  padding: 12px 22px;
  transition:
    transform var(--motion-base) var(--ease-bounce-soft),
    box-shadow var(--motion-base) var(--ease-magic),
    background var(--motion-base) var(--ease-magic);
}

.primary-button:hover {
  transform: translateY(-3px) rotate(-1deg);
  box-shadow: var(--shadow-card), var(--glow-gold-md), var(--glow-purple-md);
}

.primary-button:focus-visible {
  outline: 3px solid rgba(248, 223, 178, 0.75);
  outline-offset: 4px;
}
```

## 17. Page Patterns

### Home Page

Sections:

1. Hero with mascot, spell trail, and main CTA
2. Featured drinks
3. Boba’s Curious Concoction seasonal feature
4. “How the magic works” ordering steps
5. About Boba and the witch owner
6. Location and hours
7. Footer with tiny star field

### Menu Page

Structure:

1. Category tabs or floating charms
2. Drink cards
3. Toppings section
4. Sweetness and ice guide
5. Seasonal special
6. Allergy note

### About Page

Story beats:

1. Who is Boba?
2. Who owns the shop?
3. Why magical brews?
4. Community values
5. Mascot art and stickers

## 18. Brand Voice

### Voice Traits

* Curious
* Cozy
* Slightly magical
* Friendly
* Clear enough to order from

### Copy Rules

Use playful language for headings and short labels. Use plain language for ordering, pricing, allergens, and instructions.

Good:

* “Scroll to stir the brew”
* “Today’s curious concoction”
* “Choose your charm”
* “Boba’s pick”
* “Brewed under moonlight”

Avoid:

* Overcomplicated fantasy names
* Hard-to-read puns on every item
* Vague menu descriptions
* Corporate café language

## 19. Do and Don’t

### Do

* Use warm gold on dark backgrounds
* Use purple for magic and interaction
* Keep illustrations soft and handmade
* Let Boba act as a guide through the site
* Use glow sparingly to create focus
* Make drink ordering clear and simple

### Don’t

* Use pure white backgrounds
* Use sharp corporate cards
* Make all text handwritten
* Overload the screen with particles
* Let decorations reduce readability
* Make the theme so magical that the menu becomes confusing

## 20. Implementation Checklist

Before building a page, check:

* Does the page feel cozy and magical within three seconds?
* Is the main action clear?
* Is the text readable on the dark background?
* Are decorative sparkles subtle?
* Is Boba present without overwhelming the content?
* Does the page still work with reduced motion?
* Can someone order a drink without decoding the theme?

## 21. Quick Design Formula

For any new screen:

1. Start with a black night background.
2. Add one soft purple glow.
3. Add one gold focal line or sparkle cluster.
4. Use cream text for clarity.
5. Add one handmade shape.
6. Let Boba or a moon/star detail guide attention.
7. Keep the CTA obvious.

That creates the Boba’s Brews feel without turning every screen into a glitter storm.
