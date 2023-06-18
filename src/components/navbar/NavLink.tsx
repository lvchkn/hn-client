import { ReactNode } from "react";
import { useRoute, useLocation, Link } from "wouter";

export interface NavLinkProps {
    href: string;
    className: string;
    children: ReactNode;
}

interface Context {
    isRouteActive: boolean;
    location: string;
    children: ReactNode;
    className: string;
}

const getClasses = (context: Context): string => {
    const { isRouteActive, location, children, className } = context;

    const isDefaultPage = children?.toString() === "Top" && location === "/";

    if (isDefaultPage || isRouteActive) {
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
    };

    const classes = getClasses(context);

    return (
        <Link href={props.href} className={classes}>
            {props.children}
        </Link>
    );
};
