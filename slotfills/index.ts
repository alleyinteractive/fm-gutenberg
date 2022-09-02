import { registerPlugin } from '@wordpress/plugins';
import FmGutenbergFields from './fm-gutenberg-fields';
import NormalMetaboxes from '../plugins/normalMetaboxes';

// Sections.

registerPlugin('fm-gutenberg-sidebar', { render: FmGutenbergFields, icon: null });
registerPlugin('fm-gutenberg-metaboxes', { render: NormalMetaboxes, icon: null });
