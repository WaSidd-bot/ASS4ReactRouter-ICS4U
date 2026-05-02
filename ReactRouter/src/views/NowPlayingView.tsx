import { ImageGrid } from '@/components/ImageGrid';
import { Pagination } from '@/components/Pagination';
import { getImageUrl } from '@/core/images';
import { NOW_PLAYING_ENDPOINT } from '@/core/endpointConstants';
import { type ImageCell } from '@/core/componentTypes';
import { type MovieRespsonse } from '@/core/endpointTypes';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const NowPlayingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MovieRespsonse>(NOW_PLAYING_ENDPOINT, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};