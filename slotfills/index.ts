import { registerPlugin } from '@wordpress/plugins';
import FmGutenbergFields from './fm-gutenberg-fields';
// import FmGutenbergFieldsNormal from './fm-gutenberg-fields-normal';

// Sections.

registerPlugin('fm-gutenberg-sidebar', { render: FmGutenbergFields, icon: null });
// registerPlugin('fm-gutenberg-main', { render: FmGutenbergFieldsNormal, icon: null });
