import {useEffect} from "react";

export const useKey = (key, callback, ...deps) => {

    useEffect(() => {
        const handleKey = (e) => {
            e.code.toLowerCase() === key.toLowerCase() && callback?.()
        }
            document.addEventListener('keydown', handleKey)

        //cleanup
        return (() => {
            document.removeEventListener('keydown', handleKey)
        })
    }, [key, callback, ...deps])
}