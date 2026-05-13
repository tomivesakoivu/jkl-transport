import { useState, useEffect, useRef } from 'react'
import { searchStopsByName } from '../services/stopsService'

/**
 * Search field with anticipatory suggestions.
 * Calls onSelectStop({ stop_id, stop_name }) when the user picks a stop.
 */
const StopSearch = ({ onSelectStop }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef(null)

  // Update suggestions as the user types
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    searchStopsByName(query).then(results => {
      setSuggestions(results.slice(0, 10))
      setShowSuggestions(true)
    })
  }, [query])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (stop) => {
    setQuery(stop.stop_name)
    setSuggestions([])
    setShowSuggestions(false)
    onSelectStop(stop)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (suggestions.length === 1) {
      handleSelect(suggestions[0])
    } else if (suggestions.length > 1) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="search-wrapper" ref={containerRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search stop..."
          aria-label="Search stop"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          autoComplete="off"
        />
        <button className="search-btn" type="submit">Show schedule</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox">
          {suggestions.map(stop => (
            <li
              key={stop.stop_id}
              role="option"
              onClick={() => handleSelect(stop)}
            >
              {stop.stop_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StopSearch
