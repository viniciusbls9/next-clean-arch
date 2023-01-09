import { useCart } from "../context/cart.provider"

export const MyCart = () => {
    const { total, products } = useCart()

    return (
        <nav>
            Cart - Total: {total} | Items: {products.length}
        </nav>
    )
}