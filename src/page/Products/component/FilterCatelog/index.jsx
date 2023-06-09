import React, {useState} from 'react'
import {FaAngleDown} from 'react-icons/fa'

function FilterCatelog(props) {
    const {
        category,
        listproduct,
        onChangeCat,
        catAtive,
        onChangeFilterPrice,
        oncloseCatmb,
    } = props
    const [showcatelog, setShowcatelog] = useState(true)
    const [showprice, setShowprice] = useState(true)

    const [FromPrice, setFromprice] = useState(0)
    const [ToPrice, setToprice] = useState(1000)

    function fiterproduct(category) {
        const products = listproduct.filter(
            (product) => product.category_name === category.category_name
        )
        return products
    }

    function handleChangeCat(cat = 'All') {
        onChangeCat(cat)
        oncloseCatmb()
    }

    function handleFilter(FromPrice, ToPrice) {
        onChangeFilterPrice(FromPrice, ToPrice)
        oncloseCatmb()
    }

    return (
        <div className='sticky top-[80px] flex flex-col '>
            <div className='flex justify-between sm:text-xl lg:text-base sm:mb-8 lg:mb-5'>
                <span className=''>Filter</span>
                <span className='text-yellow-600 cursor-pointer'>
                    Clear All
                </span>
            </div>

            <div className=' flex flex-col text-lg cursor-pointer pb-4 border-b-[1px]'>
                <div
                    className='flex justify-between text-lg transitions-theme'
                    onClick={() => setShowcatelog(!showcatelog)}>
                    <h1 className=''>Category</h1>
                    <FaAngleDown
                        className={`mr-5 transition-all duration-300 linear ${
                            showcatelog ? '' : 'rotate-[-90deg]'
                        }`}
                    />
                </div>
                <div
                    className={` font-thin ${
                        showcatelog ? 'block opacity-100 ' : 'hidden opacity-0'
                    }`}>
                    <div className='flex justify-between text-lg my-2'>
                        <span
                            className={` relative hover:text-yellow-600 hover:translate-x-2 hover:duration-300
                 ${
                     catAtive === 'All'
                         ? 'text-yellow-700 before:border-yellow-600 '
                         : 'text-slate-600 hover:before:w-[100%] before:border-slate-400 '
                 }`}
                            onClick={() => handleChangeCat()}>
                            &nbsp;All&nbsp;
                        </span>
                        <div className=' mr-5 flex h-[25px] w-[25px] bg-slate-100/95 rounded-[4px]'>
                            <span className='m-auto text-[14px] text-gray-600/60 '>
                                {listproduct.length}
                            </span>
                        </div>
                    </div>
                    {category.map((cat, index) => (
                        <div
                            className='flex justify-between text-lg my-2'
                            key={index}>
                            <span
                                // before={`\u00A0${cat.category_name.split(" ")[0]}\u00A0${
                                //   cat.category_name.split(" ")[1]
                                // }\u00A0`}
                                className={`relative text-left hover:text-yellow-600 hover:translate-x-2 hover:duration-300
                 ${
                     catAtive === cat.category_name
                         ? 'text-yellow-700 before:border-yellow-600 '
                         : 'text-slate-600 hover:before:w-[100%] before:border-slate-400 '
                 }`}
                                onClick={() => handleChangeCat(cat)}>
                                &nbsp;{cat.category_name}&nbsp;
                            </span>
                            <div className='mr-5 flex h-[25px] w-[25px] bg-slate-100/95  rounded-[4px]'>
                                <span className='m-auto text-[14px] text-slate-500/60 '>
                                    {fiterproduct(cat).length}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5'>
                <div
                    className='flex justify-between text-lg transitions-theme'
                    onClick={() => setShowprice(!showprice)}>
                    <h1 className=''>Price</h1>
                    <FaAngleDown
                        className={`mr-5 transition-all duration-300 linear ${
                            showprice ? '' : 'rotate-[-90deg]'
                        }`}
                    />
                </div>
                {showprice && (
                    <div className='flex flex-col gap-3 mt-2 text-base font-thin'>
                        <div className='flex justify-between items-center'>
                            <span>From </span>
                            <input
                                type='number'
                                value={FromPrice}
                                onChange={(e) => setFromprice(e.target.value)}
                                className='border-[1px] border-gray-500 pl-2 w-[60%] '
                            />
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>To </span>
                            <input
                                type='number'
                                value={ToPrice}
                                onChange={(e) => setToprice(e.target.value)}
                                className='border-[1px] border-gray-500 pl-2 w-[60%] '
                            />
                        </div>
                        <button
                            type='button'
                            className=' m-auto text-white bg-yellow-600 w-[50%] py-1 mt-2 rounded-[4px] hover:opacity-90 shadow-md'
                            onClick={() => handleFilter(FromPrice, ToPrice)}>
                            Filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

FilterCatelog.propTypes = {}

export default FilterCatelog
