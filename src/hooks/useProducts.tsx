import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/store/useStore';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database response to Product type
      return (data || []).map((item): Product => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        images: item.images || [],
        colors: item.colors || [],
        sizes: item.sizes || [],
        materials: item.materials || [],
        description: item.description || '',
        rating: Number(item.rating || 0),
        reviews: item.reviews || 0,
        category: item.category,
        inStock: item.in_stock ?? true,
        featured: item.featured || false,
        new: item.new || false,
      }));
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      // Transform database response to Product type
      return {
        id: data.id,
        name: data.name,
        price: Number(data.price),
        originalPrice: data.original_price ? Number(data.original_price) : undefined,
        images: data.images || [],
        colors: data.colors || [],
        sizes: data.sizes || [],
        materials: data.materials || [],
        description: data.description || '',
        rating: Number(data.rating || 0),
        reviews: data.reviews || 0,
        category: data.category,
        inStock: data.in_stock ?? true,
        featured: data.featured || false,
        new: data.new || false,
      } as Product;
    },
    enabled: !!id,
  });
};
