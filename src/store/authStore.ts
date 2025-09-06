import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Simple local storage for users (in a real app, you'd use a proper backend)
const USERS_KEY = 'doco_users';
const CURRENT_USER_KEY = 'doco_current_user';

const getStoredUsers = (): Array<{ id: string; email: string; password: string; username?: string }> => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUser = (user: { id: string; email: string; password: string; username?: string }) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const findUser = (email: string, password: string) => {
  const users = getStoredUsers();
  return users.find(user => user.email === email && user.password === password);
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  signIn: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = findUser(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    
    set({ user: userData });
  },
  
  signUp: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const users = getStoredUsers();
    if (users.find(user => user.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: uuidv4(),
      email,
      password,
      username: email.split('@')[0] // Use email prefix as username
    };
    
    saveUser(newUser);
    
    const userData = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    };
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    
    set({ user: userData });
  },
  
  signOut: async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    set({ user: null });
  },
  
  checkAuth: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      const user = JSON.parse(stored);
      set({ user });
    }
    
    set({ loading: false });
  }
}));