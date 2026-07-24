import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<ComponentProps<typeof Link>, "className" | "children"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
  children?: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName: _pendingClassName, to, end, children, ...props }, ref) => {
    const { pathname } = useLocation();
    const target = to.split("?")[0].split("#")[0];
    const isActive = end || target === "/" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
    return (
      <Link ref={ref} to={to} className={cn(className, isActive && activeClassName)} {...props}>
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
