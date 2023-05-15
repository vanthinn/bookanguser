import React, {useState} from 'react'
import {motion} from 'framer-motion'

export default function Delete(props) {
    const {item, onDelete} = props

    const handleDelete = (check) => {
        onDelete(check, item)
    }
    return (
        <div className='fixed z-[90] top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] flex justify-center items-center '>
            <motion.div
                initial={{opacity: 0, y: -300}}
                animate={{opacity: 1, y: 0}}
                className=' w-[350px] bg-white border-[1px] border-slate-400 shadow-lg '>
                <div className='flex bg-blue-400 justify-between px-2 py-1 '>
                    <h4 className='text-white text-lg'>Confirm Delection</h4>
                    <button
                        className='text-red-500 text-xl'
                        onClick={() => handleDelete(false)}>
                        X
                    </button>
                </div>
                <div className='text-base px-3 py-6'>
                    Are you sure you want to delete "{item.product_name}"?
                </div>
                <div className='flex justify-center gap-2 pb-6'>
                    <button
                        className='bg-slate-500 text-white rounded-sm w-[70px] py-1 hover:opacity-90'
                        onClick={() => handleDelete(false)}>
                        Cancel
                    </button>
                    <button
                        className='bg-red-500 text-white rounded-sm w-[60px] py-1 hover:opacity-90'
                        onClick={() => handleDelete(true)}>
                        Ok
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
