import { useContext } from 'react';
import { AvatarListContext } from '@/features/avatar/context';
import '@/shared/styles/robot-list-item.css';
import { storageService } from '@/shared/services/storage';

interface Props {
  keyName: string;
  name: string;
  url: string;
}

const RobotListItem = (props: Props) => {
  const { keyName, name, url } = props;
  const { avatarList, setAvatarList } = useContext(AvatarListContext);

  const deleteAvatar = (keyN: string) => {
    storageService.removeAvatar(keyName);
    setAvatarList(storageService.getAllAvatars());
  };

  return (
    <>
      <li key={keyName} className="avatar_item_container">
        <span className="item_avatar">
          <img src={url} alt={`robot avatar`} />
        </span>
        <span className="avatar_item_name">{name}</span>
        <button className="avatar_delete" onClick={() => deleteAvatar(keyName)}>
          X
        </button>
      </li>
    </>
  );
};

export default RobotListItem;
