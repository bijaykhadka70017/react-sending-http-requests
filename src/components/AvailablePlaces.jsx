import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import Error from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js';
export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // 1. Define an inner async function
    async function fetchPlaces() {
      setIsFetching(true); // Start loading state

      try {
        const response = await fetch('http://localhost:3000/places');
        console.log('response', response);

        const resData = await response.json();
        console.log('resData', resData);


        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })

      } catch (error) {
        console.log('error', error);

        setError({
          message: error.message || 'Could not fetch places, please try again later.'
        })
        setIsFetching(false);
      }
    }

    // 2. Execute it immediately inside the effect
    fetchPlaces();
  }, []);

  // Conditional Error UI Rendering
  if (error) {
    return (
      <Error
        title="An error occurred!"
        message={error.message}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
