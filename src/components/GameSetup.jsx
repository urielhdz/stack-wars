import { useState } from 'react'
import './GameSetup.css'

function GameSetup({ onStartGame, totalTechs }) {
  const [numPlayers, setNumPlayers] = useState(2)
  const [playerNames, setPlayerNames] = useState(['', ''])
  const [numTechs, setNumTechs] = useState(totalTechs)
  const [useAllTechs, setUseAllTechs] = useState(true)

  const handleNumPlayersChange = (e) => {
    const num = parseInt(e.target.value) || 2
    const clampedNum = Math.max(2, Math.min(10, num))
    setNumPlayers(clampedNum)
    
    // Update player names array
    const newNames = Array(clampedNum).fill('').map((_, i) => 
      playerNames[i] || ''
    )
    setPlayerNames(newNames)
  }

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleStart = () => {
    if (playerNames.every(name => name.trim() !== '')) {
      const techLimit = useAllTechs ? null : numTechs
      onStartGame(playerNames.map(name => name.trim()), techLimit)
    }
  }

  const allNamesFilled = playerNames.every(name => name.trim() !== '')

  return (
    <div className="game-setup">
      <div className="setup-container">
        {/* <div className="logo-container">
          <img src="/logo.svg" alt="Logo" className="logo" />
        </div> */}
        <h1>Stack Wars</h1>
        <p className="subtitle">Draftea tu stack tecnológico favorito!</p>
        
        <div className="form-group">
          <label htmlFor="num-players">Número de Jugadores (2-10)</label>
          <input
            id="num-players"
            type="number"
            min="2"
            max="10"
            value={numPlayers}
            onChange={handleNumPlayersChange}
            className="num-input"
          />
        </div>

        <div className="form-group">
          <div className="range-control-header">
            <label htmlFor="num-techs">Número de Tecnologías Disponibles</label>
            <div className="range-value-display">
              {useAllTechs ? `Todas (${totalTechs})` : numTechs}
            </div>
          </div>
          <div className="range-control-wrapper">
            <input
              id="num-techs"
              type="range"
              min="20"
              max={totalTechs}
              step="10"
              value={useAllTechs ? totalTechs : numTechs}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                setNumTechs(value)
                setUseAllTechs(value === totalTechs)
              }}
              className="range-input"
              disabled={useAllTechs}
            />
            <div className="range-labels">
              <span>20</span>
              <span>{totalTechs}</span>
            </div>
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={useAllTechs}
              onChange={(e) => setUseAllTechs(e.target.checked)}
              className="checkbox-input"
            />
            <span>Usar todas las tecnologías</span>
          </label>
        </div>

        <div className="player-names-section">
          <h2>Nombres de Jugadores</h2>
          {playerNames.map((name, index) => (
            <div key={index} className="form-group">
              <label htmlFor={`player-${index}`}>Nombre del Jugador {index + 1}</label>
              <input
                id={`player-${index}`}
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Ingresa el nombre del Jugador ${index + 1}`}
                className="name-input"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          disabled={!allNamesFilled}
          className={`start-button ${allNamesFilled ? 'enabled' : 'disabled'}`}
        >
          Iniciar Draft
        </button>
      </div>
    </div>
  )
}

export default GameSetup

