import { useState } from "react";
import "./cookieBanner.css";

const COOKIE_CONSENT_KEY = "cookie-consent";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState<boolean>(() => {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            return !consent || consent !== "true";
        } catch {
            console.warn("Failed to load cookie consent from localStorage");
            return true;
        }
    });

    const handleAccept = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, "true");
        } catch {
            console.warn("Failed to save cookie consent to localStorage");
        }
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
