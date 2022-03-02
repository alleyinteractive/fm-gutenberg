import { registerPlugin } from '@wordpress/plugins';

// Sections.
import OpenGraph from './sections/open-graph';

registerPlugin('fm-gutenberg-open-graph', { render: OpenGraph });
