import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => { success: boolean; message?: string };
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'papelaria_cart';

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { firebaseUser } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Sincroniza carrinho quando usuário faz login (simplificado - usa localStorage por usuário)
  useEffect(() => {
    if (firebaseUser) {
      const userCartKey = `${CART_STORAGE_KEY}_${firebaseUser.uid}`;
      const userCart = localStorage.getItem(userCartKey);
      if (userCart) {
        setItems(JSON.parse(userCart));
      }
    }
  }, [firebaseUser?.uid]);

  useEffect(() => {
    if (firebaseUser) {
      const userCartKey = `${CART_STORAGE_KEY}_${firebaseUser.uid}`;
      localStorage.setItem(userCartKey, JSON.stringify(items));
    }
  }, [items, firebaseUser]);

  const addItem = (product: Product, qty = 1) => {
    if (!product.ativo) {
      return { success: false, message: 'Produto indisponível' };
    }
    if (product.estoque <= 0) {
      return { success: false, message: 'Produto esgotado' };
    }

    let result = { success: true, message: '' };
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const newQty = currentQty + qty;

      if (newQty > product.estoque) {
        result = {
          success: false,
          message: `Estoque insuficiente. Disponível: ${product.estoque}`,
        };
        return prev;
      }

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    return result;
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return { success: true };
    }

    let result = { success: true, message: '' };
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;

      if (qty > item.product.estoque) {
        result = {
          success: false,
          message: `Estoque insuficiente. Disponível: ${item.product.estoque}`,
        };
        return prev;
      }

      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      );
    });
    return result;
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.preco * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
