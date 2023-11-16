import Image from "next/image"

export default function Figure({ src, alt, width, height }) {
    return (
        <figure>
            <Image src={src} alt={alt || ""} width={width} height={height}></Image>
        </figure>
    )
}
