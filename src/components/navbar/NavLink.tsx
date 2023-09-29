import { ReactNode } from "react";
import { useRoute, Link, useLocation } from "wouter";

export interface NavLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
    isDefaultPage: boolean;
}

interface LinkContext {
    location: string;
    isRouteActive: boolean;
    children: ReactNode;
    className?: string;
    isDefaultPage: boolean;
}

const getClasses = (context: LinkContext): string => {
    const { location, isRouteActive, className, isDefaultPage } = context;

    if (!className) return "";

    const isHighlighted =
        isDefaultPage &&
        (location === "/hn-client" ||
            location === "/" ||
            location.includes("/top/"));

    if (isHighlighted || isRouteActive) {
        return `${className} active`;
    } else {
        return className;
    }
};

export const NavLink = (props: NavLinkProps) => {
    const [isActive] = useRoute(props.href);
    const [location] = useLocation();

    const context = {
        isRouteActive: isActive,
        location: location,
        children: props.children,
        className: props.className,
        isDefaultPage: props.isDefaultPage,
    };

    const classes = getClasses(context);

    return (
        <Link href={props.href} className={classes}>
            {props.children}
        </Link>
    );
};
