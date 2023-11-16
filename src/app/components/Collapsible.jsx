import Script from "next/script";

export default function Collapsible({ children, title, isCollapsed = true }) {
  return (
    <>
      <div className="collapse collapse-arrow bg-[#eaeaea] dark:bg-[#3b3d42]">
        <input type="checkbox" />
        <div className="collapse-title text-xl">
          {title}
        </div>
        <div className="collapse-content">
          {children}
        </div>
      </div>
    </>
  )
}
