import PlayerBoard from './PlayerBoard'
import './PlayerBoards.css'

function PlayerBoards({ players, currentPlayerIndex, categories, onDrop, onDragOver }) {
  return (
    <div className="player-boards">
      <h3>Tableros de Jugadores</h3>
      <div className="boards-container">
        {players.map((player, index) => (
          <PlayerBoard
            key={index}
            player={player}
            playerIndex={index}
            isCurrentPlayer={index === currentPlayerIndex}
            categories={categories}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        ))}
      </div>
    </div>
  )
}

export default PlayerBoards

