export default function ReviewDetails({ params }: { params: { productId: string, reviewId: string } }) {
    return <h1>Review{params.reviewId} Details Page {params.productId} </h1>
}