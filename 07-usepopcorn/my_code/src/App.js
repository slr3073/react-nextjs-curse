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
import {useMovies} from "./hooks/useMovies";
import {useLocalStorageState} from "./hooks/useLocalStorageState";

const KEY = 'd4aa5ca4' // shouldnt be in clear
export default function App() {
    // const [watched, setWatched] = useState(() => JSON.parse(localStorage.getItem("watched")));
    const [watched, setWatched] = useLocalStorageState([], "watched")
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState()
    const {movies, isLoading, error} = useMovies(query)

    function handleSelectMovie(id) {
        setSelectedId(selectedId => id === selectedId ? undefined : id)
    }

    function handleCloseMovie() {
        setSelectedId(undefined)
    }

    function handleAddWatch(movie) {
        setWatched([...watched, movie])

        // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
    }

    function handleDeleteWatched(movie) {
        setWatched((watched) => watched.filter((watchedMovie) => movie !== watchedMovie))
    }

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