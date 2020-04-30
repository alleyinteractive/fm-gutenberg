import React from 'react';
import PropTypes from 'prop-types';
// Import WordPress block dependencies.
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * A React component to render the edit view of a dynamic block.
 */
export default class dynamicBlockEdit extends React.PureComponent {
  render() {
    const {
      attributes: {
        dynamicAttribute = '',
      } = {},
      setAttributes,
    } = this.props;

    return (
      <div className="dynamic__wrapper">
        <RichText
          className="dynamic__container"
          allowedFormats={[]}
          keepPlaceholderOnFocus
          multiline={false}
          onChange={(newValue) => {
            setAttributes({
              dynamicAttribute: newValue,
            });
          }}
          placeholder={__('Lorem Ipsum', 'wp-starter-plugin')}
          tagName="p"
          value={dynamicAttribute}
        />
      </div>
    );
  }
}

// Set up initial props.
dynamicBlockEdit.defaultProps = {
  attributes: {
    dynamicAttribute: '',
  },
};

// Set PropTypes for this component.
dynamicBlockEdit.propTypes = {
  attributes: PropTypes.shape({
    dynamicAttribute: PropTypes.array,
  }),
  setAttributes: PropTypes.func.isRequired,
};
