import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext()

const CitiesProvider = ({children}) => {

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch('http://localhost:3000/cities')
                .then(res => res.json())
                .then(data => setCities(data))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const getCity = (id) => {
        try {
            setIsLoading(true)
            fetch(`http://localhost:3000/cities/${id}`)
                .then(res => res.json())
                .then(data => setCurrentCity(data))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const createCity = (newCity) => {
        try {
            setIsLoading(true)
            fetch(`http://localhost:3000/cities`,
                {
                    method: "POST",
                    body: JSON.stringify(newCity),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
                .then(res => res.json())
                .then(data => setCities(cities => [...cities, data]))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteCity = (id) => {
        setIsLoading(true);
        fetch(`http://localhost:3000/cities/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('City not found or unable to delete.');
                }
                return res.json();
            })
            .then(() => {
                setCities(cities => cities.filter(city => city.id !== id));
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <CitiesContext.Provider value={{
        cities,
        setCities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
    }}>{children}</CitiesContext.Provider>
}

const useCities = () => {
    const contextValue = useContext(CitiesContext)
    if (contextValue === undefined) {
        throw new Error('CitiesContext was used outside of the CitiesProvider')
    }
    return contextValue
}

export {CitiesProvider, useCities}