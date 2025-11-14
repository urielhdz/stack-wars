import PlayerBoard from './PlayerBoard'
import './ResultsScreen.css'

function ResultsScreen({ players, categories, onNewDraft }) {
  return (
    <div className="results-screen">
      <div className="results-container">
        <h1>¡El Draft ha Terminado!</h1>
        <p className="results-subtitle">Aquí están los stacks tecnológicos finales:</p>
        
        <div className="results-boards">
          {players.map((player, index) => (
            <PlayerBoard
              key={index}
              player={player}
              playerIndex={index}
              isCurrentPlayer={false}
              categories={categories}
              onDrop={() => {}}
              onDragOver={() => {}}
            />
          ))}
        </div>

        <button onClick={onNewDraft} className="new-draft-button">
          Iniciar Nuevo Draft
        </button>
      </div>
    </div>
  )
}

export default ResultsScreen

