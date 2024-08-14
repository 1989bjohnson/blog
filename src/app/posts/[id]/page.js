"use client";

import {useParams} from "next/navigation";

export default function PostDetails() {
    const params = useParams();
    const id = params.id;

    return (
        <div>
            <h1>Post Details</h1>
            <p>Post ID: {id}</p>
        </div>
    )
}