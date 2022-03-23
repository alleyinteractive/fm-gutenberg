import React from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import usePostMetaValue from '@/hooks/use-post-meta-value';

const TextField = ({
  field,
  field: {
    name,
  }
}) => {
  // const [description, setDescription] = usePostMetaValue('fm_gutenberg_open_graph_description');
  // const [image, setImage] = usePostMetaValue('fm_gutenberg_open_graph_image');
  const [value, setValue] = usePostMetaValue(name);
  const [description, setDescription] = usePostMetaValue('fm_gutenberg_open_graph_description');
  console.log('description', description);
  console.log('field', field);
  console.log('name', name);
  console.log('value', value);
  return (
    <PanelBody>
      <PanelRow>
        <TextControl
          label={__('Title', 'fm-gutenberg')}
          onChange={(next) => setValue(next)}
          value={value}
        />
      </PanelRow>
    </PanelBody>
  );
};

TextField.propTypes = {
  field: PropTypes.shape({}).isRequired,
};

export default TextField;
