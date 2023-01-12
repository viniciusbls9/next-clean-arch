import { NextPage } from "next";
import { useCart } from "../../../context/cart.provider";

const CheckoutSuccessPage: NextPage = () => {
    const { cart } = useCart()

    return (
        <div>
            <h3>Parabens, sua compra ID foi efetivada</h3>

            <ul>
               {cart.products.map((product) => (
                <li key={product.id}>{product.title} - {product.price}</li>
               ))}
            </ul>
        </div>
    )
}

export default CheckoutSuccessPage