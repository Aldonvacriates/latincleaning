type Props = {
  query: string;
  zoom?: number;
};

export default function MapEmbed({ query, zoom = 12 }: Props) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <div className="map-embed" aria-label={`Map showing ${query}`}>
      <iframe
        title={`Map of ${query}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

