import './CategorySlot.css'

function CategorySlot({ category, tech, playerIndex, isCurrentPlayer, onDrop, onDragOver }) {
  const handleDrop = (e) => {
    e.preventDefault()
    if (isCurrentPlayer && !tech) {
      onDrop(category.id, playerIndex)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (isCurrentPlayer && !tech) {
      e.dataTransfer.dropEffect = 'move'
    } else {
      e.dataTransfer.dropEffect = 'none'
    }
    onDragOver(e)
  }

  return (
    <div
      className={`category-slot ${tech ? 'filled' : 'empty'} ${isCurrentPlayer && !tech ? 'droppable' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {tech ? (
        <div className="slot-content filled-content">
          {tech.icon === 'generic' ? (
            <div className="generic-icon">💻</div>
          ) : (
            <i className={tech.icon}></i>
          )}
          <span className="tech-name">{tech.name}</span>
        </div>
      ) : (
        <div className="slot-content empty-content">
          <span className="category-label">{category.label}</span>
        </div>
      )}
    </div>
  )
}

export default CategorySlot

