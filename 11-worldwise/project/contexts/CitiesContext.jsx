import {createContext, useCallback, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext()

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}
const reducer = (state, action) => {

    switch (action.type) {
        case "loading":
            return {...state, isLoading: true}
        case "cities/loaded":
            return {...state, isLoading: false, cities: action.payload}
        case "city/created":
            return {...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload}
        case "city/deleted":
            return {...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload), currentCity: {}}
        case "rejected":
            return {...state, isLoading: false, error: action.payload}
        case "city/loaded":
            return {...state, isLoading: false, currentCity: action.payload}
        default: throw new Error("Unknown action type")
    }
}
const CitiesProvider = ({children}) => {

    const [{
        cities,
        isLoading,
        currentCity,
        error
    }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
            dispatch({type: "loading"})
            fetch('http://localhost:3000/cities')
                .then(res => res.json())
                .then(data => dispatch({type: "cities/loaded", payload: data})).catch(() => {
                dispatch({type: "rejected", payload: "There was an error loading data..."})
        })
    }, [])

    const getCity = useCallback( (id) => {
            dispatch({type: "loading"})
            fetch(`http://localhost:3000/cities/${id}`)
                .then(res => res.json())
                .then(data => dispatch({type: "city/loaded", payload: data})).
            catch (() => {
                dispatch({type: "rejected", payload: "There was an error loading the city..."})
        })
    }, [currentCity.id])

    const createCity = (newCity) => {
            dispatch({type: "loading"})
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
                .then(data => dispatch({type: "city/created", payload: data}))
                .catch (() => {
                    dispatch({type: "rejected", payload: "There was an error creating the city..."})
        })
    }

    const deleteCity = (id) => {
        dispatch({type: "loading"})
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
                dispatch({type: "city/deleted", payload: id})
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dispatch({type: "rejected", payload: "There was an error deleting the city..."})
            });
    };

    return <CitiesContext.Provider value={{
        cities,
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