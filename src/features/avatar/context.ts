import { createContext } from 'react';
import { AvatarOptions, AvatarList } from '@/features/avatar/types';

interface AvatarContextType {
  avatarOptions: AvatarOptions;
  setAvatarOptions: (options: AvatarOptions) => void;
  updateName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AvatarListContextType {
  avatarList: AvatarList;
  setAvatarList: (list: AvatarList) => void;
  saveAvatar: (url: string, name: string) => void;
}

export const AvatarContext = createContext<AvatarContextType>({
  avatarOptions: undefined,
  setAvatarOptions: () => {},
  updateName: () => {},
});

export const AvatarURLContext = createContext<string>('');

export const AvatarListContext = createContext<AvatarListContextType>({
  avatarList: [],
  setAvatarList: () => {},
  saveAvatar: () => {},
});
