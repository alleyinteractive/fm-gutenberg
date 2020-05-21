import {
  RichText,
} from '@wordpress/editor';
import {
  __,
} from '@wordpress/i18n';
import React from 'react';
import PropTypes from 'prop-types';

const Edit = ({
  attributes: {
    sampleAttribute = '',
  },
  setAttributes,
}) => (
  <div>
    <RichText
      onChange={(newValue) => setAttributes({
        sampleAttribute: newValue,
      })}
      placeholder={__('Headline', 'wp-starter-plugin')}
      tagName="h2"
      value={sampleAttribute}
    />
  </div>
);

Edit.propTypes = {
  attributes: PropTypes.shape({
    sampleAttribute: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
};

export default Edit;
