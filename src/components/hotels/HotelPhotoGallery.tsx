
interface Props {
  gallery: string[];
  hotelName: string;
}

export default function HotelPhotoGallery({ gallery, hotelName }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {gallery?.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={img}
            alt={`${hotelName} view ${index + 1}`}
            className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105 will-change-transform"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">View {index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
