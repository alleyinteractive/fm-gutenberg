import { registerPlugin } from '@wordpress/plugins';
import Sidebar from './components/sidebar';

registerPlugin(
  'wp-starter-plugin',
  {
    icon: 'forms',
    render: Sidebar,
  },
);
