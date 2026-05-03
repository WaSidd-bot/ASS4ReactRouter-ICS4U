import { ImageGrid } from '@/components/ImageGrid';
import { Pagination } from '@/components/Pagination';
import { ButtonGroup2 } from '@/components/ButtonGroup2';
import { getImageUrl } from '@/core/images';
import { ButtonGroup } from '@/components/ButtonGroup';
import { DISCOVER_ENDPOINT } from '@/core/endpointConstants';
import { type ImageCell } from '@/core/componentTypes';
import { type MovieRespsonse } from '@/core/endpointTypes';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeCategory = searchParams.get('typeCategory') || 'tv';
  const genreId = searchParams.get('genreId') || '16';
  const { data } = useTmdb<MovieRespsonse>(`${DISCOVER_ENDPOINT}/${typeCategory}`, { time_window: typeCategory, with_genres: genreId, page });

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
      <h1 className="mb-4 text-3xl font-bold">Genres</h1>

      <ButtonGroup2
        value={typeCategory}
        options={[
          { label: 'TV-Crime', value1: 'tv', value2: '80' },
          { label: 'Movies-Action', value1: 'movie', value2: '28' },
        ]}
        onClick={(value1, value2) => setSearchParams({ typeCategory: value1, genreId: value2 })}
      />

      {/* <GenreDropdown 
      value={genreId}
        options={[
          { label: 'Action', value: '28' },
          { label: 'Documentary', value: '99' },
        ]}
      onClick={(value) => setSearchParams({ genreId: value })}/> */}

      <ButtonGroup
        value={genreId}
        options={[
          { label: 'Action', value: '28' },
          { label: 'Documentary', value: '99' },
        ]}
        onClick={(value) => setSearchParams({ genreId: value })}
      />
      
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};