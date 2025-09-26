# Feature Sliced Design Architecture

This document describes the Feature Sliced Design (FSD) architecture implementation for the ClothHub project. FSD is a methodology for organizing frontend code that promotes maintainability, scalability, and team collaboration.

## Architecture Overview

The project follows FSD layers organized from bottom to top:

```
src/
├── shared/          # Shared resources across the application
├── entities/        # Business entities 
├── features/        # User interactions and business features
├── widgets/         # Complex UI blocks
└── app/            # Application layer (Next.js pages, layouts)
```

## Layer Details

### 🔧 Shared Layer (`/src/shared/`)

Contains reusable utilities, UI components, and common resources that can be used throughout the application without any business logic dependencies.

**Structure:**
```
shared/
├── ui/              # Basic UI components
│   ├── Button.tsx   # Button component with variants
│   ├── Card.tsx     # Card component system
│   ├── Input.tsx    # Form input component
│   ├── Badge.tsx    # Status indicator component
│   └── index.ts     # Barrel export
└── index.ts         # Main shared exports
```

**Components:**
- **Button**: Multi-variant button (primary, secondary, outline, ghost, danger)
- **Card**: Flexible card system with composable parts
- **Input**: Form input with validation states
- **Badge**: Status indicators with color variants

### 🏢 Entities Layer (`/src/entities/`)

Contains business entities that represent domain models and their associated components.

**Structure:**
```
entities/
└── product/         # Product business entity
    ├── ProductCard.tsx     # Product display component
    ├── ProductFilter.tsx   # Product filtering component  
    └── index.ts           # Product entity exports
```

**Components:**
- **ProductCard**: Complete product display with pricing, ratings, stock status
- **ProductFilter**: Advanced filtering system with collapsible sections

### ⚡ Features Layer (`/src/features/`)

Contains user interactions and business features that implement specific functionality.

**Structure:**
```
features/
└── cart/            # Shopping cart feature
    ├── CartItem.tsx # Cart item management component
    └── index.ts     # Cart feature exports
```

**Components:**
- **CartItem**: Complete cart item with quantity controls, favorites, remove functionality

### 🧩 Widgets Layer (`/src/widgets/`)

Contains complex UI blocks that combine multiple features and entities.

**Structure:**
```
widgets/
├── header/          # Header widget
│   ├── Header.tsx   # Navigation header component
│   └── index.ts     # Header exports
└── footer/          # Footer widget
    ├── Footer.tsx   # Footer component
    └── index.ts     # Footer exports
```

**Components:**
- **Header**: Navigation with search, cart, user menu, mobile responsive
- **Footer**: Comprehensive footer with links, newsletter, social media

## Import Rules

FSD enforces strict import rules to maintain architecture integrity:

1. **Shared** can be imported by any layer
2. **Entities** can import from **Shared**
3. **Features** can import from **Entities** and **Shared**
4. **Widgets** can import from **Features**, **Entities**, and **Shared**
5. **App** can import from any layer

## Usage Examples

### Importing Shared Components
```tsx
import { Button, Card, Badge } from '@/shared/ui';
```

### Importing Business Entities
```tsx
import { ProductCard, ProductFilter } from '@/entities/product';
```

### Importing Features
```tsx
import { CartItem } from '@/features/cart';
```

### Importing Widgets
```tsx
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
```

## Benefits of FSD Architecture

1. **Clear Separation of Concerns**: Each layer has a specific responsibility
2. **Scalability**: Easy to add new features without breaking existing code
3. **Reusability**: Shared components can be used across different features
4. **Maintainability**: Clear structure makes code easier to understand and modify
5. **Team Collaboration**: Different teams can work on different layers independently
6. **Testing**: Each layer can be tested in isolation

## Migration from Component-Based Structure

The migration from the original component-based structure involved:

1. Moving UI components to `shared/ui/`
2. Moving product-related components to `entities/product/`
3. Moving cart functionality to `features/cart/`
4. Moving layout components to appropriate widgets
5. Updating all import paths to use the new structure
6. Creating proper barrel exports for each layer

The functionality remains exactly the same, only the organization has improved for better maintainability and scalability.