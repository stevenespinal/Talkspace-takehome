import { createContext } from 'react';
import { AvatarOptions, AvatarList } from '@/features/avatar/types';

interface AvatarContextType {
  avatarOptions: AvatarOptions;
  setAvatarOptions: (options: AvatarOptions) => void;
}

interface AvatarListContextType {
  avatarList: AvatarList;
  setAvatarList: (list: AvatarList) => void;
}

export const AvatarContext = createContext<AvatarContextType>({
  avatarOptions: undefined,
  setAvatarOptions: () => {},
});

export const AvatarURLContext = createContext<string>('');

export const AvatarListContext = createContext<AvatarListContextType>({
  avatarList: [],
  setAvatarList: () => {},
});
