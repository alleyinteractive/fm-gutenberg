export default interface Field {
  add_more_label: string;
  add_more_position: 'bottom' | 'top';
  attributes?: {
    rows?: number | null;
  };
  checked_value?: string;
  children?: Array<Field>;
  field_class?: string;
  first_empty?: boolean;
  label?: string;
  limit: number,
  minimumCount?: number,
  name: string;
  options?: string[],
  title?: string;
  unchecked_value?: string;
}
