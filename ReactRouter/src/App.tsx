import { Route, Routes } from 'react-router'
import { MainLayout } from '@/layouts';
import { CreditsView, ErrorView, HomeView, MovieView, MoviesView, ReviewsView, SearchView, TrendingView, GenreView, TelevisionView, SeasonsView } from '@/views';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
        <Route element={<MainLayout />}>
          <Route path="/movies" element={<MoviesView />} />
          <Route path="/tv" element={<TelevisionView />} />
            <Route path="/tv/:id" element={<SeasonsView />} />
          <Route path="/trending" element={<TrendingView />} />
          <Route path="/genre" element={<GenreView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/movie/:id" element={<MovieView />}> //could use routes to do genreView!
            <Route path="credits" element={<CreditsView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>
        </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};



export default App
