# Section Component

A reusable section component with consistent spacing and typography.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `kicker` | `string` | Small text that appears above the title |
| `title` | `string` | Main heading with text-balance applied |
| `eyebrow` | `string` | Small uppercase label above other content |
| `description` | `string` | Subdued description text in text-ink/70 |
| `children` | `ReactNode` | Custom content to render below the description |
| `className` | `string` | Additional CSS classes for the section |

## Features

- **Text Balance**: Title uses `text-balance` for better typography
- **Consistent Spacing**: Uses consistent margin utilities throughout
- **Responsive**: Responsive text sizing (3xl → 4xl → 5xl)
- **Theme Aware**: Uses custom theme colors (text-ink, text-ink/70)
- **Container**: Uses custom `.container` utility with max-w-6xl and px-4

## Examples

### Basic Section
```tsx
<Section
  title="Welcome to Our App"
  description="This is a description of what our app does."
>
  <div>Custom content goes here</div>
</Section>
```

### Section with All Props
```tsx
<Section
  eyebrow="Features"
  kicker="Everything you need"
  title="Powerful Development Tools"
  description="Our carefully selected stack provides everything you need."
>
  <div className="grid grid-cols-3 gap-4">
    {/* Feature cards */}
  </div>
</Section>
```

### Section with Just Title
```tsx
<Section title="Simple Section">
  <p>Content without description</p>
</Section>
```

## Styling

The component uses:
- `py-16` for vertical padding
- Custom `.container` utility for max-width and horizontal padding
- `max-w-3xl` for content width
- Responsive text sizing with `text-3xl sm:text-4xl lg:text-5xl`
- Theme colors: `text-ink` and `text-ink/70`
