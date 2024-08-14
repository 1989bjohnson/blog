"use client";

import {useQuery, gql} from "@apollo/client";

const GET_POSTS = gql`
query GetPosts {
    posts {
        id
        title
        content
        author {
            name
        }
    }
}
`;

export default function Home() {
    const {loading, error, data} = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome to my blog</h1>
            <ul>
                {data.posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Author: {post.author.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
