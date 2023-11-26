import { getSortedPostsData } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { lang } = params;
    const posts = getSortedPostsData(lang);
    return NextResponse.json(posts);
}
