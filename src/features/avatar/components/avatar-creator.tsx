import { useContext } from 'react';
import { AvatarContext, AvatarListContext } from '@/features/avatar/context';
import { buildURL } from '@/features/avatar/services/avatar';

import AvatarPreview from './avatar-preview';
import OptionsPicker from './options-picker';
import RobotListItem from './robot-list-item';
import SaveButton from '@/shared/components/ui/save-button';
import TextInput from '@/shared/components/ui/text-input';
import ColorPicker from '@/shared/components/ui/color-picker';

export const AvatarCreatorView = () => {
  const { avatarOptions, updateName } = useContext(AvatarContext);
  const { avatarList, saveAvatar } = useContext(AvatarListContext);

  return (
    <div className="main">
      <div className="avatar_creator">
        <SaveButton
          disabled={avatarOptions?.name === '' ? true : false}
          handleOnClick={() => {
            saveAvatar(buildURL(avatarOptions), avatarOptions?.name || '');
          }}
        >
          +
        </SaveButton>

        <AvatarPreview />
        <div className="row">
          <TextInput
            label=""
            value={avatarOptions?.name || ''}
            name="avatar_name"
            placeholder="Name Me!"
            handleOnChange={updateName}
          />
        </div>
        <div className="row">
          <ColorPicker
            label="Color"
            defaultColor={`#${avatarOptions?.baseColor}`}
            optionKey="baseColor"
          />
          <ColorPicker
            label="Background"
            defaultColor={`#${avatarOptions?.backgroundColor}`}
            optionKey="backgroundColor"
          />
        </div>
        <OptionsPicker />
      </div>
      <div className="avatar_list">
        <ul>
          {avatarList?.map((avatar) => (
            <RobotListItem
              key={avatar.key}
              keyName={avatar.key}
              name={avatar.name}
              url={avatar.URL}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
