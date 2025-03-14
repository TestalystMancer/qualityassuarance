import { useEffect, useState } from "react";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching photos:", error));
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading photos...</p>;
  }

  return (
    <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="border rounded-lg p-3 shadow-lg">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-32 object-cover rounded"
          />
          <p className="mt-2 text-sm font-medium">{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Photos;
