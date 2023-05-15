import axiosClient from './AxiosClient'

const CartApi = {
    getCart: (username) => {
        const url = '/carts/' + username
        return axiosClient.get(url)
    },
    addCart: (slug, values) => {
        const url = `/carts/add_cart/${slug}/`
        return axiosClient.post(url, values)
    },
    reduceCart: (slug, values) => {
        const url = `/carts/reduce_cart/${slug}`
        return axiosClient.post(url, {userId: '1'})
    },
    removeCart: (slug, values) => {
        const url = `/carts/remove_cart_item/${slug}`
        return axiosClient.post(url, values)
    },
    checkOut: (values) => {
        const url = `/orders/place_order/`
        return axiosClient.post(url, values)
    },
}

export default CartApi
