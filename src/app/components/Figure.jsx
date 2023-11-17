import Image from "next/image"

export default function Figure({ src, alt, width, height, position, caption }) {
    return (
        <figure>
            <Image
                className="mx-auto"
                src={src} alt={alt || ""} width={width} height={height}></Image>
            {caption &&
                <figcaption className="text-center">{caption}</figcaption>
            }
        </figure>
    )
}
