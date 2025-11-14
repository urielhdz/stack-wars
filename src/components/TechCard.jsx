import './TechCard.css'

function TechCard({ tech, onDragStart, onDragEnd }) {
  const handleDragStart = (e) => {
    console.log('handleDragStart', e);
    if (!tech.isPicked && onDragStart) {
      onDragStart(tech)
      e.dataTransfer.effectAllowed = 'move'
    }
  }

  const handleDragEnd = () => {
    if (onDragEnd) {
      onDragEnd()
    }
  }

  const isDraggable = !tech.isPicked && onDragStart

  return (
    <div
      className={`tech-card ${tech.isPicked ? 'picked' : ''} ${!isDraggable ? 'no-drag' : ''}`}
      draggable={isDraggable ? 'true' : 'false'}
      onDragStart={isDraggable ? handleDragStart : undefined}
      onDragEnd={isDraggable ? handleDragEnd : undefined}
    >
      {tech.icon === 'generic' ? (
        <div className="generic-icon">💻</div>
      ) : (
        <i className={tech.icon}></i>
      )}
      <span className="tech-name">{tech.name}</span>
    </div>
  )
}

export default TechCard

