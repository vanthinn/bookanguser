import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart} from '../../app/CartSlice'
import toast from 'react-hot-toast'
import CartApi from '../../api/cartApi'

function ProductItem(props) {
    const navigate = useNavigate()
    const id = useSelector((state) => state.auth.id)
    const islogin = useSelector((state) => state.auth.isLogin)
    const dispatch = useDispatch()
    const {product} = props
    const {slug, price, image_url, author, product_name} = product

    function handleClick() {
        navigate(`/products/productdetail/${slug}`)
        window.scrollTo(0, 0)
    }

    function handleAddItemToCart(product) {
        if (product.stock > 0) {
            const action = {...product, cartQuantity: 1}
            dispatch(addItemToCart(action))
            const values = {userId: id}
            try {
                const fetchAdd = async () => {
                    const response = await CartApi.addCart(product.slug, values)
                    console.log(response)
                }
                fetchAdd()
            } catch (error) {
                console.log(error)
            }
        } else {
            toast.error(
                `Add ${product.product_name} Fail !
                Stock product: ${product.stock}
                `,
                {
                    position: 'top-center',
                }
            )
        }
    }
    return (
        <div className='scroll-smooth flex flex-col  group shadow-lg  h-[400px] border-[1px] cursor-pointer hover:border-cyan-600 '>
            <div className='relative '>
                <img
                    className='w-[100%] h-[260px] object-contain py-2 '
                    src={image_url}
                    alt={product_name}
                    onClick={() => handleClick()}
                />
                <div
                    className='absolute bottom-0 bg-slate-800 flex justify-center items-center py-2 translate-y-[50%] 
          transition-all duration-300 ease-linear z-10
         text-slate-100 w-full invisible group-hover:visible group-hover:translate-y-0 
         group hover:bg-yellow-600  '
                    onClick={() =>
                        islogin
                            ? handleAddItemToCart(product)
                            : toast.error('Login required')
                    }>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 mr-2 '>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 
              2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 
              0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                    </svg>
                    <span>ADD TO CART</span>
                </div>

                <div
                    className='absolute top-5 right-4 translate-x-[-70%] opacity-0 transition-all duration-300 ease-linear z-10
        group-hover:translate-x-0 group-hover:opacity-100'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6 hover:text-red-600'>
                        <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
                    </svg>
                </div>
            </div>
            <div
                className='flex flex-col px-2 pt-4 border-t-[1px] border-gray-400 bg-white z-50'
                onClick={() => handleClick()}>
                <h1 className=' text-[16px] '>{product_name}</h1>
                <div className='flex text-base my-2 justify-center font-semibold gap-2'>
                    <span>Author: </span>
                    <span>{author}</span>
                </div>
                <span className='text-lg text-blue-500 font-semibold '>
                    ${price}
                </span>
            </div>
        </div>
    )
}

ProductItem.propTypes = {}

export default ProductItem
