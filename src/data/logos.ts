// Integration logos (optimized WebP in /public/assets/logos/).
export interface Logo {
  name: string;
  src: string;
}

export const channels: Logo[] = [
  { name: 'WhatsApp', src: '/assets/logos/whatsapp.webp' },
  { name: 'Email', src: '/assets/logos/gmail.webp' },
  { name: 'Instagram', src: '/assets/logos/instagram.webp' },
  { name: 'Facebook', src: '/assets/logos/facebook.webp' },
  { name: 'LINE', src: '/assets/logos/line.webp' },
  { name: 'Telegram', src: '/assets/logos/telegram.webp' },
];

export const otas: Logo[] = [
  { name: 'Booking.com', src: '/assets/logos/booking.webp' },
  { name: 'Traveloka', src: '/assets/logos/traveloka.webp' },
  { name: 'Tiket.com', src: '/assets/logos/tiket.webp' },
  { name: 'Expedia', src: '/assets/logos/expedia.webp' },
  { name: 'Trip.com', src: '/assets/logos/trip.webp' },
  { name: 'Airbnb', src: '/assets/logos/airbnb.webp' },
];
