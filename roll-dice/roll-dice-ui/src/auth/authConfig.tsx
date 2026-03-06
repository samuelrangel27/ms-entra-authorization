export const msalConfig = {
    auth: {
        clientId: "", // From Azure Portal
        authority: "",
        redirectUri: "http://localhost:41865",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
};

// Scopes for the access token (e.g., to read user profile)
export const loginRequest = {
    scopes: [""]
};