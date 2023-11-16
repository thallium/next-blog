import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default function Home() {
  const headerList = headers()
  let lang = headerList.get('accept-language').startsWith('zh') ? 'zh' : 'en'
  redirect(`/${lang}`)
}
