import { useState, useEffect } from "react";
import "./cookieBanner.css";

const COOKIE_CONSENT_KEY = "cookie-consent";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const consent: string | null = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent || consent !== "true") {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "true");
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="cookie-banner" role="alert">
            <div className="cookie-content">
                We use cookies and local storage to enhance your experience,
                manage authentication, and remember your theme preferences. No
                tracking or third-party cookies are used.
            </div>
            <button
                className="cookie-accept-button"
                onClick={handleAccept}
                aria-label="Accept cookies"
            >
                Got it
            </button>
        </div>
    );
};
