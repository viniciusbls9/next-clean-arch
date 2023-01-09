import { NextPage } from "next";
import { FormEvent } from "react";

export const CheckoutPage: NextPage = () => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <div>
            <h3>My cart</h3>
            <ul></ul>
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