import { PropsWithChildren } from 'react';
import '@/shared/styles/ui/save-button.css';

interface Props {
  disabled: boolean;
  handleOnClick: () => void;
}

const SaveButton = (props: PropsWithChildren<Props>) => {
  const { children, disabled, handleOnClick } = props;

  return (
    <>
      <button className="save_button" disabled={disabled} onClick={handleOnClick}>
        <span>{children}</span>
      </button>
    </>
  );
};

export default SaveButton;
