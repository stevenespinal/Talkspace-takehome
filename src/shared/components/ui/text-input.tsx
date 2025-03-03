import { useContext } from 'react';
import { AvatarContext } from '@/features/avatar/context';
import '@/shared/styles/ui/text-input.css';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  value: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: Props) => {
  const { name, label, placeholder, className, handleOnChange } = props;

  const { avatarOptions } = useContext(AvatarContext);

  return (
    <>
      <label>
        {label}
        <input
          name={name}
          value={avatarOptions?.name}
          className={className ? className : ''}
          type="Text"
          placeholder={placeholder ? placeholder : ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleOnChange(event);
          }}
          maxLength={25}
        />
      </label>
    </>
  );
};

export default TextInput;
