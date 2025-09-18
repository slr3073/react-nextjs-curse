import {useEffect, useState} from "react";
import StarRating from "./components/StarRating";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'd4aa5ca4' // shouldnt be in clear

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState("inception");
    const [error, setError] = useState()
    const [selectedId, setSelectedId] = useState()

    // useEffect(() => {
    //     console.log("After initial render")
    // }, []);
    //
    // useEffect(() => {
    //     console.log("After every render")
    // });
    //
    // useEffect(() => {
    //     console.log("After initial render and every update of 'query' state")
    // }, [query]);
    //
    // console.log("During render")

    function handleSelectMovie(id) {
        setSelectedId(selectedId => id === selectedId ? undefined : id)
    }

    function handleCloseMovie() {
        setSelectedId(undefined)
    }

    function handleAddWatch(movie) {
        setWatched([...watched, movie])
    }

    function handleDeleteWatched(movie) {
        setWatched((watched) => watched.filter((watchedMovie) => movie !== watchedMovie))
    }

    useEffect(function () {
        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError(undefined)
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
                if (!res.ok) throw new Error("Something went wrong.")

                const data = await res.json()
                if (data.Response === "False") throw new Error("Movie not found")

                setMovies(data.Search)
            } catch (err) {
                console.error(err.message)
                if(err.name === "AbortError") return

                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError(undefined)
            return
        }
        fetchMovies()

        return function () {
            controller.abort()
        }
    }, [query])

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery}/>
                <NumResult movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {
                        selectedId ?
                            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}
                                          onAddWatch={handleAddWatch} watched={watched}/>
                            : <>
                                <Summary watched={watched}/>
                                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                            </>

                    }

                </Box>
            </Main>
        </>
    );
}

function Loader() {
    return <p className="loader">Loading...</p>
}

function ErrorMessage({message}) {
    return <p className="error">
        <span>❌</span> {message}
    </p>
}

function NavBar({children}) {
    return (
        <nav className="nav-bar">
            <Logo/>
            {children}
        </nav>
    )
}

function NumResult({movies}) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

function Search({query, setQuery}) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

function Main({children}) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

function Box({children}) {
    const [isOpen1, setIsOpen1] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && children}
        </div>
    )
}

function MovieList({movies, onSelectMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID}/>
            ))}
        </ul>
    )
}

function Movie({movie, onSelectMovie}) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

function Summary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(2);
    const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(2);
    const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

function MovieDetails({selectedId, onCloseMovie, onAddWatch, watched}) {
    const [movie, setMovie] = useState({})
    const [userRating, setUserRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
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

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating,
            runtime: Number(runtime.split(' ').at(0))
        }
        onAddWatch(newWatchedMovie)
        onCloseMovie()
    }

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
            console.log(`Cleanup function for movie ${title}`)
        })
    }, [title]);

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

function WatchedMovieList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched}/>
            ))}
        </ul>
    )
}

function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
            <button className="btn-delete" onClick={() => onDeleteWatched(movie)}>X</button>
        </li>
    )
}
