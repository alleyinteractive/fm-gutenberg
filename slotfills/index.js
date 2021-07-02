import { registerPlugin } from '@wordpress/plugins';

// Sections.
import OpenGraph from './sections/open-graph';

registerPlugin('wp-starter-plugin-open-graph', { render: OpenGraph });
