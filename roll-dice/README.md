# Dice Roller Application

A full-stack dice rolling application with a .NET 10 minimal API backend and React frontend.

## Project Structure

```
roll-dice/
├── RollDice.Api/          # .NET 10 Minimal API
└── roll-dice-ui/          # React + TypeScript + Vite
```

## Backend API (.NET 10)

### Prerequisites
- .NET 10 SDK

### Running the API

```bash
cd RollDice.Api
dotnet run
```

The API will start on `http://localhost:5000`

### API Endpoint

**POST** `/roll-dice?numberOfDice={number}`

- **Parameter**: `numberOfDice` (integer, 1-100)
- **Returns**: Array of integers representing dice values (1-6)

Example:
```bash
curl -X POST "http://localhost:5000/roll-dice?numberOfDice=5"
```

Response:
```json
[3, 6, 1, 4, 2]
```

## Frontend (React)

### Prerequisites
- Node.js (v18 or higher)
- npm

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

## Features

- 🎲 Roll multiple dice (1-100)
- 🎨 Beautiful dark purple themed UI
- 📱 Responsive design
- ✨ Smooth animations and hover effects
- 🔄 Real-time dice rolling
- ⚡ Fast and lightweight

## Tech Stack

### Backend
- .NET 10
- Minimal APIs
- CORS enabled

### Frontend
- React 18
- TypeScript
- Vite
- CSS3 with custom properties
- Glassmorphism design

## Usage

1. Start the backend API (port 5000)
2. Start the frontend application (port 5173)
3. Enter the number of dice you want to roll (1-100)
4. Click "Roll Dice" or press Enter
5. View the results displayed as cards

## Design

The application features a modern dark purple theme with:
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive grid layout
- Hover interactions
