import React from 'react';
import styles from './CityItem.module.css'
import {Link} from "react-router-dom";
import {useCities} from "../../contexts/CitiesContext.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      //  weekday: "long",
    }).format(new Date(date));



const CityItem = ({city}) => {
    const {cityName, emoji, date, id, position} = city
    const {currentCity, deleteCity} = useCities()

    const handleClick = (e) => {
        e.preventDefault()
        deleteCity(id)
    }
    return (
        <li>
            <Link className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.name}>{cityName}</span>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;