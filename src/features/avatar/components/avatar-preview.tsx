import { useContext } from 'react';
import '@/shared/styles/avatar-preview.css';
import { AvatarURLContext } from '@/features/avatar/context';

const AvatarPreview = () => {
  const avatarURL = useContext(AvatarURLContext);

  return (
    <div className="avatar_preview_container">
      <div className="avatar_preview">
        <img src={avatarURL} alt="avatar" />
      </div>
    </div>
  );
};

export default AvatarPreview;
