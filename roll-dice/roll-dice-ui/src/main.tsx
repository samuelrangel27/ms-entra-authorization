import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { msalConfig } from "./auth/authConfig";
import { EventType, PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from './auth/signInButton.tsx';

// 1. Initialize the instance
const msalInstance = new PublicClientApplication(msalConfig);

// 2. Handle the redirect promise and set active account
// This is what processes the ?code= portion of the URL after login
msalInstance.initialize().then(() => {

  // Optional: Set the active account if one is already logged in
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  // 3. Add an event callback to handle successful login & token exchange
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
      console.log("Token exchange successful for:", account.username);
    }
  });

  // 4. Render the app only AFTER initialization is complete
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>
          <App />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="app">
            <div className="container">
              <header className="header">
                <h1>🎲 Dice Roller</h1>
                <p>Please sign in to access the application.</p>
              </header>
              <div className="login-container">
                <div className="login-card">
                  <div className="login-icon">🔐</div>
                  <SignInButton />
                </div>
              </div>
            </div>
          </div>
        </UnauthenticatedTemplate>
      </MsalProvider>
    </StrictMode>,
  );
});