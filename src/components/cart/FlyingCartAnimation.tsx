import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FlyingCartItem {
  id: string;
  imageUrl: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

interface FlyingCartAnimationProps {
  items: FlyingCartItem[];
  onComplete: (id: string) => void;
}

export function FlyingCartAnimation({ items, onComplete }: FlyingCartAnimationProps) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            position: 'fixed',
            left: item.startPosition.x,
            top: item.startPosition.y,
            width: 80,
            height: 80,
            opacity: 1,
            scale: 1,
            rotate: 0,
            zIndex: 9999,
            borderRadius: 12,
          }}
          animate={{
            left: item.endPosition.x,
            top: item.endPosition.y,
            width: 24,
            height: 24,
            opacity: 0.3,
            scale: 0.4,
            rotate: 15,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.32, 0, 0.24, 1],
          }}
          onAnimationComplete={() => onComplete(item.id)}
          className="pointer-events-none"
        >
          <img
            src={item.imageUrl}
            alt="Flying to cart"
            className="w-full h-full object-cover rounded-lg shadow-intense"
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

interface UseFlyingCartReturn {
  flyingItems: FlyingCartItem[];
  triggerAnimation: (imageUrl: string, startElement: HTMLElement) => void;
}

export function useFlyingCart(): UseFlyingCartReturn {
  const [flyingItems, setFlyingItems] = useState<FlyingCartItem[]>([]);

  const triggerAnimation = (imageUrl: string, startElement: HTMLElement) => {
    // Get start position from the clicked element
    const startRect = startElement.getBoundingClientRect();
    
    // Get cart icon position (find the cart button in header)
    const cartButton = document.querySelector('[data-cart-button]');
    if (!cartButton) return;
    
    const endRect = cartButton.getBoundingClientRect();
    
    const newItem: FlyingCartItem = {
      id: `${Date.now()}-${Math.random()}`,
      imageUrl,
      startPosition: {
        x: startRect.left + startRect.width / 2 - 50,
        y: startRect.top + startRect.height / 2 - 50,
      },
      endPosition: {
        x: endRect.left + endRect.width / 2 - 15,
        y: endRect.top + endRect.height / 2 - 15,
      },
    };

    setFlyingItems((prev) => [...prev, newItem]);
  };

  const handleComplete = (id: string) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    flyingItems,
    triggerAnimation,
  };
}

export function FlyingCartProvider({ children }: { children: React.ReactNode }) {
  const { flyingItems, triggerAnimation } = useFlyingCart();

  return (
    <>
      {children}
      <FlyingCartAnimation items={flyingItems} onComplete={(id) => {}} />
    </>
  );
}
