import MediaPicker from '@/components/media-picker';
import WPRESTMedia from '@/interfaces/wp-rest-media';
import AudioPreview from './preview';

interface AudioPickerProps {
  className?: string;
  onReset: () => void;
  onUpdate: (media: WPRESTMedia) => void;
  onUpdateURL?: (url: string) => void;
  value: number;
  valueURL?: string;
}

export default function AudioPicker({
  className = '',
  onReset,
  onUpdate,
  onUpdateURL = null,
  value,
  valueURL = '',
}: AudioPickerProps) {
  return (
    <MediaPicker
      allowedTypes={['audio']}
      className={className}
      icon="format-audio"
      onReset={onReset}
      onUpdate={onUpdate}
      onUpdateURL={onUpdateURL}
      preview={AudioPreview}
      value={value}
      valueURL={valueURL}
    />
  );
}
