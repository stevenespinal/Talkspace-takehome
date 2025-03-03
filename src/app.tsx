import '@/shared/styles/App.css';
import AvatarPreview from '@/features/avatar/components/avatar-preview';
import OptionsPicker from '@/features/avatar/components/options-picker';
import ColorPicker from '@/shared/components/ui/color-picker';
import TextInput from '@/shared/components/ui/text-input';
import { useState } from 'react';
import { useOnUpdateAvatarList } from '@/features/avatar/hooks';
import { AvatarContext, AvatarURLContext, AvatarListContext } from '@/features/avatar/context';
import { buildURL, defaultRobot } from '@/features/avatar/services/avatar';
import RobotListItem from '@/features/avatar/components/robot-list-item';
import SaveButton from '@/shared/components/ui/save-button';
import { storageService } from './shared/services/storage';
import { AvatarOptions } from './features/avatar/types';

function App() {
  const [avatarOptions, setAvatarOptions] = useState(defaultRobot);
  const [avatarList, setAvatarList] = useState(useOnUpdateAvatarList);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = { ...avatarOptions };
    updatedOptions.name = event.target.value;
    setAvatarOptions(updatedOptions as AvatarOptions);
  };

  const saveAvatar = (url: string, name: string) => {
    try {
      storageService.saveAvatar(name, url);
      setAvatarList(storageService.getAllAvatars());
      setAvatarOptions(defaultRobot);
    } catch (error) {
      console.error('Failed to save avatar:', error);
    }
  };

  return (
    <div className="app_container">
      <AvatarContext.Provider value={{ avatarOptions, setAvatarOptions }}>
        <AvatarURLContext.Provider value={buildURL(avatarOptions)}>
          <AvatarListContext.Provider value={{ avatarList, setAvatarList }}>
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
                  {avatarList &&
                    avatarList.map((avatar) => {
                      return (
                        <RobotListItem keyName={avatar.key} name={avatar.name} url={avatar.URL} />
                      );
                    })}
                </ul>
              </div>
            </div>
          </AvatarListContext.Provider>
        </AvatarURLContext.Provider>
      </AvatarContext.Provider>
    </div>
  );
}

export default App;
