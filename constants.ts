import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Neo-Glider X1",
    price: 1.50,
    category: "Hover Tech",
    image: "https://picsum.photos/400/400?random=1",
    description: "The latest in personal levitation technology. Smooth ride, silent motor, and neon underglow included.",
    rating: 4.8
  },
  {
    id: 2,
    name: "CyberVisor Pro",
    price: 1.50,
    category: "Wearables",
    image: "https://picsum.photos/400/400?random=2",
    description: "Augmented reality interface with neural linking capabilities. Stay connected without lifting a finger.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Quantum Core Desktop",
    price: 1.50,
    category: "Computing",
    image: "https://picsum.photos/400/400?random=3",
    description: "Processing power that defies physics. Perfect for rendering the metaverse in real-time.",
    rating: 5.0
  },
  {
    id: 4,
    name: "Sonic Pulse Speakers",
    price: 1.50,
    category: "Audio",
    image: "https://picsum.photos/400/400?random=4",
    description: "Feel the bass in your bones with our patented sonic pulse technology. 360-degree immersive audio.",
    rating: 4.2
  },
  {
    id: 5,
    name: "Holo-Watch Series 7",
    price: 1.50,
    category: "Wearables",
    image: "https://picsum.photos/400/400?random=5",
    description: "A holographic display on your wrist. Tracks health, messages, and projects 3D maps.",
    rating: 4.7
  },
  {
    id: 6,
    name: "Lumina Smart Lamp",
    price: 1.50,
    category: "Home",
    image: "https://picsum.photos/400/400?random=6",
    description: "Mood lighting controlled by your thoughts (via neural link app). Millions of colors to choose from.",
    rating: 4.3
  }
];

export const CATEGORIES = ["All", "Hover Tech", "Wearables", "Computing", "Audio", "Home"];