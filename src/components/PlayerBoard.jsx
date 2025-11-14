import CategorySlot from './CategorySlot'
import './PlayerBoard.css'

function PlayerBoard({ player, playerIndex, isCurrentPlayer, categories, onDrop, onDragOver }) {
  return (
    <div className={`player-board ${isCurrentPlayer ? 'current-player' : ''}`}>
      <h4 className="player-name">{player.name}</h4>
      <div className="slots-container">
        {categories.map(category => (
          <CategorySlot
            key={category.id}
            category={category}
            tech={player.board[category.id]}
            playerIndex={playerIndex}
            isCurrentPlayer={isCurrentPlayer}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        ))}
      </div>
    </div>
  )
}

export default PlayerBoard

