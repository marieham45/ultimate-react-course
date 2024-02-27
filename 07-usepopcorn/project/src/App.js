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
import {useMovies} from "./hooks/useMovies";
import {useLocalStorageState} from "./hooks/useLocalStorageState";


export const KEY = '2d4403d'

export default function App() {

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null)
    const [watched, setWatched] = useLocalStorageState([], 'watched')

    const handleCloseMovie = () => {
        setSelectedId(null)
    }

    const {movies, isLoading, error} = useMovies(query, handleCloseMovie)

    const handleSelectMovie = (id) => {
        setSelectedId(selectedId => selectedId === id ? null : id)
    }

    const handleAddWatched = (movie) => {
        setWatched(watched => [...watched, movie])
    }

    const handleRemoveWatched = (id) => {
        setWatched(watched => watched.filter(mov => mov.imdbID !== id))
    }




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
