import { useCart } from "../context/cart.provider"

export const MyCart = () => {
    const { cart } = useCart()

    return (
        <nav>
            Cart - Total: {cart.total} | Items: {cart.products.length}
        </nav>
    )
}