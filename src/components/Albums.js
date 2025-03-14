import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.log("Error fetching albums:", err));
  }, []);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-4">Albums</h2>
      <input
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {filteredAlbums.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {filteredAlbums.map(album => (
            <li key={album.id} className="bg-white p-4 shadow rounded">
              {album.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Albums;
