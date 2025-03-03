import { AvatarListItem } from '@/features/avatar/types';

export const storageService = {
  saveAvatar(name: string, url: string): string {
    const key = `avatar_${Date.now()}_${name}`;
    localStorage.setItem(key, JSON.stringify({ URL: url, name }));
    return key;
  },

  getAllAvatars(): AvatarListItem[] {
    const keys = Object.keys(localStorage);
    const avatars = keys.map((key) => {
      const item = localStorage.getItem(key) || '{"URL":"undefined", "name":"undefined"}';
      const avatar = JSON.parse(item);
      return { ...avatar, key };
    });

    return avatars.sort((a, b) => {
      const timeA = parseInt(a.key.split('_')[1]) || 0;
      const timeB = parseInt(b.key.split('_')[1]) || 0;
      return timeB - timeA;
    });
  },

  removeAvatar(key: string): void {
    localStorage.removeItem(key);
  },
};
