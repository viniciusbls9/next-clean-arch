import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { GetProductUseCase } from "../../@core/aplication/product/get-product.use-case"
import { ProductsProps } from "../../@core/domain/entities/product"
import { container, Registry } from "../../@core/infra/container-registry"
import { useCart } from "../../context/cart.provider"

type ProductDetailsPageProps = {
    product: ProductsProps
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

    const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase)

    const product = await useCase.execute(+id!)

    return {
        props: { product: product.toJSON() }
    }
}