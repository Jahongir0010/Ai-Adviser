import { Apple, Carrot, Beef, Milk, Flame, Wheat, Nut, Flower2, Shirt, Footprints, Store, Warehouse, ShoppingBag, Sprout, Car, Snowflake, Truck } from 'lucide-react'

export const PRODUCT_ICONS = {
  Fruit: Apple,
  Vegetables: Carrot,
  Meat: Beef,
  Dairy: Milk,
  Spices: Flame,
  Bread: Wheat,
  Nuts: Nut,
  Flowers: Flower2,
  Textile: Shirt,
  Shoes: Footprints,
}

export const MARKET_TYPE_ICONS = {
  Universal: Store,
  Wholesale: Warehouse,
  Retail: ShoppingBag,
  "Farmers' market": Sprout,
}

// Distinct two-tone banner gradient per market type (a fixed, meaningful
// mapping - not random per-card) used in place of real market photography.
export const MARKET_TYPE_GRADIENT = {
  Universal: 'from-primary-600 to-secondary-500',
  Wholesale: 'from-primary-800 to-primary-400',
  Retail: 'from-secondary-700 to-secondary-300',
  "Farmers' market": 'from-amber-500 to-secondary-600',
}

export const FACILITY_ICONS = {
  parking: Car,
  coldStorage: Snowflake,
  wholesaleSection: Warehouse,
  retailSection: ShoppingBag,
  loadingZone: Truck,
}
