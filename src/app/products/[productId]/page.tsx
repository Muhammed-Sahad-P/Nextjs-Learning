import products from "@/utils/constants"

interface paramsType {
    params: {
        productId: string
    }
}
export default function ProdctDetails({ params }: paramsType) {
    const id: number = parseInt(params.productId)
    const product = products.find((product) => product.id === id)
    return (
        <div>
            <h1>{product?.name}</h1>
            <p>{product?.price}</p>
        </div>

    )
}