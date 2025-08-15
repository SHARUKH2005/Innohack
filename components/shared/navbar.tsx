import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title = "Learnify" }: NavbarProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
    },
    {
      href: "/browse",
      label: "Browse",
      active: pathname === "/browse",
    },
    {
      href: "/progress",
      label: "Progress",
      active: pathname === "/progress",
    },
    {
      href: "/community",
      label: "Community",
      active: pathname === "/community",
    },
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">{title}</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link 
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors ${
                route.active 
                  ? "text-foreground border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            href="/browse" 
            className="md:hidden flex items-center justify-center p-2 rounded-full bg-background border border-border hover:bg-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
