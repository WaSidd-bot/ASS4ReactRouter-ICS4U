import { Link } from '@/components/Link';

export const Footer = () => {
  return (
    <footer>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/now-playing">Now Playing</Link>
        <Link to="/trending?interval=day">Trending</Link>
        <Link to="/search">Search</Link>
      </nav>
    </footer>
  );
};