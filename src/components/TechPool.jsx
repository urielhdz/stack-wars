import { useState } from 'react'
import TechCard from './TechCard'
import './TechPool.css'

function TechPool({ techPool, onDragStart, onDragEnd }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTechs = techPool.filter(tech =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="tech-pool">
      <h3>Tecnologías Disponibles</h3>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar tecnologías..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="tech-grid">
        {filteredTechs.map(tech => (
          <TechCard
            key={tech.id}
            tech={tech}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
      {filteredTechs.length === 0 && (
        <div className="no-results-message">
          No se encontraron tecnologías que coincidan con "{searchQuery}"
        </div>
      )}
    </div>
  )
}

export default TechPool

