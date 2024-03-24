import {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import ButtonBack from "./ButtonBack.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../../contexts/CitiesContext.jsx";


export const convertToEmoji = (countryCode) => {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const Form = () => {
    const [lat, lng] = useUrlPosition()
    const {createCity, isLoading} = useCities()
    const navigate = useNavigate()
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
    const [geocodingError, setGeocodingError] = useState("")
    const [emoji, setEmoji] = useState("")

    useEffect(() => {
        if (!lat && !lng ) return

        setIsLoadingGeocoding(true);
        setGeocodingError("");

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (!data.countryCode) {
                    throw new Error('That does not seem to be a city... Click somewhere else!');
                }
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode))
            })
            .catch(error => {
                setGeocodingError(error.message);
            })
            .finally(() => {
                setIsLoadingGeocoding(false);
            });
    }, [lat, lng]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng}
        }
        createCity(newCity)
        navigate(`/app/cities`)
    }

    if (isLoadingGeocoding) {
        return <Spinner/>
    }
    if (!lat && !lng) {
        return <Message message="Start by clicking somewhere on the map"/>
    }
    if (geocodingError) {
        return <Message message={geocodingError}/>
    }
    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id={date} onChange={date => setDate(date)} selected={date} dateFormat="dd/MM/yyy"/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={"primary"}>Add</Button>
                <ButtonBack/>
            </div>
        </form>
    );
}

export default Form;
