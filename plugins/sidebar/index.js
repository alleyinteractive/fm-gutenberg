
import Sidebar from './components/sidebar/index.jsx';

const {
  plugins: {
    registerPlugin,
  },
} = wp;

registerPlugin('wp-starter-plugin', {
  icon: 'forms',
  render: Sidebar,
});
