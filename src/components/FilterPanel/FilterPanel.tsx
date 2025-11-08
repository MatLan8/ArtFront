import { useState } from 'react';
import { ChevronDown, ChevronUp, X, ChevronRight } from 'lucide-react';
import styles from './FilterPanel.module.css';

export interface FilterOptions {
  styles: string[];
  materials: string[];
  techniques: string[];
  colorPalettes: string[];
  artTypes: string[];
  periods: string[];
}

interface FilterPanelProps {
  options: FilterOptions;
  selectedFilters: {
    style?: string | null;
    material?: string | null;
    technique?: string | null;
    colorPalette?: string | null;
    artType?: string | null;
    period?: string | null;
  };
  onFilterChange: (filterType: string, value: string | null) => void;
}

/* --- Props for inner section component --- */
interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  selected?: string | null;
  options: string[];
  onChange: (value: string | null) => void;
}

export default function FilterPanel({
  options,
  selectedFilters,
  onFilterChange
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    styles: true,
    materials: true,
    techniques: true,
    colorPalettes: true,
    artTypes: true,
    periods: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    ['style', 'material', 'technique', 'colorPalette', 'artType', 'period'].forEach(filter => {
      onFilterChange(filter, null);
    });
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className={styles.expandButton}
        aria-label="Show filters"
        type="button"
      >
        <ChevronRight size={20} />
        <span>Show Filters</span>
      </button>
    );
  }

  return (
    <div className={styles.filterPanel}>
      <div className={styles.header}>
        <h2>Filters</h2>
        <div className={styles.headerActions}>
          <button onClick={clearAllFilters} className={styles.clearButton} type="button">Clear All</button>
          <button onClick={() => setIsCollapsed(true)} className={styles.collapseButton} aria-label="Hide filters" type="button">
            <X size={20} />
          </button>
        </div>
      </div>

      <FilterSection
        title="Style"
        expanded={expandedSections.styles}
        onToggle={() => toggleSection('styles')}
        selected={selectedFilters.style ?? null}
        options={options.styles}
        onChange={(value: string | null) => onFilterChange('style', value)}
      />

      <FilterSection
        title="Material"
        expanded={expandedSections.materials}
        onToggle={() => toggleSection('materials')}
        selected={selectedFilters.material ?? null}
        options={options.materials}
        onChange={(value: string | null) => onFilterChange('material', value)}
      />

      <FilterSection
        title="Technique"
        expanded={expandedSections.techniques}
        onToggle={() => toggleSection('techniques')}
        selected={selectedFilters.technique ?? null}
        options={options.techniques}
        onChange={(value: string | null) => onFilterChange('technique', value)}
      />

      <FilterSection
        title="Color Palette"
        expanded={expandedSections.colorPalettes}
        onToggle={() => toggleSection('colorPalettes')}
        selected={selectedFilters.colorPalette ?? null}
        options={options.colorPalettes}
        onChange={(value: string | null) => onFilterChange('colorPalette', value)}
      />

      <FilterSection
        title="Art Type"
        expanded={expandedSections.artTypes}
        onToggle={() => toggleSection('artTypes')}
        selected={selectedFilters.artType ?? null}
        options={options.artTypes}
        onChange={(value: string | null) => onFilterChange('artType', value)}
      />

      <FilterSection
        title="Period"
        expanded={expandedSections.periods}
        onToggle={() => toggleSection('periods')}
        selected={selectedFilters.period ?? null}
        options={options.periods}
        onChange={(value: string | null) => onFilterChange('period', value)}
      />
    </div>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  selected,
  options,
  onChange
}: FilterSectionProps) {
  return (
    <div className={styles.filterSection}>
      <button onClick={onToggle} className={styles.sectionHeader} type="button">
        {title}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className={styles.optionsList}>
          {options.map(option => (
            <label key={option} className={styles.optionLabel}>
              <input
                type="radio"
                name={title.toLowerCase()}
                checked={selected === option}
                onChange={() => onChange(selected === option ? null : option)} 
                className={styles.radioInput}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}