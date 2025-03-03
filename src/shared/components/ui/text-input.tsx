import { useContext } from 'react';
import { AvatarContext } from '@/features/avatar/context';
import '@/shared/styles/ui/text-input.css';

interface Props {
  name: string;
  label: string;
  avatarName: string;
  placeholder?: string;
  className?: string;
  value: string;
  handleOnChange: () => void;
}

const TextInput = (props: Props) => {
  const { name, label, placeholder, className, handleOnChange } = props;

  const { avatarOptions, setAvatarOptions } = useContext(AvatarContext);

  return (
    <>
      <label>
        {label}
        <input
          name={name}
          value={avatarOptions.name}
          className={className ? className : ''}
          type="Text"
          placeholder={placeholder ? placeholder : ''}
          onChange={() => {
            handleOnChange();
          }}
          maxLength={25}
        />
      </label>
    </>
  );
};

export default TextInput;
