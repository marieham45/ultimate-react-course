import {useEffect, useRef} from "react";
import {useKey} from "../hooks/useKey";

const Search = ({setQuery, query}) => {

    const searchInputEl = useRef(null)

    useKey("Enter", () => {
            if (document.activeElement === searchInputEl.current) return
            searchInputEl.current.focus()
            setQuery("")

    }, setQuery)

        return (
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={searchInputEl}
            />
        );
    };

    export default Search;