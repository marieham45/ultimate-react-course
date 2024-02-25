import {useEffect, useRef} from "react";

const Search = ({setQuery, query}) => {

    const searchInputEl = useRef(null)

    useEffect(() => {
        const handleEnter = (e) => {
            if (document.activeElement === searchInputEl.current) return
            if (e.code === "Enter") {
                searchInputEl.current.focus()
                setQuery("")
            }
        }
            document.addEventListener('keydown', handleEnter)

            //cleanup
            return (() => {
                document.removeEventListener('keydown', handleEnter)
            })
        }, [setQuery])

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