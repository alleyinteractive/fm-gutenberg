export default interface Field {
  add_more_label: string;
  add_more_position: 'bottom' | 'top';
  attributes?: {
    [key: string]: number | string;
  };
  checked_value?: string;
  children?: {
    [key: string]: Field;
  };
  datasource?: {

  };
  default_value?: string;
  description?: string;
  description_after_element: boolean;
  field_class?: string;
  first_empty?: boolean;
  label?: string;
  limit: number;
  minimumCount?: number;
  name: string;
  options?: string[];
  sortable: boolean;
  title?: string;
  unchecked_value?: string;
}
