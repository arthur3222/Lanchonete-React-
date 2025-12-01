import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEYS = {
  sesc: 'carrinhoSesc',
  senac: 'carrinhoSenac',
};

function loadCartFromStorage(store) {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS[store]);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error(`Erro ao carregar carrinho ${store}:`, error);
    return [];
  }
}

function saveCartToStorage(store, cart) {
  try {
    localStorage.setItem(STORAGE_KEYS[store], JSON.stringify(cart || []));
  } catch (error) {
    console.error(`Erro ao salvar carrinho ${store}:`, error);
  }
}

export function CartProvider({ children }) {
  const [carts, setCarts] = useState({
    sesc: loadCartFromStorage('sesc'),
    senac: loadCartFromStorage('senac'),
  });

  // Sincronizar com localStorage quando mudar
  useEffect(() => {
    saveCartToStorage('sesc', carts.sesc);
  }, [carts.sesc]);

  useEffect(() => {
    saveCartToStorage('senac', carts.senac);
  }, [carts.senac]);

  const addToCart = (store, product) => {
    if (!product || !product.id) {
      console.error('Produto inválido:', product);
      return;
    }

    const key = store === 'senac' ? 'senac' : 'sesc';
    
    setCarts(prev => {
      const currentCart = Array.isArray(prev[key]) ? prev[key] : [];
      
      // Buscar produto existente pelo ID
      const productId = product.id;
      const existingIndex = currentCart.findIndex(item => item.id === productId);
      
      // Quantidade a ser adicionada (padrão 1)
      const qtyToAdd = Math.max(1, Number(product.quantidade || 1));
      
      if (existingIndex !== -1) {
        // Produto já existe - atualizar quantidade
        const updatedCart = [...currentCart];
        const existingProduct = { ...updatedCart[existingIndex] };
        const currentQty = Math.max(1, Number(existingProduct.quantidade || 1));
        existingProduct.quantidade = currentQty + qtyToAdd;
        updatedCart[existingIndex] = existingProduct;
        return { ...prev, [key]: updatedCart };
      }
      
      // Produto novo - adicionar
      const newProduct = {
        ...product,
        quantidade: qtyToAdd,
        preco: parseFloat(product.preco) || 0,
      };
      return { ...prev, [key]: [...currentCart, newProduct] };
    });
  };

  const removeFromCart = (store, index) => {
    const key = store === 'senac' ? 'senac' : 'sesc';
    setCarts(prev => {
      const currentCart = Array.isArray(prev[key]) ? prev[key] : [];
      return { ...prev, [key]: currentCart.filter((_, i) => i !== index) };
    });
  };

  const clearCart = (store) => {
    const key = store === 'senac' ? 'senac' : 'sesc';
    setCarts(prev => ({ ...prev, [key]: [] }));
    localStorage.removeItem(STORAGE_KEYS[key]);
  };

  const updateQuantity = (store, index, newQuantity) => {
    const key = store === 'senac' ? 'senac' : 'sesc';
    const qty = Math.max(1, Number(newQuantity) || 1);
    
    setCarts(prev => {
      const currentCart = Array.isArray(prev[key]) ? [...prev[key]] : [];
      if (currentCart[index]) {
        currentCart[index] = { ...currentCart[index], quantidade: qty };
      }
      return { ...prev, [key]: currentCart };
    });
  };

  return (
    <CartContext.Provider value={{ 
      carts, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateQuantity,
      setCarts // Manter para compatibilidade
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
