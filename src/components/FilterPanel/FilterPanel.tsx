import { ChevronDown, ChevronUp, X, ChevronRight } from 'lucide-react';
import styles from './FilterPanel.module.css';
import { useState, useEffect } from 'react';

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
  selectedFilters: Record<string, string[]>; // now arrays
  onFilterChange: (filterType: string, values: string[]) => void; // arrays
  isMobile?: boolean;
  onClose?: () => void;
}

interface FilterSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  selected: string[]; // array of selected values
  options: string[];
  onChange: (value: string) => void; // toggle a single value
}

export default function FilterPanel({
  options,
  selectedFilters,
  onFilterChange,
  isMobile = false,
  onClose
}: FilterPanelProps) {
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
    Object.keys(selectedFilters).forEach(key => onFilterChange(key, []));
  };

  return (
    <>
      {/* Mobile: Show "Expand Filter" button if collapsed */}
      {isMobile && onClose && (
        <button
          className={styles.expandButton}
          onClick={() => onClose()}
        >
          <ChevronRight size={20} />
          Show Filters
        </button>
      )}

      {/* Filter panel */}
      <div className={isMobile ? styles.collapsedOverlay : styles.filterPanel}>
        <div className={styles.header}>
          <h2>Filters</h2>

          {/* Mobile: Close button */}
          {isMobile && onClose && (
            <button onClick={onClose} className={styles.collapseButton}>
              <X size={20} />
            </button>
          )}

          <button onClick={clearAllFilters} className={styles.clearButton}>
            Clear All
          </button>
        </div>

        {/* Filter sections */}
        <FilterSection
          title="Style"
          expanded={expandedSections.styles}
          onToggle={() => toggleSection('styles')}
          selected={selectedFilters.styles || []}
          options={options.styles}
          onChange={value => {
            const current = selectedFilters.styles || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('styles', next);
          }}
        />

        <FilterSection
          title="Material"
          expanded={expandedSections.materials}
          onToggle={() => toggleSection('materials')}
          selected={selectedFilters.materials || []}
          options={options.materials}
          onChange={value => {
            const current = selectedFilters.materials || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('materials', next);
          }}
        />

        <FilterSection
          title="Technique"
          expanded={expandedSections.techniques}
          onToggle={() => toggleSection('techniques')}
          selected={selectedFilters.techniques || []}
          options={options.techniques}
          onChange={value => {
            const current = selectedFilters.techniques || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('techniques', next);
          }}
        />

        <FilterSection
          title="Color Palette"
          expanded={expandedSections.colorPalettes}
          onToggle={() => toggleSection('colorPalettes')}
          selected={selectedFilters.colorPalettes || []}
          options={options.colorPalettes}
          onChange={value => {
            const current = selectedFilters.colorPalettes || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('colorPalettes', next);
          }}
        />

        <FilterSection
          title="Art Type"
          expanded={expandedSections.artTypes}
          onToggle={() => toggleSection('artTypes')}
          selected={selectedFilters.artTypes || []}
          options={options.artTypes}
          onChange={value => {
            const current = selectedFilters.artTypes || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('artTypes', next);
          }}
        />

        <FilterSection
          title="Period"
          expanded={expandedSections.periods}
          onToggle={() => toggleSection('periods')}
          selected={selectedFilters.periods || []}
          options={options.periods}
          onChange={value => {
            const current = selectedFilters.periods || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('periods', next);
          }}
        />
      </div>
    </>
  );
}

function FilterSection({ title, expanded, onToggle, selected, options, onChange }: FilterSectionProps) {
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
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
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
