import { AvatarListItem } from '@/features/avatar/types';

export const storageService = {
  saveAvatar(name: string, url: string): string {
    const key = `${name}${Math.floor(Math.random() * 1000000)}`;
    localStorage.setItem(key, JSON.stringify({ URL: url, name }));
    return key;
  },

  getAllAvatars(): AvatarListItem[] {
    const keys = Object.keys(localStorage);
    return keys.map((key) => {
      const item = localStorage.getItem(key) || '{"URL":"undefined", "name":"undefined"}';
      const avatar = JSON.parse(item);
      return { ...avatar, key };
    });
  },

  removeAvatar(key: string): void {
    localStorage.removeItem(key);
  },
};
