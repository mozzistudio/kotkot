'use client';
import { create } from 'zustand';

interface Conversation {
  id: string;
  clientPhone: string;
  clientName: string | null;
  status: 'active' | 'waiting_payment' | 'human_takeover' | 'closed';
  insuranceType: string | null;
  lastMessageAt: string;
  aiSummary: string | null;
}

interface ConversationsStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useConversationsStore = create<ConversationsStore>((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  selectedId: null,
  setSelectedId: (selectedId) => set({ selectedId }),
}));
