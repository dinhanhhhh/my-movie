import Link from "next/link";
import Image from "next/image";

interface Film {
  slug: string;
  name?: string;
  origin_name?: string;
  poster_url: string;
}

const RenderCard = ({ film }: { film: Film }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <Link href={`/info/${film.slug}`}>
        <Image
          className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
          src={`https://phimimg.com/${film.poster_url}`}
          alt={film.name || "Phim không tên"}
          width={300}
          height={450} 
          priority
        />
      </Link>
      <div className="p-4">
        <Link
          className="text-lg font-semibold block mb-1"
          href={`/info/${film.slug}`}
        >
          {film.name || "Tên phim"}
        </Link>
        <p className="text-sm">{film.origin_name}</p>
      </div>

    </div>
  );
};

export default RenderCard;
