import { TextareaControl, TextControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import React from 'react';

// Components.
import ImagePicker from '../../components/image-picker';

// Services.
import usePostMetaValue from '../../services/hooks/use-post-meta-value';

const OpenGraph = () => {
  const [description, setDescription] = usePostMetaValue('wp_starter_plugin_open_graph_description');
  const [image, setImage] = usePostMetaValue('wp_starter_plugin_open_graph_image');
  const [title, setTitle] = usePostMetaValue('wp_starter_plugin_open_graph_title');

  return (
    <PluginDocumentSettingPanel
      icon="share"
      name="opengraph"
      title={__('Open Graph', 'wp-starter-plugin')}
    >
      <ImagePicker
        onReset={() => setImage(0)}
        onUpdate={({ id: next }) => setImage(next)}
        value={image}
      />
      <TextControl
        label={__('Title', 'wp-starter-plugin')}
        onChange={(next) => setTitle(next)}
        value={title}
      />
      <TextareaControl
        label={__('Description', 'wp-starter-plugin')}
        onChange={(next) => setDescription(next)}
        value={description}
      />
    </PluginDocumentSettingPanel>
  );
};

export default OpenGraph;
