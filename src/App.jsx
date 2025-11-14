import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import GameSetup from './components/GameSetup'
import DraftScreen from './components/DraftScreen'
import ResultsScreen from './components/ResultsScreen'
import TechsView from './components/TechsView'
import techPoolData from './data/tech_pool.json'

const CATEGORIES = [
  { id: 'backend', label: 'Lenguaje de Programación Principal / Backend' },
  { id: 'main_db', label: 'Base de Datos Principal' },
  { id: 'secondary_db', label: 'Base de Datos Secundaria' },
  { id: 'scripting', label: 'Lenguaje de Programación para Scripting' },
  { id: 'ai_ml', label: 'Lenguaje de Programación para IA/ML' },
  { id: 'frontend', label: 'Framework Frontend' },
  { id: 'performance', label: 'Programación para Alto Rendimiento / Tareas Grandes' },
  { id: 'web_server', label: 'Servidor Web' },
  { id: 'container_cicd', label: 'Container / CI&CD / IaaC' },
  { id: 'data_engineering', label: 'Data Engineering y Streaming' }
]

function App() {
  const [gamePhase, setGamePhase] = useState('setup')
  const [techPool, setTechPool] = useState([])
  const [players, setPlayers] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentTurnDirection, setCurrentTurnDirection] = useState('forward')
  const [totalTurnsCompleted, setTotalTurnsCompleted] = useState(0)

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const initializeGame = (playerNames, techLimit = null) => {
    const newPlayers = playerNames.map(name => ({
      name,
      board: {
        backend: null,
        main_db: null,
        secondary_db: null,
        scripting: null,
        ai_ml: null,
        frontend: null,
        performance: null,
        web_server: null,
        container_cicd: null,
        data_engineering: null
      }
    }))

    // Randomize player order
    const shuffledPlayers = shuffleArray(newPlayers)

    // Initialize tech pool - randomly select if limit is specified
    let selectedTechs = techPoolData
    if (techLimit !== null && techLimit < techPoolData.length) {
      const shuffled = shuffleArray(techPoolData)
      selectedTechs = shuffled.slice(0, techLimit)
    }
    
    const initializedPool = selectedTechs.map(tech => ({
      ...tech,
      isPicked: false
    }))
    
    setTechPool(initializedPool)
    setPlayers(shuffledPlayers)
    setCurrentPlayerIndex(0)
    setCurrentTurnDirection('forward')
    setTotalTurnsCompleted(0)
    setGamePhase('drafting')
  }

  const handleTechPick = (techId, categoryId, playerIndex) => {
    // Validate move
    if (playerIndex !== currentPlayerIndex) {
      return false // Invalid move - wrong player
    }

    const player = players[playerIndex]
    if (player.board[categoryId] !== null) {
      return false // Invalid move - slot already filled
    }

    // Find tech in pool
    const tech = techPool.find(t => t.id === techId)
    if (!tech || tech.isPicked) {
      return false // Invalid move - tech already picked
    }

    // Update player board
    const updatedPlayers = [...players]
    updatedPlayers[playerIndex] = {
      ...updatedPlayers[playerIndex],
      board: {
        ...updatedPlayers[playerIndex].board,
        [categoryId]: tech
      }
    }
    setPlayers(updatedPlayers)

    // Mark tech as picked
    const updatedPool = techPool.map(t =>
      t.id === techId ? { ...t, isPicked: true } : t
    )
    setTechPool(updatedPool)

    // Advance turn
    const newTotalTurns = totalTurnsCompleted + 1
    setTotalTurnsCompleted(newTotalTurns)

    // Check if game is over
    const totalPicksNeeded = players.length * 10
    if (newTotalTurns >= totalPicksNeeded) {
      setGamePhase('results')
      return true
    }

    // Snake draft logic
    // Round 1: P1, P2, ..., PN
    // Round 2: PN, PN-1, ..., P1
    // Round 3: P1, P2, ..., PN
    if (currentTurnDirection === 'forward') {
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1)
      } else {
        // At the end, switch to backward but stay at last player (they pick again)
        setCurrentTurnDirection('backward')
        // Don't change index - same player picks again
      }
    } else {
      if (currentPlayerIndex > 0) {
        setCurrentPlayerIndex(currentPlayerIndex - 1)
      } else {
        // At the beginning, switch to forward but stay at first player (they pick again)
        setCurrentTurnDirection('forward')
        // Don't change index - same player picks again
      }
    }

    return true
  }

  const resetGame = () => {
    const resetPool = techPoolData.map(tech => ({
      ...tech,
      isPicked: false
    }))
    setTechPool(resetPool)
    setPlayers([])
    setCurrentPlayerIndex(0)
    setCurrentTurnDirection('forward')
    setTotalTurnsCompleted(0)
    setGamePhase('setup')
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/techs" element={<TechsView />} />
          <Route path="/" element={
            <>
              {gamePhase === 'setup' && (
                <>
                  <nav className="top-nav">
                    <Link to="/techs" className="nav-link">Ver Todas las Tecnologías</Link>
                  </nav>
                  <GameSetup onStartGame={initializeGame} totalTechs={techPoolData.length} />
                </>
              )}
              {gamePhase === 'drafting' && (
                <DraftScreen
                  techPool={techPool}
                  players={players}
                  currentPlayerIndex={currentPlayerIndex}
                  categories={CATEGORIES}
                  onTechPick={handleTechPick}
                />
              )}
              {gamePhase === 'results' && (
                <ResultsScreen
                  players={players}
                  categories={CATEGORIES}
                  onNewDraft={resetGame}
                />
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

