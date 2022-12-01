import { useEffect, useRef, useState } from "react"

const Beer = () => {
    const [drinking, setDrinking] = useState("")
    const root = useRef(document.documentElement)

    const moreDrunk = (blur: string): string => {
        const step = 0.5
        const value = parseFloat(blur.replace('px', '')) || 0
        return (value + step) + 'px'
    }

    useEffect(() => {
        if (drinking !== "") {
            const newValue = moreDrunk(
                getComputedStyle(root.current).getPropertyValue("--drunk")
            )
            root.current.style.setProperty('--drunk', newValue);
            setTimeout(() => { setDrinking("") }, 1000)
        }
    }, [drinking])

    return (
        <div className={`Beer ${drinking}`} onClick={() => { setDrinking("drinking") }} />
    )
}
export default Beer