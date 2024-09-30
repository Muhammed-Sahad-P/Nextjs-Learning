async function serverSideFetchData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

type Post ={
    id: number;
    title: string;
    body: string;
}

async function FetchData() {
    const data = await serverSideFetchData();
    console.log(data);
    return (
        <div>
            <h1>Fetch Data</h1>
            {data.map((post: Post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default FetchData