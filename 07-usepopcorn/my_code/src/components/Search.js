import {useEffect, useRef} from "react";

export function Search({query, setQuery}) {
    const inputEl = useRef(null);

    useEffect(() => {
        function callback(e) {
            if(document.activeElement === inputEl.current) return

            if (e.code === "Enter") {
                setQuery("")
                inputEl.current.focus()
            }
        }

        return () => document.addEventListener("keydown", callback)
    }, [setQuery]);


    // useEffect(() => {
    //     const el = document.querySelector(".search")
    //     console.log(el)
    //     el.focus()
    // }, []);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}