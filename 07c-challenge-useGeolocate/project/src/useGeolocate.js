import {useEffect, useState} from "react";

export const useGeolocate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const getPosition = () => {
    if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
            setIsLoading(false);
        },
        (error) => {
            setError(error.message);
            setIsLoading(false);
        }
    );}

    return {isLoading, position, error, getPosition}
}