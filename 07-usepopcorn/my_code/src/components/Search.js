import {useRef} from "react";
import {useKey} from "../hooks/useKey";

export function Search({query, setQuery}) {
    const inputEl = useRef(null);

    useKey("eNtEr", () => {
        if (document.activeElement === inputEl.current) return

        setQuery("")
        inputEl.current.focus()
    })

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