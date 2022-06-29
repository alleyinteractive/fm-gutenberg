import MediaPicker from '@/components/media-picker';
import WPRESTMedia from '@/interfaces/wp-rest-media';
import VideoPreview from './preview';

interface VideoPickerProps {
  className?: string;
  onReset: () => void;
  onUpdate: (media: WPRESTMedia) => void;
  onUpdateURL?: (url: string) => void;
  value: number;
  valueURL?: string;
}

export default function VideoPicker({
  className = '',
  onReset,
  onUpdate,
  onUpdateURL = null,
  value,
  valueURL = '',
}: VideoPickerProps) {
  return (
    <MediaPicker
      allowedTypes={['video']}
      className={className}
      icon="format-video"
      onReset={onReset}
      onUpdate={onUpdate}
      onUpdateURL={onUpdateURL}
      preview={VideoPreview}
      value={value}
      valueURL={valueURL}
    />
  );
}
