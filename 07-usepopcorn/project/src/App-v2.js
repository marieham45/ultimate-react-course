import Navbar from "./components/Navbar";
import Main from "./components/Main";
import React, {useEffect, useState} from "react";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetail from "./components/MovieDetail";

// const tempMovieData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt0133093",
//         Title: "The Matrix",
//         Year: "1999",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt6751668",
//         Title: "Parasite",
//         Year: "2019",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//     },
// ];

// const tempWatchedData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     },
//     {
//         imdbID: "tt0088763",
//         Title: "Back to the Future",
//         Year: "1985",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];

export const KEY = '2d4403d'

export default function App() {

    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    const handleSelectMovie = (id) => {
        setSelectedId(selectedId => selectedId === id ? null : id)
    }

    const handleCloseMovie = () => {
        setSelectedId(null)
    }

    const handleAddWatched = (movie) => {

        setWatched(watched => [...watched, movie])
    }

    const handleRemoveWatched = (id) => {
        setWatched(watched => watched.filter(mov => mov.imdbID !== id))
    }

    useEffect(() => {
        //setIsLoading(true)
        // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
        //     .then(res => {
        //         if (!res.ok) throw new Error("Something went wrong with fetching movies")
        //         res.json()
        //     })
        //     .then(data => setMovies(data.Search))
        //     .then(() => setIsLoading(false))

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
        handleCloseMovie()
        fetchMovies()

        // cleanup
        return (() => {
            controller.abort()
        })
    }, [query])


    return (
        <>
            <Navbar>
                <Search setQuery={setQuery} query={query}/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {selectedId ?
                        <MovieDetail watched={watched} onAddWatched={handleAddWatched} onCloseMovie={handleCloseMovie}
                                     selectedId={selectedId}/> : <><WatchedSummary watched={watched}/>
                            <WatchedMovieList watched={watched} onRemoveWatched={handleRemoveWatched}/></>}
                </Box>
            </Main>

        </>
    );
}
