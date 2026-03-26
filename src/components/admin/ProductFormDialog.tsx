import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import ImageUpload from './ImageUpload';

const productSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200, 'Name too long'),
  category: z.string().trim().min(1, 'Category is required').max(100),
  price: z.coerce.number().positive('Price must be positive'),
  original_price: z.coerce.number().positive().optional().or(z.literal('')),
  description: z.string().trim().max(2000).optional(),
  colors: z.string().trim().max(1000),
  sizes: z.string().trim().max(500),
  materials: z.string().trim().max(1000),
  care_instructions: z.string().trim().max(2000),
  in_stock: z.boolean(),
  featured: z.boolean(),
  new: z.boolean(),
  sale: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess: () => void;
}

function arrayToCommaString(arr?: string[] | null): string {
  return (arr || []).join(', ');
}

function commaStringToArray(str: string): string[] {
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

export default function ProductFormDialog({ open, onOpenChange, product, onSuccess }: ProductFormDialogProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const isEditing = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '', category: '', price: 0, original_price: '',
      description: '', colors: '', sizes: '', materials: '',
      care_instructions: '', in_stock: true, featured: false, new: false, sale: false,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || '',
        category: product.category || '',
        price: Number(product.price) || 0,
        original_price: product.original_price ? Number(product.original_price) : '',
        description: product.description || '',
        colors: arrayToCommaString(product.colors),
        sizes: arrayToCommaString(product.sizes),
        materials: arrayToCommaString(product.materials),
        care_instructions: arrayToCommaString(product.care_instructions),
        in_stock: product.in_stock ?? true,
        featured: product.featured ?? false,
        new: product.new ?? false,
        sale: product.sale ?? false,
      });
      setImages(product.images || []);
    } else {
      form.reset({
        name: '', category: '', price: 0, original_price: '',
        description: '', colors: '', sizes: '', materials: '',
        care_instructions: '', in_stock: true, featured: false, new: false, sale: false,
      });
      setImages([]);
    }
  }, [product, open]);

  const onSubmit = async (values: ProductFormValues) => {
    if (images.length === 0) {
      toast({ title: 'Images required', description: 'Add at least one product image.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    const payload = {
      name: values.name,
      category: values.category,
      price: values.price,
      original_price: values.original_price ? Number(values.original_price) : null,
      description: values.description || null,
      images,
      colors: commaStringToArray(values.colors),
      sizes: commaStringToArray(values.sizes),
      materials: commaStringToArray(values.materials),
      care_instructions: commaStringToArray(values.care_instructions),
      in_stock: values.in_stock,
      featured: values.featured,
      new: values.new,
      sale: values.sale,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('products').update(payload).eq('id', product.id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: isEditing ? 'Product updated' : 'Product created' });
      onOpenChange(false);
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>{isEditing ? 'Edit Product' : 'Create Product'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl><Input placeholder="Product name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl><Input placeholder="e.g. Tops, Dresses" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl><Input type="number" step="0.01" min="0" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="original_price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price (optional)</FormLabel>
                    <FormControl><Input type="number" step="0.01" min="0" placeholder="For sale items" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Product description..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Images *</Label>
                <ImageUpload images={images} onChange={setImages} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="colors" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="Black, White, Red" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sizes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="S, M, L, XL" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="materials" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materials (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="Cotton, Polyester" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="care_instructions" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Care Instructions (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="Machine wash, Tumble dry" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {(['in_stock', 'featured', 'new', 'sale'] as const).map(field => (
                  <FormField key={field} control={form.control} name={field} render={({ field: f }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch checked={f.value as boolean} onCheckedChange={f.onChange} />
                      </FormControl>
                      <Label className="capitalize cursor-pointer">{field.replace('_', ' ')}</Label>
                    </FormItem>
                  )} />
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
