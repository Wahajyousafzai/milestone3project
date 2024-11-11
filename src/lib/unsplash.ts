import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

export const getFashionImages = async (query: string) => {
  const result = await unsplash.photos.getRandom({
    query: `mens ${query} fashion`,
    orientation: 'landscape',
  });

  return Array.isArray(result.response) 
    ? result.response[0] 
    : result.response;
};

export default unsplash; 