import { TextareaControl, TextControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import React from 'react';

// Components.
import ImagePicker from '../../components/image-picker';

// Services.
import usePostMeta from '../../services/hooks/use-post-meta';

const OpenGraph = () => {
  const [meta, setMeta] = usePostMeta();
  const {
    wp_starter_plugin_open_graph_description: description = '',
    wp_starter_plugin_open_graph_image: image = 0,
    wp_starter_plugin_open_graph_title: title = '',
  } = meta;

  return (
    <PluginDocumentSettingPanel
      icon="share"
      name="opengraph"
      title={__('Open Graph', 'wp-starter-plugin')}
    >
      <ImagePicker
        onReset={() => setMeta('wp_starter_plugin_open_graph_image', 0)}
        onUpdate={({ id: next }) => setMeta('wp_starter_plugin_open_graph_image', next)}
        value={image}
      />
      <TextControl
        label={__('Title', 'wp-starter-plugin')}
        onChange={(next) => setMeta('wp_starter_plugin_open_graph_title', next)}
        value={title}
      />
      <TextareaControl
        label={__('Description', 'wp-starter-plugin')}
        onChange={(next) => setMeta('wp_starter_plugin_open_graph_description', next)}
        value={description}
      />
    </PluginDocumentSettingPanel>
  );
};

export default OpenGraph;
