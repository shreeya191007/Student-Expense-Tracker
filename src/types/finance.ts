export interface Transaction {
  id: string;
  date: string;
  category: 'Subscriptions' | 'Meal Plans' | 'Rent & Utilities' | 'Entertainment' | 'Other';
  amount: number;
  description: string;
}

export interface CategoryLimit {
  category: Transaction['category'];
  limit: number;
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-08-01', category: 'Rent & Utilities', amount: 450, description: 'Shared Apartment Rent' },
  { id: '2', date: '2026-08-03', category: 'Subscriptions', amount: 15.99, description: 'Spotify & Netflix' },
  { id: '3', date: '2026-08-05', category: 'Meal Plans', amount: 120, description: 'Campus Dining Pass' },
  { id: '4', date: '2026-08-10', category: 'Entertainment', amount: 45, description: 'Weekend Movie & Snacks' },
  { id: '5', date: '2026-08-15', category: 'Meal Plans', amount: 85, description: 'Grocery Store Run' },
];

export const INITIAL_LIMITS: CategoryLimit[] = [
  { category: 'Rent & Utilities', limit: 500 },
  { category: 'Meal Plans', limit: 250 },
  { category: 'Subscriptions', limit: 30 },
  { category: 'Entertainment', limit: 100 },
  { category: 'Other', limit: 50 },
];