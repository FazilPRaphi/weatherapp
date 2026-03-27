# Design System & Theme Configuration

## 🎨 Design Philosophy

### Core Design Principles
- **Youth:** Modern, trendy, and vibrant aesthetics that appeal to younger demographics
- **Energising:** Vibrant colors, dynamic animations, and bold typography that create excitement
- **Refreshing:** Clean layouts, whitespace, smooth interactions, and an airy feel

### Design Approach
The weather app combines a **professional weather service** with a **playful, energetic interface** that feels fresh and modern. Every interaction should feel smooth and delightful, encouraging users to check the weather frequently.

---

## Color Palette

### Primary Colors
```javascript
colors: {
  primary: {
    darkBlue: '#003D82',      // Professional, grounding
    lightBlue: '#00B4DB',     // Energising, refreshing, vibrant
    white: '#FFFFFF',         // Clean, airy, minimal
  },
  secondary: {
    lightGray: '#F5F5F5',     // Breathing room, lightness
    mediumGray: '#E0E0E0',
    darkGray: '#757575',
    charcoal: '#212121',      // For contrast and depth
  },
  accent: {
    vibrantGreen: '#10B981',  // Energy & growth
    vibrantPurple: '#A855F7', // Playfulness (alerts/highlights)
    warmOrange: '#F59E0B',    // Warmth & enthusiasm
  },
  semantic: {
    success: '#10B981',       // Positive, energising
    warning: '#F59E0B',       // Warm, attention-getting
    error: '#EF4444',         // Clear, energetic
    info: '#06B6D4',          // Cool, refreshing
  }
}
```

### Color Psychology Applied
- **Light Blue (#00B4DB):** Primary energiser - used for CTAs and highlights
- **White (#FFFFFF):** Creates breathing room and minimalist feel
- **Accent Greens/Purples:** Youth-oriented, modern, trending
- **Vibrant secondary colors:** Used sparingly for notifications and special states

### Gradient Definitions

#### Button Gradient (Primary CTA)
```javascript
buttonGradient: {
  colors: ['#003D82', '#00B4DB'],  // Dark Blue → Light Blue
  start: { x: 0, y: 0 },           // Top-left
  end: { x: 1, y: 1 },             // Bottom-right
  locations: [0, 1],
}
```

#### Card Gradient (Subtle)
```javascript
cardGradient: {
  colors: ['#FFFFFF', '#F5F5F5'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}
```

#### Overlay Gradient (For Images)
```javascript
overlayGradient: {
  colors: ['rgba(0, 61, 130, 0.7)', 'rgba(0, 180, 219, 0.3)'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}
```

---

## Typography System

### Font Family
**Primary:** Poppins
- Available weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Installation: `npm install react-native-fonts` or use Google Fonts
- **Why Poppins?** Modern, rounded, friendly, and energetic - perfect for youth-oriented apps

### Design Personality
- **Bold headings** (SemiBold/Bold) for impact and energy
- **Variable font weights** create visual hierarchy and excitement
- **Generous line-height** for breathing room and freshness
- **Letter-spacing** on headings adds premium feel
```javascript
typography: {
  // Display Sizes
  display1: {
    fontSize: 32,
    fontWeight: '700',    // Bold
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  display2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  
  // Heading Sizes
  h1: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',    // SemiBold
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  
  // Body Sizes
  body1: {
    fontSize: 16,
    fontWeight: '500',    // Medium
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',    // Regular
    lineHeight: 20,
  },
  
  // Subtitle Sizes
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },
  
  // Caption Sizes
  caption1: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
  
  // Button Text
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
}
```

---

## Spacing System

Base unit: 4px

```javascript
spacing: {
  xs: 4,      // 4px
  sm: 8,      // 8px
  md: 12,     // 12px
  lg: 16,     // 16px
  xl: 20,     // 20px
  xxl: 24,    // 24px
  xxxl: 32,   // 32px
  huge: 40,   // 40px
}
```

### Usage in Margins/Paddings
- Horizontal padding: 16px (lg)
- Vertical padding: 12px (md) for cards
- Card margin: 8px (sm) to 12px (md)
- Screen padding: 16px (lg)
- Component gap: 8px-12px

---

## Shadows

```javascript
shadows: {
  sm: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  md: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  xl: {
    elevation: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
}
```

---

## Border Radius

```javascript
borderRadius: {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
}
```

### Usage
- Buttons: 12px (lg)
- Cards: 8px (md)
- Input fields: 8px (md)
- Modals: 12px (lg)
- Avatars: 999px (full/circular)

---

## Component Specifications

### Buttons

#### Primary Button (CTA)
```javascript
{
  height: 48,
  borderRadius: 12,
  gradient: buttonGradient,  // #003D82 → #00B4DB (energising)
  paddingHorizontal: 24,
  fontSize: 14,
  fontWeight: '600',
  textColor: '#FFFFFF',
  shadow: shadows.md,
  // Interactions
  activeScale: 0.95,         // Press feedback
  activeOpacity: 0.9,
  animation: 'spring',       // Bouncy, energetic response
}
```
**Design:** Bold gradient communicates energy and action. Smooth animations make interactions feel deli...existing code...

#### Secondary Button
```javascript
{
  height: 48,
  borderRadius: 12,
  backgroundColor: '#F5F5F5',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  paddingHorizontal: 24,
  fontSize: 14,
  fontWeight: '600',
  textColor: '#003D82',
}
```

#### Text Button
```javascript
{
  height: 44,
  paddingHorizontal: 12,
  fontSize: 14,
  fontWeight: '600',
  textColor: '#00B4DB',
  backgroundColor: 'transparent',
}
```

### Cards

```javascript
{
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  padding: 12,
  marginVertical: 8,
  marginHorizontal: 16,
  shadow: shadows.sm,
  borderColor: '#E0E0E0',
  borderWidth: 1,
}
```

### Input Fields

```javascript
{
  height: 48,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  placeholderTextColor: '#BDBDBD',
  focusBorderColor: '#00B4DB',
}
```

### Weather Display Card

```javascript
{
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  padding: 16,
  marginVertical: 12,
  marginHorizontal: 16,
  shadow: shadows.md,
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#003D82',
  },
  condition: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  icon: {
    size: 64,
    color: '#00B4DB',
  },
}
```

---

## Light & Dark Mode Support

### Light Mode (Default)
```javascript
lightTheme: {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#BDBDBD',
  },
  border: '#E0E0E0',
}
```

### Dark Mode (Optional Future Implementation)
```javascript
darkTheme: {
  background: '#121212',
  surface: '#1E1E1E',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    tertiary: '#808080',
  },
  border: '#2C2C2C',
}
```

---

## Responsive Design

### Screen Breakpoints
```javascript
breakpoints: {
  xs: 320,    // Small phones
  sm: 375,    // iPhone SE
  md: 414,    // Medium phones
  lg: 480,    // Large phones
  xl: 768,    // Tablets
}
```

### Scaling Guidelines
- **Cards width:** min(100% - 32px, 500px)
- **Button width:** 100% on small screens, max 300px on large
- **Typography:** Scale by 1.1x on tablets
- **Spacing:** Increase by 20% on tablets

---

## Animation Specifications

### Design Philosophy
Animations should feel **smooth, delightful, and energising** - never sluggish or boring.

```javascript
animations: {
  durations: {
    fast: 200,      // ms - Quick, snappy feedback
    normal: 300,    // ms - Smooth, energetic transitions
    slow: 500,      // ms - Thoughtful reveals
  },
  timingFunctions: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
    spring: 'spring', // Bouncy, playful feel
  },
}
```

### Common Animations
- **Screen transitions:** 300ms cubic-bezier (energetic slide)
- **Button press:** 200ms spring (bouncy confirmation)
- **Loading spinner:** 1000ms linear continuous (constant energy)
- **Card entry:** 300ms ease-out with scale (delightful appearance)
- **Modal overlay:** 300ms ease-out fade + scale (smooth, modern)
- **Weather icon updates:** 400ms spring rotate (playful updates)

### Micro-interactions
- **Pull-to-refresh:** Animated spinner with satisfying snap-back
- **Location toggle:** Smooth slide animation with glow effect
- **Favorite button:** Heart scale animation + haptic feedback
- **Forecast scroll:** Smooth momentum scroll with highlights

---

## Accessibility

- **Minimum touch target:** 48x48px
- **Color contrast ratio:** 4.5:1 for normal text, 3:1 for large text
- **Font minimum size:** 12px body, 14px buttons
- **Spacing between interactive elements:** 8px minimum

---

## Visual Design Principles

### Whitespace & Breathing Room (Refreshing)
- Generous padding and margins throughout
- Minimum 16px padding on screens
- Cards have 12px internal padding minimum
- Line-height increased for readability and lightness

### Contrast & Energy (Energising)
- Bold typography weights create visual hierarchy
- Vibrant light blue (#00B4DB) used as primary accent
- Dark blue background with white foreground creates clean separation
- Icons and illustrations use vibrant secondary colors

### Modern & Playful (Youth)
- Rounded corners (8-12px) instead of sharp edges
- Gradient buttons instead of flat colors
- Vibrant accent colors (purples, greens) for secondary actions
- Smooth animations and micro-interactions throughout
- Poppins rounded typeface reinforces friendliness

### Key Visual Elements
1. **Hero Section:** Large temperature display with animated weather icon
2. **Cards:** Minimal white cards with subtle shadows (clean)
3. **Gradient Buttons:** Eye-catching CTAs (energetic)
4. **Icons:** Vibrant, animated weather icons (playful)
5. **Empty States:** Friendly illustrations and encouraging messages

---



```
src/styles/
├── colors.js           # Color palette
├── typography.js       # Font sizes & families
├── spacing.js          # Spacing scale
├── shadows.js          # Shadow definitions
├── gradients.js        # Gradient definitions
├── borderRadius.js     # Border radius scale
├── globalStyles.js     # Global stylesheet
└── themes.js           # Theme configurations
```

---

## Implementation Example

```javascript
// styles/colors.js
export const colors = {
  primary: {
    darkBlue: '#003D82',
    lightBlue: '#00B4DB',
    white: '#FFFFFF',
  },
  // ... more colors
};

// styles/gradients.js
import { colors } from './colors';

export const gradients = {
  button: {
    colors: [colors.primary.darkBlue, colors.primary.lightBlue],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

// Usage in Component
import LinearGradient from 'react-native-linear-gradient';
import { gradients } from '@styles/gradients';

const Button = () => (
  <LinearGradient
    colors={gradients.button.colors}
    start={gradients.button.start}
    end={gradients.button.end}
    style={styles.button}
  >
    <Text>Press Me</Text>
  </LinearGradient>
);
```

