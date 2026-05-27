-- Run after schema.sql in Supabase SQL Editor
-- Seeds the movies table with sample data for CineStream

insert into public.movies (
  title, description, year, rating, imdb, duration, genre,
  thumbnail, backdrop, video_url, is_trending, is_featured, is_new,
  cast_members, director, language
) values
(
  'Interstellar',
  'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.',
  2014, 'PG-13', 8.6, '2h 49m', array['Sci-Fi','Drama','Adventure'],
  'https://picsum.photos/seed/interstellar/300/450',
  'https://picsum.photos/seed/interstellar/1400/600',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  true, true, false,
  array['Matthew McConaughey','Anne Hathaway','Jessica Chastain'],
  'Christopher Nolan', 'English'
),
(
  'The Dark Knight',
  'Batman must accept one of the greatest tests of his ability to fight injustice when the Joker wreaks havoc on Gotham.',
  2008, 'PG-13', 9.0, '2h 32m', array['Action','Crime','Drama'],
  'https://picsum.photos/seed/darkknight/300/450',
  'https://picsum.photos/seed/darkknight/1400/600',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  true, false, false,
  array['Christian Bale','Heath Ledger','Aaron Eckhart'],
  'Christopher Nolan', 'English'
),
(
  'Inception',
  'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
  2010, 'PG-13', 8.8, '2h 28m', array['Action','Sci-Fi','Thriller'],
  'https://picsum.photos/seed/inception/300/450',
  'https://picsum.photos/seed/inception/1400/600',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  true, false, true,
  array['Leonardo DiCaprio','Joseph Gordon-Levitt','Ellen Page'],
  'Christopher Nolan', 'English'
),
(
  'Dune: Part Two',
  'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  2024, 'PG-13', 8.5, '2h 46m', array['Sci-Fi','Adventure'],
  'https://picsum.photos/seed/dune2/300/450',
  'https://picsum.photos/seed/dune2/1400/600',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  true, false, true,
  array['Timothée Chalamet','Zendaya','Rebecca Ferguson'],
  'Denis Villeneuve', 'English'
),
(
  'Oppenheimer',
  'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
  2023, 'R', 8.9, '3h 0m', array['Biography','Drama','History'],
  'https://picsum.photos/seed/oppenheimer/300/450',
  'https://picsum.photos/seed/oppenheimer/1400/600',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  true, false, false,
  array['Cillian Murphy','Emily Blunt','Matt Damon'],
  'Christopher Nolan', 'English'
);
