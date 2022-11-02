import { registerPlugin } from '@wordpress/plugins';
import FmGutenbergFields from './fm-gutenberg-fields';

// Sections.

registerPlugin('fm-gutenberg-sidebar', { render: FmGutenbergFields, icon: null });
