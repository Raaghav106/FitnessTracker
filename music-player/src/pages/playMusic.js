import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

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
      const apiUrl = `http://localhost:5000/api/songs?type=${filterType}&value=${filterValue}`;
    
      try {
        const response = await axios.get(apiUrl);
        if (response.data && response.data.data) {
          setSongs(response.data.data);
        } else {
          console.error('Unexpected API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching songs:', error.message);
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
    <div className="music-player-container">
      <h1>Music Player - {filterType} : {filterValue}</h1>
      <div>
        {songs.length > 0 ? (
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.title} by {song.artist ? song.artist.name : 'Unknown'}
                {playingSong === song.id ? (
                  <button className="control-button" onClick={pauseSong}>
                    <FontAwesomeIcon icon={faPause} />
                  </button>
                ) : (
                  <button className="control-button" onClick={() => playSong(song)}>
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
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
