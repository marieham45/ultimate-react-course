import {useState} from "react";
import {useGeolocate} from "./useGeolocate";

function useGeolocation() {
}

export default function App() {
    const [countClicks, setCountClicks] = useState(0);

    const {isLoading, position, error, getPosition} = useGeolocate();
    const {lat, lng} = position;

    const handleClick = () => {
        setCountClicks((count) => count + 1);
        getPosition()
    }

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                Get my position
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p>
                    Your GPS position:{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            <p>You requested position {countClicks} times</p>
        </div>
    );
}
