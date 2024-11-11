import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

export const getFashionImages = async (query: string) => {
  const result = await unsplash.search.getPhotos({
    query: `mens ${query} fashion`,
    perPage: 1,
    orientation: 'landscape',
    orderBy: 'random',
  });

  return result.response?.results[0];
};

export default unsplash; 