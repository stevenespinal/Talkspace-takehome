import '@/shared/styles/App.css';
import AvatarPreview from '@/features/avatar/components/AvatarPreview';
import OptionsPicker from '@/features/avatar/components/OptionsPicker';
import ColorPicker from '@/shared/components/ui/ColorPicker';
import TextInput from '@/shared/components/ui/TextInput';
import { useState } from 'react';
import { useOnUpdateAvatarList } from '@/features/avatar/Hooks';
import { AvatarContext, AvatarURLContext, AvatarListContext } from '@/features/avatar/context';
import { generateKey, buildURL, defaultRobot } from '@/features/avatar/Services';
import RobotListItem from '@/features/avatar/components/RobotListItem';
import SaveButton from '@/shared/components/ui/SaveButton';

function App() {
  const [avatarOptions, setAvatarOptions] = useState(defaultRobot);
  const [avatarList, setAvatarList] = useState(useOnUpdateAvatarList);

  const updateName = () => {
    const _O = { ...avatarOptions };
    _O.name = event?.target.value;
    setAvatarOptions(_O);
  };

  const saveAvatar = (url: string, name: string) => {
    console.log(event?.target);
    try {
      console.log('fire!!!');
      window.localStorage.setItem(generateKey(name), JSON.stringify({ URL: url, name: name }));
      setAvatarList(useOnUpdateAvatarList());
      setAvatarOptions(defaultRobot);
    } catch (error) {
      console.log(error);
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
                    saveAvatar(buildURL(avatarOptions), avatarOptions?.name);
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
