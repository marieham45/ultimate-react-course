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

    return  <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity
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