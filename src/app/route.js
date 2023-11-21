import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
    const headerList = headers()
    let lang = headerList.get('accept-language')?.startsWith('zh') ? 'zh' : 'en'
    return NextResponse.redirect(`${process.env.URL}/${lang}`)
}
