import Figure from "@/app/components/Figure";
import Collapsible from "@/app/components/Collapsible";
import Image from "next/image";

const MDXComponents = {
    Figure, Collapsible,
    Image: (props) => <Image {...props} />
}

export default MDXComponents
