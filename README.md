# Tech Stack Drafter

A web application for conducting a snake draft to build tech stacks. Players take turns selecting technologies from a shared pool to fill 7 different categories.

## Features

- **Snake Draft System**: Players take turns in a snake pattern (forward then backward)
- **7 Categories**: Each player must fill:
  - Main Programming Language / Backend
  - Main Database
  - Secondary Database
  - Programming Language for Scripting
  - Programming Language for AI/ML
  - Frontend Framework
  - Programming for High Performance / Big Tasks
- **Drag and Drop**: Intuitive drag-and-drop interface for selecting technologies
- **Real-time Updates**: See which technologies have been picked and whose turn it is
- **Results Display**: View all completed tech stacks at the end

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

1. **Setup**: Enter the number of players (2-10) and their names
2. **Draft**: Drag technologies from the pool to your category slots
3. **Results**: View everyone's completed tech stacks

## Technology Stack

- React 18
- Vite
- Devicon (for technology icons)

## Project Structure

```
stack-draft/
├── public/
│   └── data/
│       └── tech_pool.json    # Technology pool data
├── src/
│   ├── components/           # React components
│   │   ├── GameSetup.jsx
│   │   ├── DraftScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   └── ...
│   ├── App.jsx              # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

