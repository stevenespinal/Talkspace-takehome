import { useState, useContext } from 'react';
import { AvatarContext } from '@/features/avatar/context';
import { COLOR_PALETTE } from '@/features/avatar/services/avatar';
import '@/shared/styles/ui/color-picker.css';
import { AvatarOptions } from '@/features/avatar/types';

interface Props {
  label: string;
  defaultColor: string;
  optionKey: string;
}

const ColorPicker = (props: Props) => {
  const { label, defaultColor, optionKey } = props;
  const { avatarOptions, setAvatarOptions } = useContext(AvatarContext);
  const [showPicker, setShowPicker] = useState(false);
  const palette = COLOR_PALETTE;

  const handleOnClick = (optionKey: string, color: string) => {
    const updatedOptions = { ...avatarOptions };
    updatedOptions[optionKey as keyof AvatarOptions] = color as never;
    setAvatarOptions(updatedOptions as AvatarOptions);
  };

  return (
    <>
      <div className="color_picker_container">
        <div
          className="current_selection"
          style={{ backgroundColor: defaultColor }}
          onClick={() => setShowPicker(true)}
        ></div>
        {showPicker && (
          <div className="color_palette" onMouseLeave={() => setShowPicker(false)}>
            {palette.map((color: string, i: number) => {
              return (
                <div
                  key={`color_${i}`}
                  style={{ backgroundColor: `#${color}` }}
                  onClick={() => {
                    handleOnClick(optionKey, color);
                  }}
                ></div>
              );
            })}
          </div>
        )}
        <div className="color_picker_label">{label}</div>
      </div>
    </>
  );
};

export default ColorPicker;
