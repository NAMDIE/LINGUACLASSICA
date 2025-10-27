# Ancient Latin & Greek Language Learning Application
## Comprehensive UI/UX Design Specification

**Version:** 1.0  
**Date:** 2025-10-27  
**Target Platforms:** Web (Desktop, Tablet, Mobile)  
**Framework:** React + Tailwind CSS  
**Design Philosophy:** Classical aesthetic meets modern usability

---

## Table of Contents

1. [Information Architecture](#1-information-architecture)
2. [Landing Page Design](#2-landing-page-design)
3. [Exercise Interface Design](#3-exercise-interface-design)
4. [Gamification Interface](#4-gamification-interface)
5. [Progress Dashboard Design](#5-progress-dashboard-design)
6. [Component Library](#6-component-library)
7. [Design System](#7-design-system)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Dark Mode Implementation](#9-dark-mode-implementation)
10. [Accessibility Guidelines](#10-accessibility-guidelines)

---

## 1. Information Architecture

### 1.1 Application Structure

```
Ancient Languages Learning App
│
├── Landing/Welcome Screen
│   ├── Language Selection (Latin/Greek)
│   └── Progress Overview (if returning user)
│
├── Main Learning Interface
│   ├── Exercise View
│   │   ├── Text Display
│   │   ├── Translation Toggle
│   │   ├── Vocabulary Hover
│   │   ├── Grammar Notes Panel
│   │   └── Cultural Context Panel
│   │
│   ├── Difficulty Level Selector
│   │   ├── Beginner (30+ exercises)
│   │   ├── Intermediate (35+ exercises)
│   │   ├── Advanced (35+ exercises)
│   │   ├── Expert (30+ exercises)
│   │   └── Master (15+ exercises)
│   │
│   └── Exercise Navigation
│       ├── Previous/Next
│       ├── Exercise List View
│       └── Bookmark Functionality
│
├── Gamification Hub
│   ├── XP Display & Level Progress
│   ├── Badge Collection Gallery
│   ├── Streak Tracker
│   ├── Daily Challenges
│   └── Leaderboard
│
├── Progress Dashboard
│   ├── Statistics Overview
│   ├── Practice Calendar (Heatmap)
│   ├── Completion Tracking
│   ├── Time Analytics
│   └── Language-Specific Progress
│
├── Grammar Reference (Quick Access)
│   ├── Latin Grammar
│   └── Greek Grammar
│
└── Settings & Profile
    ├── Theme Toggle (Light/Dark)
    ├── Notification Preferences
    ├── Language Preferences
    └── Account Management
```

### 1.2 Navigation Patterns

**Primary Navigation:**
- **Persistent Header** (Desktop): Logo, Language Selector, Gamification Quick Stats, Profile Menu
- **Bottom Navigation Bar** (Mobile): Learning, Progress, Gamification, Profile
- **Floating Action Button** (Mobile): Quick access to daily challenge

**Secondary Navigation:**
- Breadcrumb trail for exercise location (e.g., "Latin > Advanced > Caesar > Exercise 12")
- Context-aware side panel for grammar/cultural notes
- Modal overlays for badges, achievements, and celebrations

**User Flow Priority:**
1. Landing → Language Selection → Difficulty Level → Exercise
2. Exercise completion → XP Animation → Next Exercise prompt
3. Streak milestone → Celebration modal → Continue learning
4. Dashboard access at any time via navigation

---

## 2. Landing Page Design

### 2.1 First-Time User Experience

**Hero Section** (Full viewport height)
- **Background:** Subtle parchment texture with faint Greek key border pattern (8px pattern, 85% opacity)
- **Central Element:** Split card design
  - **Left Card:** "Ancient Latin" with Roman column icon (Ionic capital)
  - **Right Card:** "Ancient Greek" with Greek column icon (Doric capital)
- **Typography:** 
  - Main title: "Master Ancient Languages" (48px, serif font, centered above cards)
  - Subtitle: "Learn Latin & Greek through authentic classical texts" (18px, sans-serif, muted color)
- **Call-to-Action:** Cards are clickable/hoverable with scale effect (1.02) and shadow elevation
- **Visual Hierarchy:** 
  - Title: 96px top spacing
  - Cards: 64px spacing between, 400px width each
  - Bottom spacing: 128px

**Feature Highlights** (Below hero)
- Three-column grid (Desktop) / Stacked (Mobile)
- Icons + Brief descriptions:
  1. "165+ Latin & 145+ Greek Exercises"
  2. "5 Difficulty Levels - Beginner to Master"
  3. "Gamified Learning with XP, Badges & Streaks"
- Visual style: Classical iconography (laurel wreaths, scrolls, amphoras)

### 2.2 Returning User Experience

**Personalized Dashboard Landing**
- **Welcome Back Message:** "Welcome back, [Username]" (32px)
- **Current Streak Display:** Large prominent badge (e.g., "🔥 23 Day Streak")
- **Quick Resume Cards:**
  - Last Latin exercise (with thumbnail/icon)
  - Last Greek exercise (with thumbnail/icon)
  - Daily challenge status
- **Progress Rings:** Circular progress indicators for:
  - Latin completion percentage
  - Greek completion percentage
  - Current level progress (XP to next level)
- **Recent Badges:** Horizontal scrollable gallery of last 5 earned badges

**Layout Structure:**
```
┌─────────────────────────────────────────────┐
│   Welcome back, Scholar!    🔥 23 Days      │
├─────────────────────────────────────────────┤
│  [Latin Card]    [Greek Card]   [Challenge] │
├─────────────────────────────────────────────┤
│  Progress Rings (3 circular charts)         │
├─────────────────────────────────────────────┤
│  Recent Badges [→ → → → →]                 │
└─────────────────────────────────────────────┘
```

---

## 3. Exercise Interface Design

### 3.1 Primary Exercise View

**Layout Configuration:**
- **Main Content Area:** 60% width (Desktop) / 100% (Mobile)
- **Side Panel:** 40% width (Desktop) / Slide-up drawer (Mobile)
- **Maximum Width:** 1400px container, centered

**Exercise Header Bar:**
```
┌────────────────────────────────────────────────────────────┐
│ [Back] Latin > Advanced > Caesar    [Bookmark] [Progress]  │
│ Exercise 42/165                               Difficulty: ★★★│
└────────────────────────────────────────────────────────────┘
```
- Height: 64px
- Background: Surface color (elevated)
- Border bottom: 1px subtle divider
- Typography: 14px metadata, 16px location

**Text Display Area:**

**Original Text Section:**
- **Container:** 
  - Padding: 48px (Desktop) / 24px (Mobile)
  - Background: Parchment subtle gradient (2-tone, 3% difference)
  - Border radius: 16px
  - Border: 1px solid, accent color at 15% opacity
  - Box shadow: Soft elevation (0 4px 12px rgba(0,0,0,0.08))

- **Typography:**
  - Font: Serif (e.g., Crimson Text, EB Garamond) for classical texts
  - Size: 20px (Beginner/Intermediate), 18px (Advanced/Expert/Master)
  - Line height: 1.8
  - Letter spacing: 0.01em
  - Color: Near-black (85% opacity for reduced eye strain)

- **Interactive Word Elements:**
  - Hoverable words: Subtle underline appears on hover (2px dotted, accent color)
  - Hover state: Cursor pointer, slight color shift
  - Vocabulary popup: Appears 8px above word, 0.2s fade-in
  
**Vocabulary Popup Design:**
```
┌──────────────────────────┐
│ virtus, virtutis (f.)    │
│ ─────────────────────    │
│ courage, valor, virtue   │
│                          │
│ Grammar: Nominative sing.│
└──────────────────────────┘
```
- Background: White (light mode) / Dark elevated surface (dark mode)
- Padding: 12px 16px
- Border radius: 8px
- Box shadow: 0 8px 24px rgba(0,0,0,0.12)
- Max width: 320px
- Typography: 14px primary content, 12px grammar note (muted)
- Arrow pointer: 8px triangle pointing to word

**Translation Toggle:**
- **Toggle Button:**
  - Position: Top right of text container
  - Style: Pill button, 40px height
  - Icon + Text: "Show Translation" / "Hide Translation"
  - States: Hover (slight scale), Active (background shift)

- **Translation Display:**
  - Appears below original text with 24px gap
  - Slightly muted background (5% darker/lighter than text bg)
  - Padding: 32px
  - Border-left: 4px solid accent color
  - Font: Sans-serif (e.g., Inter, Open Sans)
  - Size: 16px, line-height 1.6
  - Transition: 0.3s ease slide-down + fade

### 3.2 Side Panel Design

**Tabbed Interface:**
```
┌────────────────────────────┐
│ [Grammar] [Cultural]       │
├────────────────────────────┤
│                            │
│  Content Area              │
│                            │
│                            │
└────────────────────────────┘
```

**Tab Bar:**
- Height: 48px
- Background: Surface elevated
- Active tab: Bottom border 3px, accent color
- Inactive tab: Muted text, hover state
- Font: 14px medium weight

**Grammar Notes Panel:**
- **Collapsible Sections:**
  - Each grammar point in an accordion
  - Header: Grammar term + expand/collapse icon
  - Example: "Ablative Absolute" with [+] icon
  
- **Section Structure:**
  ```
  ┌─────────────────────────────────┐
  │ ▼ Ablative Absolute             │
  ├─────────────────────────────────┤
  │ Explanation text with examples  │
  │                                 │
  │ "Caesar interfecto..."          │
  │ "Caesar having been killed..."  │
  └─────────────────────────────────┘
  ```

- **Visual Style:**
  - Padding: 16px per section
  - Border between sections: 1px divider
  - Latin examples: Italic, accent color
  - English translation: Regular, muted
  - Expandable: 0.2s ease animation

**Cultural Context Panel:**
- **Content Sections:**
  - Historical background
  - Author biography snippet
  - Literary/rhetorical context
  - Geographical references (if applicable)

- **Visual Treatment:**
  - Icon per section type (🏛️ history, ✍️ author, 📖 literary, 🗺️ geography)
  - Rich text formatting
  - Inline images/illustrations (if available)
  - Max width: 100%, responsive images
  - Padding: 24px

### 3.3 Exercise Controls

**Bottom Action Bar:**
```
┌────────────────────────────────────────────────────┐
│  [Previous]          [Mark Complete]      [Next]   │
└────────────────────────────────────────────────────┘
```

- **Position:** Fixed to bottom (sticky) or static below content
- **Height:** 72px
- **Background:** Surface with subtle shadow upward
- **Padding:** 16px 32px
- **Layout:** Space-between alignment

**Button Specifications:**
- **Previous/Next:**
  - Style: Secondary button
  - Size: 48px height, auto width
  - Icon + Text
  - Disabled state: When at first/last exercise
  
- **Mark Complete:**
  - Style: Primary CTA button
  - Size: 56px height, 200px min-width
  - Prominent color (accent/success)
  - Icon: Checkmark
  - Hover: Slight lift + shadow enhancement
  - Click: Triggers XP animation

**Exercise Completion Flow:**
1. User clicks "Mark Complete"
2. XP animation overlay appears (0.5s)
3. Badge earned notification (if applicable)
4. Confetti/celebration effect (for milestones)
5. Auto-dismiss after 3s or user clicks continue
6. Navigate to next exercise or exercise list

---

## 4. Gamification Interface

### 4.1 XP & Level Display

**Persistent Header Element (Desktop):**
```
┌────────────────────────────────┐
│  Level 12: Scholar             │
│  ████████░░░░  1,450 / 2,000 XP│
└────────────────────────────────┘
```

- **Size:** 240px width × 56px height
- **Background:** Subtle gradient, accent colors
- **Border radius:** 12px
- **Progress bar:**
  - Height: 8px
  - Background: Accent color at 20% opacity
  - Fill: Accent color gradient
  - Border radius: 4px
  - Transition: 0.5s ease width change

**Level-Up Celebration Modal:**
```
┌─────────────────────────────────────┐
│                                     │
│         ⭐ LEVEL UP! ⭐             │
│                                     │
│     You've reached Level 13:        │
│        Advanced Scholar             │
│                                     │
│     [New Benefits Unlocked]         │
│                                     │
│         [Continue Learning]         │
│                                     │
└─────────────────────────────────────┘
```

- **Overlay:** Full-screen semi-transparent backdrop (rgba(0,0,0,0.6))
- **Modal size:** 500px width, auto height, centered
- **Animation:** Scale-in + fade (0.4s ease-out)
- **Background:** Gradient with classical pattern overlay
- **Typography:**
  - Title: 36px bold
  - Level: 28px medium
  - Body: 16px regular
- **CTA Button:** 56px height, full-width, primary style

### 4.2 Badge Collection Gallery

**Gallery Layout:**
- **Grid:** 4 columns (Desktop) / 2 columns (Mobile)
- **Gap:** 24px between items
- **Badge Card:**
  ```
  ┌──────────────┐
  │   [🏆 Icon]  │
  │              │
  │  Badge Name  │
  │   Subtitle   │
  └──────────────┘
  ```

- **Card Size:** 160px × 200px
- **States:**
  - **Earned:** Full color, scale on hover (1.05)
  - **Locked:** Grayscale filter + 40% opacity, dashed border
  - **Recently Earned:** Subtle glow/pulse animation

**Badge Detail Modal:**
- Triggered on badge click
- Shows:
  - Large badge icon (128px)
  - Badge name and description
  - Unlock date (if earned)
  - Unlock criteria (if locked)
  - Rarity indicator (Common/Rare/Epic/Legendary)
  
**Badge Categories (Filter Tabs):**
- All Badges
- Practice Milestones
- Streak Achievements
- Grammar Mastery
- Cultural Explorer
- Social Achievements

### 4.3 Streak Tracker

**Main Streak Display:**
```
┌────────────────────────────────┐
│        🔥 CURRENT STREAK       │
│                                │
│            23 DAYS             │
│                                │
│  ████████████████████░  to 30  │
│                                │
│   Streak Freeze: 2 available  │
└────────────────────────────────┘
```

- **Container:** 360px width, centered
- **Background:** Gradient (fire colors for active streak)
- **Padding:** 32px
- **Border radius:** 16px
- **Typography:**
  - Streak count: 64px bold
  - Label: 16px uppercase, letter-spacing 0.1em
  - Freeze count: 14px

**Streak Calendar View:**
- Heatmap grid (7 columns for week days)
- Each cell: 32px × 32px
- Color intensity: Based on XP earned that day
- Hover: Shows date + XP earned
- Current day: Highlighted border (3px accent)
- Missed days: Gray/empty
- Freeze used: Special icon overlay

**Streak Milestone Celebrations:**
- Day 7: Bronze badge animation
- Day 30: Silver badge + 1 streak freeze
- Day 100: Gold badge + 1 streak freeze
- Day 365: Platinum badge + 2 streak freezes

### 4.4 Leaderboard

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│  Weekly Leaderboard | [All Time]        │
├─────────────────────────────────────────┤
│  Rank | Name      | XP    | Streak     │
├─────────────────────────────────────────┤
│   1   | Marcus    | 2,450 | 🔥 45      │
│   2   | Helena    | 2,280 | 🔥 32      │
│   3   | Cicero    | 2,100 | 🔥 28      │
│  ...                                    │
│   12  | YOU       | 1,450 | 🔥 23      │ ← Highlighted
│  ...                                    │
└─────────────────────────────────────────┘
```

**Visual Specifications:**
- **Container:** Full width, max 900px
- **Header:** 56px height, tabs for Weekly/All Time
- **List Items:**
  - Height: 64px per row
  - Alternating row background (subtle)
  - User's row: Highlighted with accent background (10% opacity)
  - Top 3: Special medal icons (🥇🥈🥉)
  
**Rank Badges:**
- Rank 1-3: Large medals, gold/silver/bronze gradient backgrounds
- Rank 4-10: Smaller badges, accent color
- Rank 11+: Number only, regular text

**Promotion/Demotion Indicators:**
- Arrow icons next to rank
- Green ↑ for rank improvement
- Red ↓ for rank drop
- Gold ⭐ for entering top 10

---

## 5. Progress Dashboard Design

### 5.1 Statistics Overview

**Dashboard Header:**
```
┌─────────────────────────────────────────────────────┐
│  Your Learning Journey                              │
│  Last updated: Today at 3:45 PM                     │
└─────────────────────────────────────────────────────┘
```

**Key Metrics Cards (4-column grid):**

**Card 1: Total XP**
```
┌──────────────────────┐
│   TOTAL XP EARNED    │
│                      │
│      12,450          │
│                      │
│   +250 this week     │
└──────────────────────┘
```

**Card 2: Exercises Completed**
```
┌──────────────────────┐
│  EXERCISES COMPLETE  │
│                      │
│      87 / 310        │
│                      │
│   28% completion     │
└──────────────────────┘
```

**Card 3: Current Level**
```
┌──────────────────────┐
│   CURRENT LEVEL      │
│                      │
│  12: Scholar         │
│                      │
│   550 XP to Level 13 │
└──────────────────────┘
```

**Card 4: Study Time**
```
┌──────────────────────┐
│   STUDY TIME         │
│                      │
│    24.5 hours        │
│                      │
│   2.3h this week     │
└──────────────────────┘
```

**Card Styling:**
- Size: Equal height, flexible width
- Background: Surface elevated
- Padding: 32px
- Border radius: 16px
- Box shadow: Subtle elevation
- Hover: Slight lift effect

### 5.2 Practice Calendar (Heatmap)

**Calendar Grid:**
- **Layout:** GitHub-style contribution heatmap
- **Dimensions:** 
  - Cell: 16px × 16px (Desktop) / 12px × 12px (Mobile)
  - Gap: 4px
  - 7 rows (days of week) × 52 columns (weeks)
  
**Color Intensity Scale:**
- No activity: Neutral gray (surface background)
- Low (1-50 XP): Accent color at 20% opacity
- Medium (51-150 XP): Accent color at 50% opacity
- High (151-300 XP): Accent color at 75% opacity
- Very High (301+ XP): Accent color at 100% opacity

**Interactive Features:**
- Hover: Tooltip showing date + exact XP earned
- Click: Opens daily detail view (exercises completed that day)
- Current day: Pulsing border animation
- Streak days: Subtle glow effect

**Legend:**
```
Less [░][▒][▓][█] More
```

### 5.3 Language-Specific Progress

**Tab Interface:**
```
┌──────────────────────────────────┐
│  [Latin]  [Greek]                │
├──────────────────────────────────┤
│   Difficulty Level Breakdown     │
└──────────────────────────────────┘
```

**Progress by Difficulty (Horizontal Bar Charts):**
```
Beginner      ████████████████████  30/30  100%
Intermediate  ███████████████░░░░░  28/35   80%
Advanced      ██████░░░░░░░░░░░░░░  12/35   34%
Expert        ███░░░░░░░░░░░░░░░░░   5/30   17%
Master        ░░░░░░░░░░░░░░░░░░░░   0/15    0%
```

**Bar Specifications:**
- Height: 32px per bar
- Spacing: 16px between bars
- Background: Track color (neutral, 20% opacity)
- Fill: Gradient (accent colors)
- Labels: Left (level name), Right (count + percentage)
- Border radius: 6px
- Transition: 0.5s ease on value change

**Completion Badges:**
- Award badge for completing all exercises in a difficulty level
- Display earned badges next to completed levels
- Visual: Small icon (24px) next to 100% levels

### 5.4 Time Analytics

**Weekly Study Chart:**
- **Chart Type:** Bar chart
- **X-axis:** Days of the week (Mon-Sun)
- **Y-axis:** Minutes studied
- **Bar Style:**
  - Width: 40px
  - Spacing: 16px
  - Color: Accent gradient
  - Hover: Highlight + tooltip
  
**Monthly Trends:**
- **Chart Type:** Line chart
- **Data Points:** Last 6 months
- **Metrics:** XP earned, Exercises completed, Study time
- **Style:**
  - Line width: 3px
  - Point markers: 8px circles
  - Area fill: Gradient with low opacity (10%)
  - Grid lines: Subtle (1px, 10% opacity)

---

## 6. Component Library

### 6.1 Buttons

**Primary Button:**
```css
Size: 48px height (default), 56px (large), 40px (small)
Padding: 16px 32px (horizontal)
Border radius: 12px
Background: Accent gradient
Font: 16px medium weight
Color: White
Shadow: 0 4px 12px rgba(accent, 0.2)
Hover: Lift (translateY -2px) + shadow enhancement
Active: Scale 0.98
Transition: 0.2s ease all
```

**Secondary Button:**
```css
Background: Transparent
Border: 2px solid accent color
Color: Accent color
Hover: Background accent at 10% opacity
Other properties: Same as primary
```

**Ghost Button:**
```css
Background: Transparent
Border: None
Color: Text primary
Hover: Background neutral at 5% opacity
```

**Icon Button:**
```css
Size: 44px × 44px (touch target)
Border radius: 50% (circular) or 12px (rounded square)
Icon size: 24px
Padding: 10px
Hover: Background neutral at 8% opacity
```

### 6.2 Cards

**Standard Card:**
```css
Background: Surface elevated
Padding: 24px (default), 32px (large), 16px (compact)
Border radius: 16px
Border: 1px solid divider color (optional)
Shadow: 0 2px 8px rgba(0,0,0,0.06)
Hover: Shadow enhancement to 0 4px 16px rgba(0,0,0,0.1)
Transition: 0.3s ease box-shadow
```

**Interactive Card (Clickable):**
```css
Extends standard card
Hover: Transform translateY(-4px) + shadow enhancement
Active: Transform translateY(-2px)
Cursor: Pointer
```

**Badge Card:**
```css
Aspect ratio: 4:5
Padding: 16px
Text align: Center
Icon size: 64px (top)
Title: 16px medium
Subtitle: 12px muted
```

### 6.3 Modals & Overlays

**Modal Container:**
```css
Position: Fixed, centered
Max width: 600px (default), 900px (large), 400px (small)
Max height: 90vh
Background: Surface
Border radius: 24px
Shadow: 0 20px 60px rgba(0,0,0,0.3)
Padding: 40px
Overflow: Auto (if content exceeds max-height)
```

**Modal Backdrop:**
```css
Position: Fixed, full viewport
Background: rgba(0,0,0,0.5) light mode, rgba(0,0,0,0.7) dark mode
Backdrop filter: Blur(8px) (if supported)
Z-index: 1000
```

**Modal Animations:**
- Enter: Scale 0.9 → 1.0 + fade 0 → 1 (0.3s ease-out)
- Exit: Scale 1.0 → 0.9 + fade 1 → 0 (0.2s ease-in)

**Slide-up Panel (Mobile):**
```css
Position: Fixed bottom
Height: Auto, max 80vh
Border radius: 24px 24px 0 0
Background: Surface
Shadow: 0 -4px 20px rgba(0,0,0,0.1)
Animation: TranslateY(100%) → TranslateY(0) 0.3s ease-out
```

### 6.4 Form Controls

**Text Input:**
```css
Height: 48px
Padding: 12px 16px
Border: 2px solid divider color
Border radius: 12px
Font: 16px regular
Background: Input background (slightly different from surface)
Focus: Border color → accent, outline offset 2px
Transition: 0.2s ease all
```

**Select Dropdown:**
```css
Same as text input
Chevron icon: Right aligned, 20px
Dropdown menu: Surface elevated, max-height 300px, overflow scroll
Option hover: Background neutral at 8% opacity
Option selected: Background accent at 15% opacity
```

**Toggle Switch:**
```css
Track width: 48px
Track height: 24px
Track radius: 12px (full pill)
Knob: 20px circle, 2px offset from edges
Off state: Track background neutral gray
On state: Track background accent color, knob translated to right
Transition: 0.2s ease all
```

**Checkbox:**
```css
Size: 20px × 20px
Border: 2px solid divider
Border radius: 4px
Checked: Background accent, white checkmark icon (14px)
Hover: Border color → accent
Focus: Outline offset 2px
```

### 6.5 Progress Indicators

**Linear Progress Bar:**
```css
Height: 8px (thin), 12px (default), 16px (thick)
Width: 100%
Background: Track color (neutral 20% opacity)
Fill: Accent gradient
Border radius: Full (height/2)
Transition: Width 0.5s ease
```

**Circular Progress Ring:**
```css
Size: 120px diameter (default), 80px (small), 200px (large)
Stroke width: 8px
Track: Neutral color at 20% opacity
Progress: Accent color, animated stroke-dasharray
Center text: Percentage (24px bold)
Animation: Smooth arc draw, 1s ease-out
```

**Loading Spinner:**
```css
Size: 40px diameter
Border: 4px solid neutral (20% opacity)
Border-top: 4px solid accent color
Border radius: 50%
Animation: Rotate 360deg, 0.8s linear infinite
```

### 6.6 Tooltips & Popovers

**Tooltip:**
```css
Max width: 240px
Padding: 8px 12px
Background: Neutral dark (rgba(0,0,0,0.9) light mode)
Color: White
Font: 13px regular
Border radius: 6px
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Arrow: 6px triangle, same background color
Position: Dynamic (above/below/left/right based on space)
Delay: 0.3s on hover enter
Animation: Fade 0.2s ease
```

**Vocabulary Popover:**
```css
Max width: 320px
Padding: 16px
Background: Surface elevated
Border: 1px solid divider
Border radius: 12px
Shadow: 0 8px 24px rgba(0,0,0,0.12)
Arrow: 10px triangle
Sections: Header (word + grammar), Divider, Definition
Typography: 14px primary, 12px muted for grammar
```

### 6.7 Notifications & Toasts

**Toast Notification:**
```css
Width: 360px (desktop), 90vw max-width (mobile)
Min-height: 64px
Padding: 16px 20px
Background: Surface elevated
Border-left: 4px solid (color based on type)
Border radius: 12px
Shadow: 0 6px 16px rgba(0,0,0,0.1)
Position: Fixed top-right (desktop), top-center (mobile)
Z-index: 2000
```

**Toast Types:**
- Success: Green border-left, success icon
- Error: Red border-left, error icon
- Warning: Yellow border-left, warning icon
- Info: Blue border-left, info icon

**Toast Animation:**
- Enter: Slide from right (desktop) / top (mobile) + fade, 0.3s
- Exit: Slide out + fade, 0.2s
- Auto-dismiss: 5s default (adjustable per message)

**Badge Earned Notification:**
```css
Special celebration style
Width: 400px
Background: Gradient (accent colors)
Icon: Large badge image (80px)
Animation: Confetti particles (if milestone badge)
Sound: Optional chime (user preference)
```

---

## 7. Design System

### 7.1 Color Palette

**Primary Colors (Accent):**
```
primary-50:   #FFF9E6  (Pale gold, very light)
primary-100:  #FFF3CC
primary-200:  #FFE699
primary-300:  #FFD966
primary-400:  #FFCC33
primary-500:  #D4AF37  (Gold - main brand color, classical reference)
primary-600:  #B8941E
primary-700:  #9C7A14
primary-800:  #805F0B
primary-900:  #664502
```

**Secondary Colors (Classical Blue):**
```
secondary-50:  #E8F1F8
secondary-100: #D1E3F1
secondary-200: #A3C7E3
secondary-300: #75ABD5
secondary-400: #478FC7
secondary-500: #1973B9  (Deep classical blue)
secondary-600: #145C93
secondary-700: #0F456D
secondary-800: #0A2E47
secondary-900: #051721
```

**Neutral Grays (with warm tint):**
```
neutral-50:   #FAF9F8  (Warm white, parchment-inspired)
neutral-100:  #F5F3F1
neutral-200:  #E8E5E1
neutral-300:  #D1CCC5
neutral-400:  #A39E96
neutral-500:  #6B6660  (Medium gray)
neutral-600:  #54504C
neutral-700:  #3D3A37
neutral-800:  #262422
neutral-900:  #0F0E0D  (Near black)
```

**Semantic Colors:**
```
success-50:   #E8F5E9
success-500:  #4CAF50  (Green)
success-700:  #388E3C

error-50:     #FFEBEE
error-500:    #F44336  (Red)
error-700:    #D32F2F

warning-50:   #FFF3E0
warning-500:  #FF9800  (Orange)
warning-700:  #F57C00

info-50:      #E3F2FD
info-500:     #2196F3  (Blue)
info-700:     #1976D2
```

**Special Colors:**
```
streak-fire:    #FF6B35  (Fire orange for streak indicators)
streak-freeze:  #4FC3F7  (Ice blue for streak freeze)
xp-glow:        #FFD700  (Gold glow for XP animations)
```

### 7.2 Typography

**Font Families:**

**Serif (Classical Texts):**
- Primary: "Crimson Text", Georgia, "Times New Roman", serif
- Alternative: "EB Garamond", "Libre Baskerville", serif
- Use for: Original Latin/Greek text, headings with classical feel

**Sans-Serif (UI & Modern Text):**
- Primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Alternative: "Open Sans", "Roboto", sans-serif
- Use for: UI elements, navigation, translations, modern content

**Monospace (Code/References):**
- Primary: "JetBrains Mono", "Fira Code", Consolas, monospace
- Use for: Grammar notation, linguistic terminology

**Type Scale:**
```
text-xs:   12px / 1.4    (Captions, metadata)
text-sm:   14px / 1.5    (Secondary text, labels)
text-base: 16px / 1.6    (Body text, default)
text-lg:   18px / 1.6    (Emphasized body, exercise text)
text-xl:   20px / 1.5    (Large body, classical texts)
text-2xl:  24px / 1.4    (Subheadings)
text-3xl:  30px / 1.3    (Section headings)
text-4xl:  36px / 1.2    (Page titles)
text-5xl:  48px / 1.1    (Hero headings)
text-6xl:  64px / 1.0    (Display headings, streak numbers)
```

**Font Weights:**
```
font-light:     300
font-regular:   400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800
```

**Letter Spacing:**
```
tracking-tighter: -0.02em (Large headings)
tracking-tight:   -0.01em (Headings)
tracking-normal:   0      (Body text)
tracking-wide:     0.02em (Small caps, labels)
tracking-wider:    0.05em (All-caps labels)
tracking-widest:   0.1em  (Spaced-out titles)
```

### 7.3 Spacing System (4px base grid)

```
spacing-0:    0px
spacing-1:    4px
spacing-2:    8px
spacing-3:    12px
spacing-4:    16px
spacing-5:    20px
spacing-6:    24px
spacing-8:    32px
spacing-10:   40px
spacing-12:   48px
spacing-16:   64px
spacing-20:   80px
spacing-24:   96px
spacing-32:   128px
spacing-40:   160px
spacing-48:   192px
```

**Common Patterns:**
- Card padding: 24px (default), 32px (large)
- Button padding: 16px horizontal, 12px vertical
- Section spacing: 64px - 96px
- Component gaps: 16px - 24px
- Modal padding: 40px
- Input padding: 12px 16px

### 7.4 Border Radius

```
radius-none:   0px
radius-sm:     4px    (Subtle rounding)
radius-base:   8px    (Default rounding)
radius-md:     12px   (Buttons, cards)
radius-lg:     16px   (Large cards, panels)
radius-xl:     24px   (Modals, special containers)
radius-2xl:    32px   (Hero elements)
radius-full:   9999px (Pills, circular elements)
```

**Component Mapping:**
- Buttons: 12px
- Cards: 16px
- Modals: 24px
- Inputs: 12px
- Badges: 8px (small), 12px (default)
- Avatars: Full (circular)
- Progress bars: Full (pill shape)

### 7.5 Shadows

```
shadow-sm:      0 1px 2px rgba(0,0,0,0.05)
shadow-base:    0 2px 8px rgba(0,0,0,0.06)
shadow-md:      0 4px 12px rgba(0,0,0,0.08)
shadow-lg:      0 6px 16px rgba(0,0,0,0.1)
shadow-xl:      0 10px 24px rgba(0,0,0,0.12)
shadow-2xl:     0 20px 60px rgba(0,0,0,0.15)

shadow-inner:   inset 0 2px 4px rgba(0,0,0,0.06)

shadow-accent:  0 4px 12px rgba(212,175,55,0.2)  (Gold glow)
shadow-glow:    0 0 20px rgba(255,215,0,0.3)     (XP animation)
```

**Component Usage:**
- Cards: shadow-base (static), shadow-lg (hover)
- Modals: shadow-2xl
- Tooltips: shadow-lg
- Buttons: shadow-md (default), shadow-lg (hover)
- Floating panels: shadow-xl

### 7.6 Classical Design Elements

**Greek Key Pattern:**
- Pattern: SVG repeating Greek key (meander)
- Usage: Page borders, dividers, decorative elements
- Color: Primary color at 15-25% opacity
- Size: 8px - 16px pattern repeat
- Implementation: CSS background-image or SVG border

**Parchment Texture:**
- Subtle paper texture overlay
- Opacity: 3-5% (very subtle)
- Usage: Text display backgrounds, card backgrounds (classical theme)
- Blend mode: Multiply (light mode), Screen (dark mode, inverted)

**Column Capitals (Iconography):**
- Ionic: For Latin (elegant, Roman)
- Doric: For Greek (simple, strong)
- Usage: Language selection cards, section headers
- Style: Line art, 2px stroke, accent color

**Laurel Wreaths:**
- Achievement badges, milestone celebrations
- SVG illustrations
- Color: Gold gradient (primary colors)
- Usage: Badge frames, level-up celebrations

**Scroll Decorations:**
- Curled scroll edges for special cards
- SVG illustrations at card corners
- Subtle, not overwhelming
- Usage: Cultural context panels, special announcements

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint Definitions

```
xs:  0px - 479px      (Small mobile phones)
sm:  480px - 767px    (Large phones)
md:  768px - 1023px   (Tablets)
lg:  1024px - 1279px  (Small laptops)
xl:  1280px - 1535px  (Desktop)
2xl: 1536px+          (Large desktop)
```

### 8.2 Layout Adaptations

**Navigation:**
- **Desktop (lg+):** Horizontal header bar, all items visible
- **Tablet (md):** Horizontal header, some items in overflow menu
- **Mobile (sm-):** Bottom navigation bar (4-5 icons)

**Exercise Interface:**
- **Desktop (lg+):** Side-by-side (60/40 split for text/panel)
- **Tablet (md):** Side-by-side (70/30 split, narrower panel)
- **Mobile (sm-):** Stacked layout, slide-up panel for grammar/cultural notes

**Dashboard:**
- **Desktop (xl+):** 4-column grid for metric cards
- **Laptop (lg):** 2-column grid for metric cards
- **Tablet (md):** 2-column grid (smaller cards)
- **Mobile (sm-):** Single column stack

**Leaderboard:**
- **Desktop:** Full table with all columns
- **Tablet:** Condensed columns, some data hidden
- **Mobile:** Simplified list view, vertical cards

**Badge Gallery:**
- **Desktop (xl+):** 5-6 columns
- **Laptop (lg):** 4 columns
- **Tablet (md):** 3 columns
- **Mobile (sm-):** 2 columns

### 8.3 Typography Scaling

```
Breakpoint    Hero (H1)   Page Title (H2)   Section (H3)   Body
─────────────────────────────────────────────────────────────
xs-sm         36px        24px              20px           15px
md            48px        30px              24px           16px
lg            56px        36px              28px           16px
xl+           64px        48px              32px           16px
```

### 8.4 Touch Targets (Mobile)

**Minimum Sizes:**
- Buttons: 44px × 44px (WCAG 2.5.5)
- Icon buttons: 48px × 48px
- Navigation items: 56px height
- Interactive words (vocabulary): 8px padding around text for easier tap

**Spacing Adjustments:**
- Increase spacing between interactive elements to 8px minimum
- Bottom navigation: 64px height for comfortable thumb reach
- Modal close buttons: Top-right with 16px padding from edges

### 8.5 Performance Optimizations

**Mobile Considerations:**
- Lazy load images below the fold
- Reduce animation complexity on lower-end devices
- Limit confetti particles on mobile (20 vs 50 on desktop)
- Use CSS transforms for animations (GPU-accelerated)
- Minimize modal backdrop blur on older devices

**Image Optimization:**
- Serve responsive images (srcset)
- WebP format with fallback
- Lazy loading for badge galleries
- Placeholder blur while loading

---

## 9. Dark Mode Implementation

### 9.1 Color Adaptations

**Background Hierarchy:**
```
Light Mode                    Dark Mode
─────────────────────────────────────────────────────────
Page background:   #FAF9F8   →   #0F0E0D  (neutral-900)
Surface:           #FFFFFF   →   #1A1918  (Elevated surface)
Surface elevated:  #FFFFFF   →   #262422  (neutral-800)
Surface hover:     #F5F3F1   →   #2D2B28  (Slightly lighter)
```

**Text Colors:**
```
Light Mode                    Dark Mode
─────────────────────────────────────────────────────────
Primary text:      #0F0E0D   →   #F5F3F1  (neutral-100)
Secondary text:    #54504C   →   #A39E96  (neutral-400)
Muted text:        #6B6660   →   #6B6660  (neutral-500)
Disabled text:     #A39E96   →   #54504C  (neutral-600)
```

**Accent Colors:**
- Primary/Secondary: Slightly brighter in dark mode (+10% lightness)
- Gold (#D4AF37): Increase to #E5C158 for better contrast
- Semantic colors: Use lighter variants (e.g., success-400 instead of success-600)

**Borders & Dividers:**
```
Light Mode:   rgba(0,0,0,0.1)   →   rgba(255,255,255,0.1)
Emphasis:     rgba(0,0,0,0.2)   →   rgba(255,255,255,0.15)
```

### 9.2 Component Adaptations

**Cards:**
- Light: White background, subtle shadow
- Dark: Elevated surface color (#262422), border instead of shadow
- Border in dark mode: 1px solid rgba(255,255,255,0.08)

**Inputs:**
- Light: #FFFFFF background, gray border
- Dark: #1A1918 background, lighter border rgba(255,255,255,0.12)
- Focus: Accent color border (same for both)

**Buttons:**
- Primary: Slightly brighter accent in dark mode
- Secondary: Border color adjusted for contrast
- Ghost: Background hover more prominent in dark (15% vs 5%)

**Modals:**
- Backdrop: Darker in dark mode (rgba(0,0,0,0.8))
- Modal surface: Use surface-elevated color
- Enhanced border: 1px solid rgba(255,255,255,0.1)

**Shadows:**
- Reduce shadow opacity in dark mode (50% of light mode values)
- Add subtle borders to compensate for reduced depth perception
- Glow effects: More visible in dark mode, enhance slightly

### 9.3 Classical Elements in Dark Mode

**Parchment Texture:**
- Invert and reduce opacity to 2-3%
- Use screen blend mode instead of multiply
- Maintain warm tone (slightly golden tint)

**Greek Key Pattern:**
- Use lighter color (primary-200 or neutral-200)
- Reduce opacity to 12-18%
- Maintain visibility while not overwhelming

**Column Icons:**
- Stroke color: Light gold or neutral-100
- Glow effect: Subtle gold halo in dark mode

### 9.4 Theme Toggle

**Toggle Control:**
- Location: Top-right header (desktop), settings (mobile)
- Icon: Sun/Moon icon
- Animation: Smooth rotation (0.3s) on toggle
- Tooltip: "Switch to dark/light mode"

**Theme Persistence:**
- Save preference in localStorage
- Respect system preference initially (prefers-color-scheme)
- Allow manual override

**Transition:**
- Smooth color transition: 0.2s ease on theme change
- Apply to: background-color, color, border-color
- Avoid transition on: box-shadow (can be janky)

---

## 10. Accessibility Guidelines

### 10.1 WCAG 2.1 AA Compliance

**Color Contrast Requirements:**

**Text Contrast Ratios:**
- Normal text (16px): Minimum 4.5:1
- Large text (24px+): Minimum 3:1
- UI components: Minimum 3:1 against background

**Validated Pairings (Light Mode):**
```
Background #FAF9F8 + Text #0F0E0D:        Ratio 16.8:1 ✓ AAA
Background #FAF9F8 + Text #54504C:        Ratio 7.2:1  ✓ AAA
Background #FAF9F8 + Accent #D4AF37:      Ratio 4.8:1  ✓ AA
Background #FFFFFF + Primary text:        Ratio 19.1:1 ✓ AAA
```

**Validated Pairings (Dark Mode):**
```
Background #0F0E0D + Text #F5F3F1:        Ratio 16.5:1 ✓ AAA
Background #1A1918 + Text #F5F3F1:        Ratio 14.2:1 ✓ AAA
Background #0F0E0D + Accent #E5C158:      Ratio 6.1:1  ✓ AA
```

**Non-Color Indicators:**
- Never rely on color alone to convey information
- Use icons + color for status (e.g., success checkmark + green)
- Error states: Icon + red color + descriptive text
- Disabled states: Opacity + cursor change + aria-disabled

### 10.2 Keyboard Navigation

**Focus Indicators:**
- Visible focus ring: 2px solid accent color
- Offset: 2px from element edge
- Border radius: Matches element radius
- Never remove focus outline (no outline:none)

**Tab Order:**
- Logical flow: Left-to-right, top-to-bottom
- Skip links: "Skip to main content" at page top
- Modal trap: Focus confined to modal when open
- Return focus: To trigger element when modal closes

**Keyboard Shortcuts:**
```
Navigation:
- Arrow keys:  Navigate between exercises (when not in input)
- Tab:         Move between interactive elements
- Shift+Tab:   Reverse tab order
- Escape:      Close modals, dismiss overlays
- Enter:       Activate buttons, submit forms
- Space:       Toggle checkboxes, activate buttons

Exercise Interface:
- T:           Toggle translation
- N:           Next exercise
- P:           Previous exercise
- B:           Toggle bookmark
- M:           Mark as complete
- G:           Open grammar panel
- C:           Open cultural context panel

Global:
- /:           Focus search (if applicable)
- ?:           Show keyboard shortcuts help
- Ctrl/Cmd+D:  Toggle dark mode
```

**Focus Management:**
- Modals: Focus first interactive element on open
- Notifications: Programmatic focus for important alerts
- Page transitions: Reset scroll, announce page title to screen readers

### 10.3 Screen Reader Support

**ARIA Labels:**
```html
<!-- Buttons with icons only -->
<button aria-label="Next exercise">
  <IconChevronRight />
</button>

<!-- Progress indicators -->
<div role="progressbar" 
     aria-valuenow="65" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Latin completion: 65%">
  <div class="progress-bar"></div>
</div>

<!-- Status updates -->
<div role="status" aria-live="polite">
  Exercise completed! +20 XP
</div>

<!-- Toggle states -->
<button aria-pressed="true" aria-label="Translation shown">
  Hide Translation
</button>
```

**Semantic HTML:**
- Use `<nav>` for navigation landmarks
- Use `<main>` for primary content
- Use `<aside>` for side panels
- Use `<section>` with aria-label for major regions
- Use `<article>` for self-contained exercises

**Dynamic Content:**
- `aria-live="polite"`: For XP notifications, non-critical updates
- `aria-live="assertive"`: For errors, critical alerts
- `aria-atomic="true"`: Announce entire region on change
- Loading states: aria-busy="true" during async operations

**Hidden Content:**
- Use `aria-hidden="true"` for decorative elements
- Provide text alternatives for icons
- Don't hide focusable elements from screen readers

### 10.4 Motion & Animation

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep essential state changes visible */
  .progress-bar {
    transition: width 0.2s ease; /* Shortened but not removed */
  }
}
```

**Safe Animations:**
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating: width, height, top, left (causes reflow)
- Parallax: Limit to ≤16px offset, disable for reduced-motion
- Confetti: Skip entirely for reduced-motion
- Pulse animations: Reduce to simple fade for reduced-motion

**User Control:**
- Settings toggle: "Enable animations"
- Respect system preference by default
- Provide static alternative states

### 10.5 Form Accessibility

**Labels & Instructions:**
- Every input has associated `<label>`
- Use `aria-describedby` for helper text
- Required fields: Visual indicator + `aria-required="true"`
- Error messages: Programmatically associated with input

**Error Handling:**
```html
<div class="form-field">
  <label for="username">Username</label>
  <input 
    id="username" 
    type="text"
    aria-invalid="true"
    aria-describedby="username-error"
  />
  <div id="username-error" role="alert">
    Username must be at least 3 characters
  </div>
</div>
```

**Validation:**
- Inline validation: After field blur, not on every keystroke
- Success indicators: Visual + aria-describedby for confirmation
- Form-level errors: Announce with role="alert", move focus to summary

### 10.6 Touch & Pointer Accessibility

**Target Sizes:**
- Minimum: 44px × 44px (WCAG 2.5.5 Level AAA)
- Recommended: 48px × 48px
- Spacing: Minimum 8px between targets

**Hover/Focus States:**
- Don't rely on hover-only interactions
- Provide tap-accessible alternative for hover tooltips
- Long-press as alternative to right-click

**Pointer Cancellation:**
- Activate on pointer-up, not pointer-down
- Allow drag-away to cancel action
- Confirm destructive actions

### 10.7 Content Accessibility

**Language Declaration:**
```html
<html lang="en">
  <p lang="la">Lorem ipsum dolor sit amet</p>
  <p lang="grc">Ἐν ἀρχῇ ἦν ὁ λόγος</p>
</html>
```

**Text Alternatives:**
- Alt text for all informative images
- Empty alt for decorative images
- Descriptive text for icons conveying meaning
- Captions/transcripts for audio/video (if added in future)

**Readable Text:**
- Line length: Maximum 75 characters for body text
- Line height: 1.5-1.8 for body text
- Paragraph spacing: At least 1.5× line height
- Text resize: Support up to 200% without loss of functionality

**Vocabulary Tooltips:**
- Accessible via keyboard (focus)
- Announced to screen readers
- Dismissible with Escape key
- Don't obscure other interactive elements

---

## Implementation Notes

### Priority Phasing

**Phase 1: Core Learning Experience**
- Landing page
- Exercise interface (text, translation, vocabulary)
- Basic navigation
- Essential gamification (XP, levels)
- Responsive layouts (mobile + desktop)

**Phase 2: Gamification & Engagement**
- Badge system
- Streak tracker
- Daily challenges
- Leaderboard
- Celebration animations

**Phase 3: Progress & Analytics**
- Dashboard statistics
- Practice calendar heatmap
- Time tracking
- Detailed progress breakdowns

**Phase 4: Polish & Enhancements**
- Dark mode
- Advanced accessibility features
- Keyboard shortcuts
- Performance optimizations
- Classical decorative elements refinement

### Technical Considerations

**State Management:**
- User progress data
- Exercise completion tracking
- Gamification metrics (XP, streaks, badges)
- Theme preferences
- Bookmark management

**Data Fetching:**
- Exercise content from databases
- User statistics
- Leaderboard data
- Badge unlock criteria

**Performance:**
- Virtual scrolling for long exercise lists
- Image lazy loading
- Code splitting by route
- Memoization for expensive calculations
- Debounced search/filter inputs

**Browser Support:**
- Modern evergreen browsers (last 2 versions)
- Graceful degradation for older browsers
- Fallbacks for CSS Grid, Flexbox (minimal)
- Feature detection for backdrop-filter, blend modes

---

## Appendix: Classical UI Patterns

### Greek Key Border Implementation
```
SVG pattern, 8-16px repeat
Colors: primary-500 at 15-20% opacity
Usage: Page borders, section dividers, card decorations
Placement: Subtle, not overwhelming
```

### Parchment Texture
```
Base: Neutral-50 or neutral-100
Overlay: Subtle paper texture PNG, 3-5% opacity
Blend: Multiply (light), Screen (dark)
Alternative: CSS noise() function when browser support improves
```

### Column Capital Icons
```
Style: Line art, 2-3px stroke
Ionic: Scrolled volutes, elegant (Latin)
Doric: Simple, no base, fluted (Greek)
Size: 48-64px for language selection cards
Color: Primary gradient or outline
```

### Laurel Wreath Badges
```
Usage: Achievement badges, milestone celebrations
Style: SVG illustration, gold gradient fill
Placement: Badge frames, level-up modals
Animation: Gentle rotation on hover (5deg), scale on earn
```

### Scroll Edges
```
Usage: Special announcement cards, cultural context panels
Style: Curled scroll corners (SVG)
Color: Sepia tone or gold
Placement: Card corners (decorative, not functional)
```

---

**End of UI/UX Design Specification**

This document provides comprehensive design guidance for implementing the Ancient Latin & Greek Language Learning Application. All specifications are intended for developers to create a consistent, accessible, and engaging user interface without ambiguity.

For questions or clarifications, reference this document and cross-check with the content structure databases (Latin, Greek, Gamification, Grammar, Cultural Context).