import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useCart } from "../../context/cart.provider"
import { http } from "../../utils/http"
import { Product } from '../../utils/models'

type ProductDetailsPageProps = {
    product: Product
}

export const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
    const { addProduct } = useCart()

    return (
        <div>
            <h3>{product.title}</h3>
            <label>{product.price}</label>
            <button onClick={() => addProduct(product)}>Adicionar ao carrinho</button>
        </div>
    )
}

export default ProductDetailsPage

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params || {}

    const { data: product } = await http.get(`/products/${id}`)

    return {
        props: { product }
    }
}