import Places from './Places.jsx';
import { useEffect, useState } from 'react';
export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/places')
      .then((response) => {
        console.log(response);;

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAvailablePlaces(data.places)
      })
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
