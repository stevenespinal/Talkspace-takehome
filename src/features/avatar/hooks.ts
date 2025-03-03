import { storageService } from '@/shared/services/storage';

export const useOnUpdateAvatarList = () => {
  try {
    return storageService.getAllAvatars();
  } catch (error) {
    console.error('Failed to get avatars:', error);
    return [];
  }
};
