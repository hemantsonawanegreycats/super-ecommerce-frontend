# Super-E: Production-Grade Frontend Architecture
### Shopify-Level Multi-Platform Commerce System

> **Stack**: Next.js 14 App Router · TypeScript · TailwindCSS v4 · shadcn/ui · Zustand · TanStack Query · Framer Motion · Zod
> **Platforms**: Single-Vendor Store · Multi-Vendor Marketplace · Stay & Experience Booking

---

## 1. USER ROLES & PERMISSIONS

### Role Matrix

| Permission | Super Admin | Admin | Vendor | Customer | Guest |
|---|---|---|---|---|---|
| Platform config | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage all vendors | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage own store | ✅ | ✅ | ✅ | ❌ | ❌ |
| Financial payouts | ✅ | ✅ | own only | ❌ | ❌ |
| Resolve disputes | ✅ | ✅ | ❌ | ❌ | ❌ |
| Browse & purchase | ✅ | ✅ | ✅ | ✅ | browse only |
| Write reviews | ✅ | ✅ | ✅ | ✅ | ❌ |
| Book stays | ✅ | ✅ | ✅ | ✅ | ❌ |

### Role Definitions

#### 🔴 Super Admin
- **Permissions**: Full platform control — tenant management, global settings, financial overrides, theme system access, AI config, audit log access
- **Routes**: `/admin/**`, `/super-admin/**`, all storefront routes
- **UI Differences**: Hidden "Super Admin" badge on nav, platform-level analytics visible, can impersonate any role
- **Edge**: Cannot be deleted; must reassign before account deactivation

#### 🟠 Admin (Internal Team)
- **Permissions**: Vendor approval/rejection, order moderation, dispute resolution, analytics, comms — cannot touch platform billing/infra
- **Routes**: `/admin/**`, read-only on `/super-admin/billing`
- **UI Differences**: Warning banner when in impersonation mode; no destructive platform actions
- **Edge**: 2FA mandatory; sessions expire in 8hrs

#### 🟡 Vendor (Single + Marketplace)
- **Permissions**: Own store CRUD, own products/services, own orders, own earnings, own reviews
- **Routes**: `/vendor/[vendorId]/**` — scoped by JWT `vendorId` claim
- **UI Differences**: Onboarding wizard on first login; approval pending banner until verified
- **Edge**: Suspended vendors see read-only dashboard with suspension reason; cannot add products while suspended

#### 🟢 Customer (Buyer)
- **Permissions**: Browse, cart, checkout, order history, reviews (purchased items only), wishlist, booking
- **Routes**: `/account/**`, all public routes
- **UI Differences**: Personalized homepage, saved addresses, loyalty points visible
- **Edge**: Guest checkout allowed; account merge on signup post-checkout

#### ⚪ Guest (Unauthenticated)
- **Permissions**: Browse all public pages, search, view products, add to cart (session-based), view pricing
- **Routes**: All `/` storefront routes; redirected from `/account`, `/checkout` (past address step)
- **UI Differences**: "Sign in to save wishlist" nudges; cart persists via localStorage
- **Edge**: Cart survives signup via session token merge

---

## 2. COMPLETE PAGE INVENTORY

### Auth Pages (`/auth/`)

| Page | Path | Notes |
|---|---|---|
| Login | `/auth/login` | Email/password + OAuth (Google, Apple) |
| Signup | `/auth/signup` | With role selection (Customer / Vendor) |
| OTP Verify | `/auth/otp` | SMS + email dual channel |
| 2FA Setup | `/auth/2fa/setup` | TOTP (Authenticator app) + backup codes |
| 2FA Challenge | `/auth/2fa/verify` | Login gate |
| Forgot Password | `/auth/forgot-password` | Email input |
| Reset Password | `/auth/reset-password` | Token-gated, zxcvbn strength meter |
| Magic Link | `/auth/magic-link` | Passwordless entry point |

### Super Admin Panel (`/super-admin/`)
| Page | Path |
|---|---|
| Platform Overview | `/super-admin` |
| Tenant Management | `/super-admin/tenants` |
| Global Settings | `/super-admin/settings` |
| Billing & Plans | `/super-admin/billing` |
| Audit Logs | `/super-admin/audit-logs` |
| Feature Flags | `/super-admin/feature-flags` |
| AI Config | `/super-admin/ai` |

### Admin Panel (`/admin/`)
| Page | Path |
|---|---|
| Dashboard | `/admin` |
| Vendor Management | `/admin/vendors` · `/admin/vendors/[id]` · `/admin/vendors/[id]/approve` |
| Store Management | `/admin/stores` · `/admin/stores/[id]` |
| All Orders | `/admin/orders` · `/admin/orders/[id]` |
| All Bookings | `/admin/bookings` · `/admin/bookings/[id]` |
| Disputes | `/admin/disputes` · `/admin/disputes/[id]` |
| Content Moderation | `/admin/moderation` |
| Analytics | `/admin/analytics` |
| Financial Overview | `/admin/finance` · `/admin/finance/payouts` · `/admin/finance/refunds` |
| Customers | `/admin/customers` · `/admin/customers/[id]` |
| Categories & Tags | `/admin/catalog/categories` · `/admin/catalog/tags` |
| Coupons | `/admin/marketing/coupons` |
| Notifications | `/admin/notifications` |
| Settings | `/admin/settings` |

### Vendor Dashboard (`/vendor/`)
| Page | Path |
|---|---|
| Onboarding Wizard | `/vendor/onboarding` (steps 1–5) |
| Dashboard | `/vendor/dashboard` |
| Products | `/vendor/products` · `/vendor/products/new` · `/vendor/products/[id]` |
| Services | `/vendor/services` · `/vendor/services/new` · `/vendor/services/[id]` |
| Inventory | `/vendor/inventory` |
| Orders | `/vendor/orders` · `/vendor/orders/[id]` |
| Bookings | `/vendor/bookings` · `/vendor/bookings/[id]` |
| Calendar | `/vendor/calendar` |
| Earnings | `/vendor/earnings` |
| Payouts | `/vendor/payouts` |
| Reviews | `/vendor/reviews` |
| Discounts | `/vendor/discounts` · `/vendor/discounts/new` |
| Campaigns | `/vendor/marketing/campaigns` |
| Store Customizer | `/vendor/store/customize` |
| Store Settings | `/vendor/store/settings` |
| Account Settings | `/vendor/settings` |

### Storefront (Customer-facing, dynamic per tenant)
| Page | Path |
|---|---|
| Homepage | `/` |
| Collection | `/collections/[slug]` |
| Product Detail | `/products/[slug]` |
| Search | `/search?q=...&filters=...` |
| Cart | `/cart` |
| Checkout – Address | `/checkout/address` |
| Checkout – Shipping | `/checkout/shipping` |
| Checkout – Payment | `/checkout/payment` |
| Checkout – Review | `/checkout/review` |
| Order Confirmation | `/checkout/success/[orderId]` |
| Stay Listing | `/stays` |
| Stay Detail | `/stays/[slug]` |
| Experience Listing | `/experiences` |
| Experience Detail | `/experiences/[slug]` |
| Booking – Date Select | `/book/[slug]/dates` |
| Booking – Guest Details | `/book/[slug]/details` |
| Booking – Payment | `/book/[slug]/payment` |
| Booking Confirmation | `/book/success/[bookingId]` |
| Wishlist | `/wishlist` |
| Vendors (marketplace) | `/vendors` · `/vendors/[slug]` |

### Account & Settings (`/account/`)
| Page | Path |
|---|---|
| Profile | `/account/profile` |
| Order History | `/account/orders` · `/account/orders/[id]` |
| Bookings | `/account/bookings` · `/account/bookings/[id]` |
| Wishlist | `/account/wishlist` |
| Addresses | `/account/addresses` |
| Billing | `/account/billing` |
| Notifications | `/account/notifications` |
| Security | `/account/security` |
| Loyalty & Rewards | `/account/rewards` |

### System Pages
| Page | Path |
|---|---|
| 404 Not Found | `not-found.tsx` (App Router) |
| 500 Error | `error.tsx` (App Router) |
| Maintenance | `/maintenance` |
| Loading Skeleton | `loading.tsx` per segment |
| Offline | `/offline` |
| Terms of Service | `/legal/terms` |
| Privacy Policy | `/legal/privacy` |
| Sitemap | `/sitemap.xml` (generated) |

---

## 3. END-TO-END USER FLOWS

### Flow 1: Guest Browse → Signup → Purchase
```
1. Guest lands on / (homepage)
2. Browses via HeroSection → FeaturedCollections → ProductGrid
3. Clicks product → /products/[slug]
4. Adds to cart → CartDrawer opens (localStorage cart)
5. Clicks "Checkout" → redirected to /auth/login?redirect=/checkout/address
6. Signs up via /auth/signup (or Google OAuth)
7. Email OTP verification (/auth/otp)
8. Redirected to /checkout/address (cart merged from session)
9. Checkout: Address → Shipping → Payment → Review → Submit
10. POST /orders → order created
11. Redirect to /checkout/success/[orderId]
12. Email confirmation sent
13. Order visible in /account/orders
```

### Flow 2: Customer Search → Cart → Checkout
```
1. Types in GlobalSearch (cmd+k or navbar)
2. SearchModal shows instant results (debounced, 300ms)
3. Applies filters (price, rating, availability) → /search?q=...
4. Selects product → PDPPage
5. Selects variant (size/color) → price & availability updates
6. "Add to Cart" → optimistic cart update (Zustand + server sync)
7. CartDrawer: upsell suggestions, coupon field
8. /checkout/address → address autocomplete (Google Places API)
9. /checkout/shipping → ShippingRateSelector (real-time rates)
10. /checkout/payment → StripeElements embedded
11. /checkout/review → full order summary
12. Payment processing → loading state with animated indicator
13. Success or failure handling
```

### Flow 3: Booking Flow (Stay/Experience)
```
1. Browse /stays → filter by location, dates, guests
2. Map view + list view toggle
3. Click stay → /stays/[slug] (full details, photo gallery, reviews)
4. AvailabilityCalendar → select check-in/check-out dates
5. GuestSelector → adults/children/infants
6. Dynamic pricing recalculates: base + fees + taxes shown live
7. "Reserve" → /book/[slug]/dates (confirmation of dates)
8. /book/[slug]/details → guest info, special requests
9. /book/[slug]/payment → payment method selection
10. Booking summary with cancellation policy visible
11. Confirm → POST /bookings
12. /book/success/[bookingId] → booking card + calendar invite download
13. Vendor notified via real-time WebSocket
```

### Flow 4: Vendor Onboarding → First Product → Receive Order
```
1. Vendor signs up → role: vendor
2. Email verification → redirected to /vendor/onboarding
3. Step 1: Business Info (name, type, tax ID)
4. Step 2: Store Branding (logo, banner, colors)
5. Step 3: Banking Details (payout account)
6. Step 4: Add First Product (guided + skip option)
7. Step 5: Review & Submit for Approval
8. Admin receives notification → /admin/vendors/[id]/approve
9. Admin approves → vendor gets email + in-app notification
10. Vendor lands on /vendor/dashboard (active store)
11. Adds products via /vendor/products/new
12. Customer places order → vendor receives real-time notification
13. Vendor views order in /vendor/orders/[id]
14. Vendor marks as fulfilled → customer notified
```

### Flow 5: Admin Dispute Resolution
```
1. Customer opens dispute from /account/orders/[id]
2. Dispute form: reason, evidence (file upload), description
3. Admin receives notification → /admin/disputes
4. Admin opens dispute: /admin/disputes/[id]
5. Views timeline: customer complaint, vendor response, evidence
6. Admin can: request more info, issue refund, side with vendor
7. Decision recorded with reason → both parties notified
8. Refund processed (Stripe reversal) or case closed
9. Audit log entry created
```

---

## 4. FRONTEND ARCHITECTURE

### Next.js App Router Project Structure

```
apps/
├── web/                          # Main Next.js App
│   ├── app/
│   │   ├── (auth)/               # Auth route group (no layout)
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── ...
│   │   ├── (storefront)/         # Public-facing storefront
│   │   │   ├── layout.tsx        # StorefrontLayout (navbar, footer)
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── products/
│   │   │   ├── collections/
│   │   │   ├── stays/
│   │   │   ├── experiences/
│   │   │   ├── search/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── (account)/            # Authenticated customer area
│   │   │   ├── layout.tsx
│   │   │   └── account/
│   │   ├── (booking)/            # Booking flow group
│   │   │   └── book/
│   │   ├── admin/                # Admin panel
│   │   │   ├── layout.tsx        # AdminShell (sidebar)
│   │   │   └── ...
│   │   ├── vendor/               # Vendor dashboard
│   │   │   ├── layout.tsx        # VendorShell
│   │   │   └── ...
│   │   ├── super-admin/          # Super admin only
│   │   ├── api/                  # Route Handlers (BFF layer)
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── revalidate/
│   │   │   └── webhooks/
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── layout.tsx            # Root layout (providers)
│   ├── components/
│   │   ├── ui/                   # Base design system (shadcn)
│   │   ├── layout/               # Shell, Sidebar, Navbar, Footer
│   │   ├── forms/                # Form primitives + validators
│   │   ├── data-display/         # Tables, Cards, Stats
│   │   ├── feedback/             # Toast, Alert, Skeleton, Empty
│   │   └── composite/            # Multi-part feature components
│   ├── features/                 # Feature slices
│   │   ├── auth/
│   │   ├── catalog/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── booking/
│   │   ├── vendor/
│   │   ├── admin/
│   │   ├── search/
│   │   ├── reviews/
│   │   └── page-builder/
│   ├── lib/
│   │   ├── api/                  # API client (fetchers + types)
│   │   ├── auth/                 # Auth helpers, session utils
│   │   ├── hooks/                # Shared custom hooks
│   │   ├── stores/               # Zustand stores
│   │   ├── utils/                # Pure utility functions
│   │   ├── validators/           # Zod schemas
│   │   └── constants/
│   ├── middleware.ts             # Edge middleware (auth + routing)
│   ├── next.config.ts
│   └── tailwind.config.ts
├── packages/
│   ├── ui/                       # Shared component library (Storybook)
│   ├── api-client/               # Generated API client (OpenAPI)
│   ├── typescript-config/        # Shared tsconfig
│   └── eslint-config/            # Shared lint rules
```

### Feature Slice Structure (example: `features/cart/`)
```
features/cart/
├── components/
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── CartEmpty.tsx
├── hooks/
│   ├── useCart.ts
│   └── useCartSync.ts
├── queries/
│   └── cart.queries.ts           # TanStack Query definitions
├── store/
│   └── cart.store.ts             # Zustand slice
├── types/
│   └── cart.types.ts
└── index.ts                      # Public API of feature
```

---

## 5. ROUTING SYSTEM

### Middleware Architecture (`middleware.ts`)

```typescript
// middleware.ts — runs at Edge Runtime
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ROLE_ROUTES = {
  'super-admin': ['/super-admin', '/admin'],
  admin: ['/admin'],
  vendor: ['/vendor'],
  customer: ['/account', '/checkout'],
} as const;

const PUBLIC_ROUTES = ['/', '/auth', '/products', '/collections', 
  '/stays', '/experiences', '/search', '/vendors', '/cart', '/legal'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  // Maintenance mode
  if (process.env.MAINTENANCE_MODE === 'true' && path !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', req.url));
  }

  // Protected route check
  const isPublicPath = PUBLIC_ROUTES.some(r => path.startsWith(r));
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${encodeURIComponent(path)}`, req.url)
    );
  }

  // Role-based route protection
  for (const [role, routes] of Object.entries(ROLE_ROUTES)) {
    const isProtectedRoute = routes.some(r => path.startsWith(r));
    if (isProtectedRoute && !hasRole(token?.role, role)) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  // Tenant resolution (multi-vendor): inject store context headers
  const storeSlug = req.headers.get('host')?.split('.')[0];
  const response = NextResponse.next();
  response.headers.set('x-store-slug', storeSlug ?? 'default');
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
```

### Route Groups Summary

| Group | Layout | Auth | Roles |
|---|---|---|---|
| `(auth)` | Minimal | None | All |
| `(storefront)` | NavBar + Footer | Optional | All |
| `(account)` | Account shell | Required | Customer+ |
| `(booking)` | Booking stepper | Required | Customer+ |
| `admin` | Admin sidebar shell | Required | Admin+ |
| `vendor` | Vendor sidebar shell | Required | Vendor+ |
| `super-admin` | Super Admin shell | Required | Super Admin |

---

## 6. DESIGN SYSTEM

### Typography Scale (Geist Variable Font)

```typescript
// design-tokens.ts
export const typography = {
  // Display — Hero headings
  'display-2xl': ['4.5rem', { lineHeight: '5.625rem', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-xl':  ['3.75rem', { lineHeight: '4.5rem',  letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-lg':  ['3rem',    { lineHeight: '3.75rem', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-md':  ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em', fontWeight: '600' }],
  'display-sm':  ['1.875rem',{ lineHeight: '2.375rem',letterSpacing: '-0.01em', fontWeight: '600' }],
  // Text — Body copy
  'text-xl':     ['1.25rem', { lineHeight: '1.875rem', fontWeight: '400' }],
  'text-lg':     ['1.125rem',{ lineHeight: '1.75rem',  fontWeight: '400' }],
  'text-md':     ['1rem',    { lineHeight: '1.5rem',   fontWeight: '400' }],
  'text-sm':     ['0.875rem',{ lineHeight: '1.25rem',  fontWeight: '400' }],
  'text-xs':     ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400' }],
} as const;
```

### 8px Spacing System

```typescript
export const spacing = {
  0: '0px',     1: '4px',     2: '8px',    3: '12px',
  4: '16px',    5: '20px',    6: '24px',   7: '28px',
  8: '32px',    10: '40px',   12: '48px',  14: '56px',
  16: '64px',   20: '80px',   24: '96px',  32: '128px',
} as const;
```

### Color Tokens (Light / Dark)

```typescript
// CSS custom properties — generated by design-tokens build
export const colorTokens = {
  // Brand
  'brand-primary':    { light: 'hsl(222, 89%, 55%)',  dark: 'hsl(217, 91%, 68%)' },
  'brand-secondary':  { light: 'hsl(262, 80%, 58%)',  dark: 'hsl(262, 80%, 70%)' },
  'brand-accent':     { light: 'hsl(25, 95%, 60%)',   dark: 'hsl(25, 95%, 68%)'  },
  // Semantic
  'success':          { light: 'hsl(142, 69%, 38%)',  dark: 'hsl(142, 69%, 58%)' },
  'warning':          { light: 'hsl(38, 92%, 50%)',   dark: 'hsl(38, 92%, 65%)'  },
  'error':            { light: 'hsl(4, 86%, 54%)',    dark: 'hsl(4, 86%, 66%)'   },
  'info':             { light: 'hsl(200, 98%, 39%)',  dark: 'hsl(200, 98%, 58%)' },
  // Surface
  'surface-base':     { light: 'hsl(0, 0%, 100%)',   dark: 'hsl(220, 13%, 8%)'  },
  'surface-raised':   { light: 'hsl(220, 14%, 98%)', dark: 'hsl(220, 13%, 12%)' },
  'surface-overlay':  { light: 'hsl(220, 14%, 95%)', dark: 'hsl(220, 13%, 16%)' },
  // Text
  'text-primary':     { light: 'hsl(220, 13%, 9%)',  dark: 'hsl(0, 0%, 97%)'    },
  'text-secondary':   { light: 'hsl(220, 9%, 38%)',  dark: 'hsl(220, 9%, 65%)'  },
  'text-tertiary':    { light: 'hsl(220, 9%, 56%)',  dark: 'hsl(220, 9%, 48%)'  },
  'text-disabled':    { light: 'hsl(220, 9%, 75%)',  dark: 'hsl(220, 9%, 32%)'  },
  // Border
  'border-default':   { light: 'hsl(220, 13%, 90%)', dark: 'hsl(220, 13%, 20%)' },
  'border-strong':    { light: 'hsl(220, 13%, 80%)', dark: 'hsl(220, 13%, 28%)' },
} as const;
```

### Elevation & Shadows

```css
/* In globals.css */
--shadow-xs:   0px 1px 2px rgba(16, 24, 40, 0.05);
--shadow-sm:   0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06);
--shadow-md:   0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
--shadow-lg:   0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
--shadow-xl:   0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
--shadow-2xl:  0px 24px 48px -12px rgba(16, 24, 40, 0.18);
--shadow-3xl:  0px 32px 64px -12px rgba(16, 24, 40, 0.14);
```

### Motion System

```typescript
// lib/motion.ts
export const transitions = {
  instant:   { duration: 0.1, ease: 'easeOut' },
  fast:      { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] },  // easeOutCubic
  normal:    { duration: 0.25, ease: [0.0, 0.0, 0.2, 1] },
  slow:      { duration: 0.4,  ease: [0.0, 0.0, 0.2, 1] },
  spring:    { type: 'spring', stiffness: 300, damping: 30 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 20 },
} as const;

export const variants = {
  fadeIn:     { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp:    { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
  slideRight: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
  scaleIn:    { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  stagger:    { visible: { transition: { staggerChildren: 0.06 } } },
} as const;
```

---

## 7. COMPONENT SYSTEM

### Layout Components

#### `AdminShell`
```tsx
// Persistent sidebar + header + main content area
<AdminShell>
  <Sidebar>
    <SidebarLogo />
    <SidebarNav items={adminNavItems} />    {/* role-filtered */}
    <SidebarUserMenu />
  </Sidebar>
  <main>
    <TopBar>
      <Breadcrumb />
      <GlobalSearch />
      <NotificationBell count={unreadCount} />
      <UserAvatar />
    </TopBar>
    <div className="page-content">{children}</div>
  </main>
</AdminShell>
```

#### Storefront `Navbar`
```tsx
<Navbar>
  <NavLogo />
  <NavLinks>                          {/* desktop */}
    {categories.map(c => <MegaMenu key={c.id} category={c} />)}
  </NavLinks>
  <NavActions>
    <GlobalSearch trigger="icon" />
    <ThemeToggle />
    <WishlistIcon count={wishlistCount} />
    <CartIcon count={cartCount} />
    <UserMenu />
  </NavActions>
  <MobileMenuTrigger />               {/* mobile */}
</Navbar>
```

### Form System

```typescript
// Built on react-hook-form + zod
// components/forms/FormField.tsx

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
}

// All form fields share:
// - Consistent label + description + error positioning
// - Accessible id/aria-describedby wiring
// - Loading / disabled state handling
// - Character count (for textarea)
```

**Form Validation Pattern:**
```typescript
// Each form has its own zod schema
// validators/checkout.schema.ts
export const checkoutAddressSchema = z.object({
  fullName:    z.string().min(2),
  line1:       z.string().min(5),
  city:        z.string().min(2),
  state:       z.string().min(2),
  postalCode:  z.string().regex(/^\d{5,6}$/),
  country:     z.string().length(2),
  phone:       z.string().regex(/^\+[1-9]\d{7,14}$/),
});
```

### Table System

```tsx
// components/data-display/DataTable.tsx
// Built on @tanstack/react-table v8

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pagination?: PaginationState;
  sorting?: SortingState;
  filtering?: ColumnFiltersState;
  rowSelection?: RowSelectionState;
  isLoading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: TData) => void;
  toolbar?: ReactNode;          // Filter chips, search, bulk actions
}

// Features: virtual scrolling (TanStack Virtual), column resizing,
// sticky header, row selection with bulk actions, export to CSV
```

### Modal & Drawer System

```tsx
// All modals use Radix Dialog + Framer Motion
// Drawers use Radix Dialog with custom sheet animation

// Usage pattern:
const { open, close } = useModal('confirmDelete');

// State managed in Zustand modal store
// Support: confirmation, form, content, fullscreen modes
```

### Toast System

```typescript
// lib/toast.ts — wrapper over sonner
export const toast = {
  success: (msg: string, opts?) => sonner.success(msg, { ...defaultOpts, ...opts }),
  error:   (msg: string, opts?) => sonner.error(msg, { duration: 6000, ...opts }),
  info:    (msg: string, opts?) => sonner.info(msg, ...),
  warning: (msg: string, opts?) => sonner.warning(msg, ...),
  loading: (msg: string, opts?) => sonner.loading(msg, ...),  // → promise().then(resolve)
  promise: <T>(promise: Promise<T>, msgs: ToastMessages) => sonner.promise(promise, msgs),
};
```

### Skeleton Loaders

```tsx
// Every data-dependent component has a matching skeleton
// components/feedback/skeletons/

// Pattern: export from same file
export function ProductCard({ product }: Props) { ... }
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="aspect-square rounded-xl" />
      <Skeleton className="h-4 w-3/4 mt-3" />
      <Skeleton className="h-4 w-1/2 mt-1" />
    </div>
  );
}
```

---

## 8. STOREFRONT SYSTEM

### Homepage Structure (`/`)

```
<HomePage>
  <HeroSection>          // Full-bleed, video/image bg, CTA
  <AnnouncementBar>      // Promo strip (dismissible)
  <FeaturedCollections>  // Grid of category cards
  <TrendingProducts>     // Horizontal scroll, ProductCards
  <BannerAd>             // Midpage marketing banner
  <VendorShowcase>       // (Marketplace only) Top vendors
  <StayHighlights>       // (Booking platform) Featured stays
  <ReviewsStrip>         // Social proof carousel
  <NewsletterSection>    // Email capture
  <Footer>
```

### Product Detail Page (PDP)

```
<PDPPage>
  <Breadcrumb>
  <PDPGallery>           // Zoom, swipe, thumbnail strip, 360° if available
  <PDPInfo>
    <ProductTitle>
    <RatingBar>          // Stars + review count
    <PricingBlock>       // Price, compare-at, discount badge
    <VariantSelector>    // Color swatches, size buttons
    <QuantitySelector>
    <AddToCartButton>    // With optimistic update
    <BuyNowButton>
    <WishlistToggle>
    <ShippingEstimate>
    <ShareButton>
  <PDPTabs>              // Description | Specifications | Reviews | FAQ
  <UpsellSection>        // "Frequently bought together"
  <RelatedProducts>      // ML-powered recommendations
```

### Cart System

```typescript
// client-side cart (Zustand) + server-side cart (synced via API)
interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  subtotal: number;
  discount: number;
  estimatedTax: number;
  shipping: number;
  total: number;
  
  addItem: (product: Product, variant: Variant, qty: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  applyCoupon: (code: string) => Promise<CouponResult>;
  clearCart: () => void;
  syncWithServer: () => Promise<void>;
}
```

### Checkout UX (Multi-Step)

```
Step 1: /checkout/address
  - AddressForm (react-hook-form + zod)
  - Google Places autocomplete
  - Saved addresses (logged-in users)
  - "Same as billing" toggle

Step 2: /checkout/shipping
  - Real-time shipping rate fetch
  - ShippingRateCard (carrier, ETA, price)
  - Express / Standard / Economy options

Step 3: /checkout/payment
  - Stripe Elements (card, UPI, wallets)
  - Saved payment methods
  - Apple Pay / Google Pay
  - Buy Now Pay Later (Klarna/Razorpay)

Step 4: /checkout/review
  - Full order summary
  - Editable sections (click to go back)
  - Final total breakdown
  - Place Order CTA

Progress: Sticky CheckoutStepper at top (desktop) / bottom (mobile)
```

---

## 8A. STOREFRONT CUSTOMIZATION SYSTEM

### Theme Architecture

```typescript
// lib/theme/types.ts
interface ThemeConfig {
  id: string;
  name: string;
  version: string;    // semver for rollback
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    baseFontSize: number;    // px, applied as root rem base
    fontScale: number;       // multiplier for type scale
  };
  spacing: {
    sectionGap: number;      // 8px grid units
    containerPadding: number;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  };
  mode: 'light' | 'dark' | 'system';
}

// Theme versions are stored: /vendor/store/themes/[themeId]/versions/[ver]
// Rollback: POST /api/vendor/store/themes/rollback { themeId, version }
```

### Page Builder (JSON Schema Architecture)

```typescript
// The page is a JSON document of sections and blocks
interface PageLayout {
  id: string;
  title: string;
  slug: string;
  sections: Section[];
  meta: SeoMeta;
}

interface Section {
  id: string;
  type: SectionType;   // 'hero' | 'product-grid' | 'banner' | 'text-image' | 'video' | 'reviews' | 'collections' | 'countdown'
  order: number;
  visible: boolean;
  blocks: Block[];
  settings: Record<string, unknown>;  // section-specific config
}

interface Block {
  id: string;
  type: BlockType;     // 'text' | 'image' | 'button' | 'video' | 'spacer' | 'icon'
  content: Record<string, unknown>;
  style?: Record<string, string>;
}
```

### Rendering Engine

```typescript
// features/page-builder/components/PageRenderer.tsx

const SECTION_REGISTRY: Record<SectionType, React.ComponentType<SectionProps>> = {
  'hero':          HeroSection,
  'product-grid':  ProductGridSection,
  'banner':        BannerSection,
  'text-image':    TextImageSection,
  'video':         VideoSection,
  'reviews':       ReviewsSection,
  'collections':   CollectionsSection,
  'countdown':     CountdownSection,
  'custom-html':   CustomHtmlSection,   // Super Admin only
};

export function PageRenderer({ layout }: { layout: PageLayout }) {
  return (
    <main>
      {layout.sections
        .filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => {
          const Component = SECTION_REGISTRY[section.type];
          return Component ? (
            <Component key={section.id} section={section} />
          ) : null;
        })}
    </main>
  );
}
```

### Store Customizer UX (`/vendor/store/customize`)

```
Layout:
  Left Panel (320px)  → Section tree + Block editor (accordion)
  Center Canvas       → Live preview (iframe or React render)
  Right Panel         → Property editor (color picker, font select, spacing)
  Top Bar             → Device preview toggle (Desktop/Tablet/Mobile)
               →  Undo / Redo (Ctrl+Z / Ctrl+Y) — backed by history stack
               → Save (draft) / Publish
               → Preview in new tab
               → Theme selector

Inline Editing:
  - Click any text block in canvas → contentEditable activates
  - Click any image → file picker opens
  - Drag section handle to reorder
  - "+" button between sections → Section picker modal

State: usePageBuilderStore (Zustand) with immer + temporal for undo history
```

---

## 9. BOOKING UI SYSTEM

### Calendar Component

```typescript
// features/booking/components/AvailabilityCalendar.tsx
interface AvailabilityCalendarProps {
  stayId: string;
  onRangeSelect: (range: DateRange) => void;
  minNights?: number;
  maxNights?: number;
}

// Internally uses:
// - react-day-picker for calendar UI
// - SWR or React Query for availability data (GET /stay/[id]/availability?month=YYYY-MM)
// - Blocked dates: strikethrough with red bg
// - Selected range: highlighted with brand color
// - Minimum night enforcement: grays out invalid end dates on hover
// - Pricing per night shown below each date (optional "price calendar" mode)
```

### Dynamic Pricing Display

```typescript
interface PricingBreakdown {
  baseRate: number;       // per night
  nights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;     // platform commission
  taxes: number;
  total: number;
  currency: string;
  discounts: PricingDiscount[];
}

// PricingPanel component shows live update as user selects dates
// Skeleton shown while fetching, smooth number animation on update (framer-motion)
```

### Booking Confirmation UX

```
BookingSuccessPage:
  - AnimatedCheckmark (Framer Motion draw animation)
  - BookingCard: dates, guests, stay name, total
  - HostContact: message button, host profile
  - MapPreview: Google Maps embed of property location
  - CalendarDownload: .ics file
  - CancellationPolicy: reminder
  - ShareButton
  - "Explore More Stays" CTA
```

---

## 10. STATE MANAGEMENT & DATA

### Zustand Stores (Global Client State)

```typescript
// lib/stores/index.ts
// Each store is module-level and persisted independently

// stores/auth.store.ts
interface AuthStore {
  user: User | null;
  token: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

// stores/cart.store.ts — see section 8

// stores/ui.store.ts
interface UIStore {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark' | 'system';
  setSidebarCollapsed: (v: boolean) => void;
  openModal: (id: string, props?: unknown) => void;
  closeModal: () => void;
  setTheme: (t: ThemeMode) => void;
}

// stores/notification.store.ts
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

// All stores use persist middleware for localStorage hydration
// zustand-persist with partialize to avoid persisting derived state
```

### TanStack Query (Server State)

```typescript
// Conventions:
// - Every query has a queryKey factory: lib/query-keys.ts
// - Mutations invalidate related queries
// - staleTime: 60s (products), 0s (cart/orders), 5min (categories/static)
// - placeholderData: keepPreviousData for pagination

// lib/query-keys.ts
export const queryKeys = {
  products: {
    all:    () => ['products'] as const,
    list:   (filters: ProductFilters) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
  },
  cart:     { session: () => ['cart'] as const },
  orders:   { list: (filters) => ['orders', filters] as const },
  // ...
} as const;
```

### API Layer Abstraction

```typescript
// lib/api/client.ts
// Single fetch wrapper with:
// - Base URL from env
// - Auth header injection (from token in cookie/store)
// - Error normalization → ApiError class
// - Request/response typed via generated OpenAPI types
// - Retry logic (3x with exponential backoff for 5xx)

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { schema?: ZodSchema<T> }
): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new ApiError(res.status, await res.json());
  const data = await res.json();
  return options?.schema ? options.schema.parse(data) : data;
}
```

### Caching Strategy

| Data Type | staleTime | gcTime | Strategy |
|---|---|---|---|
| Static content (categories, config) | 10min | 30min | Background refetch |
| Product listings | 60s | 5min | Poll on window focus |
| Product detail | 2min | 10min | ISR + client revalidate |
| Cart | 0 | 30s | Always fresh |
| User orders | 30s | 2min | Pull on demand |
| Analytics | 5min | 15min | Background |
| Availability calendar | 30s | 2min | Refetch on date change |

---

## 11. AUTHENTICATION & PERMISSIONS

### JWT Architecture

```typescript
// JWT payload (typed)
interface JWTPayload {
  sub: string;          // userId
  email: string;
  role: UserRole;
  vendorId?: string;    // if vendor
  storeId?: string;
  permissions: Permission[];
  iat: number;
  exp: number;          // 15min access token
}

// Refresh token: httpOnly cookie, 7-day expiry
// Access token: memory + short-lived (15min)
// Token refresh: intercepted in api client on 401
```

### Role-Based Component Rendering

```typescript
// components/auth/RoleGate.tsx
interface RoleGateProps {
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleGate({ allowedRoles, fallback = null, children }: RoleGateProps) {
  const { role } = useAuthStore();
  return allowedRoles.includes(role) ? <>{children}</> : <>{fallback}</>;
}

// Usage:
<RoleGate allowedRoles={['super-admin', 'admin']}>
  <DeleteVendorButton />
</RoleGate>

// Also: usePermission(permission: Permission): boolean hook
```

### Token Refresh Flow

```
1. Access token expires (15min)
2. API call returns 401
3. apiFetch interceptor calls POST /auth/refresh (with httpOnly refresh cookie)
4. New access token returned
5. Original request retried with new token
6. If refresh also 401 → logout() called → redirect to /auth/login
```

---

## 12. NOTIFICATION SYSTEM

### Architecture

```typescript
// WebSocket connection for real-time notifications
// lib/websocket/notification-client.ts

class NotificationWebSocketClient {
  private ws: WebSocket;
  private reconnectAttempts = 0;

  connect(userId: string, token: string) {
    this.ws = new WebSocket(`${WS_BASE}/notifications?userId=${userId}`);
    this.ws.onmessage = (e) => {
      const notification = JSON.parse(e.data) as Notification;
      notificationStore.addNotification(notification);
      toast[notification.type](notification.message);
    };
    this.ws.onclose = () => this.reconnect(); // exponential backoff
  }
}

// Notification types:
type NotificationType = 
  | 'order-placed' | 'order-shipped' | 'order-delivered' | 'order-cancelled'
  | 'booking-confirmed' | 'booking-cancelled' | 'booking-inquiry'
  | 'dispute-opened' | 'dispute-resolved'
  | 'payout-processed'
  | 'review-received'
  | 'vendor-approved' | 'vendor-suspended'
  | 'system-alert';
```

### Notification UI Components

```tsx
<NotificationBell>          // Animated badge with count
<NotificationDropdown>      // Recent 5, grouped by date, "Mark all read"
<NotificationCenter>        // Full page /account/notifications with filters
<InAppNotificationToast>    // Rich toast with action button
```

---

## 13. MARKETING & GROWTH UI

### Coupon System

```typescript
// Coupon types supported:
type CouponType = 
  | 'percentage'         // 20% off
  | 'fixed-amount'       // $10 off
  | 'free-shipping'
  | 'buy-x-get-y'
  | 'tiered'             // Spend $100 → 10%, $200 → 15%
  | 'first-order'

// UI:
// - CouponInput in cart
// - Visual coupon card in marketing pages
// - Auto-apply eligible coupons on checkout
// - Coupon management in /vendor/discounts
```

### Referral System UI

```tsx
// /account/rewards — Referral Dashboard
<ReferralDashboard>
  <ReferralLinkCard>       // Copy link, QR code
  <ReferralStats>          // Referrals sent, converted, earnings
  <ReferralHistory>        // Table of referral events
  <RewardTiers>            // Gamification tiers with progress bar
```

### SEO Fields (Vendor-editable)

```typescript
// Each page builder page + product has SeoPanel:
interface SeoMeta {
  title: string;           // Max 60 chars (live character counter)
  description: string;     // Max 160 chars
  slug: string;            // Editable, validated unique
  ogImage: string;         // Upload or generate from product image
  canonicalUrl?: string;   // Override for syndicated content
  noIndex?: boolean;
  structuredData?: object; // JSON-LD (auto-generated, overridable)
}
```

---

## 14. LOCALIZATION

### Architecture

```typescript
// Using next-intl
// app/[locale]/layout.tsx — locale-aware routing

// Supported locales defined in i18n.config.ts:
export const locales = ['en', 'ar', 'fr', 'de', 'hi', 'ja', 'zh'] as const;
export const defaultLocale = 'en';

// RTL support: Arabic (ar), Hebrew (he)
// Auto-detected from browser, stored in user preferences
// Overridable via URL prefix: /ar/products/...

// Currency:
// - Stored as ISO code (USD, EUR, INR, etc.)
// - Formatted with Intl.NumberFormat
// - Exchanged via live rates (cached 1hr)
// - Customer picks preferred currency in /account/settings

// Locale files: messages/[locale]/
// Code-split per namespace (common, products, checkout, admin)
```

---

## 15. PERFORMANCE OPTIMIZATION

### Code Splitting Strategy

```typescript
// Route-level: automatic with App Router (every page.tsx is a chunk)
// Feature-level: dynamic imports for heavy components

// Heavy components loaded lazily:
const PageBuilder = dynamic(() => import('@/features/page-builder'), {
  loading: () => <PageBuilderSkeleton />,
  ssr: false,
});

const AvailabilityCalendar = dynamic(
  () => import('@/features/booking/components/AvailabilityCalendar'),
  { loading: () => <CalendarSkeleton /> }
);

const StripeElements = dynamic(
  () => import('@/features/checkout/components/StripeElements'),
  { ssr: false }
);
```

### Image Optimization

```tsx
// Always use next/image with:
// - sizes prop for responsive
// - priority on above-fold images
// - placeholder="blur" with blurDataURL
// - WebP/AVIF automatic format selection

<Image
  src={product.image.url}
  alt={product.image.alt}
  width={800}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={product.image.blurDataUrl}
  priority={isAboveFold}
/>
```

### ISR + Streaming Strategy

```typescript
// Static generation with revalidation:
// - Homepage: revalidate: 60s
// - PDP: revalidate: 120s (+ on-demand via /api/revalidate webhook)
// - Collection pages: revalidate: 300s
// - Admin/vendor: fully dynamic (no ISR)

// React Suspense streaming used for:
// - Above-fold: server rendered immediately
// - Below-fold: streamed with <Suspense fallback={<Skeleton />}>
// - Reviews section: deferred (lower priority)
```

### Memoization

```typescript
// React.memo: ProductCard, OrderRow, VendorCard (pure display components)
// useMemo: expensive filter/sort operations on client
// useCallback: event handlers passed to memoized children
// SWR/TQ: built-in deduplication and caching

// Rule: don't prematurely memoize — profile first with React DevTools
```

---

## 16. RESPONSIVE SYSTEM

### Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'xs':  '375px',    // Small phones
  'sm':  '640px',    // Large phones
  'md':  '768px',    // Tablets
  'lg':  '1024px',   // Small desktops
  'xl':  '1280px',   // Desktops
  '2xl': '1536px',   // Large desktops
}
```

### Mobile-First Patterns

```
Desktop: Sidebar nav (permanent) | Vendor store: 3-col product grid
Tablet:  Collapsible sidebar | 2-col product grid
Mobile:  Bottom tab bar (customer) | Hamburger (admin/vendor) | 1-col grid

Adaptive Components:
- DataTable → CardList on mobile
- MegaMenu → Bottom sheet on mobile
- AdminSidebar → Drawer overlay on tablet, permanent on desktop
- CheckoutStepper → Vertical on mobile, horizontal on desktop
- BookingPanel → Sticky footer CTA on mobile (price + Reserve button)
```

---

## 17. ACCESSIBILITY

### Implementation Checklist

```
ARIA:
  ✅ All interactive elements have aria-label or visible text
  ✅ Modal: aria-modal, aria-labelledby, focus trap
  ✅ Combobox (search/select): aria-expanded, aria-activedescendant
  ✅ Live regions: aria-live="polite" for cart updates, toast messages
  ✅ Form errors: aria-describedby pointing to error message id
  ✅ Icons: aria-hidden="true" when decorative, aria-label when functional
  ✅ Loading states: aria-busy="true" on containers

Keyboard Navigation:
  ✅ Tab order follows visual order
  ✅ Escape closes modals/drawers
  ✅ Arrow keys navigate: MegaMenu, DatePicker, Select options
  ✅ Enter/Space activate buttons
  ✅ Skip navigation link (visually hidden, visible on focus)

Color & Contrast:
  ✅ All text meets WCAG AA (4.5:1 for body, 3:1 for large)
  ✅ Focus ring: 3px solid + offset (never removed, only re-styled)
  ✅ No color-only information (status badges use icon + color + text)
```

---

## 18. TESTING

### Testing Pyramid

```
Unit Tests (Vitest):
  - Utility functions (price formatting, date utils, validators)
  - Zustand store actions (addToCart, removeItem, applyCoupon)
  - Zod schema validation (checkout forms, product forms)

Component Tests (Vitest + Testing Library):
  - ProductCard: rendering variants, add to cart, wishlist toggle
  - CartDrawer: item count, coupon application, total calculation
  - DataTable: sorting, pagination, row selection
  - All form components: validation error display, submission

Integration Tests:
  - Checkout flow: address → shipping → payment → success
  - Auth flow: login → redirect → protected page access
  - Booking flow: date select → price update → confirm

E2E Tests (Playwright):
  - Critical path 1: Guest → Browse → Signup → Purchase
  - Critical path 2: Vendor onboarding → Add product
  - Critical path 3: Admin approve vendor
  - Critical path 4: Booking flow (stay)
  - All run against staging environment in CI
```

### Test File Convention

```
features/cart/
├── components/
│   ├── CartDrawer.tsx
│   └── CartDrawer.test.tsx      // Co-located unit/component tests
├── hooks/
│   ├── useCart.ts
│   └── useCart.test.ts
```

```typescript
// e2e/checkout.spec.ts (Playwright)
test('complete checkout flow', async ({ page }) => {
  await page.goto('/products/test-shirt');
  await page.click('[data-testid="add-to-cart"]');
  // ... full flow assertion
});
```

---

## 19. DEVOPS & BUILD

### Environment Configuration

```bash
# .env.local (never committed)
NEXT_PUBLIC_API_BASE_URL=https://api.super-e.io
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
NEXT_PUBLIC_WS_URL=wss://ws.super-e.io
AUTH_SECRET=...                        # NextAuth secret
STRIPE_SECRET_KEY=...
DATABASE_URL=...

# .env.production, .env.staging — environment-specific
```

### Build Configuration

```typescript
// next.config.ts
const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.super-e.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    ppr: true,                      // Partial Pre-Rendering
    reactCompiler: true,            // React Compiler (auto-memoization)
    optimizePackageImports: ['lucide-react', '@radix-ui'],
  },
  logging: { fetches: { fullUrl: true } },
  bundlePagesRouterDependencies: true,
};
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
jobs:
  quality:
    - pnpm lint
    - pnpm typecheck
    - pnpm test          # Vitest unit + component
  build:
    - pnpm build
    - Upload build artifact
  e2e:
    - Deploy to staging (Vercel preview)
    - Run pnpm test:e2e (Playwright)
  deploy:
    - On main merge: deploy to production (Vercel)
    - On-demand ISR revalidation webhook
```

---

## 20. ANALYTICS UI

### Admin Analytics Dashboard

```
<AnalyticsDashboard>
  <DateRangePicker />          // Presets: Today, 7D, 30D, Custom
  <MetricCards>                // Revenue, Orders, Conversion Rate, AOV (animated counters)
  <RevenueChart>               // Line chart (Recharts) — daily/weekly/monthly
  <OrdersHeatmap>              // Orders by hour x day
  <TopProductsTable>           // Sortable, with sparklines
  <TopVendorsTable>            // Revenue per vendor
  <CustomerAcquisitionChart>   // Channel breakdown (Organic, Paid, Referral)
  <GeographicSalesMap>         // (react-simple-maps or Mapbox)
  <ConversionFunnel>           // Browse→Cart→Checkout→Purchase
```

### Vendor Analytics Dashboard

```
<VendorAnalytics>
  <EarningsChart />
  <OrdersTimeline />
  <ProductPerformanceTable />
  <ReviewSentimentCard />         // Avg rating + trend
  <TopSearchTermsCard />          // What customers searched to find you
  <InventoryAlertCard />          // Low stock items
```

### Event Tracking Hooks

```typescript
// lib/analytics/events.ts
// Provider: PostHog (recommended) or Segment

export const trackEvent = {
  productViewed: (product: Product) =>
    analytics.track('Product Viewed', { id: product.id, name: product.name, price: product.price }),
  
  addedToCart: (item: CartItem) =>
    analytics.track('Product Added to Cart', { ...item }),
  
  checkoutStarted: (cart: Cart) =>
    analytics.track('Checkout Started', { value: cart.total, items: cart.items.length }),
  
  orderCompleted: (order: Order) =>
    analytics.track('Order Completed', { orderId: order.id, revenue: order.total }),
  
  bookingCompleted: (booking: Booking) =>
    analytics.track('Booking Completed', { bookingId: booking.id, value: booking.total }),
};

// Usage: wrapped in useEffect or directly in event handlers
// Never block UI on analytics calls
```

---

## 21. EDGE STATES & FAILURES

### Empty States

```typescript
// Every empty state has:
// 1. Illustration (SVG, unique per context)
// 2. Primary message (e.g. "No orders yet")
// 3. Secondary message (explanation)
// 4. Primary CTA
// 5. Secondary CTA (optional)

const EMPTY_STATES = {
  orders:     { icon: ShoppingBag, title: "No orders yet", cta: "Start Shopping" },
  wishlist:   { icon: Heart, title: "Your wishlist is empty", cta: "Browse Products" },
  products:   { icon: Package, title: "No products added", cta: "Add Product" },
  search:     { icon: Search, title: "No results for \"{{query}}\"", cta: "Clear Filters" },
  bookings:   { icon: Calendar, title: "No bookings yet", cta: "Explore Stays" },
  reviews:    { icon: Star, title: "No reviews yet", cta: null },
  disputes:   { icon: Shield, title: "No open disputes", cta: null },
} as const;
```

### Error States & Boundaries

```tsx
// app/error.tsx — route-level error boundary
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ErrorState
      code={error.digest}
      title="Something went wrong"
      description="We couldn't load this page. Our team has been notified."
      actions={[
        { label: 'Try again', onClick: reset },
        { label: 'Go home', href: '/' },
      ]}
    />
  );
}

// Payment failure:
// - Specific error message from Stripe (card declined, insufficient funds, etc.)
// - Retry CTA + "Try different card" option
// - Chat support link

// Booking conflict:
// - "These dates are no longer available"
// - Calendar re-opens with blocked dates highlighted
// - Show next available period
```

---

## 22. INTEGRATIONS UI

### Payment UI

```tsx
// Stripe: embedded Stripe Elements (customized to match design system)
// PayPal: PayPal Buttons SDK (deferred load)
// Razorpay: for INR markets
// All payment methods in a unified PaymentSelector:

<PaymentSelector>
  <PaymentMethod id="card" label="Credit / Debit Card">
    <StripeCardElement />
  </PaymentMethod>
  <PaymentMethod id="upi" label="UPI">
    <UpiInput />
  </PaymentMethod>
  <PaymentMethod id="wallet" label="Google Pay / Apple Pay">
    <ExpressCheckoutElement />
  </PaymentMethod>
  <PaymentMethod id="bnpl" label="Buy Now, Pay Later">
    <KlarnaElement />
  </PaymentMethod>
</PaymentSelector>
```

### Shipping UI

```tsx
// Real-time rates from shipping aggregator (EasyPost / Shiprocket)
<ShippingRateSelector>
  {rates.map(rate => (
    <ShippingRateCard
      key={rate.id}
      carrier={rate.carrier}          // FedEx, UPS, USPS, etc.
      service={rate.service}          // Ground, Express, etc.
      price={rate.price}
      eta={rate.estimatedDelivery}
      isSelected={selected === rate.id}
      onSelect={() => setSelected(rate.id)}
    />
  ))}
</ShippingRateSelector>
```

### Third-Party Connections (Vendor Settings)

```tsx
// /vendor/store/settings → Integrations tab
<IntegrationsList>
  <IntegrationCard name="Google Analytics" status="connected" />
  <IntegrationCard name="Facebook Pixel" status="disconnected" />
  <IntegrationCard name="Mailchimp" status="connected" />
  <IntegrationCard name="Klaviyo" status="disconnected" />
  <IntegrationCard name="WhatsApp Business" status="pending" />
</IntegrationsList>
// Each card: Connect / Disconnect / Settings / Last synced
```

---

## 23. AI-POWERED UI

### Product Recommendations

```typescript
// Three recommendation contexts:
// 1. "You might also like" — on PDP (collaborative filtering)
// 2. "Based on your browsing" — homepage personalization
// 3. "Frequently bought together" — cart upsell

// Client-side: POST /api/recommendations { userId, context, productId?, cartItems? }
// Response cached in TQ for 5 minutes
// Fallback: rule-based (same category, top-rated)

// UI: horizontal scroll carousel with skeleton loading
```

### Smart Search Suggestions

```tsx
// GlobalSearch uses:
// 1. Instant: local history + trending (from edge cache)
// 2. Typo-tolerant full-text search (Typesense / Algolia)
// 3. AI-powered semantic search (fallback/supplemental)

<SearchModal>
  <SearchInput placeholder="Search products, stores, stays..." />
  <SearchResults>
    <ResultGroup label="Trending Searches" items={trending} />
    <ResultGroup label="Products" items={productResults} />
    <ResultGroup label="Categories" items={categoryResults} />
    <ResultGroup label="Stores" items={vendorResults} />
  </SearchResults>
  <NoResults>
    <AiSuggestion>            // "Did you mean: ...?"
    <VisualSearch>            // Upload image to find similar products
  </NoResults>
</SearchModal>
```

### Auto-Fill Content (Vendor)

```tsx
// /vendor/products/new → AI-assisted product form
<AiContentAssist>
  <Button onClick={() => generateDescription(productTitle)}>
    <Sparkles size={16} /> Generate description
  </Button>
  // Streams response via Server-Sent Events
  // User can accept, regenerate, or edit
</AiContentAssist>

// Also: AI-generated SEO meta titles and descriptions
// AI image alt-text generation on upload
```

---

## 24. EXECUTION STRUCTURE

### Naming Conventions

```
Files:       PascalCase for components (ProductCard.tsx)
             camelCase for hooks (useCart.ts), utils, stores
             kebab-case for pages (product-detail/page.tsx) — Next.js convention
             SCREAMING_SNAKE for constants (MAX_CART_ITEMS)

Exports:     Named exports for everything except pages/layouts (default)
             One component per file
             Export types alongside components (co-located)

Tests:       Same name + .test.ts(x) suffix, same directory
             E2E: e2e/[flow-name].spec.ts
```

### Page → Component Mapping (Examples)

| Page | Key Components |
|---|---|
| `/` (Homepage) | `HeroSection`, `FeaturedCollections`, `TrendingProducts`, `ReviewsStrip`, `NewsletterSection` |
| `/products/[slug]` | `PDPGallery`, `PDPInfo`, `VariantSelector`, `AddToCartButton`, `PDPTabs`, `RelatedProducts` |
| `/checkout/payment` | `CheckoutStepper`, `PaymentSelector`, `StripeCardElement`, `OrderSummaryPanel` |
| `/admin` | `AdminShell`, `MetricCards`, `RevenueChart`, `RecentOrdersTable`, `DisputeAlerts` |
| `/vendor/onboarding` | `OnboardingWizard`, `StepIndicator`, `BusinessInfoForm`, `BankingDetailsForm` |
| `/vendor/store/customize` | `PageBuilderEditor`, `SectionTree`, `BlockEditor`, `DevicePreview`, `ThemePanel` |
| `/stays/[slug]` | `StayGallery`, `StayInfo`, `AvailabilityCalendar`, `GuestSelector`, `BookingPanel`, `ReviewsList` |
| `/admin/disputes/[id]` | `DisputeTimeline`, `EvidenceViewer`, `DisputeActions`, `ChatThread` |

### Launch Sequence Recommendation

```
Phase 1 — Foundation (Weeks 1–4)
  ✅ Design system (tokens, typography, colors, shadows)
  ✅ Base component library (shadcn setup, form system)
  ✅ Auth system (login, signup, OTP, middleware)
  ✅ Admin shell + vendor shell layouts
  ✅ API client setup + query key conventions

Phase 2 — Core Commerce (Weeks 5–10)
  ✅ Product catalog (PDP, collections, search)
  ✅ Cart + checkout flow (multi-step)
  ✅ Order management (customer + admin + vendor)
  ✅ Vendor onboarding + store setup
  ✅ Payment integration (Stripe)

Phase 3 — Booking Platform (Weeks 11–14)
  ✅ Stay/experience listing + detail pages
  ✅ Availability calendar + dynamic pricing
  ✅ Full booking flow
  ✅ Booking management (all roles)

Phase 4 — Customization & Growth (Weeks 15–20)
  ✅ Page builder + theme system
  ✅ Marketing tools (coupons, referrals, campaigns)
  ✅ Analytics dashboards
  ✅ Integrations (shipping, email, socials)
  ✅ AI features (recommendations, search, content assist)
  ✅ Localization + multi-currency
  ✅ Accessibility audit + E2E test suite
```

---

> **Tech Summary**: Next.js 14 App Router + TypeScript + TailwindCSS v4 + shadcn/ui + Zustand + TanStack Query v5 + Framer Motion + react-hook-form + Zod + Stripe + Playwright
>
> **This document is the single source of truth for the Super-E frontend system. Every feature, page, component, state, and flow defined here maps directly to buildable implementation.**

---
---

# ADDENDUM — Critical Missing Systems (v2)

> All 15 major gaps and 7 small gaps from the v2 audit, fully specified.

---

## A1. MULTI-TENANT STORE RESOLUTION (COMPLETE)

### Subdomain Routing

```
store.super-e.io     → Tenant slug: "store"
mystore.super-e.io   → Tenant slug: "mystore"
mystore.com          → Custom domain (mapped to tenant)
```

### Custom Domain Support — Middleware

```typescript
// middleware.ts (extended)
export async function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const { tenant, isCustomDomain } = await resolveTenant(host);

  if (!tenant) {
    // Unknown domain → 404 store-not-found page
    return NextResponse.rewrite(new URL('/store-not-found', req.url));
  }

  const res = NextResponse.next();
  // Inject tenant context as headers — available in all Server Components
  res.headers.set('x-tenant-id',    tenant.id);
  res.headers.set('x-tenant-slug',  tenant.slug);
  res.headers.set('x-tenant-plan',  tenant.plan);
  res.headers.set('x-custom-domain', isCustomDomain ? 'true' : 'false');
  return res;
}

// Domain → Tenant resolution (Edge-compatible)
async function resolveTenant(host: string): Promise<TenantResolution> {
  const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN!; // 'super-e.io'

  if (host.endsWith(`.${PLATFORM_DOMAIN}`)) {
    // Subdomain routing: extract slug
    const slug = host.replace(`.${PLATFORM_DOMAIN}`, '');
    return fetchTenantBySlug(slug);           // Edge KV (Vercel KV / Cloudflare KV)
  }

  if (host !== PLATFORM_DOMAIN && !host.startsWith('www.')) {
    // Custom domain: look up mapping in KV store
    return fetchTenantByCustomDomain(host);   // KV key: `domain:${host}`
  }

  return { tenant: null, isCustomDomain: false }; // platform root
}
```

### Domain Mapping System (Admin UI)

```
/super-admin/tenants/[id]/domains
  - Add custom domain input
  - DNS instruction card (CNAME: stores.super-e.io)
  - Domain verification status (polling + webhook)
  - SSL status indicator (auto-provisioned via Vercel/Cloudflare)
  - Primary domain selector (which domain is canonical)
  - Domain removal with confirmation
```

### Store Context Provider

```typescript
// lib/tenant/store-context.tsx
interface StoreContext {
  id: string;
  slug: string;
  name: string;
  plan: 'starter' | 'growth' | 'pro' | 'enterprise';
  theme: ThemeConfig;
  features: FeatureFlags;        // plan-gated features
  currency: string;
  locale: string;
  timezone: string;
}

// Populated in root layout from x-tenant-* headers (Server Component)
// Available to all client components via Context + useStore() hook
export const StoreContext = createContext<StoreContext | null>(null);

// app/(storefront)/layout.tsx  (Server Component)
export default async function StorefrontLayout({ children }) {
  const tenantId = headers().get('x-tenant-id')!;
  const store = await getStoreConfig(tenantId);  // cached, revalidate: 300s
  return (
    <StoreContextProvider value={store}>
      <ThemeInjector theme={store.theme} />      {/* injects CSS vars */}
      {children}
    </StoreContextProvider>
  );
}
```

### Tenant Cache Isolation

```typescript
// Each tenant's data is cached under a namespaced prefix
// TanStack Query key factory includes tenantId:
queryKeys.products.list = (tenantId: string, filters) =>
  ['tenant', tenantId, 'products', 'list', filters];

// ISR pages are per-tenant:
// revalidateTag(`tenant-${tenantId}-products`) on product update webhook

// No cross-tenant data leakage:
// All API calls include x-tenant-id header (injected by apiFetch)
// Backend enforces tenant scoping on every query
```

### Invalid Domain Fallback UI

```tsx
// app/store-not-found/page.tsx
<StoreNotFoundPage>
  <Logo />                              // Platform logo only
  <Heading>Store not found</Heading>
  <Body>This store may have moved, been renamed, or doesn't exist.</Body>
  <Link href="https://super-e.io">Browse the marketplace →</Link>
</StoreNotFoundPage>
// No tenant theme applied; uses platform default styling
```

---

## A2. CMS / STATIC CONTENT SYSTEM

### Content Types

```typescript
type ContentType =
  | 'blog-post'       // /blog/[slug]
  | 'static-page'     // /pages/[slug] — About, Contact, FAQ
  | 'announcement'    // Homepage banner (time-limited)
  | 'policy'          // /legal/[slug] — Terms, Privacy, Returns policy
  | 'help-article'    // /help/[slug] — Support center
```

### Page Structure

```
/blog                   → Blog index (paginated, category-filtered)
/blog/[slug]            → Blog post (full article)
/blog/category/[cat]    → Category listing
/pages/about            → About us (editable in CMS)
/pages/contact          → Contact form + map
/pages/faq              → Accordion FAQ
/help                   → Help center index
/help/[slug]            → Help article
```

### Rich Text Editor (Vendor-editable)

```typescript
// Editor: Tiptap (headless, extensible)
// Extensions enabled:
//   - Bold, Italic, Underline, Strike
//   - Heading (H1–H4)
//   - BulletList, OrderedList
//   - Blockquote
//   - Image (with upload + alt text)
//   - Link (with rel="nofollow" option)
//   - Table (basic)
//   - CodeBlock (for help articles)
//   - YouTube embed
//   - HorizontalRule
//   - Undo/Redo

// Output: serialized to JSON (Tiptap schema) stored in DB
// Rendered: JSON → React via @tiptap/react readOnly mode
// MDX support: for Super Admin authored content only (security boundary)
```

### CMS Pages in Admin/Vendor

```
/admin/cms/blog                      → Blog posts (admin writes platform blog)
/admin/cms/blog/new
/admin/cms/blog/[id]
/admin/cms/pages                     → Static pages management
/vendor/store/content/blog           → Vendor's store blog
/vendor/store/content/blog/new
/vendor/store/content/pages          → Custom pages (About, FAQ, Contact)
/vendor/store/content/pages/new
```

### Blog Post Schema

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;                // editable, unique per store
  excerpt: string;             // max 200 chars
  content: TiptapJSON;
  coverImage: MediaAsset;
  author: Author;
  category: string[];
  tags: string[];
  status: 'draft' | 'scheduled' | 'published';
  publishedAt: Date | null;    // null = draft
  seo: SeoMeta;
  readingTime: number;         // auto-calculated (words / 200)
}
```

---

## A3. ADVANCED SEARCH SYSTEM UI

### Faceted Filter Architecture

```typescript
// URL-driven filter state: /search?q=shoes&price=0-5000&brand=Nike,Adidas&rating=4&sort=popular

interface SearchFilters {
  q: string;
  // Facets — each maps to a URL param
  price:      [number, number];      // range slider
  brand:      string[];              // multi-select checkbox
  category:   string[];              // multi-select
  rating:     number;                // minimum star rating (1–5)
  availability: 'in-stock' | 'all';
  color:      string[];              // color swatch multi-select
  size:       string[];              // pill multi-select
  discount:   boolean;               // "On Sale" toggle
  // Booking-specific
  checkIn?:   string;                // ISO date
  checkOut?:  string;
  guests?:    number;
  // Sort
  sort: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'rating';
}
```

### Filter UI Components

```tsx
<SearchPage>
  <SearchHeader>
    <SearchQueryInput />              // Controlled, debounced 300ms
    <ResultCount />                   // "142 results for 'shoes'"
    <SortSelector />                  // Dropdown: Relevance | Price ↑ | Price ↓ | Newest | Popular | Rating
    <ViewToggle />                    // Grid | List
    <ActiveFilterChips />             // Each applied filter as dismissible chip
    <ClearAllFilters />               // Only visible when filters active
  </SearchHeader>

  <SearchLayout>
    <FilterSidebar>                   {/* desktop */}
      <PriceRangeSlider
        min={0} max={50000}
        step={100}
        formatLabel={(v) => formatCurrency(v)}
      />
      <CheckboxFilterGroup
        title="Brand"
        options={brandFacets}          // [{value, label, count}]
        searchable                     // filter options list
        maxVisible={6}                 // "Show more" toggle
      />
      <RatingFilter />                 // Star row clickable filter
      <ColorSwatchFilter />            // Visual color picker
      <SizeFilterGroup />              // Pill buttons
      <AvailabilityToggle />
      <DiscountToggle />
    </FilterSidebar>

    <MobileFilterSheet>               {/* mobile: bottom sheet */}
      {/* same filters as sidebar */}
      <ApplyFiltersButton count={activeFilterCount} />
    </MobileFilterSheet>

    <SearchResults
      isLoading={isLoading}
      items={results}
      layout={viewMode}              // 'grid' | 'list'
    />
    <Pagination />                   // or InfiniteScroll (see A15-5)
  </SearchLayout>
</SearchPage>
```

### Search Suggestions Persistence

```typescript
// lib/search/suggestions.ts
// Stores recent searches in localStorage (max 10, FIFO)
// Also fetches trending from API (cached 1hr, served from edge)

interface SearchSuggestionStore {
  recent: string[];
  addRecent:    (query: string) => void;
  clearRecent:  () => void;
  removeRecent: (query: string) => void;
}

// Suggestions dropdown priority order:
// 1. Recent searches (from localStorage)
// 2. Autocomplete from search engine (Typesense prefix search)
// 3. Popular categories matching query
// 4. Trending searches (platform-wide or store-wide)
// 5. Vendor/store name matches
```

### Search Analytics UI (Admin + Vendor)

```
/admin/analytics/search
  - Top search terms (table: query, count, click-through rate, conversion rate)
  - Zero-result searches (list: what customers searched and found nothing)
  - Search → Purchase funnel (% who bought after searching)
  - Filter usage heatmap (which filters are used most)

/vendor/analytics/search (subset)
  - Top searches landing on their store
  - Which of their products appear for which queries
  - Suggested keywords (AI-generated from missed opportunities)
```

---

## A4. RATE LIMITING / ABUSE UI

### Throttling Response Handling

```typescript
// In apiFetch — handle 429 Too Many Requests
if (res.status === 429) {
  const retryAfter = res.headers.get('Retry-After');  // seconds
  throw new RateLimitError(parseInt(retryAfter ?? '60'));
}

// RateLimitError is caught at the mutation/query level
// and triggers the RateLimitFeedback component
```

### UI Components

```tsx
// Inline rate-limit feedback (replaces button/form on trigger)
<RateLimitBanner retryAfterSeconds={60}>
  <AlertCircle />
  <span>Too many attempts. Please wait <Countdown seconds={60} /> before trying again.</span>
</RateLimitBanner>

// Countdown component: self-ticking, re-enables form on zero

// For auth pages (login/signup) specifically:
// After 5 failed attempts:
//   - Show CAPTCHA challenge (hCaptcha — privacy-preserving)
//   - On 10 attempts: "Account temporarily locked. Check your email."
// CAPTCHA state managed in AuthAttemptStore (Zustand, not persisted)
```

### Bot Detection UX

```typescript
// Honeypot field in all public forms (invisible to users, filled by bots)
// reCAPTCHA v3 / hCaptcha on:
//   - Auth forms (login, signup, forgot password)
//   - Contact forms
//   - Checkout (on suspicious patterns — multiple orders, rapid checkout)
//   - Review submission

// If CAPTCHA score < threshold → show interactive challenge
// If score very low → block silently (no UI, just ignore) or show soft block

// hCaptcha chosen over reCAPTCHA for GDPR compliance
```

### Retry Strategy (Client)

```typescript
// apiFetch with exponential backoff:
const RETRY_STATUS = [429, 500, 502, 503, 504];
const MAX_RETRIES = 3;

async function apiFetch<T>(path, options, attempt = 0): Promise<T> {
  try {
    return await doFetch(path, options);
  } catch (err) {
    if (err instanceof ApiError && RETRY_STATUS.includes(err.status) && attempt < MAX_RETRIES) {
      const delay = err instanceof RateLimitError
        ? err.retryAfter * 1000          // respect server header
        : Math.min(1000 * 2 ** attempt, 30000);  // exponential: 1s, 2s, 4s
      await sleep(delay);
      return apiFetch(path, options, attempt + 1);
    }
    throw err;
  }
}
```

---

## A5. RETURNS / REFUND UX

### Return Request Flow (Customer)

```
Entry: /account/orders/[id] → "Request Return" button
  → Visible only on delivered orders within return window (e.g., 30 days)
  → onClick: opens ReturnRequestDrawer

ReturnRequestDrawer (multi-step):
  Step 1: Select Items
    - Checkbox list of order items (with quantity selectors per item)
    - Partial return supported
  Step 2: Return Reason
    - Reason picker: Damaged, Wrong item, Changed mind, Doesn't fit, Other
    - Photo upload (optional for most, required for "Damaged")
    - Additional comments (textarea)
  Step 3: Resolution
    - Preference: Refund to original payment | Store credit | Exchange
  Step 4: Review + Submit
    - Return summary: items, reason, resolution preference
    - Policy reminder (e.g., "Items must be unused and in original packaging")
  → POST /returns → return request created (status: pending)
```

### Return Policy Display

```tsx
// Shown on PDP, Cart, and Checkout Review step
<ReturnPolicyBadge>
  <RotateCcw size={14} />
  <span>30-day returns</span>     // Vendor-configurable
</ReturnPolicyBadge>

// Expanded details on click: return conditions, who pays shipping, timeline
```

### Return Approval UI (Vendor)

```
/vendor/orders/[id]/returns/[returnId]
  ReturnDetail:
    - Requested items + reason + customer photos
    - Customer's resolution preference
    - Actions:
        ✅ Approve Return → triggers return label generation
        ❌ Reject Return → requires rejection reason (customer notified)
        ↩ Request More Info → opens thread (see A6: Communication)
    - Refund amount calculator (auto, editable)
    - Restocking fee toggle (vendor setting)
```

### Return Status Tracking (Customer)

```
Status flow:
  Submitted → Under Review → Approved / Rejected
  (if Approved): Return Label Sent → Item Received → Refund Processing → Refund Issued

/account/orders/[id]:
  <ReturnStatusTracker status={returnStatus}>
    <StatusStep label="Return Requested"   completed />
    <StatusStep label="Under Review"       active />
    <StatusStep label="Approved"           pending />
    <StatusStep label="Refund Issued"      pending />
  <ReturnStatusTracker>
  // Mirrors the Order Tracking stepper pattern (same component, different steps)
```

### Refund Status UI

```tsx
// On /account/orders/[id] and /account/billing (history):
<RefundBadge status="processing">Refund Processing</RefundBadge>
<RefundBadge status="issued">Refunded ₹1,299 · 3–5 business days</RefundBadge>
<RefundBadge status="failed">Refund Failed — Contact Support</RefundBadge>

// Admin: /admin/finance/refunds — full refund ledger
//   Columns: Order, Customer, Amount, Reason, Status, Initiated, Completed
//   Bulk refund action (for store-wide issues)
//   Manual refund trigger for failed Stripe reversals
```

---

## A6. COMMUNICATION SYSTEM (CHAT / MESSAGING)

### Architecture

```typescript
// Real-time: WebSocket (same connection as notifications) or SSE
// Persistence: messages stored per thread in DB
// Thread types:
type ThreadContext =
  | { type: 'order';        orderId: string }
  | { type: 'booking';      bookingId: string }
  | { type: 'inquiry';      productId: string }
  | { type: 'dispute';      disputeId: string }
  | { type: 'admin-vendor'; vendorId: string }
  | { type: 'support';      ticketId: string }
```

### Messaging UI Components

```tsx
// Embedded thread — appears on order/booking detail pages
<MessageThread threadId={thread.id}>
  <MessageList>
    {messages.map(msg => (
      <MessageBubble
        key={msg.id}
        message={msg}
        isSelf={msg.senderId === currentUser.id}
        showAvatar
        showTimestamp
        status={msg.status}           // sent | delivered | read
      />
    ))}
    <TypingIndicator visible={partnerIsTyping} />
  </MessageList>
  <MessageComposer
    onSend={sendMessage}
    onTyping={broadcastTyping}
    maxLength={2000}
    allowAttachments                  // images, PDFs only
    placeholder="Message about your order..."
  />
</MessageThread>

// Stand-alone messaging inbox
// /account/messages — Customer view (all threads)
// /vendor/messages  — Vendor view (all customer threads)
// /admin/messages   — Admin view (flagged/escalated threads)
```

### Messaging Store

```typescript
interface MessagingStore {
  threads: Map<string, Thread>;
  activeThreadId: string | null;
  typingUsers: Map<string, string[]>;   // threadId → [userId]

  fetchThreads: () => Promise<void>;
  openThread:   (threadId: string) => void;
  sendMessage:  (threadId: string, content: MessageContent) => Promise<void>;
  markRead:     (threadId: string) => void;

  // WS event handlers (called from WebSocketClient)
  onMessageReceived:  (msg: Message) => void;
  onTypingStart:      (threadId: string, userId: string) => void;
  onTypingStop:       (threadId: string, userId: string) => void;
}
```

### Moderation (Admin)

```
/admin/messages:
  - Flagged messages (auto-flagged by content filter)
  - Search all messages (by keyword, user, thread)
  - Thread takeover (Admin joins a dispute thread)
  - Message deletion (with audit log)
  - User mute / ban from messaging
```

---

## A7. INVOICE / BILLING UI

### Customer Invoice

```tsx
// /account/orders/[id] → "Download Invoice" button
// Also sent as email attachment on order confirmation

// InvoicePDF rendered server-side using @react-pdf/renderer:
<InvoicePage>
  <InvoiceHeader>
    <StoreLogo />
    <StoreContact />               // Address, GSTIN, email, phone
    <InvoiceTitle>Tax Invoice</InvoiceTitle>
    <InvoiceMeta>
      <Field label="Invoice No"   value={invoice.number} />
      <Field label="Invoice Date" value={formatDate(invoice.date)} />
      <Field label="Order No"     value={order.number} />
    </InvoiceMeta>
  </InvoiceHeader>

  <BillingParties>
    <BillTo />                     // Customer details
    <ShipTo />                     // Delivery address
  </BillingParties>

  <LineItemsTable>
    {/* Columns: Item | HSN/SAC | Qty | Unit Price | Discount | Amount */}
    {/* GST breakout rows: CGST, SGST/IGST (based on intra/inter state) */}
  </LineItemsTable>

  <InvoiceSummary>
    <Row label="Subtotal" />
    <Row label="Discount" />
    <Row label="Shipping" />
    <Row label="CGST (9%)" />
    <Row label="SGST (9%)" />
    <Row label="Total" bold />
    <Row label="Amount Paid" />
  </InvoiceSummary>

  <InvoiceFooter>
    <PaymentMethod />
    <TermsAndConditions />         // vendor-configurable
    <QRCode value={invoice.verifyUrl} />   // optional GST e-invoice QR
  </InvoiceFooter>
</InvoicePage>
```

### Billing History (Customer)

```
/account/billing:
  <BillingHistory>
    <BillingFilters>               // Date range, type (order/subscription)
    <BillingTable>
      // Columns: Date | Description | Amount | Status | Invoice
      // Each row: Download Invoice link (triggers PDF generation API)
    </BillingTable>
    <BillingSummary>               // YTD spend, avg order value
  </BillingHistory>
```

### Vendor Billing / Payout Statements

```
/vendor/payouts → payout statements (not invoices — vendor earns from platform)
/vendor/earnings → detailed earnings with:
  - Gross order value
  - Platform commission (%)
  - Payment gateway fee
  - Net payout
  - Payout status: pending | processing | paid | failed

Each payout downloadable as PDF statement
GST invoice (vendor → platform for commission): auto-generated
```

---

## A8. OFFLINE / SYNC STRATEGY (COMPLETE)

### Retry Queue for Failed Actions

```typescript
// lib/offline/retry-queue.ts
// Persisted in IndexedDB via idb-keyval

interface QueuedOperation {
  id: string;
  type: 'cart-add' | 'cart-remove' | 'wishlist-toggle' | 'order-submit'
       | 'message-send' | 'review-submit';
  payload: unknown;
  createdAt: number;
  attempts: number;
  maxAttempts: number;            // 3 for most, 1 for order-submit
}

class RetryQueue {
  async enqueue(op: Omit<QueuedOperation, 'id' | 'createdAt' | 'attempts'>) {
    await idbSet(`queue:${nanoid()}`, { ...op, createdAt: Date.now(), attempts: 0 });
  }

  async flush() {
    const ops = await this.getAll();
    for (const op of ops) {
      try {
        await executeOperation(op);   // calls appropriate API
        await this.remove(op.id);
      } catch {
        await this.incrementAttempts(op);
        if (op.attempts + 1 >= op.maxAttempts) await this.remove(op.id);
      }
    }
  }
}

// Flush triggered on: window online event, app focus, interval (30s)
```

### Sync Status Indicator

```tsx
// Persistent indicator in app shell (subtle, non-intrusive)
<SyncStatusIndicator status={syncStatus}>
  {syncStatus === 'syncing'  && <Loader2 size={12} className="animate-spin" />}
  {syncStatus === 'synced'   && <CheckCircle size={12} className="text-success" />}
  {syncStatus === 'offline'  && <WifiOff size={12} className="text-warning" />}
  {syncStatus === 'error'    && <AlertCircle size={12} className="text-error" />}
  <span>{syncStatusLabel[syncStatus]}</span>
</SyncStatusIndicator>

// Positions: top-right corner of admin/vendor shell header
// Hidden when 'synced' after 3s delay (fade out)
```

### Offline Banner

```tsx
// Triggered by navigator.onLine event (+ window 'online'/'offline' events)
<AnimatePresence>
  {!isOnline && (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="offline-banner"
    >
      <WifiOff size={16} />
      You're offline. Changes will sync when you reconnect.
    </motion.div>
  )}
</AnimatePresence>
```

### Background Sync UX

```typescript
// Service Worker (next-pwa or custom) registers sync tags:
self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-queue') {
    event.waitUntil(retryQueue.flush());
  }
});

// Triggering background sync:
await navigator.serviceWorker.ready;
await registration.sync.register('retry-queue');

// Fallback (if Background Sync API not available):
// Process queue on next app focus / online event
```

---

## A9. FEATURE FLAGS (FRONTEND)

### Flag System

```typescript
// lib/feature-flags/index.ts
// Flags served from API at app boot, cached in memory + localStorage

interface FeatureFlags {
  // Platform-level (set by Super Admin)
  'multi-vendor':         boolean;
  'booking-platform':     boolean;
  'ai-recommendations':   boolean;
  'page-builder':         boolean;
  // Tenant-level (set per store, plan-gated)
  'custom-domain':        boolean;
  'advanced-analytics':   boolean;
  'team-accounts':        boolean;
  'api-access':           boolean;
  // Experiment flags (A/B tests)
  'checkout-v2':          boolean;
  'pdp-layout-b':         boolean;
  // Rollout flags (gradual)
  'new-search-engine':    boolean;   // % based, evaluated server-side
}

// Usage in components:
const { flags } = useFeatureFlags();
if (!flags['booking-platform']) return null;
```

### FlagGate Component

```tsx
// components/auth/FlagGate.tsx
interface FlagGateProps {
  flag: keyof FeatureFlags;
  fallback?: ReactNode;
  children: ReactNode;
}

export function FlagGate({ flag, fallback = null, children }: FlagGateProps) {
  const { flags } = useFeatureFlags();
  return flags[flag] ? <>{children}</> : <>{fallback}</>;
}

// Usage:
<FlagGate flag="ai-recommendations">
  <RecommendationsWidget />
</FlagGate>

<FlagGate flag="booking-platform" fallback={<ShopNavLinks />}>
  <BookingNavLinks />
</FlagGate>
```

### A/B Testing Integration

```typescript
// Experiment assignment: server-side (in middleware) for SSR consistency
// Cookie-based sticky assignment (user always gets same variant)

// middleware.ts addition:
const experiments = await getActiveExperiments(tenantId);
for (const exp of experiments) {
  const existingVariant = req.cookies.get(`exp_${exp.id}`)?.value;
  const variant = existingVariant ?? assignVariant(userId ?? guestId, exp);
  res.cookies.set(`exp_${exp.id}`, variant, { maxAge: 30 * 24 * 3600 });
  res.headers.set(`x-exp-${exp.id}`, variant);
}

// In page/component: read from cookie or header
const variant = useExperiment('checkout-v2');  // 'control' | 'treatment'
// Track exposure + conversion via analytics.track
```

### Feature Flag Admin UI

```
/super-admin/feature-flags:
  <FlagTable>
    // Columns: Flag name | Type | Status | Rollout % | Modified
    // Row actions: Enable/Disable toggle | Set rollout % | View usage
  </FlagTable>

/super-admin/ai/experiments:
  <ExperimentsDashboard>
    // Active experiments + statistical significance + winner detection
  </ExperimentsDashboard>
```

---

## A10. SANDBOX / PREVIEW ENVIRONMENTS

### Store Preview Before Publish

```typescript
// Every page builder save creates a "draft" version alongside "published"
// Draft has its own URL: /preview/[token]/[slug]
// Token is time-limited (24hr), generated per session

// Middleware: allows /preview/** without tenant auth
// Injects preview=true flag into store context
// Preview mode: bypasses ISR cache, always renders draft content

// Preview banner (always visible in preview mode):
// <PreviewModeBar>
//   <Eye size={16} /> You're viewing a draft preview
//   <Button onClick={exitPreview}>Exit Preview</Button>
//   <Button onClick={publishPage} variant="primary">Publish</Button>
// </PreviewModeBar>
```

### Draft vs Published Version

```typescript
// Content model has dual state:
interface ContentVersion {
  id: string;
  contentId: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  data: PageLayout | BlogPost | ThemeConfig;
  publishedAt: Date | null;
  scheduledFor: Date | null;
  createdBy: string;
  createdAt: Date;
}

// Vendor always edits the draft
// "Publish" promotes draft → published (previous published → archived)
// "Revert" restores last archived version as draft
```

### Preview Links

```
Vendor Dashboard → Store Customizer → "Preview" button
  → Opens: https://[store].super-e.io/preview/[token]?page=[slug]
  → Or for custom domain: https://mystore.com/preview/[token]?page=home

Shareable preview link (for stakeholder review):
  → 72hr expiry
  → View-only (no page builder UI shown to recipient)
  → Shows draft content in published-mode layout
```

### Scheduled Publishing UI

```tsx
<PublishScheduler>
  <RadioGroup>
    <RadioItem value="now">Publish immediately</RadioItem>
    <RadioItem value="schedule">Schedule for later</RadioItem>
  </RadioGroup>
  {mode === 'schedule' && (
    <DateTimePicker
      min={new Date()}
      value={scheduledFor}
      onChange={setScheduledFor}
      timezone={store.timezone}
    />
  )}
  <Button>{mode === 'now' ? 'Publish' : 'Schedule'}</Button>
</PublishScheduler>
```

---

## A11. DATA PRIVACY UX

### Cookie Consent Banner

```tsx
// components/compliance/CookieConsent.tsx
// Shown on first visit, persisted in localStorage (expires 1 year)
// Complies with GDPR, CCPA, India PDPB

// <CookieConsentBanner>
//   <Text>
//     We use cookies to enhance your experience, analyze traffic, and serve
//     personalized content. <Link href="/legal/cookies">Cookie Policy</Link>
//   </Text>
//   <ConsentActions>
//     <Button variant="outline" onClick={rejectAll}>Reject All</Button>
//     <Button variant="outline" onClick={openPreferences}>Preferences</Button>
//     <Button variant="primary" onClick={acceptAll}>Accept All</Button>
//   </ConsentActions>
// </CookieConsentBanner>

// Preferences modal: granular toggles
// Category: Necessary (always on) | Analytics | Marketing | Personalization
// Each with description of what it enables
// Consent stored as: { necessary: true, analytics: true, marketing: false, ... }
// Analytics/tracking only initialized after consent given
```

### GDPR Data Export

```
/account/security → "Privacy" section:
  <DataExportCard>
    <Heading>Download Your Data</Heading>
    <Body>Includes: profile, orders, bookings, messages, reviews, wishlists</Body>
    <Button onClick={requestExport}>Request Data Export</Button>
    // On click: POST /account/data-export → queues async export job
    // Email sent when ready (24-48hrs) with download link
    // Download link: time-limited (7 days), requires auth
  </DataExportCard>

// Export format: ZIP containing:
//   - profile.json
//   - orders.json
//   - bookings.json
//   - messages.json (all threads)
//   - activity_log.json (login history, device list)
```

### Account Deletion Flow

```
/account/security → "Danger Zone" section:

  Deletion Flow (modal):
    Step 1: Blockers check
      - Active orders? → "Please wait for delivery" (with links)
      - Active bookings? → "Please cancel first"
      - Vendor account? → "Transfer store ownership first"
    Step 2: Confirmation
      - Type email address to confirm
      - Final warning: "This cannot be undone"
    Step 3: Processing
      - POST /account/delete
      - 30-day grace period: account deactivated (not deleted)
      - Email: "Your account will be deleted on [date]. Log in to cancel."
    Step 4: Logout + redirect to homepage
```

---

## A12. MICRO-INTERACTIONS / UX POLISH LAYER

### Success Animations

```typescript
// Order Placed (/checkout/success/[orderId]):
//   - Animated checkmark: SVG path draw animation (Framer Motion pathLength)
//   - Confetti burst: canvas-confetti (lightweight, 2KB)
//   - Order card slides up with spring animation
//   - Staggered detail rows fade in

// Booking Confirmed (/book/success/[bookingId]):
//   - Calendar icon "stamps" on with bouncy spring
//   - Property photo reveals with motion.blur → sharp
//   - Booking details slide in staggered

// Add to Cart:
//   - CartIcon in navbar: scale pulse (0.9 → 1.1 → 1.0) + badge count ticks up
//   - Product image: flies to cart icon (FLIP animation with useLayoutEffect)
//   - CartDrawer: slides in from right with spring

// Wishlist Toggle:
//   - Heart icon: fill animation (SVG fill-opacity transition)
//   - On add: heart scales 1 → 1.3 → 1.0 (springBouncy)
//   - On remove: heart becomes hollow (reverse)
```

### Hover Feedback Rules (Consistent System)

```typescript
// rules codified in tailwind config as component classes:

// ProductCard hover:
//   image: scale(1.03), transition: 300ms ease-out
//   card: shadow-md → shadow-xl
//   "Quick Add" button: slides up from bottom (translateY: 100% → 0)

// Button hover:
//   Primary: brightness(1.08) + scale(1.01)
//   Secondary: background shifts to stronger tint
//   Destructive: brightness(1.1)
//   All: transition: 150ms ease-out

// Link hover:
//   Underline: width 0 → 100% (left to right, 200ms)
//   Color: text-primary → brand-primary

// Table row hover:
//   Background: transparent → surface-raised (80ms instant feel)

// Sidebar nav item hover:
//   Background: transparent → surface-overlay
//   Icon: scale(1.05)
//   Left accent bar: height 0 → 100% (200ms)

// Icon buttons:
//   Background: transparent pill appears on hover
//   Icon: scale(1.1)
```

### Loading Transitions Between Routes

```typescript
// Next.js App Router: no built-in progress bar
// Solution: custom NProgress-style bar via usePathname() change detection

// lib/hooks/useRouteProgress.ts
export function useRouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
    return () => { NProgress.start(); };
  }, [pathname, searchParams]);
}

// NProgress customized:
//   - Color: brand-primary
//   - Height: 2px
//   - No spinner (spinner: false)
//   - Minimum: 0.08 (always visible briefly)
//   - Ease: cubic-bezier(0,0,0.2,1)
```

### Micro-interaction Inventory

| Interaction | Animation | Duration |
|---|---|---|
| Button click | scale 0.97 → 1.0 | 100ms |
| Modal open | scaleIn + fadeIn | 200ms spring |
| Modal close | scaleOut + fadeOut | 150ms |
| Drawer open | slideRight | 300ms spring |
| Toast appear | slideUp + fadeIn | 250ms |
| Toast dismiss | slideRight + fadeOut | 200ms |
| Input focus | border-color + subtle glow | 150ms |
| Accordion expand | height 0 → auto (layout animation) | 250ms |
| Tab switch | underline slides | 200ms |
| Page transition | skeleton → content crossfade | 200ms |
| Cart count change | scale bounce | 300ms springBouncy |
| Like/heart toggle | scale + fill | 250ms springBouncy |
| Form error appear | slideDown + shake | 300ms |
| Checkbox toggle | SVG check draw | 150ms |
| Switch toggle | thumb slide + bg change | 200ms |

---

## A13. VENDOR GROWTH TOOLS (ADVANCED)

### Storefront A/B Testing UI

```
/vendor/marketing/experiments:
  ExperimentList:
    - Active experiments (with visitor count + conversion delta)
    - Completed experiments (with winner badge)
    - Draft experiments

  CreateExperiment flow:
    Step 1: What to test?
      - Options: Product title | Price display | Hero image | CTA text | Layout variant
    Step 2: Define Variants
      - Control (current)
      - Treatment (new version; edit inline with mini page builder)
    Step 3: Traffic split (50/50 default, configurable)
    Step 4: Goal metric (Add to cart | Checkout | Revenue per visitor)
    Step 5: Run duration (auto-stop on statistical significance or date)
    → Launch

  ExperimentResults:
    - Conversion rate: Control vs Treatment
    - Statistical significance meter
    - Revenue impact projection
    - "Declare Winner" action → applies winning variant as default
```

### Funnel Insights (Per Product)

```
/vendor/products/[id]/analytics:
  <ProductFunnel>
    Stage 1: Impressions (appeared in search/listing)
    Stage 2: Product Views (clicked through to PDP)
    Stage 3: Add to Cart
    Stage 4: Checkout Started
    Stage 5: Purchased

  Each stage:
    - Count + % of previous stage
    - Drop-off rate highlighted (>60% drop shown in amber/red)
    - Trend: ↑ or ↓ vs prior period

  Actionable Insights panel:
    - "High cart abandonment → consider reducing shipping cost"
    - "Low click-through → try updating product photos"
    // AI-generated suggestions based on funnel data
```

### Heatmap Integration

```typescript
// Optional Hotjar/Microsoft Clarity embed (vendor-configured in settings)
// Loaded lazily, after cookie consent granted for analytics
// /vendor/store/settings → Analytics → Heatmap provider

// Frontend: injects heatmap script conditionally
if (store.heatmapConfig?.provider === 'hotjar' && consentGiven('analytics')) {
  Hotjar.init(store.heatmapConfig.id, 6);
}
// No custom UI needed — heatmap overlays render in provider's own UI
```

---

## A14. ROLE-BASED UI VARIANTS (COMPONENT LEVEL)

### ProductCard Variants by Role

```tsx
// features/catalog/components/ProductCard.tsx
// Single component, behavior changes by context prop

interface ProductCardProps {
  product: Product;
  context: 'storefront' | 'admin' | 'vendor' | 'vendor-search';
}

export function ProductCard({ product, context }: ProductCardProps) {
  return (
    <div className="product-card">
      <ProductImage product={product} />
      <ProductInfo product={product} />

      {/* Storefront: Add to cart + wishlist */}
      {context === 'storefront' && (
        <>
          <AddToCartButton product={product} />
          <WishlistToggle productId={product.id} />
        </>
      )}

      {/* Vendor: Edit + quick stock update */}
      {context === 'vendor' && (
        <>
          <StockBadge count={product.inventory} />
          <Button size="sm" onClick={() => router.push(`/vendor/products/${product.id}`)}>
            Edit
          </Button>
          <QuickInventoryEdit productId={product.id} />
        </>
      )}

      {/* Admin: Status + moderation actions */}
      {context === 'admin' && (
        <>
          <ProductStatusBadge status={product.status} />
          <VendorLink vendorId={product.vendorId} />
          <ModerationMenu productId={product.id} />   {/* Hide | Flag | Delete */}
        </>
      )}
    </div>
  );
}
```

### Other Role-Variant Components

| Component | Customer | Vendor | Admin |
|---|---|---|---|
| `OrderCard` | Status + track + return | Fulfill + ship + chat | Full detail + override |
| `ReviewCard` | View + helpful vote | Reply button | Delete + flag |
| `UserAvatar` | Profile link | Dashboard link | Admin panel link |
| `PricingBlock` | Price + tax | Cost + margin % | Price + override |
| `BookingCard` | View + cancel | View + accept/decline | View + admin actions |
| `NotificationBell` | Order/booking events | Sales/order events | Platform-wide events |

---

## A15. SMALL BUT IMPORTANT GAPS (All 7)

### 1. Global Breadcrumb System

```typescript
// components/layout/Breadcrumb.tsx
// Auto-generated from route segments + dynamic data

interface BreadcrumbItem {
  label: string;
  href?: string;       // undefined = current page (not clickable)
}

// Each page defines its breadcrumbs via metadata or a hook:
// Static: defined in generateMetadata()
// Dynamic: useSetBreadcrumbs([{ label: product.name }]) in page component

// Storefront breadcrumbs:
// Home > Collections > Men's Shoes > Nike Air Max 2025
//  /       /collections   /collections/mens-shoes   (current)

// Admin breadcrumbs:
// Dashboard > Vendors > Acme Corp > Edit
//  /admin    /admin/vendors  /admin/vendors/[id]  (current)

// Schema.org BreadcrumbList JSON-LD injected automatically for storefront
```

### 2. Global Command Palette (⌘K)

```tsx
// components/layout/CommandPalette.tsx
// Built on cmdk library (Radix-based)
// Trigger: Ctrl/Cmd + K anywhere in the app
// Context-aware: shows different commands based on current role/section

// <CommandDialog open={open} onOpenChange={setOpen}>
//   <CommandInput placeholder="Search or jump to..." />
//   <CommandList>
//     <CommandGroup heading="Quick Actions">
//       <CommandItem onSelect={() => router.push('/search')}>Search products</CommandItem>
//       <CommandItem onSelect={() => openCart()}>View cart</CommandItem>
//       <CommandItem onSelect={() => router.push('/vendor/products/new')}>Add product</CommandItem>
//       <CommandItem onSelect={() => router.push('/admin/vendors')}>Manage vendors</CommandItem>
//     </CommandGroup>
//     <CommandGroup heading="Navigation">
//       {filteredPages.map(page => (
//         <CommandItem key={page.path} onSelect={() => router.push(page.path)}>
//           {page.label}
//         </CommandItem>
//       ))}
//     </CommandGroup>
//     <CommandGroup heading="Recent">
//       {recentPages.map(page => <CommandItem key={page.path}>{page.label}</CommandItem>)}
//     </CommandGroup>
//   </CommandList>
// </CommandDialog>

// Keyboard: ↑↓ navigate | Enter select | Escape close | ⌘K toggle
```

### 3. Bulk Actions UX

```tsx
// DataTable built-in bulk action toolbar
// Activates when rowSelection is not empty

// <BulkActionsBar visible={selectedCount > 0}>
//   <SelectedCount>{selectedCount} selected</SelectedCount>
//   <ClearSelection onClick={clearSelection} />
//   {/* Admin vendor table: */}
//   <BulkAction onClick={bulkApprove}>Approve</BulkAction>
//   <BulkAction onClick={bulkSuspend} variant="warning">Suspend</BulkAction>
//   <BulkAction onClick={bulkExport}>Export CSV</BulkAction>
//   {/* Vendor product table: */}
//   <BulkAction onClick={bulkPublish}>Publish</BulkAction>
//   <BulkAction onClick={bulkUnpublish}>Unpublish</BulkAction>
//   <BulkAction onClick={bulkDelete} variant="destructive">Delete</BulkAction>
// </BulkActionsBar>

// Bulk actions always show confirmation modal for destructive operations
// Progress indicator for long-running bulk operations (> 20 items)
```

### 4. Export (CSV / PDF / Excel) UI

```typescript
// DataTable toolbar: export button with dropdown
// CSV:   client-side via Papa.parse (instant, no server round-trip)
// PDF:   server-side via /api/export/pdf (generates @react-pdf document)
// Excel: client-side via SheetJS/xlsx
// Large exports (>1000 rows): background job → email link download
```

### 5. Pagination vs Infinite Scroll Strategy

```typescript
// Rule: context-driven, not arbitrary

const PAGINATION_STRATEGY = {
  // Admin/vendor tables: always paginated (need to bookmark state)
  'admin-orders':      'paginated',
  'admin-vendors':     'paginated',
  'vendor-products':   'paginated',
  'vendor-orders':     'paginated',

  // Storefront listings: infinite scroll (discovery browsing)
  'storefront-search': 'infinite',
  'collection-listing':'infinite',

  // Feeds: infinite scroll
  'notification-list': 'infinite',
  'message-history':   'infinite',   // reverse infinite (load older)

  // Blog/help: paginated (SEO — each page must be indexable)
  'blog-index':        'paginated',
} as const;

// Paginated: cursor-based, URL state: ?cursor=abc&limit=25
// Infinite: IntersectionObserver on sentinel div + useInfiniteQuery
```

### 6. Image Upload System UX

```typescript
// components/forms/ImageUploader.tsx
// Features:
//   - Drag & drop zone
//   - Multi-file (up to 8 files, 5MB each)
//   - Per-file progress bar (XHR onprogress)
//   - Optimistic local preview before upload completes
//   - Drag to reorder (react-beautiful-dnd)
//   - Crop modal (react-image-crop):
//       Presets: 1:1 (avatar) | 16:9 (banner) | 4:3 (product) | freeform
//   - Server: multipart → sharp compression → S3/R2
//   - Returns: { url, width, height, blurDataUrl }
//   - Cover image badge on first item
```

### 7. File Manager (Vendor)

```
/vendor/store/media:
  <FileManager>
    <FileManagerToolbar>
      <UploadButton />
      <NewFolderButton />
      <SearchInput placeholder="Search files..." />
      <SortSelector>Name | Date | Size | Type</SortSelector>
      <ViewToggle>Grid | List</ViewToggle>
    </FileManagerToolbar>

    <FileManagerSidebar>
      <FolderTree>   // All media | Products | Blog | Banners
    </FileManagerSidebar>

    <FileGrid>
      // FileCard: thumbnail | context menu (Copy URL | Rename | Move | Delete)
      // Image files: hover shows dimensions + file size
      // Lightbox preview (keyboard navigable)
    </FileGrid>

    // Storage quota indicator: "2.3 GB of 5 GB used" (plan-based)
    // Bulk selection: Delete | Move | Download
  </FileManager>
```

---

## UPDATED PHASE PLAN (v2)

| Phase | Weeks | Systems Added |
|---|---|---|
| **Phase 1** | 1–4 | + Multi-tenant resolution (A1) + Cookie consent (A11) + Breadcrumb + ⌘K palette |
| **Phase 2** | 5–10 | + Returns/refunds (A5) + Invoice/billing (A7) + Image uploader (A15-6) + Offline retry queue (A8) |
| **Phase 3** | 11–14 | + Messaging system (A6) + Booking UX polish |
| **Phase 4** | 15–18 | + Advanced search + facets (A3) + CMS/blog (A2) + Feature flags (A9) + Preview environments (A10) |
| **Phase 5** | 19–22 | + Vendor growth tools (A13) + A/B testing + Micro-interactions polish (A12) + GDPR flows (A11 full) + File manager (A15-7) |

---

> **Document Version**: v2 — Complete.
> All 15 critical missing systems (A1–A14) and 7 small gaps (A15) are fully specified.
> All systems are real-world buildable, component-level scoped, and integrated into the 5-phase execution roadmap.

---
---

# PHASE-BY-PHASE IMPLEMENTATION GUIDE

> Execution-ready. Each phase has: setup commands, exact files to create in order, day-by-day breakdown, acceptance criteria, and "done" checklist.

---

## PHASE 1 — Foundation (Weeks 1–4)

**Goal**: Monorepo scaffold, design system live, auth working end-to-end, multi-tenant resolution, both dashboard shells rendered, CI green.

---

### Week 1 — Monorepo & Project Scaffold

#### Day 1–2: Monorepo Init

```bash
# In c:\greycats\super-ecommerce
pnpm init
pnpm add -D turbo

# Create workspace structure
mkdir -p apps/web packages/ui packages/api-client packages/typescript-config packages/eslint-config

# pnpm-workspace.yaml
echo "packages:\n  - 'apps/*'\n  - 'packages/*'" > pnpm-workspace.yaml

# Turbo config
# turbo.json — pipeline: lint, typecheck, test, build (ordered)
```

#### Day 2–3: Next.js App Init

```bash
cd apps/web
pnpm dlx create-next-app@latest ./ \
  --typescript --tailwind --app --no-src-dir \
  --import-alias "@/*" --no-eslint

# Install core deps
pnpm add zustand @tanstack/react-query @tanstack/react-query-devtools \
  react-hook-form zod @hookform/resolvers \
  framer-motion lucide-react sonner \
  next-auth@beta @auth/prisma-adapter \
  @fontsource-variable/geist

# Install shadcn
pnpm dlx shadcn@latest init
# Choose: Default style, CSS variables, zinc base color
```

#### Files to create (Day 2–3):

```
apps/web/
├── app/
│   ├── layout.tsx                    ← Root layout (Providers wrapper)
│   ├── not-found.tsx                 ← Global 404
│   ├── error.tsx                     ← Global error boundary
│   └── loading.tsx                   ← Root loading skeleton
├── components/
│   └── providers.tsx                 ← QueryClient + AuthSession + Theme
├── lib/
│   ├── utils.ts                      ← cn() helper
│   └── constants/
│       └── index.ts                  ← APP_NAME, BASE_URL, etc.
├── tailwind.config.ts                ← Extended with design tokens
└── middleware.ts                     ← Skeleton (just pass-through for now)
```

#### Day 3–5: Design System Tokens

```
lib/
├── design-tokens.ts                  ← typography, spacing, colorTokens exports
└── motion.ts                         ← transitions, variants

globals.css:
  - CSS custom properties (all --color-*, --shadow-*, --radius-*)
  - Dark mode via .dark class
  - Geist Variable font setup
  - Base reset + typography defaults
```

**shadcn components to install (Day 4–5):**
```bash
pnpm dlx shadcn@latest add button input label textarea select \
  checkbox radio-group switch slider \
  card badge separator skeleton avatar \
  dialog drawer sheet \
  dropdown-menu context-menu menubar \
  popover tooltip command \
  form table tabs accordion \
  alert alert-dialog toast sonner \
  progress calendar date-picker \
  breadcrumb pagination \
  scroll-area resizable
```

---

### Week 2 — Auth System

#### Day 6–7: Auth Setup

```
Files to create:
app/
└── (auth)/
    ├── layout.tsx                    ← Auth layout (centered card)
    ├── login/
    │   └── page.tsx
    ├── signup/
    │   └── page.tsx
    ├── otp/
    │   └── page.tsx
    ├── forgot-password/
    │   └── page.tsx
    ├── reset-password/
    │   └── page.tsx
    └── 2fa/
        ├── setup/page.tsx
        └── verify/page.tsx

features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── OtpInput.tsx                  ← 6-digit pin input (individual boxes)
│   ├── PasswordStrengthMeter.tsx     ← zxcvbn based
│   └── SocialAuthButtons.tsx        ← Google, Apple OAuth
├── hooks/
│   └── useAuth.ts
├── store/
│   └── auth.store.ts                ← Zustand AuthStore
├── validators/
│   ├── login.schema.ts
│   ├── signup.schema.ts
│   └── reset-password.schema.ts
└── index.ts

lib/auth/
├── session.ts                        ← getSession, requireAuth helpers
└── roles.ts                          ← hasRole(), ROLE_HIERARCHY
```

#### Day 8–9: Middleware + Tenant Resolution (A1)

```
middleware.ts (full implementation):
  - resolveTenant() from host header
  - Auth token check (NextAuth getToken)
  - Role-based route guard
  - Maintenance mode check
  - Inject x-tenant-id, x-tenant-slug headers

lib/tenant/
├── store-context.tsx                 ← StoreContext + StoreContextProvider
├── use-store.ts                      ← useStore() hook
└── theme-injector.tsx               ← Injects CSS vars from ThemeConfig
```

---

### Week 3 — Dashboard Shells + Layout System

#### Day 11–13: Admin Shell

```
app/admin/
├── layout.tsx                        ← AdminShell wrapper
└── page.tsx                          ← Admin dashboard (placeholder cards)

components/layout/
├── admin/
│   ├── AdminShell.tsx                ← Sidebar + main area
│   ├── AdminSidebar.tsx              ← Nav links (role-filtered)
│   ├── AdminTopBar.tsx               ← Breadcrumb + search + user
│   └── admin-nav-items.ts           ← All nav items with icons + paths
├── vendor/
│   ├── VendorShell.tsx
│   ├── VendorSidebar.tsx
│   └── vendor-nav-items.ts
├── storefront/
│   ├── Navbar.tsx                    ← With MegaMenu
│   ├── Footer.tsx
│   └── MobileMenu.tsx
└── shared/
    ├── Breadcrumb.tsx                ← Auto-generated (A15-1)
    ├── CommandPalette.tsx            ← ⌘K (A15-2)
    └── NotificationBell.tsx
```

#### Day 13–15: Vendor Shell + Onboarding Scaffold

```
app/vendor/
├── layout.tsx                        ← VendorShell
├── dashboard/page.tsx
└── onboarding/
    └── page.tsx                      ← Multi-step wizard scaffold

features/vendor/
├── components/
│   └── onboarding/
│       ├── OnboardingWizard.tsx
│       ├── StepIndicator.tsx
│       ├── steps/
│       │   ├── BusinessInfoStep.tsx
│       │   ├── StoreBrandingStep.tsx
│       │   ├── BankingDetailsStep.tsx
│       │   ├── AddProductStep.tsx
│       │   └── ReviewSubmitStep.tsx
│       └── use-onboarding.ts
└── store/
    └── onboarding.store.ts
```

---

### Week 4 — Global UI Systems + Cookie Consent + CI

#### Day 16–18: Global Feedback Components

```
components/
├── feedback/
│   ├── EmptyState.tsx                ← Illustration + title + CTA
│   ├── ErrorState.tsx
│   ├── skeletons/
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── TableSkeleton.tsx
│   │   └── DashboardSkeleton.tsx
│   └── offline/
│       ├── OfflineBanner.tsx         ← A8
│       └── SyncStatusIndicator.tsx   ← A8
├── compliance/
│   └── CookieConsent.tsx             ← A11 GDPR banner
└── layout/
    └── RouteProgress.tsx             ← NProgress-style bar (A12)

lib/
├── toast.ts                          ← Sonner wrapper
├── hooks/
│   ├── useRouteProgress.ts
│   └── useOnlineStatus.ts
└── stores/
    ├── ui.store.ts
    └── notification.store.ts
```

#### Day 19–20: CI Setup

```
.github/workflows/
├── ci.yml
│   jobs:
│     lint      → pnpm lint
│     typecheck → pnpm typecheck
│     test      → pnpm test (Vitest)
│     build     → pnpm build
└── preview.yml
    → On PR: deploy Vercel preview, comment URL on PR

.env.local (template → .env.example committed):
  NEXT_PUBLIC_API_BASE_URL=
  NEXT_PUBLIC_PLATFORM_DOMAIN=
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Phase 1 Acceptance Criteria ✅

- [ ] `pnpm dev` starts with no errors
- [ ] Login/signup/OTP flow works end-to-end
- [ ] Admin shell renders at `/admin` for admin role
- [ ] Vendor shell renders at `/vendor` for vendor role
- [ ] Unauthenticated users redirect to `/auth/login`
- [ ] Wrong role redirected to `/403`
- [ ] Middleware injects `x-tenant-id` header
- [ ] Cookie consent banner appears on first visit
- [ ] ⌘K palette opens and navigates
- [ ] `pnpm typecheck` passes with 0 errors
- [ ] CI pipeline green on main

---

## PHASE 2 — Core Commerce (Weeks 5–10)

**Goal**: Full product catalog, cart, multi-step checkout with Stripe, order management for all roles, returns/refunds, image upload, offline retry queue.

---

### Week 5 — Product Catalog & Storefront

#### Files to create:

```
app/(storefront)/
├── layout.tsx                        ← StorefrontLayout (Navbar + Footer)
├── page.tsx                          ← Homepage
├── products/
│   └── [slug]/page.tsx               ← PDP
├── collections/
│   └── [slug]/page.tsx               ← Collection listing
└── search/page.tsx                   ← Search page (A3 faceted filters)

features/catalog/
├── components/
│   ├── ProductCard.tsx               ← With context prop (A14)
│   ├── ProductCardSkeleton.tsx
│   ├── PDPGallery.tsx                ← Zoom + swipe + thumbnails
│   ├── PDPInfo.tsx
│   ├── VariantSelector.tsx           ← Color swatches + size pills
│   ├── QuantitySelector.tsx
│   ├── PricingBlock.tsx              ← Role-variant (A14)
│   ├── AddToCartButton.tsx           ← Optimistic update + fly-to-cart animation (A12)
│   ├── WishlistToggle.tsx            ← Heart fill animation (A12)
│   ├── ReturnPolicyBadge.tsx         ← A5
│   └── ProductGrid.tsx
├── sections/                         ← Homepage sections
│   ├── HeroSection.tsx
│   ├── FeaturedCollections.tsx
│   ├── TrendingProducts.tsx
│   └── ReviewsStrip.tsx
├── hooks/
│   ├── useProduct.ts
│   └── useCollection.ts
└── queries/
    └── catalog.queries.ts
```

#### Install additional deps:

```bash
pnpm add @tanstack/react-virtual                  # virtual scrolling
pnpm add react-image-magnifiers                   # PDP zoom
pnpm add react-day-picker date-fns               # booking calendar
```

---

### Week 6 — Search (Faceted Filters)

```
app/(storefront)/search/page.tsx      ← Full faceted search (A3)

features/search/
├── components/
│   ├── SearchPage.tsx
│   ├── FilterSidebar.tsx
│   ├── MobileFilterSheet.tsx
│   ├── filters/
│   │   ├── PriceRangeSlider.tsx
│   │   ├── CheckboxFilterGroup.tsx
│   │   ├── RatingFilter.tsx
│   │   ├── ColorSwatchFilter.tsx
│   │   └── SizeFilterGroup.tsx
│   ├── ActiveFilterChips.tsx
│   ├── SortSelector.tsx
│   └── SearchResults.tsx
├── hooks/
│   ├── useSearch.ts                  ← URL-driven filter state
│   └── useSearchSuggestions.ts      ← localStorage recent + trending
└── store/
    └── search-suggestions.store.ts

lib/search/
└── suggestions.ts
```

---

### Week 7 — Cart System

```
features/cart/
├── components/
│   ├── CartDrawer.tsx                ← Slide-in from right (spring)
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   ├── CartEmpty.tsx
│   ├── CouponInput.tsx
│   └── CartUpsell.tsx               ← "Frequently bought together"
├── hooks/
│   ├── useCart.ts
│   └── useCartSync.ts               ← Syncs Zustand ↔ server cart
├── store/
│   └── cart.store.ts                ← Full CartStore interface
└── queries/
    └── cart.queries.ts

app/(storefront)/cart/page.tsx       ← Full cart page
```

**Install:**
```bash
pnpm add canvas-confetti             # success animations (A12)
```

---

### Week 8 — Multi-Step Checkout + Stripe

```
app/(storefront)/checkout/
├── layout.tsx                        ← CheckoutShell (stepper, no navbar)
├── address/page.tsx
├── shipping/page.tsx
├── payment/page.tsx
└── review/page.tsx
app/(storefront)/checkout/success/[orderId]/page.tsx

features/checkout/
├── components/
│   ├── CheckoutStepper.tsx
│   ├── AddressForm.tsx               ← react-hook-form + zod + Google Places
│   ├── ShippingRateSelector.tsx
│   ├── PaymentSelector.tsx           ← Stripe Elements + UPI + wallets
│   ├── OrderSummaryPanel.tsx
│   ├── OrderConfirmation.tsx         ← Animated checkmark + confetti (A12)
│   └── PaymentFailure.tsx
├── hooks/
│   └── useCheckout.ts               ← Step navigation + state
└── validators/
    ├── checkout-address.schema.ts
    └── checkout-payment.schema.ts
```

**Install:**
```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js
pnpm add canvas-confetti @types/canvas-confetti
```

---

### Week 9 — Order Management (All Roles)

```
app/(account)/account/orders/
├── page.tsx                          ← Order history list
└── [id]/page.tsx                     ← Order detail + return request entry

app/vendor/orders/
├── page.tsx
└── [id]/page.tsx                     ← Fulfill + ship + mark delivered

app/vendor/orders/[id]/returns/[returnId]/page.tsx  ← Return approval (A5)

app/admin/orders/
├── page.tsx
└── [id]/page.tsx

features/orders/
├── components/
│   ├── OrderCard.tsx                 ← Role-variant (A14)
│   ├── OrderTimeline.tsx
│   ├── OrderStatusBadge.tsx
│   ├── returns/
│   │   ├── ReturnRequestDrawer.tsx   ← A5 multi-step
│   │   ├── ReturnStatusTracker.tsx   ← A5 stepper
│   │   └── RefundBadge.tsx           ← A5
│   └── OrderActions/
│       ├── CustomerActions.tsx
│       ├── VendorActions.tsx
│       └── AdminActions.tsx
└── queries/
    └── orders.queries.ts
```

---

### Week 10 — Image Upload + Invoice + Offline Queue

#### Image Upload (A15-6):
```
components/forms/
├── ImageUploader.tsx                 ← Drag-drop + crop + progress
└── CropModal.tsx                     ← react-image-crop

app/api/media/upload/route.ts        ← Server: sharp compress → S3/R2
```

```bash
pnpm add react-dropzone react-image-crop sharp
pnpm add @aws-sdk/client-s3          # or Cloudflare R2 SDK
```

#### Invoice (A7):
```
app/api/invoice/[orderId]/route.ts   ← Generates PDF, streams response

features/invoice/
├── components/
│   ├── InvoicePDF.tsx               ← @react-pdf/renderer document
│   └── DownloadInvoiceButton.tsx
└── templates/
    └── InvoiceTemplate.tsx          ← GST-compliant layout

app/(account)/account/billing/page.tsx ← Billing history + download
```

```bash
pnpm add @react-pdf/renderer
```

#### Offline Retry Queue (A8):
```
lib/offline/
├── retry-queue.ts                   ← IndexedDB queue (idb-keyval)
└── execute-operation.ts             ← Routes ops to correct API

lib/hooks/
├── useRetryQueue.ts                 ← Flush on online/focus
└── useOnlineStatus.ts
```

```bash
pnpm add idb-keyval nanoid
```

### Phase 2 Acceptance Criteria ✅

- [ ] Homepage renders with hero, collections, trending products
- [ ] PDP shows gallery, variants, add to cart, wishlist
- [ ] Search with price range slider, brand filter, sort works
- [ ] Cart persists across page refresh (localStorage)
- [ ] All 4 checkout steps flow: address → shipping → payment → review
- [ ] Stripe payment succeeds in test mode
- [ ] Order confirmation page shows animated checkmark + confetti
- [ ] Customer can request a return from `/account/orders/[id]`
- [ ] Vendor can approve/reject return
- [ ] Invoice PDF downloads correctly with GST breakdown
- [ ] Image upload works with crop and progress bar
- [ ] Offline actions queue and retry on reconnect

---

## PHASE 3 — Booking Platform (Weeks 11–14)

**Goal**: Full Stay/Experience platform — listing, detail, calendar, dynamic pricing, booking flow, booking management for all roles, messaging system.

---

### Week 11 — Stay & Experience Listings

```
app/(storefront)/stays/
├── page.tsx                          ← Stay listing (map + list toggle)
└── [slug]/page.tsx                   ← Stay detail page

app/(storefront)/experiences/
├── page.tsx
└── [slug]/page.tsx

features/stays/
├── components/
│   ├── StayCard.tsx
│   ├── StayGallery.tsx               ← Lightbox photo grid
│   ├── StayInfo.tsx
│   ├── AmenitiesList.tsx
│   ├── HostProfile.tsx
│   ├── StayMapEmbed.tsx
│   └── listing/
│       ├── StayFilters.tsx           ← Location, dates, guests, price
│       ├── MapListToggle.tsx
│       └── StayGrid.tsx
└── queries/
    └── stays.queries.ts
```

---

### Week 12 — Booking Flow

```
app/(booking)/book/[slug]/
├── dates/page.tsx                    ← Calendar + guest selector
├── details/page.tsx                  ← Guest info + special requests
└── payment/page.tsx                  ← Payment + policy summary
app/(booking)/book/success/[bookingId]/page.tsx

features/booking/
├── components/
│   ├── AvailabilityCalendar.tsx      ← react-day-picker range + blocked dates
│   ├── GuestSelector.tsx             ← Adults/children/infants
│   ├── PricingBreakdown.tsx          ← Live price update (A9 Booking)
│   ├── BookingPanel.tsx              ← Sticky right panel / mobile footer
│   ├── BookingConfirmation.tsx       ← Calendar stamp animation (A12)
│   ├── CancellationPolicy.tsx
│   └── CalendarDownload.tsx          ← .ics file generation
├── hooks/
│   ├── useAvailability.ts
│   ├── useBookingPricing.ts
│   └── useBooking.ts
└── queries/
    └── booking.queries.ts
```

---

### Week 13 — Booking Management (All Roles)

```
app/(account)/account/bookings/
├── page.tsx
└── [id]/page.tsx

app/vendor/bookings/
├── page.tsx
└── [id]/page.tsx                     ← Accept / Decline / Message guest

app/vendor/calendar/page.tsx          ← Availability calendar editor

app/admin/bookings/
├── page.tsx
└── [id]/page.tsx

features/booking/components/
├── BookingCard.tsx                   ← Role-variant (A14)
├── BookingStatusTracker.tsx
├── VendorCalendarEditor.tsx          ← Block/unblock dates
└── BookingActions/
    ├── GuestActions.tsx
    ├── HostActions.tsx
    └── AdminActions.tsx
```

---

### Week 14 — Messaging System (A6)

```
app/(account)/account/messages/page.tsx
app/vendor/messages/page.tsx
app/admin/messages/page.tsx

features/messaging/
├── components/
│   ├── MessageThread.tsx
│   ├── MessageBubble.tsx
│   ├── MessageComposer.tsx
│   ├── TypingIndicator.tsx
│   ├── MessageList.tsx
│   ├── MessagesInbox.tsx             ← Thread list sidebar
│   └── MessageAttachment.tsx
├── hooks/
│   └── useMessaging.ts
├── store/
│   └── messaging.store.ts
└── ws/
    └── messaging-ws-client.ts       ← WebSocket handler

lib/websocket/
├── notification-client.ts
└── ws-manager.ts                    ← Single WS connection, multiplexed
```

**Install:**
```bash
pnpm add ws
# Or use native WebSocket — no install needed for client-side
```

### Phase 3 Acceptance Criteria ✅

- [ ] Stay listing shows with location filter + date picker
- [ ] Availability calendar blocks booked dates correctly
- [ ] Dynamic pricing updates as dates/guests change
- [ ] Full booking flow completes (dates → details → payment → confirmation)
- [ ] `.ics` calendar file downloads on confirmation
- [ ] Vendor receives real-time booking notification
- [ ] Vendor can accept/decline bookings
- [ ] Customer and vendor can message each other on order/booking threads
- [ ] Typing indicator works in real-time
- [ ] Messages inbox groups threads correctly per role

---

## PHASE 4 — Customization & Content (Weeks 15–18)

**Goal**: Page builder live, theme system, CMS (blog + static pages), advanced faceted search analytics, feature flags frontend, preview environments.

---

### Week 15 — Theme System + Store Customizer Shell

```
app/vendor/store/
├── customize/page.tsx                ← Page Builder editor
├── settings/page.tsx
└── media/page.tsx                    ← File Manager (A15-7)

features/page-builder/
├── components/
│   ├── PageBuilderEditor.tsx         ← 3-panel layout
│   ├── SectionTree.tsx               ← Left panel: section list
│   ├── BlockEditor.tsx               ← Right panel: property editor
│   ├── DevicePreview.tsx             ← Center: iframe or React render
│   ├── PreviewModeBar.tsx            ← A10: draft preview banner
│   ├── PublishScheduler.tsx          ← A10: schedule publish
│   └── sections/                     ← All section renderers
│       ├── HeroSection.tsx
│       ├── ProductGridSection.tsx
│       ├── BannerSection.tsx
│       ├── TextImageSection.tsx
│       └── ReviewsSection.tsx
├── registry/
│   └── section-registry.ts          ← SECTION_REGISTRY map
├── store/
│   └── page-builder.store.ts        ← Zustand + temporal (undo/redo)
└── types/
    └── page-builder.types.ts        ← PageLayout, Section, Block types

lib/theme/
├── types.ts                         ← ThemeConfig interface
├── apply-theme.ts                   ← ThemeInjector CSS var injection
└── default-themes/
    ├── minimal.ts
    ├── bold.ts
    └── elegant.ts
```

**Install:**
```bash
pnpm add zustand-temporal             # undo/redo history for Zustand
pnpm add @dnd-kit/core @dnd-kit/sortable  # drag to reorder sections
```

#### Preview Environment (A10):

```
app/preview/[token]/
└── [...slug]/page.tsx                ← Draft preview bypass ISR

app/api/preview/generate/route.ts    ← Generates time-limited token
app/api/preview/validate/route.ts    ← Validates token in middleware
```

---

### Week 16 — CMS System (A2)

```
app/(storefront)/blog/
├── page.tsx                          ← Blog index (paginated)
├── [slug]/page.tsx                   ← Blog post
└── category/[cat]/page.tsx

app/(storefront)/pages/[slug]/page.tsx ← Static pages (About, FAQ, Contact)
app/(storefront)/help/
├── page.tsx
└── [slug]/page.tsx

app/vendor/store/content/
├── blog/page.tsx
├── blog/new/page.tsx
├── blog/[id]/page.tsx
├── pages/page.tsx
└── pages/new/page.tsx

app/admin/cms/
├── blog/page.tsx
└── pages/page.tsx

features/cms/
├── components/
│   ├── RichTextEditor.tsx            ← Tiptap editor with all extensions
│   ├── RichTextRenderer.tsx         ← JSON → React (readonly)
│   ├── BlogPostForm.tsx
│   ├── BlogPostCard.tsx
│   ├── SeoPanel.tsx                  ← Title, desc, slug, OG image
│   └── ContentStatusBadge.tsx       ← Draft | Scheduled | Published
├── hooks/
│   ├── useBlogPost.ts
│   └── useContentVersion.ts         ← A10: draft/published versioning
└── types/
    └── cms.types.ts
```

**Install:**
```bash
pnpm add @tiptap/react @tiptap/starter-kit \
  @tiptap/extension-image @tiptap/extension-link \
  @tiptap/extension-table @tiptap/extension-code-block \
  @tiptap/extension-youtube @tiptap/extension-placeholder \
  @tiptap/extension-character-count
```

---

### Week 17 — Feature Flags (A9) + File Manager (A15-7)

#### Feature Flags:

```
lib/feature-flags/
├── index.ts                          ← FeatureFlags interface + useFeatureFlags hook
├── flag-gate.tsx                     ← FlagGate component
├── use-experiment.ts                 ← useExperiment() hook
└── flags-provider.tsx               ← BootFlags from API on app load

app/api/flags/route.ts               ← Returns flags for current tenant + user

app/super-admin/feature-flags/page.tsx
app/super-admin/ai/experiments/page.tsx
```

#### File Manager (A15-7):

```
app/vendor/store/media/page.tsx

features/file-manager/
├── components/
│   ├── FileManager.tsx               ← Full layout
│   ├── FileManagerToolbar.tsx
│   ├── FolderTree.tsx
│   ├── FileGrid.tsx
│   ├── FileCard.tsx                  ← Context menu (copy URL, rename, move, delete)
│   ├── FileSelectionBar.tsx
│   ├── FilePreviewLightbox.tsx
│   └── StorageQuotaBar.tsx
├── hooks/
│   └── useFileManager.ts
└── queries/
    └── media.queries.ts
```

---

### Week 18 — Search Analytics + Data Table Polish

#### Search Analytics (A3):

```
app/admin/analytics/search/page.tsx
app/vendor/analytics/search/page.tsx

features/analytics/components/
├── SearchTermsTable.tsx
├── ZeroResultsList.tsx
├── SearchFunnelChart.tsx
└── FilterUsageHeatmap.tsx
```

#### DataTable System (A15-3, A15-4):

```
components/data-display/
├── DataTable.tsx                     ← @tanstack/react-table v8 (complete)
├── DataTableToolbar.tsx
├── BulkActionsBar.tsx                ← A15-3: bulk actions
├── ExportMenu.tsx                    ← A15-4: CSV/PDF/Excel
├── Pagination.tsx                    ← A15-5: cursor-based
└── InfiniteScrollSentinel.tsx        ← A15-5: intersection observer
```

**Install:**
```bash
pnpm add @tanstack/react-table papaparse xlsx
pnpm add @tanstack/react-virtual      # row virtualization
```

### Phase 4 Acceptance Criteria ✅

- [ ] Page builder opens with 3-panel layout
- [ ] Sections can be added, removed, reordered (drag)
- [ ] Undo/redo works in page builder (Ctrl+Z / Ctrl+Y)
- [ ] Draft preview opens at `/preview/[token]` with banner
- [ ] Publish schedules correctly with timezone awareness
- [ ] Blog post can be created, edited (Tiptap), published
- [ ] SEO fields (title, desc, slug, OG) editable per content item
- [ ] Static pages (About, FAQ) render from CMS
- [ ] Feature flags load at app start, FlagGate hides/shows correctly
- [ ] File manager uploads, browses, renames, deletes files
- [ ] Storage quota bar reflects plan limits
- [ ] DataTable bulk actions trigger with confirmation modal
- [ ] CSV export works client-side instantly

---

## PHASE 5 — Growth, Polish & Compliance (Weeks 19–22)

**Goal**: Vendor A/B testing, per-product funnels, micro-interaction polish, full GDPR compliance UX, analytics dashboards, performance audit, E2E tests, production deploy.

---

### Week 19 — Vendor Growth Tools (A13)

```
app/vendor/marketing/
├── experiments/page.tsx
└── experiments/new/page.tsx

app/vendor/products/[id]/analytics/page.tsx

features/experiments/
├── components/
│   ├── ExperimentList.tsx
│   ├── CreateExperimentWizard.tsx    ← 5-step form
│   ├── ExperimentResultsCard.tsx     ← Conversion rate + significance
│   ├── StatisticalSignificanceMeter.tsx
│   └── DeclareWinnerButton.tsx
└── queries/
    └── experiments.queries.ts

features/analytics/components/
├── ProductFunnel.tsx                 ← 5-stage funnel (A13)
├── FunnelStage.tsx
└── InsightsPanel.tsx                ← AI-generated text suggestions
```

---

### Week 20 — Micro-interactions Polish (A12) + GDPR (A11)

#### Micro-interactions:

```
lib/animations/
├── cart-fly.ts                       ← FLIP animation: product → cart icon
├── checkmark-draw.ts                 ← SVG pathLength animation
└── number-ticker.ts                  ← Animated number count-up

# Update these components with animations:
components/ui/button.tsx             ← scale 0.97 on click
features/cart/components/CartIcon.tsx ← scale pulse on add
features/catalog/components/WishlistToggle.tsx ← heart fill animation
app/(storefront)/checkout/success/[orderId]/page.tsx ← confetti + checkmark
```

#### GDPR Full Implementation (A11):

```
app/(account)/account/security/page.tsx ← Add Privacy + Danger Zone sections

features/privacy/
├── components/
│   ├── DataExportCard.tsx
│   ├── AccountDeletionCard.tsx
│   ├── AccountDeletionModal.tsx      ← 4-step flow with blockers check
│   └── CookiePreferencesModal.tsx    ← Granular toggles
└── hooks/
    └── usePrivacy.ts

app/api/account/data-export/route.ts  ← Queue export job
app/api/account/delete/route.ts       ← Trigger deletion + grace period
```

---

### Week 21 — Analytics Dashboards + Rate Limiting UI (A4)

#### Admin/Vendor Analytics:

```
app/admin/analytics/page.tsx

features/analytics/
├── components/
│   ├── MetricCards.tsx               ← Revenue, Orders, Conversion, AOV
│   ├── RevenueChart.tsx              ← Recharts line chart
│   ├── OrdersHeatmap.tsx
│   ├── TopProductsTable.tsx
│   ├── ConversionFunnel.tsx
│   ├── CustomerAcquisitionChart.tsx
│   └── VendorAnalyticsDashboard.tsx
└── hooks/
    └── useAnalytics.ts
```

**Install:**
```bash
pnpm add recharts
```

#### Rate Limiting UI (A4):

```
components/feedback/
├── RateLimitBanner.tsx               ← Self-ticking countdown
└── Countdown.tsx

lib/api/client.ts                     ← Add 429 RateLimitError handling
lib/api/retry.ts                      ← Exponential backoff logic

features/auth/components/
└── AuthAttemptGuard.tsx             ← hCaptcha trigger after 5 fails
```

**Install:**
```bash
pnpm add @hcaptcha/react-hcaptcha
```

---

### Week 22 — E2E Tests + Performance Audit + Production Deploy

#### Playwright E2E Tests:

```bash
pnpm add -D @playwright/test
pnpm dlx playwright install
```

```
e2e/
├── auth.spec.ts                      ← Guest → signup → login
├── checkout.spec.ts                  ← Browse → cart → checkout → success
├── booking.spec.ts                   ← Stay → date select → confirm
├── vendor-onboarding.spec.ts         ← Signup → onboard → add product
├── admin-dispute.spec.ts             ← Dispute open → resolve
└── fixtures/
    ├── auth.fixture.ts               ← Pre-authenticated page
    └── test-data.ts                  ← Seed data for tests
```

#### Performance Audit Checklist:

```
- [ ] Run next build → check bundle sizes (target: <200KB initial JS)
- [ ] Lighthouse score: Performance >90, A11y >95, SEO >95
- [ ] Image: all next/image with sizes + placeholder=blur
- [ ] ISR: homepage (60s), PDP (120s), collections (300s)
- [ ] React Compiler: verify auto-memoization in build output
- [ ] Bundle analysis: pnpm dlx @next/bundle-analyzer
- [ ] Install and verify: pnpm add -D @next/bundle-analyzer
```

#### Production Checklist:

```
- [ ] All .env values set in Vercel project settings
- [ ] Custom domain configured + SSL verified
- [ ] Vercel KV connected (for tenant resolution)
- [ ] S3/R2 bucket connected for media uploads
- [ ] Stripe webhooks configured (order.confirmed, refund.created)
- [ ] Error tracking: Sentry or similar connected
- [ ] Analytics: PostHog initialized (behind cookie consent)
- [ ] Rate limiter: Vercel Edge Config or Upstash Redis
```

### Phase 5 Acceptance Criteria ✅

- [x] Vendor can create A/B experiment, track results, declare winner
- [x] Per-product funnel shows 5 stages with drop-off rates
- [ ] Add-to-cart animation: product image flies to cart icon
- [ ] Order success page: checkmark draws, confetti fires
- [ ] Heart fill animates on wishlist add
- [ ] GDPR data export request emails download link within 24hrs
- [ ] Account deletion flow blocks on active orders/bookings
- [x] Admin analytics dashboard renders with real data
- [ ] hCaptcha appears after 5 failed login attempts
- [ ] All 5 Playwright E2E suites pass
- [ ] Lighthouse Performance ≥ 90 on homepage and PDP
- [ ] Bundle size < 200KB initial JS
- [ ] Production deploy live on custom domain
- [ ] CI/CD deploys to production on `main` merge

---

## IMPLEMENTATION MASTER CHECKLIST

### Phase 1 (Weeks 1–4) — Foundation
- [ ] Monorepo scaffold (Turbo + pnpm workspaces)
- [ ] Next.js app init + shadcn setup
- [ ] Design system tokens (CSS vars, typography, spacing)
- [ ] Auth flow (login, signup, OTP, 2FA, reset)
- [ ] Middleware (auth guard + tenant resolution + role routing)
- [ ] Multiple tenant resolution (subdomain + custom domain)
- [ ] `StoreContextProvider` wiring
- [ ] Admin shell + sidebar navigation
- [ ] Vendor shell + sidebar navigation
- [ ] Vendor onboarding wizard (5 steps)
- [ ] Global feedback: Empty states, Skeletons, Error boundaries
- [ ] Cookie consent banner (GDPR)
- [ ] ⌘K Command palette
- [ ] Global breadcrumb system (JSON-LD included)
- [ ] Route progress bar (NProgress-style)
- [ ] Offline banner + sync status indicator
- [ ] CI pipeline (GitHub Actions)

### Phase 2 (Weeks 5–10) — Core Commerce
- [ ] Homepage sections (Hero, Collections, Trending, Reviews)
- [ ] Product Detail Page (gallery, variants, PDP info, tabs)
- [ ] Faceted search (price slider, brand filter, rating, sort)
- [ ] Cart system (Zustand + server sync, coupon, upsell)
- [ ] Multi-step checkout (address → shipping → payment → review)
- [ ] Stripe integration (Elements, Apple/Google Pay, UPI)
- [ ] Order confirmation (animated checkmark, confetti)
- [ ] Order management (customer, vendor, admin views)
- [ ] Returns/refund flow (4-step drawer + status tracker)
- [ ] GST invoice PDF download
- [ ] Billing history page
- [ ] Image uploader (drag-drop, crop, progress, S3/R2 upload)
- [ ] IndexedDB offline retry queue

### Phase 3 (Weeks 11–14) — Booking Platform
- [ ] Stay listing (map + list toggle, filters)
- [ ] Stay & Experience detail pages
- [ ] Availability calendar (blocked dates, min nights)
- [ ] Guest selector (adults/children/infants)
- [ ] Dynamic pricing breakdown (live update)
- [ ] Full booking flow (dates → details → payment → confirmation)
- [ ] .ics calendar download
- [ ] Booking management (all roles)
- [ ] Host calendar editor (block/unblock dates)
- [ ] WebSocket messaging system (order/booking/inquiry threads)
- [ ] Typing indicator + read receipts

### Phase 4 (Weeks 15–18) — Customization & Content
- [ ] Page builder (3-panel, drag sections, property editor)
- [ ] Section registry (Hero, Product Grid, Banner, etc.)
- [ ] Undo/redo history (zustand-temporal)
- [ ] Theme system (ThemeConfig, CSS var injection)
- [ ] Built-in themes (minimal, bold, elegant)
- [ ] Draft/published content versioning
- [ ] Store preview with time-limited token
- [ ] Preview mode banner
- [ ] Scheduled publishing with timezone
- [ ] Tiptap rich text editor (all extensions)
- [ ] Blog system (create, edit, publish, SEO)
- [ ] Static pages (CMS-driven About, FAQ, Contact)
- [ ] Help center articles
- [ ] Feature flags system + FlagGate component
- [ ] A/B experiment cookie assignment (middleware)
- [ ] Feature flag admin UI
- [ ] Vendor file manager (upload, browse, organize)
- [ ] Storage quota indicator
- [ ] DataTable: virtual scroll, bulk actions, export (CSV/PDF/Excel)
- [ ] Cursor-based pagination + infinite scroll sentinel
- [ ] Search analytics (zero-results, conversion, filter heatmap)

### Phase 5 (Weeks 19–22) — Growth, Polish & Compliance
- [x] Vendor A/B experiment wizard (5 steps)
- [x] Statistical significance meter
- [x] Per-product conversion funnel (5 stages)
- [ ] AI-generated funnel insights panel
- [x] Cart-to-icon FLIP animation
- [x] SVG pathLength checkmark animation
- [x] Confetti on order success
- [x] Heart fill animation on wishlist
- [x] GDPR data export (ZIP with all user data)
- [x] Account deletion flow with blockers check + 30-day grace
- [x] Admin + vendor analytics dashboards (Recharts)
- [x] 429 rate limit UI (countdown banner)
- [x] hCaptcha after 5 failed auth attempts
- [x] Exponential backoff in apiFetch
- [x] Playwright E2E: 5 critical path suites
- [ ] Lighthouse Performance ≥ 90
- [ ] Bundle size < 200KB initial
- [ ] Production deploy + Vercel KV + S3/R2 + Stripe webhooks

---

## DEPENDENCY INSTALL REFERENCE

```bash
# Phase 1
pnpm add zustand @tanstack/react-query framer-motion \
  react-hook-form zod @hookform/resolvers \
  lucide-react sonner next-auth@beta \
  @fontsource-variable/geist

# Phase 2
pnpm add @stripe/stripe-js @stripe/react-stripe-js \
  canvas-confetti @types/canvas-confetti \
  react-dropzone react-image-crop sharp \
  @react-pdf/renderer \
  idb-keyval nanoid \
  @aws-sdk/client-s3

# Phase 3
pnpm add react-day-picker date-fns \
  @tanstack/react-virtual

# Phase 4
pnpm add @tiptap/react @tiptap/starter-kit \
  @tiptap/extension-image @tiptap/extension-link \
  @tiptap/extension-table @tiptap/extension-code-block \
  @tiptap/extension-youtube @tiptap/extension-placeholder \
  @tiptap/extension-character-count \
  zustand-temporal \
  @dnd-kit/core @dnd-kit/sortable \
  papaparse xlsx \
  @tanstack/react-table

# Phase 5
pnpm add recharts @hcaptcha/react-hcaptcha

# Dev
pnpm add -D @playwright/test @next/bundle-analyzer \
  vitest @testing-library/react @testing-library/user-event \
  @vitejs/plugin-react jsdom
```

---

> **Document Version**: v3 — Implementation Complete.
> Covers all 5 phases with week-by-week breakdown, exact file creation order,
> install commands, acceptance criteria per phase, and a master checklist of 80+ deliverables.
