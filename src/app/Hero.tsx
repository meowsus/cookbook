import Link from "next/link";

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export default function Hero({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
}: HeroProps) {
  return (
    <div
      className="hero grow bg-top rounded-lg overflow-hidden shadow"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md text-shadow-sm/20">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5 text-lg">{description}</p>

          <Link href={buttonLink} className="btn btn-primary">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
