import { GetServerSideProps } from "next"
import Link from "next/link"
import { ListProductsUseCase } from "../@core/aplication/product/list-product.use-case"
import { container, Registry } from "../@core/infra/container-registry"
import { HomeProps } from '../utils/models'

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <h1>Ecommerce</h1>

      <ul>
        {products.map(product => (
          <li key={product.title}>
            <label>Name: </label> {product.title}
            |
            <Link href={`/products/${product.id}`} passHref>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const useCase = container.get<ListProductsUseCase>(Registry.ListProductsUseCase)
  const products = await useCase.execute()

  return {
    props: {
      products: products.map((product) => product.toJSON())
    }
  }
}