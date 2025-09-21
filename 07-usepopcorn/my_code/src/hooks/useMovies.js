import {useEffect, useState} from "react";

const KEY = 'd4aa5ca4' // shouldnt be in clear

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(function () {
        // callback?.()

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

        // handleCloseMovie()
        fetchMovies()

        return function () {
            controller.abort()
        }
    }, [query])

    return {movies, isLoading, error}
}