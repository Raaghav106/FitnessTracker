import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Howl } from 'howler';

const DEEZER_API_BASE = 'https://api.deezer.com';

const MusicPlayerComponent = () => {
  const [songs, setSongs] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);
  const [howl, setHowl] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filterType = query.get('type') || 'artist';
  const filterValue = query.get('value') || '';

  useEffect(() => {
    const fetchSongs = async () => {
      let apiUrl = '';

      if (filterType === 'artist') {
        apiUrl = `${DEEZER_API_BASE}/search/artist?q=${filterValue}`;
      } else if (filterType === 'genre') {
        apiUrl = `${DEEZER_API_BASE}/genre/${filterValue}/artists`;
      } else if (filterType === 'mood') {
        apiUrl = `${DEEZER_API_BASE}/search?q=mood:"${filterValue}"`;
      }

      try {
        const response = await axios.get(apiUrl);
        setSongs(response.data.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    if (filterValue) {
      fetchSongs();
    }
  }, [filterType, filterValue]);

  const playSong = (song) => {
    if (howl) howl.stop(); // Stop current song if playing

    const newHowl = new Howl({
      src: [song.preview],
      html5: true,
      onend: () => setPlayingSong(null),
    });
    newHowl.play();
    setHowl(newHowl);
    setPlayingSong(song.id);
  };

  const pauseSong = () => {
    if (howl) howl.pause();
    setPlayingSong(null);
  };

  return (
    <div>
      <h1>Music Player - {filterType} : {filterValue}</h1>
      <div>
        {songs.length > 0 ? (
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.title} by {song.artist ? song.artist.name : 'Unknown'}
                {playingSong === song.id ? (
                  <button onClick={pauseSong}>Pause</button>
                ) : (
                  <button onClick={() => playSong(song)}>Play</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
};

export default MusicPlayerComponent;
