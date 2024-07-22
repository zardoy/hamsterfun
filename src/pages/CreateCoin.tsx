import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import { Button } from './Button'

const Input = ({ label, ...props }: React.ComponentProps<'input'> & { label: string }) => (
    <div className="mb-4">
        <label className="block text-gray-400 mb-2">{label}</label>
        <input
            className="h-[60px] w-full pl-4 pr-[96px] border-2 border-gray-700 rounded-[12px] text-[18px] leading-[40px] font-semibold placeholder:text-gray-500 bg-gray-800 text-white"
            {...props}
        />
    </div>
)

const Textarea = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block text-gray-400 mb-2">{label}</label>
        <textarea
            className="w-full p-4 border-2 border-gray-700 rounded-[12px] text-[18px] leading-[24px] font-semibold placeholder:text-gray-500 bg-gray-800 text-white resize-none"
            rows={4}
            {...props}
        />
    </div>
)

const FileInput = ({ label, image, onImageChange, onImageRemove, ...props }) => (
    <div className="mb-4">
        <label className="block text-gray-400 mb-2">{label}</label>
        <div className="relative">
            <input type="file" className="hidden" id="file-upload" onChange={onImageChange} {...props} />
            <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-[60px] border-2 border-dashed border-gray-700 rounded-[12px] text-gray-400 cursor-pointer hover:border-gray-500 transition-colors"
            >
                <Upload size={24} className="mr-2" />
                {image ? 'Change image' : 'Choose a file'}
            </label>
        </div>
        {image && (
            <div className="mt-2 relative inline-block">
                <img src={image} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                <button className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1" type="button" onClick={onImageRemove}>
                    <X size={16} />
                </button>
            </div>
        )}
    </div>
)

const CreateTokenForm = () => {
    const [tokenName, setTokenName] = useState('')
    const [tokenSymbol, setTokenSymbol] = useState('')
    const [initialBuy, setInitialBuy] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted', {
            tokenName,
            tokenSymbol,
            initialBuy,
            description,
            image,
        })
    }

    const handleImageChange = e => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleImageRemove = () => {
        setImage('')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
    }

    return (
        <motion.div className="bg-gray-900 text-white min-h-screen p-4 md:p-8" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 className="text-3xl font-bold mb-8 text-center" variants={itemVariants}>
                Create New Token
            </motion.h1>
            <motion.form className="max-w-lg mx-auto" variants={containerVariants} onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                    <Input
                        required
                        label="Token Name"
                        type="text"
                        placeholder="Enter token name"
                        value={tokenName}
                        onChange={e => setTokenName(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Input
                        required
                        label="Token Symbol"
                        type="text"
                        placeholder="Enter token symbol"
                        value={tokenSymbol}
                        onChange={e => setTokenSymbol(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Input
                        required
                        label="Initial Buy (TON)"
                        type="number"
                        placeholder="Enter initial buy amount"
                        value={initialBuy}
                        onChange={e => setInitialBuy(e.target.value)}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Textarea label="Description" placeholder="Enter token description" value={description} onChange={e => setDescription(e.target.value)} />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <FileInput label="Token Image" accept="image/*" image={image} onImageChange={handleImageChange} onImageRemove={handleImageRemove} />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Button type="submit">Create Token</Button>
                </motion.div>
            </motion.form>
        </motion.div>
    )
}

export default CreateTokenForm
