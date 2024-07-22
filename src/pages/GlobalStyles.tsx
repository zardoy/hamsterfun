import { useEffect } from 'react'

export const GlobalStyles = ({ css }) => {
    useEffect(() => {
        const style = document.createElement('style')
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        style.appendChild(document.createTextNode(css))
        document.head.append(style)
        return () => {
            style.remove()
        }
    }, [css])

    return null
}
