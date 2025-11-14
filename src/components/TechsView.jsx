import { useState } from 'react'
import { Link } from 'react-router-dom'
import TechCard from './TechCard'
import techPoolData from '../data/tech_pool.json'
import './TechsView.css'

function TechsView() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTechs = techPoolData.filter(tech =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="techs-view">
      <div className="techs-header">
        <Link to="/" className="back-link">← Volver al Inicio</Link>
        <h1>Todas las Tecnologías Disponibles</h1>
        <p className="techs-subtitle">Explora todas las tecnologías que pueden aparecer en el draft</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar tecnologías..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="tech-count">{filteredTechs.length} tecnologías</span>
      </div>

      <div className="techs-grid">
        {filteredTechs.map(tech => (
          <TechCard
            key={tech.id}
            tech={{ ...tech, isPicked: false }}
            onDragStart={() => {}}
            onDragEnd={() => {}}
          />
        ))}
      </div>

      {filteredTechs.length === 0 && (
        <div className="no-results">
          <p>No se encontraron tecnologías que coincidan con "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

export default TechsView

