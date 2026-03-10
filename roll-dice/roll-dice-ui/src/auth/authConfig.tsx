export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID, // From Azure Portal
        authority: import.meta.env.VITE_AUTHORITY,
        redirectUri: import.meta.env.VITE_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Scopes for the access token (e.g., to read user profile)
export const loginRequest = {
    scopes: [import.meta.env.VITE_SCOPES]
};