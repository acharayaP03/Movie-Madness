
import Link from "next/link";
import Image from "next/image";

export default function Movies ({ id, title, poster, release, overview }) {
    const imageUrl = "https://image.tmdb.org/t/p/original";

    return (
        <div>
            <Link href={`/id`}>
                <Image priority src={imageUrl + poster } alt={overview} width={800} height={800}/>
            </Link>
            <div className="mt-5">
                <h1 className="truncate">{ title }</h1>
                <h2>{release}</h2>
            </div>

        </div>
    )
}