import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import OpenGraph from '../open-graph';

const Sidebar = ({
  meta: {
    openGraphDescription = '',
    openGraphImage = 0,
    openGraphTitle = '',
  },
  onUpdate,
}) => (
  <Fragment>
    <PluginSidebarMoreMenuItem target="wp-starter-plugin">
      {__('WP Starter Plugin Options', 'wp-starter-plugin')}
    </PluginSidebarMoreMenuItem>

    <PluginSidebar
      name="wp-starter-plugin"
      title={__('WP Starter Plugin Options', 'wp-starter-plugin')}
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
