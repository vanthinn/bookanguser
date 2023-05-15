import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import background from '../../assets/images/rm309-adj-03.jpg'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Loading from '../../component/Loading'
import authApi from '../../api/authApi'
import CryptoJS from 'crypto-js'

function Signup(props) {
    const navigate = useNavigate()
    const [isloading, setisloading] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            last_name: '',
            phone_number: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .email('Please enter a valid email address'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            phone_number: Yup.string()
                .required('Required')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/,
                    'Must be a valid phone number'
                ),
        }),

        onSubmit: (value) => {
            setisloading(true)
            const values = {
                email: value.email,
                username: value.username,
                password: value.password,
                first_name: value.first_name,
                last_name: value.last_name,
                phone_number: value.phone_number,
            }
            handleSignUp(values)
        },
    })

    const handleSignUp = (values) => {
        try {
            const fetchApi = async () => {
                const response = await authApi.register(values)
                toast.success('Sign up successfully !!!')
                navigate('/login')
                setisloading(false)
            }
            fetchApi()
        } catch (error) {
            setisloading(false)
            console.log(error)
        }
    }
    return (
        <div>
            {isloading && <Loading />}
            <div className='h-[60px] bg-[#fff]  shadow-xl fixed top-0 left-0 right-0 z-[100]'></div>
            <div
                style={{backgroundImage: `url(${background})`}}
                className='mt-[60px] min-h-[550px] py-12 flex'>
                <div className=' m-auto flex flex-col justify-content items-start border-[1px] sm:px-4 sm:min-w-[350px]  md:px-12 py-8 md:min-w-[450px] rounded-xl bg-slate-50'>
                    <h1
                        before=''
                        className='text-3xl font-semibold uppercase text-slate-600 relative before:content-[attr(before)] before:bottom-0 before:absolute 
        before:h-[3px] before:w-full before:bg-blue-600 mb-6'>
                        Sign up
                    </h1>
                    <form
                        action=''
                        className='flex flex-col items-start w-full'
                        onSubmit={formik.handleSubmit}>
                        <label className='text-lg text-slate-600 mb-1'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className='text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className='error-message'>
                                {' '}
                                {formik.errors.email}{' '}
                            </p>
                        )}
                        <div className='flex gap-4 mt-4'>
                            <div className='flex flex-col items-start'>
                                <label className='text-lg text-slate-600 mb-1'>
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    id='first_name'
                                    name='first_name'
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    className='text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                                />
                                {formik.errors.first_name &&
                                    formik.touched.first_name && (
                                        <p className='error-message'>
                                            {' '}
                                            {formik.errors.first_name}{' '}
                                        </p>
                                    )}
                            </div>
                            <div className='flex flex-col items-start'>
                                <label className='text-lg text-slate-600 mb-1'>
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    id='last_name'
                                    name='last_name'
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    className='text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                                />
                                {formik.errors.last_name &&
                                    formik.touched.last_name && (
                                        <p className='error-message'>
                                            {' '}
                                            {formik.errors.last_name}{' '}
                                        </p>
                                    )}
                            </div>
                        </div>
                        <label className='text-lg text-slate-600 mb-1 mt-4'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            className='text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                        />
                        {formik.errors.username && formik.touched.username && (
                            <p className='error-message'>
                                {' '}
                                {formik.errors.username}{' '}
                            </p>
                        )}
                        <label className='text-lg text-slate-600 mb-1 mt-5'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className=' text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400 '
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className='error-message'>
                                {' '}
                                {formik.errors.password}{' '}
                            </p>
                        )}
                        <label className='text-lg text-slate-600 mb-1 mt-5'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            className=' text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                        />
                        {formik.errors.confirmPassword &&
                            formik.touched.confirmPassword && (
                                <p className='error-message'>
                                    {formik.errors.confirmPassword}
                                </p>
                            )}

                        <label className='text-lg text-slate-600 mb-1 mt-4'>
                            Phone Number
                        </label>
                        <input
                            type='number'
                            id='phone_number'
                            name='phone_number'
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            className='text-base py-2 px-3 border-[1px] rounded-[6px] w-full border-slate-400  '
                        />
                        {formik.errors.phone_number &&
                            formik.touched.phone_number && (
                                <p className='error-message'>
                                    {' '}
                                    {formik.errors.phone_number}{' '}
                                </p>
                            )}
                        <input
                            type='submit'
                            id='submit'
                            value='Sign up'
                            className='w-full mt-8 text-lg font-semibold text-white bg-blue-700/90 py-[10px] rounded-3xl my-4 cursor-pointer hover:opacity-90'
                        />
                    </form>
                    <div className='flex justify-center items-center w-full'>
                        <span className=' text-base '>
                            Already have an account?{' '}
                            <span
                                className='text-blue-600 font-semibold cursor-pointer'
                                onClick={() => navigate('/login')}>
                                Log in
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

Signup.propTypes = {}

export default Signup
