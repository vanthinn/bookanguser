import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import productApi from '../../api/productApi'
import {FaFacebookF, FaInstagram, FaYoutube} from 'react-icons/fa'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/css'
import ProductItem from '../../component/ProductItem'
import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart} from '../../app/CartSlice'
import toast from 'react-hot-toast'
import ProductSkeleton from '../../component/ProductSkeleton'
import CartApi from '../../api/cartApi'

function ProductDetail(props) {
    const dispatch = useDispatch()
    const id = useSelector((state) => state.auth.id)
    const {slug} = useParams()
    const islogin = useSelector((state) => state.auth.isLogin)
    const [product, setProduct] = useState({})
    const [productList, setProductList] = useState([])
    const [countProduct, setCountProduct] = useState(1)
    const [isloading, setisloading] = useState(true)
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const fetchcat = async () => {
            const response = await productApi.getCategory()
            const listcategory = response.map((category) => category.fields)
            setCategoryList(listcategory)
        }
        fetchcat()
    }, [])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await productApi.getProduct(slug)
            setProduct(response)
        }
        fetchProduct()
    }, [slug])

    useEffect(() => {
        setisloading(true)
        try {
            const fetchProductList = async () => {
                const category = categoryList.filter(
                    (item) => item.category_name === product.category_name
                )
                const response = await productApi.getProductByCategory(
                    category[0].slug
                )
                const list = response.filter((pr) => pr.slug != slug)
                setisloading(false)
                setProductList(response)
            }
            fetchProductList()
        } catch (error) {}
    }, [product])

    function handleAddItem() {
        if (product.stock > 0) {
            const action = {
                ...product,
                cartQuantity: countProduct,
            }
            dispatch(addItemToCart(action))
            try {
                const fetchAdd = async () => {
                    const response = await CartApi.addCart(product.slug, {
                        userId: id,
                    })
                    console.log(response.data)
                }
                fetchAdd()
            } catch (error) {
                console.error(error)
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

    const splideOptions = {
        perPage: 4,
        perMove: 1,
        type: 'loop',
        rewind: true,
        keyboard: 'global',
        gap: '16px',
        pagination: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        lazyLoad: true,
        padding: '1rem',
        arrows: true,
        breakpoints: {
            1280: {perPage: 4},
            1024: {perPage: 2},
            736: {perPage: 1},
        },
    }
    return (
        <div className=''>
            <div className='fixed top-0 left-0 right-0 h-[60px] z-[100] bg-[#fff]  shadow-xl'></div>
            <div className='app-container mt-[60px] md:grid grid-cols-2 gap-8 '>
                <div className='flex relative justify-center'>
                    <img
                        className='m-auto px-8 py-8 sm:min-h-[350px] md:max-h-[450px] xl:max-h-[600px]'
                        src={product.image_url}
                        alt=''
                    />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-8 h-8 p-1 absolute md:bottom-2 sm:right-0 sm:bottom-0 md:right-2 lg:bottom-[3%] lg:right-[7%] rounded-md text-slate-400 cursor-pointer bg-slate-200 '>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6'
                        />
                    </svg>
                </div>

                <div className='mt-10 flex flex-col items-start justify-start'>
                    <h1 className='text-2xl mb-3 text-left'>
                        {product.product_name}
                    </h1>
                    <span className='mb-2 text-base font-semibold'>
                        Author: <span>{product.author}</span>
                    </span>
                    <span className='text-2xl font-semibold text-blue-500'>
                        ${product.price}
                    </span>
                    <i className='text-left text-slate-400 font-thin text-base mt-2'>
                        {product.description}
                    </i>
                    <div className='flex items-center'>
                        <div className='my-6 border-[1px] border-slate-700 text-xl'>
                            <span
                                className='cursor-pointer ml-2'
                                onClick={() =>
                                    countProduct === 1
                                        ? setCountProduct(1)
                                        : setCountProduct(countProduct - 1)
                                }>
                                -
                            </span>
                            <span className='px-6 text-lg leading-5'>
                                {countProduct}
                            </span>
                            <span
                                className='cursor-pointer mr-2'
                                onClick={() =>
                                    countProduct === product.stock
                                        ? setCountProduct(product.stock)
                                        : setCountProduct(countProduct + 1)
                                }>
                                +
                            </span>
                        </div>
                        <div className='ml-[58px] text-[17px] '>
                            <span>
                                Stock:{' '}
                                <span className='font-semibold'>
                                    {product.stock}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className=' mb-9 flex sm:flex-col sm:gap-4 sm:align-start md:flex-row '>
                        <button
                            type='button'
                            className='sm:text-lg md:text-[17px] xl:text-lg font-semibold text-yellow-600  hover:bg-yellow-600 hover:text-white px-3 py-2 border-[1px] border-yellow-600 
              rounded-md transitions-theme'
                            onClick={() =>
                                islogin
                                    ? handleAddItem(product)
                                    : toast.error('Login required')
                            }>
                            ADD TO CART
                        </button>
                        <button
                            type='button'
                            disabled
                            className=' md:ml-0 sm:ml-0 xl:ml-5 sm:text-lg md:text-[17px] xl:text-lg font-semibold text-white bg-yellow-600  hover:bg-white hover:text-yellow-600 px-3 py-2 border-[1px] border-yellow-600 
              rounded-md transitions-theme'>
                            ADD TO WISHLIST
                        </button>
                    </div>
                    <p className='pt-6 border-t-[1px] w-full text-left text-base font-semibold'>
                        Category: {product.category_name}
                    </p>
                    <div className='mt-3 flex items-center gap-5 text-base'>
                        <h1 className=''>Share</h1>
                        <FaFacebookF className='text-blue-500 border-[1px] border-blue-500 rounded-full h-[25px] w-[25px] p-1 hover:text-white hover:bg-blue-500 cursor-pointer' />
                        <FaInstagram className='hover:text-white border-[1px] hover:bg-gradient-to-r hover:from-[#4a66ef] hover:via-[#a75adb] hover:to-[#e2326c] rounded-full h-[25px] w-[25px] p-1   text-[#e2326c] border-[#e2326c] cursor-pointer' />
                        <FaYoutube className='text-red-500 border-[1px] border-red-500 rounded-full h-[25px] w-[25px] p-1 hover:text-white hover:bg-red-500 cursor-pointer' />
                    </div>
                </div>
            </div>

            <div className='my-14 app-container'>
                <h1 className='text-4xl font-semibold mb-5 '>
                    You May Also Like
                </h1>
                <Splide options={splideOptions}>
                    {isloading && (
                        <SplideSlide>
                            <ProductSkeleton count={1} />
                        </SplideSlide>
                    )}
                    {productList.map((product) => (
                        <SplideSlide key={product.id}>
                            <ProductItem product={product} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    )
}

ProductDetail.propTypes = {}

export default ProductDetail
