import React, {useEffect, useState} from 'react';
import styles from './Map.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useCities} from "../../contexts/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";

const Map = () => {
    const {cities} = useCities()
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const [mapPosition, setMapPosition] = useState([40, 0])

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng])
    }, [lat, lng])

    useEffect(() => {
        if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type={"position"} onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true}
                          className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker position={city.position} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                )}
                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
};

const ChangeCenter = ({position}) => {
    const map = useMap()
    map.setView(position)
    return null
}

const DetectClick = () => {
    const navigate = useNavigate()

    useMapEvents({
        click: e => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

        }
    })
}

export default Map;