'use client'
import { useEffect, useRef } from "react"

const useScrollEnd = (onIntersect: () => void) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) onIntersect()
            },
            {threshold: 1.0}
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()

    }, [onIntersect])

    return ref

}

export default useScrollEnd