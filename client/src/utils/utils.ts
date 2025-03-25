import toast from 'react-hot-toast';

export const notify = (message: string) => {
  toast(message, {
    duration: 2000,
    position: 'top-center',
  });
};
