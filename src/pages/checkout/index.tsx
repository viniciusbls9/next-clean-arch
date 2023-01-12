import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useCart } from "../../context/cart.provider";
import { http } from "../../utils/http";

const CheckoutPage: NextPage = () => {
    const { cart } = useCart()
    const router = useRouter()

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const credit_card_number = event.currentTarget.credit_card_number.value
        const { data: order } = await http.post('/products', {
            products: cart.products.map(product => ({ ...product.props })),
            credit_card_number
        })

        router.push(`/checkout/${order.id}/success`)
    }

    return (
        <div>
            <h3>My cart</h3>
            <ul>
                {cart.products.map((product) => (
                    <li key={product.id}>
                        Product {product.title} - {product.price}
                    </li>
                ))}
            </ul>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Cartão crédito</label>
                    <input
                        type="text"
                        name="credit_card_number"
                        id="credit_card_number"
                    />
                </div>

                <div>
                    <button type="submit">Comprar</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutPage