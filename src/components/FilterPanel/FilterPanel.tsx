import { ChevronDown, ChevronUp, X, ChevronRight } from 'lucide-react';
import styles from './FilterPanel.module.css';
import { useState, useEffect } from 'react';

export interface FilterOptions {
  style: string[];
  material: string[];
  technique: string[];
  colorPalette: string[];
  artType: string[];
  period: string[];
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
    style: true,
    material: true,
    technique: true,
    colorPalette: true,
    artType: true,
    period: true
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
          expanded={expandedSections.style}
          onToggle={() => toggleSection('style')}
          selected={selectedFilters.style || []}
          options={options.style}
          onChange={value => {
            const current = selectedFilters.style || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('style', next);
          }}
        />

        <FilterSection
          title="Material"
          expanded={expandedSections.material}
          onToggle={() => toggleSection('material')}
          selected={selectedFilters.material || []}
          options={options.material}
          onChange={value => {
            const current = selectedFilters.material || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('material', next);
          }}
        />

        <FilterSection
          title="Technique"
          expanded={expandedSections.technique}
          onToggle={() => toggleSection('technique')}
          selected={selectedFilters.technique || []}
          options={options.technique}
          onChange={value => {
            const current = selectedFilters.technique || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('technique', next);
          }}
        />

        <FilterSection
          title="Color Palette"
          expanded={expandedSections.colorPalette}
          onToggle={() => toggleSection('colorPalette')}
          selected={selectedFilters.colorPalette || []}
          options={options.colorPalette}
          onChange={value => {
            const current = selectedFilters.colorPalette || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('colorPalette', next);
          }}
        />

        <FilterSection
          title="Art Type"
          expanded={expandedSections.artType}
          onToggle={() => toggleSection('artType')}
          selected={selectedFilters.artType || []}
          options={options.artType}
          onChange={value => {
            const current = selectedFilters.artType || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('artType', next);
          }}
        />

        <FilterSection
          title="Period"
          expanded={expandedSections.period}
          onToggle={() => toggleSection('period')}
          selected={selectedFilters.period || []}
          options={options.period}
          onChange={value => {
            const current = selectedFilters.period || [];
            const next = current.includes(value)
              ? current.filter(v => v !== value)
              : [...current, value];
            onFilterChange('period', next);
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
