
import Sidebar from './components/sidebar';

const {
  plugins: {
    registerPlugin,
  },
} = wp;

registerPlugin('wp-starter-plugin', {
  icon: 'forms',
  render: Sidebar,
});
