import { useState } from 'react'
import TurnIndicator from './TurnIndicator'
import TechPool from './TechPool'
import PlayerBoards from './PlayerBoards'
import './DraftScreen.css'

function DraftScreen({ techPool, players, currentPlayerIndex, categories, onTechPick }) {
  const [draggedTech, setDraggedTech] = useState(null)

  const handleDragStart = (tech) => {
    if (!tech.isPicked) {
      setDraggedTech(tech)
    }
  }

  const handleDragEnd = () => {
    setDraggedTech(null)
  }

  const handleDrop = (categoryId, playerIndex) => {
    if (!draggedTech) return

    const success = onTechPick(draggedTech.id, categoryId, playerIndex)
    if (success) {
      setDraggedTech(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="draft-screen">
      <TurnIndicator
        currentPlayer={players[currentPlayerIndex]}
        playerIndex={currentPlayerIndex}
        totalPlayers={players.length}
      />
      
      <div className="draft-content">
        <TechPool
          techPool={techPool}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        
        <PlayerBoards
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          categories={categories}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  )
}

export default DraftScreen

