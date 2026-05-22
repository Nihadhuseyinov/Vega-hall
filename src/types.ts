export interface MenuItem {
  id: string;
  nameAz: string;
  nameEn: string;
  nameRu: string;
  descriptionAz: string;
  descriptionEn: string;
  descriptionRu: string;
  category: 'soyuq' | 'isti' | 'tursu' | 'ickiler' | 'desert' | 'hediyyeler';
  price: number; // in AZN (₼)
  image: string;
  tags?: string[];
}

export interface ReservationData {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  tableId?: number;
  createdAt: string;
}

export interface DesignToken {
  name: string;
  value: string;
  description: string;
  cssProperty?: string;
}

export interface UIComponentSpec {
  name: string;
  padding: string;
  margin: string;
  fontSize: string;
  shadow: string;
  duration: string;
  hoverState: string;
}
