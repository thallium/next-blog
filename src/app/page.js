import { redirect } from "next/navigation"

export default function Home() {
  let lang = navigator.language == 'zh-CN' ? 'zh' : 'en'
  redirect(`/${lang}`)
}
