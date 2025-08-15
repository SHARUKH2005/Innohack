# Learnify

A modern learning management system built with Next.js 14, featuring secure authentication, interactive course management, and comprehensive progress tracking.

## Technical Architecture

Learnify leverages a modern tech stack with an emphasis on performance, type safety, and component reusability:

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety and developer experience
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui for accessible, customizable UI components
- **Authentication**: Clerk for secure user authentication and profile management
- **Rendering**: Server and Client Components for optimal performance
- **Routing**: File-based routing with route groups and layouts

## Core Features

### Authentication System

Learnify implements a robust authentication system using Clerk, offering:

- **Email/Password Authentication**: Secure credential-based sign-in
- **Social Authentication**: Integration with third-party providers
- **Protected Routes**: Route-level authentication via middleware
- **User Profiles**: Comprehensive user profile management
- **Session Management**: Secure session handling with device tracking
- **Security Features**: Password strength enforcement, suspicious login detection

```typescript
// Auth protection implementation in middleware.ts
export default withClerkMiddleware((req) => {
  const { pathname } = req.nextUrl;
  const isPublicPath = publicPaths.find(path => 
    pathname.startsWith(path) || pathname.includes('/api/'));
    
  if (!isPublicPath && !req.auth.userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }
});
```

### User Profile Management

The profile section provides comprehensive account management capabilities:

- **Account Information**: Edit personal information and preferences
- **Security Management**: Password changes and 2FA configuration
- **Session Tracking**: View and manage active sessions across devices
- **Location Detection**: Geographic location tracking of login attempts
- **Device Information**: Browser and OS details for connected devices
- **IP Address Monitoring**: Tracking of IP addresses with geographic data
- **Session Timestamps**: Precise login time tracking for all sessions

Security implementation secures user accounts with:
```
Account
Manage your account info.

Secured by Clerk

Security
••••••••••  // Masked password

MacBook Pro  // Example device

This device
Firefox 123.0.0.0  // Example browser information

192.168.1.1 (New York, US)  // Example IP with geolocation

Today at 09:45 AM  // Example session timestamp

Active devices  // List of logged-in sessions across devices
```

### Learning Dashboard

The dashboard provides an intuitive interface for students to:

- **Course Overview**: See enrolled courses with progress indicators
- **Progress Tracking**: Visual representation of course completion status
- **Learning Statistics**: Track time spent, courses completed, and overall progress
- **Quick Access**: Continue learning from where you left off
- **Course Discovery**: Find new courses based on interests and learning goals

### Course Management

Comprehensive course management features:

- **Course Catalog**: Browse available courses with filtering and search
- **Course Details**: In-depth course information with curriculum breakdown
- **Progress Tracking**: Visual progress bars and completion indicators
- **Learning Paths**: Structured learning sequences with prerequisites
- **Bookmarking**: Save courses for later access

```tsx
// CourseCard component with interactive bookmark functionality
export function CourseCard({ 
  id, title, description, progress, hoursLeft, gradient 
}: CourseCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Course content rendering */}
      <div className="flex space-x-3">
        <Button className="flex-1">
          {progress > 0 ? "Continue Learning" : "Start Learning"}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleBookmark}
        >
          {bookmarked ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </div>
    </div>
  );
}
```

### Community Features

Interactive community engagement tools:

- **Discussion Forums**: Course-specific and general discussion areas
- **Member Directory**: Connect with fellow learners
- **Content Sharing**: Share resources and learning materials
- **Q&A Functionality**: Ask questions and provide answers

## Routing Structure

```
├── app/                       
│   ├── (auth)/                # Authentication route group
│   │   ├── layout.tsx         # Auth layout
│   │   └── (routes)/          
│   │       ├── sign-in/       # Sign-in flow
│   │       └── sign-up/       # Registration flow
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── layout.tsx         # Dashboard layout with navigation
│   │   └── (routes)/          
│   │       ├── page.tsx       # Main dashboard
│   │       ├── courses/       # Course management
│   │       │   └── [courseId] # Dynamic course detail pages
│   │       ├── browse/        # Course discovery
│   │       ├── progress/      # Learning progress tracking
│   │       └── community/     # Community features
```

## Navigation System

The application implements a shared navbar component that provides consistent navigation across all authenticated routes:

```tsx
// Navbar component with active route highlighting
export function Navbar({ title = "Learnify" }: NavbarProps) {
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Dashboard", active: pathname === "/" },
    { href: "/courses", label: "My Courses", active: pathname === "/courses" },
    { href: "/browse", label: "Browse", active: pathname === "/browse" },
    { href: "/progress", label: "Progress", active: pathname === "/progress" },
    { href: "/community", label: "Community", active: pathname === "/community" }
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Navigation implementation */}
    </header>
  );
}
```

## Development Setup

```bash
# Clone repository
git clone https://github.com/jjacobsonn/lms-framework.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk API keys

# Start development server
npm run dev
```

## Performance Optimization

- **Component Chunking**: Automatic code splitting for optimized loading
- **Image Optimization**: Next.js Image component for optimal asset delivery
- **Selective Hydration**: Prioritized interactivity for critical UI elements
- **Edge Middleware**: Efficient authentication checks at the network edge
- **Shared Components**: Reusable UI elements to reduce bundle size
- **Responsive Design**: Mobile-first approach for all viewport sizes

## Security Implementation

- **Protected Routes**: Authentication middleware for route protection
- **Clerk Integration**: Enterprise-grade authentication provider
- **Session Management**: Secure session handling with device tracking
- **Input Validation**: Client and server-side validation to prevent attacks
- **Content Security**: Proper content security policies for asset loading
- **Password Security**: Strong password requirements and breach detection

## Future Enhancements

- **Advanced Analytics**: Detailed learning analytics and recommendations
- **Content Creation Tools**: Course authoring and publishing capabilities
- **Assessment System**: Quiz and assignment functionality
- **Certification**: Course completion certification and verification
- **API Integration**: LTI support for integration with other learning tools
- **Mobile Applications**: Native mobile apps for iOS and Android
