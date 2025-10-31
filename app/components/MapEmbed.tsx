type Props = {
  query: string;
  zoom?: number;
};

export default function MapEmbed({ query, zoom = 12 }: Props) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <div
      aria-label={`Map showing ${query}`}
      className="mt-3 border border-[color:var(--light-gray)] rounded-[14px] overflow-hidden shadow"
    >
      <iframe
        title={`Map of ${query}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block w-full [aspect-ratio:16/9] bg-[#e2e8f0]"
      />
    </div>
  );
}
