'use client';
import { create } from 'zustand';

interface Broker {
  id: string;
  email: string;
  name: string;
  companyName: string | null;
  countryCode: string;
  currency: string;
  plan: 'starter' | 'pro' | 'enterprise';
  paymentMethod: 'yappy' | 'stripe';
  isActive: boolean;
}

interface BrokerStore {
  broker: Broker | null;
  setBroker: (broker: Broker | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useBrokerStore = create<BrokerStore>((set) => ({
  broker: null,
  setBroker: (broker) => set({ broker }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
