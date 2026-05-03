import { ImageGrid } from '@/components/ImageGrid';
import { Pagination } from '@/components/Pagination';
import { getImageUrl } from '@/core/images';
import { ButtonGroup } from '@/components/ButtonGroup';
import { MOVIE_ENDPOINT } from '@/core/endpointConstants';
import { type ImageCell } from '@/core/componentTypes';
import { type MovieRespsonse } from '@/core/endpointTypes';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'now_playing';
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${category}`, { page, time_window: category });

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
      <h1 className="mb-4 text-3xl font-bold">Movies</h1>

      <ButtonGroup
        value={category}
        options={[
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Popular', value: 'popular' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
        onClick={(value) => setSearchParams({ category: value })}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};