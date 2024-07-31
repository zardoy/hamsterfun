import React, { useEffect } from 'react'
import { proxy, useSnapshot } from 'valtio'
import './loader.css'
import { AnimatePresence, motion } from 'framer-motion'

const loaderState = proxy({
    open: false,
    taskTitle: '',
    color: '' as '' | 'red' | 'green' | 'blue',
})

const initialLoaderState = {
    ...loaderState,
}

export const hideLoader = () => {
    loaderState.open = false
}

export const showLoader = (data: Partial<typeof loaderState>) => {
    Object.assign(loaderState, initialLoaderState)
    Object.assign(loaderState, data)
    loaderState.open = true
}

const Loader = ({ taskTitle, onDoubleClick = () => {}, color = '' }) => {
    useEffect(() => {
        const particlesContainer = document.querySelector('.particles')!
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div')
            particle.classList.add('particle')
            particle.style.width = `${Math.random() * 10 + 2}px`
            particle.style.height = particle.style.width
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`
            particle.style.animationDelay = `${Math.random() * 2}s`
            particlesContainer.append(particle)
        }
    }, [])

    return (
        <div className="loader-container">
            <div className="loader">
                <div className="cube">
                    <div className={`face face-${color} front`}>₿</div>
                    <div className={`face face-${color} back`}>Ξ</div>
                    <div className={`face face-${color} right`}>₳</div>
                    <div className={`face face-${color} left`}>Ł</div>
                    <div className={`face face-${color} top`}>◈</div>
                    <div className={`face face-${color} bottom`}>Ð</div>
                </div>
            </div>
            <div className="particles" onDoubleClick={onDoubleClick} />
            {taskTitle && <div className="task-title">{taskTitle}</div>}
        </div>
    )
}

export default () => {
    const { open, taskTitle, color } = useSnapshot(loaderState)
    return (
        <AnimatePresence>
            {open && (
                <motion.div className="loader-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader
                        taskTitle={taskTitle}
                        color={color}
                        // TESTING ONLY!
                        onDoubleClick={hideLoader}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
