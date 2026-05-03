import { ImageGrid } from '@/components/ImageGrid';
import { Pagination } from '@/components/Pagination';
import { getImageUrl } from '@/core/images';
import { ButtonGroup } from '@/components/ButtonGroup';
import { TELEVISION_ENDPOINT } from '@/core/endpointConstants';
import { type ImageCell } from '@/core/componentTypes';
import { type MovieRespsonse } from '@/core/endpointTypes';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'airing_today';
  const { data } = useTmdb<MovieRespsonse>(`${TELEVISION_ENDPOINT}/${category}`, { page, time_window: category });

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
      <h1 className="mb-4 text-3xl font-bold">TV Series</h1>

      <ButtonGroup
        value={category}
        options={[
          { label: 'Airing Today', value: 'airing_today' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Popular', value: 'popular' },
          { label: 'On The Air', value: 'on_the_air' },
        ]}
        onClick={(value) => setSearchParams({ category: value })}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/seasons`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};