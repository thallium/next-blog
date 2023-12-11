import { ChevronsUpDown } from "lucide-react"
import {
  Collapsible as Collapse,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function Collapsible({ children, title, isCollapsed = true }) {
  return (
    <Collapse defaultOpen={!isCollapsed}>
      <CollapsibleTrigger className="flex items-center bg-accent rounded-lg justify-between w-full p-4">
        <h4 className="not-prose text-lg">
          {title}
        </h4>
        <ChevronsUpDown />
      </CollapsibleTrigger>
      <CollapsibleContent >
        {children}
      </CollapsibleContent>
    </Collapse>
  )
}
