# Admin UI

A modern, responsive admin interface built with React, TypeScript, and Mantine UI.

## Features

### 🔐 Authentication
- Login system with protected routes
- Session management
- Demo credentials: `admin@example.com` / `password`

### 📊 Dashboard
- Key metrics and statistics
- Recent activity feed
- System status monitoring
- Responsive layout with cards and charts

### 👥 User Management
- User listing with search functionality
- Add, edit, and delete users
- User status management (active, inactive, pending)
- Role-based access control

### 🏢 Organization Management
- Organization listing and management
- Organization types and status tracking
- Member count tracking
- Search and filter capabilities

### 📈 Analytics
- User activity charts
- Traffic source analysis
- Top pages tracking
- Performance metrics

### 📋 Reports
- Report generation system
- Multiple report types (User Analytics, Financial, System, etc.)
- Date range selection
- Export functionality

### ⚙️ Settings
- General application settings
- System configuration
- Feature toggles
- Security settings

## Architecture

The admin UI follows a clean, modular architecture:

```
src/
├── components/
│   ├── Layout/
│   │   ├── AdminLayout.tsx    # Main admin layout with sidebar
│   │   ├── Navbar.tsx         # Navigation sidebar
│   │   └── Header.tsx         # Top header with user menu
│   └── ProtectedRoute.tsx     # Authentication wrapper
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
├── pages/
│   ├── admin/                 # Admin pages
│   │   ├── Dashboard.page.tsx
│   │   ├── Users.page.tsx
│   │   ├── Organizations.page.tsx
│   │   ├── Analytics.page.tsx
│   │   ├── Reports.page.tsx
│   │   └── Settings.page.tsx
│   ├── Home.page.tsx          # Landing page
│   └── Login.page.tsx         # Authentication page
└── Router.tsx                 # Route configuration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   yarn dev
   ```

3. **Access the application:**
   - Open `http://localhost:5173`
   - Click "Login to Admin Panel"
   - Use demo credentials: `admin@example.com` / `password`

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Mantine UI** - Component library
- **React Router** - Navigation
- **Vite** - Build tool
- **Vitest** - Testing framework

## Key Components

### AdminLayout
The main layout component that provides:
- Responsive sidebar navigation
- Header with user menu
- Mobile-friendly burger menu
- Consistent spacing and structure

### Authentication
- `AuthContext` manages authentication state
- `ProtectedRoute` guards admin routes
- `LoginPage` provides authentication interface
- Session persistence (can be extended with localStorage)

### Data Management
- Mock data for demonstration
- State management with React hooks
- Search and filtering capabilities
- CRUD operations for entities

## Customization

### Adding New Pages
1. Create a new page component in `src/pages/admin/`
2. Add the route to `src/Router.tsx`
3. Add navigation item to `src/components/Layout/Navbar.tsx`

### Styling
- Uses Mantine's theming system
- Customizable through `src/theme.ts`
- Responsive design with Mantine's breakpoint system

### Backend Integration
- Replace mock data with API calls
- Update `AuthContext` for real authentication
- Add error handling and loading states

## Development

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run tests
- `yarn lint` - Run linter

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Vitest for testing

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced charts and graphs
- [ ] File upload functionality
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Advanced search and filters
- [ ] Export to PDF/Excel
- [ ] User activity logs
- [ ] Role-based permissions
- [ ] API documentation

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Add tests for new features
4. Follow the established naming conventions
5. Update documentation as needed 