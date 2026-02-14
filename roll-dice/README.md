# Dice Roller Application

A full-stack dice rolling application with a .NET 10 minimal API backend and React frontend, secured with **Microsoft Entra ID (Azure AD)** authentication.

## Project Structure

```
roll-dice/
├── RollDice.Api/          # .NET 10 Minimal API
└── roll-dice-ui/          # React + TypeScript + Vite
```

## 🔐 Microsoft Entra ID Authentication

This application uses **Microsoft Entra ID** (formerly Azure AD) for authentication and authorization. The API is protected and requires a valid JWT token to access the `/roll-dice` endpoint.

### Microsoft Entra ID Configuration

#### Step 1: Register the API Application (`roll-dice-api`)

1. Navigate to [Azure Portal](https://portal.azure.com) → **Microsoft Entra ID** → **App registrations**
2. Click **New registration**
3. Configure the registration:
   - **Name**: `roll-dice-api`
   - **Supported account types**: Accounts in this organizational directory only (Single tenant)
   - **Redirect URI**: Leave blank for now
4. Click **Register**
5. Note down the following values from the **Overview** page:
   - **Application (client) ID**
   - **Directory (tenant) ID**

#### Step 2: Expose an API Scope

1. In the `roll-dice-api` app registration, go to **Expose an API**
2. Click **Add a scope**
3. Accept the default Application ID URI or set it to `api://roll-dice-api`
4. Configure the scope:
   - **Scope name**: `roll.dice`
   - **Who can consent**: Admins and users
   - **Admin consent display name**: Roll dice
   - **Admin consent description**: Allows the application to roll dice
   - **User consent display name**: Roll dice
   - **User consent description**: Allows the application to roll dice on your behalf
   - **State**: Enabled
5. Click **Add scope**
6. Note down the full scope: `api://roll-dice-api/roll.dice`

#### Step 3: Register the Client Application (`roll-dice-ui`)

1. Go back to **App registrations** and click **New registration**
2. Configure the registration:
   - **Name**: `roll-dice-ui`
   - **Supported account types**: Accounts in this organizational directory only (Single tenant)
   - **Redirect URI**: 
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:5173`
3. Click **Register**
4. Note down the **Application (client) ID**

#### Step 4: Configure API Permissions for the Client

1. In the `roll-dice-ui` app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **My APIs** tab
4. Select `roll-dice-api`
5. Select **Delegated permissions**
6. Check the `roll.dice` permission
7. Click **Add permissions**
8. Click **Grant admin consent** (if you have admin privileges)

#### Step 5: Configure Authentication Settings

1. In the `roll-dice-ui` app registration, go to **Authentication**
2. Under **Implicit grant and hybrid flows**, ensure:
   - ✅ **Access tokens** (used for implicit flows)
   - ✅ **ID tokens** (used for implicit and hybrid flows)
3. Click **Save**

---

## Backend API (.NET 10)

### Prerequisites
- .NET 10 SDK
- Microsoft Entra ID tenant with app registrations configured

### Configuration

Create or update `appsettings.json` with your Entra ID settings:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "<your-tenant-id>",
    "ClientId": "<roll-dice-api-client-id>",
    "Audience": "api://roll-dice-api"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Urls": "http://localhost:5000"
}
```

### Required NuGet Packages

```bash
dotnet add package Microsoft.Identity.Web
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Running the API

```bash
cd RollDice.Api
dotnet run
```

The API will start on `http://localhost:5000`

### API Endpoint

**GET** `/roll-dice?numberOfDice={number}` 🔒 **Requires Authentication**

- **Parameter**: `numberOfDice` (integer, 1-100)
- **Returns**: Array of integers representing dice values (1-6)
- **Authorization**: Bearer token required

Example with authentication:
```bash
curl -X GET "http://localhost:5000/roll-dice?numberOfDice=5" \
  -H "Authorization: Bearer <your-access-token>"
```

Response:
```json
[3, 6, 1, 4, 2]
```

## Frontend (React)

### Prerequisites
- Node.js (v18 or higher)
- npm
- Microsoft Entra ID tenant with app registrations configured

### Configuration

Create a `.env` file in the `roll-dice-ui` directory:

```env
VITE_ENTRA_CLIENT_ID=<roll-dice-ui-client-id>
VITE_ENTRA_TENANT_ID=<your-tenant-id>
VITE_ENTRA_REDIRECT_URI=http://localhost:5173
VITE_API_SCOPE=api://roll-dice-api/roll.dice
VITE_API_BASE_URL=http://localhost:5000
```

### Required Packages

```bash
npm install @azure/msal-browser @azure/msal-react
```

### Installation

```bash
cd roll-dice-ui
npm install
```

### Running the Frontend

```bash
npm run dev
```

The application will start on `http://localhost:5173`

---

## Features

- 🎲 Roll multiple dice (1-100)
- 🔐 **Microsoft Entra ID authentication** - Secure login with Azure AD
- 🔒 **Protected API** - JWT token-based authorization
- 🎨 Beautiful dark purple themed UI
- 📱 Responsive design
- ✨ Smooth animations and hover effects
- 🔄 Real-time dice rolling
- ⚡ Fast and lightweight

## Tech Stack

### Backend
- .NET 10
- Minimal APIs
- **Microsoft.Identity.Web** - Entra ID authentication
- **JWT Bearer Authentication**
- CORS enabled

### Frontend
- React 18
- TypeScript
- Vite
- **@azure/msal-browser** - Microsoft Authentication Library
- **@azure/msal-react** - MSAL React wrapper
- CSS3 with custom properties
- Glassmorphism design

## Usage

### First Time Setup

1. **Configure Microsoft Entra ID** (see configuration section above)
2. **Update backend `appsettings.json`** with your Entra ID settings
3. **Create frontend `.env` file** with your Entra ID configuration
4. **Install dependencies** for both backend and frontend

### Running the Application

1. Start the backend API (port 5000):
   ```bash
   cd RollDice.Api
   dotnet run
   ```

2. Start the frontend application (port 5173):
   ```bash
   cd roll-dice-ui
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`
4. **Sign in** with your Microsoft Entra ID account
5. Enter the number of dice you want to roll (1-100)
6. Click "Roll Dice" or press Enter
7. View the results displayed as cards

### Testing with Postman

To test the API directly with Postman:

1. Get an access token from Entra ID:
   - Use the **Authorization Code Flow** or **Implicit Flow**
   - Scope: `api://roll-dice-api/roll.dice`
   
2. Make a GET request:
   ```
   GET http://localhost:5000/roll-dice?numberOfDice=5
   Headers:
     Authorization: Bearer <your-access-token>
   ```

## Design

The application features a modern dark purple theme with:
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive grid layout
- Hover interactions
- Secure authentication flow
