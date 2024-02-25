import React, {useEffect, useRef, useState} from 'react';
import {KEY} from "../App";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const MovieDetail = ({selectedId, onCloseMovie, onAddWatched, watched}) => {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [userRating, setUserRating] = useState(null)

    const ratingCount = useRef(0)


    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
        imdbID
    } = movie

    useEffect(() => {
        if (userRating) ratingCount.current++
    }, [userRating]);

    useEffect(() => {
        async function getMovieDetails() {

            try {
                setIsLoading(true);
                setError("")

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
                if (!res.ok) throw new Error("Something went wrong with fetching movie detail")

                const data = await res.json()
                if (data.Response === 'False') throw new Error(data.Error)

                setMovie(data)
            } catch
                (err) {
                    setError(err.message)

            } finally {
                setIsLoading(false)
            }
        }

        getMovieDetails()


    }, [selectedId])

    useEffect(() => {
        if (!title) return
        document.title = `MOVIE | ${title}`

        // cleanup
        return (() => {
            document.title = "usePopcorn"
        })
    }, [title])

    useEffect(() => {
        const handleEscape = (e) => {
            e.code === "Escape" && onCloseMovie()
        }
        if (selectedId) {
            document.addEventListener('keydown', handleEscape)
        }

        //cleanup
        return (() => {
            document.removeEventListener('keydown', handleEscape)
        })
    }, [onCloseMovie, selectedId])

    const handleWatched = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating,
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            ratingCount: ratingCount.current
        }

        onAddWatched(newWatchedMovie)

    }

    return (
        <div className="details" key={title}>
            {isLoading && <Loader/>}
            {!isLoading && !error && <>
                <header>
                    <button onClick={onCloseMovie} className="btn-back">&larr;</button>
                    <img src={poster} alt={`Poster of ${title} movie`}/>
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating} IMDb rating</p>
                    </div>
                </header>
                <section>
                    {<div className="rating">
                        {watched.some(mov => mov.imdbID === imdbID) ?
                            <p>You have already rated {watched.find(mov => mov.imdbID === imdbID).userRating} ⭐</p>
                            : <>
                            <StarRating size={26} onSetRating={setUserRating}/>
                            {userRating > 0 && <button className="btn-add"
                                                       onClick={() => {
                                                           handleWatched()
                                                           onCloseMovie()
                                                       }}>
                                Add to watched
                            </button>}</>}
                    </div>}
                    <p><em>{plot}</em></p>
                    <p>Starring: {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
};

export default MovieDetail;