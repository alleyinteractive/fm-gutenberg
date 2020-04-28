import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import OpenGraph from '../openGraph';

/**
 * A component to render a PluginSidebar for the WP Starter Plugin site.
 */
class Sidebar extends React.PureComponent {
  /**
   * Renders the PluginSidebar.
   * @returns {object} JSX component markup.
   */
  render() {
    const {
      meta: {
        openGraphDescription = '',
        openGraphImage = 0,
        openGraphTitle = '',
      },
      onUpdate,
      post: {
        /**
         * Link is permalink, type is post type. Can be used to make decisions
         * about which components to load in the sidebar based on URL of the
         * post (e.g., the home or front page is '/') or the post type.
         */
        // eslint-disable-next-line no-unused-vars,react/prop-types
        link = '',
        // eslint-disable-next-line no-unused-vars,react/prop-types
        type = '',
      },
    } = this.props;

    const target = 'wp-starter-plugin';
    const label = __('WP Starter Plugin Options', 'wp-starter-plugin');

    return (
      <Fragment>
        <PluginSidebarMoreMenuItem target={target}>
          {label}
        </PluginSidebarMoreMenuItem>

        <PluginSidebar
          name={target}
          title={label}
        >
          <OpenGraph
            description={openGraphDescription}
            image={openGraphImage}
            onUpdate={onUpdate}
            title={openGraphTitle}
          />
        </PluginSidebar>
      </Fragment>
    );
  }
}

// Define PropTypes for this component.
Sidebar.propTypes = {
  meta: PropTypes.shape({
    openGraphDescription: PropTypes.string,
    openGraphImage: PropTypes.number,
    openGraphTitle: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  post: PropTypes.shape({}).isRequired,
};

export default compose([
  withSelect((select) => {
    const editor = select('core/editor');
    const {
      wp_starter_plugin_open_graph_description: openGraphDescription = '',
      wp_starter_plugin_open_graph_image: openGraphImage = 0,
      wp_starter_plugin_open_graph_title: openGraphTitle = '',
    } = editor.getEditedPostAttribute('meta');

    return {
      meta: {
        openGraphDescription,
        openGraphImage,
        openGraphTitle,
      },
      post: editor.getCurrentPost(),
    };
  }),
  withDispatch((dispatch) => ({
    onUpdate: (metaKey, metaValue) => {
      dispatch('core/editor').editPost({
        meta: {
          [metaKey]: metaValue,
        },
      });
    },
  })),
])(Sidebar);
