import articles from "@/articles.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = req.nextUrl;
    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") || "desc";

    let filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );

    filteredArticles = filteredArticles.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sort === "asc" ? dateA - dateB : dateB - dateA;
    });


    return NextResponse.json(filteredArticles)

}