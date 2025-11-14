import './TurnIndicator.css'

function TurnIndicator({ currentPlayer, playerIndex, totalPlayers }) {
  return (
    <div className="turn-indicator">
      <div className="turn-content">
        <h2>¡Es el turno de {currentPlayer?.name || 'Desconocido'} para elegir!</h2>
        <p className="turn-info">Jugador {playerIndex + 1} de {totalPlayers}</p>
      </div>
    </div>
  )
}

export default TurnIndicator

