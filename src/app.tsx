import '@/shared/styles/App.css';
import { useState } from 'react';
import { AvatarContext, AvatarURLContext, AvatarListContext } from '@/features/avatar/context';
import { buildURL, defaultRobot } from '@/features/avatar/services/avatar';
import { useOnUpdateAvatarList } from '@/features/avatar/hooks';
import { AvatarCreatorView } from '@/features/avatar/components/avatar-creator';
import { AvatarOptions } from '@/features/avatar/types';
import { storageService } from '@/shared/services/storage';

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
      <AvatarContext.Provider value={{ avatarOptions, setAvatarOptions, updateName }}>
        <AvatarURLContext.Provider value={buildURL(avatarOptions)}>
          <AvatarListContext.Provider value={{ avatarList, setAvatarList, saveAvatar }}>
            <AvatarCreatorView />
          </AvatarListContext.Provider>
        </AvatarURLContext.Provider>
      </AvatarContext.Provider>
    </div>
  );
}

export default App;
