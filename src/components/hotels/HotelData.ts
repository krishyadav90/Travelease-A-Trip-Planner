const hotelResults = [
  {
    id: 1,
    name: "Azure Heights Hotel",
    location: "Budapest",
    image: "/photos/c9c187c9-cae4-4dba-a67f-79e2fb95bef5.png",
    discount: 15,
    rating: 4,
    reviews: 234,
    price: 9500,
    amenities: ["wifi", "parking", "pool", "restaurant", "gym", "spa", "valet parking"],
    description: "Experience luxury and comfort at Azure Heights Hotel, located in the heart of Budapest.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+36 1 234 5678",
    email: "info@azureheights.hu",
    website: "https://azureheights.hu",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Complimentary breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/hu/azure-heights.en-gb.html",
  },
  {
    id: 2,
    name: "Indigo Dream Hotel",
    location: "Los Angeles",
    image: "/photos/eece8944-8734-4539-9954-9463a5d71a67.png",
    discount: 10,
    rating: 5,
    reviews: 512,
    price: 18000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    description: "Indigo Dream Hotel offers a modern stay with stunning city views in Los Angeles.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+1 310 555 1234",
    email: "contact@indigodream.com",
    website: "https://indigodream.com",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast available at an additional cost.",
    gallery: [
      "https://images.unsplash.com/photo-1501183638714-1f0a64c9750e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/us/indigo-dream.en-gb.html",
  },
  {
    id: 3,
    name: "Golden Sands Palace",
    location: "Dubai",
    image: "/photos/ff5f82b8-ed61-40ca-8139-f756eb27d1a9.png",
    discount: 20,
    rating: 5,
    reviews: 678,
    price: 25000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa", "valet parking"],
    description: "Golden Sands Palace is a luxurious resort offering world-class amenities in Dubai.",
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
    phone: "+971 4 123 4567",
    email: "reservations@goldensands.ae",
    website: "https://goldensands.ae",
    starRating: 5,
    cancellation: "Free cancellation up to 72 hours before check-in.",
    breakfast: "Complimentary breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/ae/golden-sands-palace.en-gb.html",
  },
  {
    id: 4,
    name: "Emerald Escape Resort",
    location: "Florence",
    image: "/photos/d413a962-7078-405e-bb88-a46cb5f51833.png",
    discount: 12,
    rating: 4,
    reviews: 321,
    price: 15000,
    amenities: ["wifi", "parking", "restaurant", "gym"],
    description: "Emerald Escape Resort offers a peaceful retreat with beautiful views in Florence.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+39 055 123456",
    email: "info@emeraldescape.it",
    website: "https://emeraldescape.it",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501183638714-1f0a64c9750e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/it/emerald-escape.en-gb.html",
  },
  {
    id: 5,
    name: "Sunset Bay Resort",
    location: "Singapore",
    image: "/photos/87fd0348-e253-4f6b-8ba0-7aee6e04aac3.png",
    discount: 18,
    rating: 5,
    reviews: 450,
    price: 22000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    description: "Sunset Bay Resort offers stunning waterfront views and luxury amenities in Singapore.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+65 1234 5678",
    email: "contact@sunsetbay.sg",
    website: "https://sunsetbay.sg",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501183638714-1f0a64c9750e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/sg/sunset-bay.en-gb.html",
  },
  {
    id: 6,
    name: "Royal Orchid Suites",
    location: "Paris",
    image: "/photos/6626640b-ee21-4212-8075-40a06ac912c9.png",
    discount: 14,
    rating: 4,
    reviews: 389,
    price: 17000,
    amenities: ["wifi", "parking", "restaurant", "gym", "spa"],
    description: "Royal Orchid Suites offers elegant accommodations in the heart of Paris.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+33 1 2345 6789",
    email: "info@royalorchid.fr",
    website: "https://royalorchid.fr",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/fr/royal-orchid-suites.en-gb.html",
  },
  {
    id: 7,
    name: "Majestic Crown",
    location: "New York",
    image: "/photos/49dd576c-81a8-4424-836a-8a89e99b3e2c.png",
    discount: 17,
    rating: 5,
    reviews: 600,
    price: 23000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa", "valet parking"],
    description: "Majestic Crown offers luxury and style in the heart of New York City.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+1 212 555 7890",
    email: "contact@majesticcrown.com",
    website: "https://majesticcrown.com",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/us/majestic-crown.en-gb.html",
  },
  {
    id: 8,
    name: "Harmony Grand",
    location: "London",
    image: "/photos/308ea823-ae9a-4dfd-b042-68c8cdfc7422.png",
    discount: 13,
    rating: 4,
    reviews: 410,
    price: 16000,
    amenities: ["wifi", "parking", "restaurant", "gym"],
    description: "Harmony Grand offers a blend of classic and modern luxury in London.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+44 20 1234 5678",
    email: "info@harmonygrand.co.uk",
    website: "https://harmonygrand.co.uk",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/gb/harmony-grand.en-gb.html",
  },
  {
    id: 9,
    name: "Celestial Vista Hotel",
    location: "Tokyo",
    image: "/photos/b3749ca8-d739-41b7-97af-1d66de8dc957.png",
    discount: 16,
    rating: 5,
    reviews: 520,
    price: 21000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    description: "Celestial Vista Hotel offers breathtaking views and luxury in Tokyo.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+81 3 1234 5678",
    email: "info@celestialvista.jp",
    website: "https://celestialvista.jp",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/jp/celestial-vista.en-gb.html",
  },
  {
    id: 10,
    name: "Serenity Suites",
    location: "Udaipur",
    image: "/photos/d6843d87-4207-4c76-811e-933a8ee8b9ec.png",
    discount: 11,
    rating: 4,
    reviews: 280,
    price: 12000,
    amenities: ["wifi", "parking", "restaurant", "gym"],
    description: "Serenity Suites offers a tranquil stay with beautiful lake views in Udaipur.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+91 294 1234567",
    email: "info@serenitysuites.in",
    website: "https://serenitysuites.in",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/in/serenity-suites.en-gb.html",
  },
  {
    id: 11,
    name: "Grand Sapphire Inn",
    location: "Paris",
    image: "/photos/86666b37-abac-4b94-9089-76bf06c9585a.png",
    discount: 19,
    rating: 5,
    reviews: 480,
    price: 20000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa"],
    description: "Grand Sapphire Inn offers elegant luxury accommodations in Paris.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+33 1 9876 5432",
    email: "contact@grandsapphire.fr",
    website: "https://grandsapphire.fr",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/fr/grand-sapphire-inn.en-gb.html",
  },
  {
    id: 12,
    name: "Opal Lake Resort",
    location: "Budapest",
    image: "/photos/e8c23dcb-2219-46b0-a0c9-c137f3ed6d0d.png",
    discount: 14,
    rating: 4,
    reviews: 350,
    price: 14000,
    amenities: ["wifi", "parking", "pool", "restaurant", "gym"],
    description: "Opal Lake Resort offers serene lakeside accommodations in Budapest.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+36 1 876 5432",
    email: "info@opallake.hu",
    website: "https://opallake.hu",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/hu/opal-lake.en-gb.html",
  },
  {
    id: 13,
    name: "The Imperial Elegance",
    location: "London",
    image: "/photos/e4293e31-2cb1-4841-a06c-060cb5aabb70.png",
    discount: 16,
    rating: 5,
    reviews: 470,
    price: 21000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa", "valet parking"],
    description: "The Imperial Elegance offers a regal experience in the heart of London.",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    phone: "+44 20 9876 5432",
    email: "contact@imperialelegance.co.uk",
    website: "https://imperialelegance.co.uk",
    starRating: 5,
    cancellation: "Free cancellation up to 48 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/gb/imperial-elegance.en-gb.html",
  },
  {
    id: 14,
    name: "Blissful Pines Retreat",
    location: "Florence",
    image: "/photos/77989812-4f18-45e0-96d3-fe86d16c7288.png",
    discount: 13,
    rating: 4,
    reviews: 300,
    price: 13000,
    amenities: ["wifi", "parking", "restaurant", "gym"],
    description: "Blissful Pines Retreat offers a cozy and peaceful stay in Florence.",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    phone: "+39 055 987654",
    email: "info@blissfulpines.it",
    website: "https://blissfulpines.it",
    starRating: 4,
    cancellation: "Free cancellation up to 24 hours before check-in.",
    breakfast: "Breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/it/blissful-pines.en-gb.html",
  },
  {
    id: 15,
    name: "Panorama Luxe Hotel",
    location: "Dubai",
    image: "/photos/df02d3e1-5a64-404d-a38d-a64685fc57a1.png",
    discount: 20,
    rating: 5,
    reviews: 700,
    price: 27000,
    amenities: ["wifi", "pool", "restaurant", "gym", "spa", "valet parking"],
    description: "Panorama Luxe Hotel offers breathtaking views and top-tier luxury in Dubai.",
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
    phone: "+971 4 765 4321",
    email: "reservations@panoramaluxe.ae",
    website: "https://panoramaluxe.ae",
    starRating: 5,
    cancellation: "Free cancellation up to 72 hours before check-in.",
    breakfast: "Complimentary breakfast included.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501117716987-c8e6a7a3f3a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ],
    bookingUrl: "https://www.booking.com/hotel/ae/panorama-luxe.en-gb.html",
  },
];

export default hotelResults;
