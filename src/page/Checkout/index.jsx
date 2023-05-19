import React from 'react'
import FromCheckout from './Component/FromCheckout'
import OrderTotal from './Component/OrderTotal'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ClearAll} from '../../app/CartSlice'
import Banner from '../../component/Banner'
import axios from 'axios'
import CartApi from '../../api/cartApi'

function Checkout(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useSelector((state) => state.auth.id)
    const total = useSelector((state) =>
        state.cart.cartItems.reduce((totalAmount, cardItem) => {
            let {price, cartQuantity} = cardItem
            return totalAmount + price * cartQuantity
        }, 0)
    )
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            company: '',
            country: '',
            address: '',
            note: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Required'),
            lastname: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email'),
            phone: Yup.string()
                .required('Required')
                .matches(/^[0-9\-\+]{9,15}$/, 'Must be a valid phone number'),
            country: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
        }),

        onSubmit: (value) => {
            try {
                const fetch = async () => {
                    const respone = await CartApi.checkOut({
                        userId: id,
                        total: total,
                    })
                    console.log(respone)
                    if (respone.success) {
                        toast.promise(
                            axios.get('http://127.0.0.1:8000/store'),
                            {
                                loading: 'Loading...',
                                success: 'Thank you so much 😍😍😍 ',
                                error: 'error occurs in data',
                            }
                        )
                        dispatch(ClearAll())
                        navigate('/products')
                        window.scrollTo(0, 0)
                    } else {
                        toast.error(`${respone.message} `, {
                            position: 'top-center',
                        })
                        window.scrollTo(0, 0)
                    }
                }
                fetch()
            } catch (err) {
                console.log(err)
            }
        },
    })
    return (
        <div>
            <div className='fixed top-0 left-0 right-0 h-[60px] z-[100] bg-[#fff]  shadow-xl'></div>
            <Banner title='Checkout' />
            <form
                action=''
                className='app-container lg:px-36 my-10 lg:grid grid-cols-3 gap-6 '
                onSubmit={formik.handleSubmit}>
                <div className='col-span-2 sm:mt-4 lg:mt-0'>
                    <FromCheckout
                        firstname={formik.values.firstname}
                        lastname={formik.values.lastname}
                        email={formik.values.email}
                        phone={formik.values.phone}
                        company={formik.values.company}
                        country={formik.values.country}
                        address={formik.values.address}
                        note={formik.values.note}
                        onChangeInput={formik.handleChange}
                        error={formik.errors}
                        touched={formik.touched}
                    />
                </div>
                <div>
                    <OrderTotal total={formik.values.total} />
                </div>
            </form>
        </div>
    )
}

Checkout.propTypes = {}

export default Checkout
