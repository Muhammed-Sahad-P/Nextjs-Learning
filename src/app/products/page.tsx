import products from "@/utils/constants";
import Link from "next/link";

export default function ProductList() {
    return (
        <div>
            {
                products.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <div className="border p-4">
                            <h1 className="text-3xl">{product.name}</h1>
                            <p>{product.price}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}