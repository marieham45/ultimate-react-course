import {useEffect, useState} from "react";
import {KEY} from "../App";

export const useMovies = (query, callback) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        //setIsLoading(true)
        // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
        //     .then(res => {
        //         if (!res.ok) throw new Error("Something went wrong with fetching movies")
        //         res.json()
        //     })
        //     .then(data => setMovies(data.Search))
        //     .then(() => setIsLoading(false))

        callback?.()

        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("")
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal})

                if (!res.ok) throw new Error("Something went wrong with fetching movies")

                const data = await res.json()
                if (data.Response === 'False') throw new Error(data.Error)

                setMovies(data.Search)
                setError("")
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message)

                }
            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError("")
            return
        }
        fetchMovies()

        // cleanup
        return (() => {
            controller.abort()
        })
    }, [query])



    return {movies, isLoading, error}
}