import { __ } from '@wordpress/i18n';
import Selector from '@/components/selector';
import Selectable from '@/interfaces/selectable';

interface TermSelectorProps {
  className?: string;
  emptyLabel?: string;
  label?: string;
  maxPages?: number;
  multiple?: boolean;
  onSelect: (terms: Selectable[]) => void;
  placeholder?: string;
  subTypes?: string[];
  selected?: Selectable[];
  threshold?: number;
}

export default function TermSelector({
  className = '',
  emptyLabel = __('No terms found', 'fm-gutenberg'),
  label = __('Search for terms', 'fm-gutenberg'),
  maxPages = 5,
  multiple = false,
  onSelect,
  placeholder = __('Search for terms', 'fm-gutenberg'),
  subTypes = [],
  selected = [],
  threshold = 3,
}: TermSelectorProps) {
  return (
    <Selector
      type="term"
      className={className}
      emptyLabel={emptyLabel}
      label={label}
      maxPages={maxPages}
      multiple={multiple}
      onSelect={onSelect}
      placeholder={placeholder}
      subTypes={subTypes}
      selected={selected}
      threshold={threshold}
    />
  );
}
