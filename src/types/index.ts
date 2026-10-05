export interface ServiceItem {
  id: string;
  title: string;
  englishTitle: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  equipment: string[];
  recommendedFor: string;
  basePriceHint: string;
  badge?: string;
}

export interface PricingOptions {
  serviceType: string;
  areaSize: number; // in sq meters
  roomsCount: number;
  bathroomsCount: number;
  kitchensCount: number;
  hasFurniture: boolean;
  needsMarblePolishing: boolean;
  needsSteamUpholstery: boolean;
  needsWindowDeepClean: boolean;
  location: string;
}

export interface BookingSubmission {
  id?: string;
  customerName: string;
  phone: string;
  city: string;
  areaName: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice?: string;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeStats: string;
  afterStats: string;
}
