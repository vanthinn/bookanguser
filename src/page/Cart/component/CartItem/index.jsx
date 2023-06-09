import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Delete from '../../../../component/Delete'

function CartItem(props) {
    const navigate = useNavigate()
    const [check, setCheck] = useState()
    const [itemdel, setItemdel] = useState('')
    const {cartItem, onRemoveItem, onIncreaseItem, onDecreaseItem} = props

    function handleDelete(check, item) {
        if (check) {
            onRemoveItem(item)
        }
        setCheck(false)
    }

    function handleRemoveItem(item) {
        setCheck(true)
        setItemdel(item)
    }

    function handleIncreaseItem(item) {
        onIncreaseItem(item)
    }

    function handleDecreaseItem(item) {
        onDecreaseItem(item)
    }
    return (
        <div className=''>
            <div className='flex text-left text-base font-semibold border-b-[1px] border-stone-900 pb-1'>
                <h1 className='w-[40%] '>Product</h1>
                <span className='w-[20%] sm:text-center lg:text-left'>
                    Price
                </span>
                <span className='w-[20%] sm:text-center lg:text-left'>
                    Quantity
                </span>
                <span className='w-[20%] sm:text-center md:text-left'>
                    Total
                </span>
            </div>

            {cartItem.map((item) => (
                <div
                    key={item.slug}
                    className='py-1 flex items-center border-b-[1px] border-stone-900 min-h-[125px]'>
                    <div className='lg:w-[10%]  sm:w-[20%]  '>
                        <img
                            className='h-[90%] object-contain sm:py-2 md:p-2 cursor-pointer'
                            src={item.image_url}
                            alt=''
                            onClick={() =>
                                navigate(`/products/productdetail/${item.slug}`)
                            }
                        />
                    </div>
                    <h1
                        className='lg:w-[30%] sm:w-[25%] sm:text-sm  md:text-base text-left px-[8px] cursor-pointer '
                        onClick={() =>
                            navigate(`/products/productdetail/${item.slug}`)
                        }>
                        {item.product_name}
                    </h1>
                    <span className='w-[20%] sm:w-[15%]  text-left sm:text-sm  md:text-lg'>
                        ${item.price}
                    </span>
                    <div className='w-[20%] sm:w-[20%]  '>
                        <div className='sm:m-auto sm:w-[70%] md:w-[50%] border-[1px] border-slate-600 text-center  sm:text-sm  md:text-lg'>
                            <span
                                className='cursor-pointer hover:scale-125'
                                onClick={() => handleDecreaseItem(item)}>
                                -
                            </span>
                            <span className='sm:mx-2 lg:mx-4'>
                                {item.cartQuantity}
                            </span>
                            <span
                                className='cursor-pointer hover:scale-125'
                                onClick={() => handleIncreaseItem(item)}>
                                +
                            </span>
                        </div>
                    </div>
                    <span className='w-[15%]  sm:text-sm  md:text-lg text-blue-700 sm:text-center '>
                        $
                        {Math.round(item.price * item.cartQuantity * 100) / 100}
                    </span>
                    <span
                        className='text-xl sm:text-right text-red-600 cursor-pointer hover:bg-slate-100 px-2 sm:mr-[-20px]'
                        onClick={() => {
                            handleRemoveItem(item)
                        }}>
                        X
                    </span>
                </div>
            ))}
            {check && <Delete item={itemdel} onDelete={handleDelete} />}
        </div>
    )
}

CartItem.propTypes = {}

export default CartItem
