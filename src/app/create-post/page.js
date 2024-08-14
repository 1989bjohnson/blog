"use client";

import {useState} from "react";
import {useMutation, gql} from "@apollo/client";
import {useRouter} from "next/navigation";

const CREATE_POST = gql`
mutation CreatePost($title: String!, $content: String!, $authorId: Int!) {
    createPost(title: $title, content: $content, authorId: $authorId) {
        id
        title
        content
    }
}
`;

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createPost, {loading, error}] = useMutation(CREATE_POST);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({
            variables: {
                title,
                content,
                authorId: 1
            }
        });
        router.push("/");
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        name="title"/>
                </label>
                <label>
                    Content
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        name="content"/>
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Post'}</button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}