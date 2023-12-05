import Script from "next/script";

export default function Collapsible({ children, title, isCollapsed = true }) {
  return (
    <>
      <div className="collapse collapse-arrow bg-secondary">
        <input type="checkbox" />
        <div className="collapse-title text-xl">
          {title}
        </div>
        <div className="collapse-content overflow-auto">
          {children}
        </div>
      </div>
    </>
  )
}
