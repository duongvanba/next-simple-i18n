import { useEffect, useState } from "react"

export const useSyncState = <T>(value: T) => {
    const [v, s] = useState<T>(value)
    useEffect(() => {
        value != v && s(value)
    }, [value])

    return [v, s] as [T, React.Dispatch<React.SetStateAction<T>>]
}