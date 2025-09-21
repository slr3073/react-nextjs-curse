import {useEffect, useRef, useState} from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const KEY = 'd4aa5ca4' // shouldnt be in clear
export function MovieDetails({selectedId, onCloseMovie, onAddWatch, watched}) {
    const [movie, setMovie] = useState({})
    const [userRating, setUserRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    // const [avgRating, setAvgRating] = useState(0)
    const countRef = useRef(0);

    const foundWatched = watched.find(watchedMovie => watchedMovie.imdbID === selectedId)

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Release: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie

    useEffect(() => {
        if(userRating) countRef.current++
    }, [userRating]);

    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovie()
            }
        }

        document.addEventListener("keydown", callback);

        return () => document.removeEventListener("keydown", callback)
    }, [onCloseMovie]);

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json()
            setMovie(data)
            setIsLoading(false)
        }

        getMovieDetails()
    }, [selectedId]);

    useEffect(() => {
        if (!title) return
        document.title = `Movie "${title}"`

        return (() => {
            document.title = "usePopcorn"
        })
    }, [title]);

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating,
            runtime: Number(runtime.split(' ').at(0)),
            countRatingDecisions: countRef.current
        }
        onAddWatch(newWatchedMovie)
        onCloseMovie()

        // setAvgRating(Number(imdbRating))
        // console.log(avgRating, userRating)

        // setAvgRating((avgRating + userRating) / 2) // wrong it will always do "0/by userRating"
        // setAvgRating((avgRating) => (avgRating + userRating) / 2) // right way
    }

    return (
        <div className="details">
            {isLoading
                ? <Loader/>
                : <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`Poster of ${movie} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDb rating</p>
                        </div>
                    </header>
                    {/*<p>{avgRating}</p>*/}

                    <section>
                        <div className="rating">
                            {!foundWatched ? (
                                <>
                                    <StarRating defaultRating={userRating} size={24} maxRating={10}
                                                onSetRating={setUserRating}/>

                                    {userRating > 0 &&
                                        <button className="btn-add" onClick={handleAdd}>
                                            + Add to List
                                        </button>
                                    }
                                </>
                            ) : (
                                <p>
                                    You rated this movie {foundWatched.userRating} <span>⭐</span>
                                </p>
                            )}
                        </div>

                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Staring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )
}