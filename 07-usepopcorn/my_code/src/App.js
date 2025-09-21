import {useEffect, useState} from "react";
import Loader from "./components/Loader";
import {ErrorMessage} from "./components/ErrorMessage";
import {Search} from "./components/Search";
import {Main} from "./components/Main";
import {Box} from "./components/Box";
import {NumResult} from "./components/NumResult";
import {NavBar} from "./components/NavBar";
import {WatchedMovieList} from "./components/WatchedMovieList";
import {MovieList} from "./components/MovieList";
import {MovieDetails} from "./components/MovieDetails";
import {Summary} from "./components/Summary";

const KEY = 'd4aa5ca4' // shouldnt be in clear
export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState("");
    const [error, setError] = useState()
    const [selectedId, setSelectedId] = useState()

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
                if (err.name === "AbortError") return

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

        handleCloseMovie()
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