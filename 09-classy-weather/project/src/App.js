import Weather from "./components/Weather";
import Input from "./components/Input";
import {useEffect, useState} from "react";
import {useFetchWeather} from "./hooks/useFetchWeather";



const App = () => {
    const [location, setLocation] = useState(location => localStorage.getItem("location") || "")

    const {isLoading, displayLocation, weather, fetchWeather} = useFetchWeather(location)

    useEffect(() => {

        fetchWeather();

        localStorage.setItem("location", location);
    }, [location])

    return (
        <div className="app">
            <h1>Classy Weather</h1>
            <Input
                location={location}
                onChangeLocation={(e) => setLocation(e.target.value)}
            />

            {isLoading && <p className="loader">Loading...</p>}

            {weather.weathercode && (
                <Weather
                    weather={weather}
                    location={displayLocation}
                />
            )}
        </div>
    );
}

export default App;






