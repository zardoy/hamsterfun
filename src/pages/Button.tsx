import React from 'react'
import { motion } from 'framer-motion'

export const Button = ({ children, variants, className = '', ...props }: React.ComponentProps<typeof motion.button> & { variant? }) => (
    // todo variant
    <motion.button
        className={`w-full enabled:hover:brightness-[1.15] enabled:active:brightness-[1.3] transition-all disabled:opacity-30 disabled:cursor-not-allowed truncate min-h-[50px] rounded-[10px] bg-blue-500 text-white font-semibold text-[17px] leading-[20px] ${className}`}
        whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
        }}
        whileTap={{
            scale: 0.9,
        }}
        type="button"
        {...props}
    >
        {children}
    </motion.button>
)
