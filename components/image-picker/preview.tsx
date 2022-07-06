import { __ } from '@wordpress/i18n';
import styled from 'styled-components';

const ImagePreviewContainer = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  height: auto;
  max-height: 1450px;
  max-width: 1450px;
  min-height: 20px;
  min-width: 20px;
  position: relative;
  width: auto;
`;

interface ImagePreviewProps {
  src: string;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <ImagePreviewContainer>
      <img
        alt={__('Edit image', 'fm-gutenberg')}
        className="edit-image-preview"
        src={src}
        title={__('Edit image', 'fm-gutenberg')}
      />
    </ImagePreviewContainer>
  );
}
