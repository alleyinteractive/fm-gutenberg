export default interface Field {
  add_more_label: string;
  add_more_position: 'bottom' | 'top';
  attributes?: {
    rows?: number;
    [key: string]: number | string;
  };
  checked_value?: string;
  children?: {
    [key: string]: Field;
  };
  collapsed?: boolean;
  collapsible?: boolean;
  data?: {
    'name': string;
    'value': string;
  }[];
  datasource?: {
    ajax_action?: string,
    options?: {
      [key: string]: string;
    };
    taxonomy?: string;
    query_args?: {
      [key: string]: string;
    }
  };
  date_format?: string;
  default_value?: string;
  description?: string;
  description_after_element: boolean;
  display_if?: {
    src?: string;
    value?: string;
  };
  field_class?: string;
  fm_class: string;
  first_empty?: boolean;
  label?: string;
  limit: number;
  minimumCount?: number;
  name: string;
  options?: string[] | { [key: string]: string };
  serialize_data?: boolean;
  show_edit_link?: boolean;
  sortable: boolean;
  tabbed?: string;
  title?: string;
  unchecked_value?: string;
  use_time?: boolean;
}
