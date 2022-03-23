import { registerPlugin } from '@wordpress/plugins';
import FmGutenbergFields from './fm-gutenberg-fields';

// Sections.

registerPlugin('fm-gutenberg-text-field', { render: FmGutenbergFields });
