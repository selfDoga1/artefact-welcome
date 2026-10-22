'use client'
import { useEffect, useRef } from "react"

// detecta quando um elemento entra na visão do usuário e dispara uma função caso aconteça
const useScrollEnd = (onIntersect: () => void) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) onIntersect()
            },
            // threshold 1.0 garante que o elemento esteja totalmente visível antes de disparar
            {threshold: 1.0}
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()

    }, [onIntersect])

    // o ref é colocado no elemento logo após o ultimo item da lista
    return ref

}

export default useScrollEnd
