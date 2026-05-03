import { ImageGrid } from '@/components/ImageGrid';
import { getImageUrl } from '@/core/images' 
import { MOVIE_ENDPOINT } from '@/core/endpointConstants'
import { type CreditsResponse } from '@/core/endpointTypes'
import { type ImageCell } from '@/core/componentTypes';
import { useTmdb } from '@/hooks/useTmdb';
import { useParams } from 'react-router';

export const CreditsView = () => {
  const { id } = useParams();
  const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Credits</h2>
      {data.cast.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No credits available.</p>}
    </section>
  );
};