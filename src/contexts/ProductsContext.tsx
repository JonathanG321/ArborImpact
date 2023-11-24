import { createContext, PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';
import { Product } from '../../lib/types';
import { downloadImage } from '../../lib/utils';
import Queries from '../../lib/supabaseQueries';

export const ProductsContext = createContext<{
  products: Product[] | null;
  setProducts: (products: Product[] | null) => void;
  getProducts: () => Promise<void>;
}>({
  products: null,
  setProducts: () => undefined,
  getProducts: () => Promise.resolve<void>(undefined),
});
export function ProductsContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[] | null>(null);

  async function getProducts() {
    try {
      const { error, status, data } = await Queries.getSupabaseProducts();
      if (error && status !== 406) throw error;
      if (error) return;
      setProducts(
        await Promise.all(
          data.map(async (product) => {
            const image = await downloadImage(product?.product_image_url || '', 'product_images');
            return {
              ...product,
              createdAt: product.created_at,
              image: image || null,
            };
          })
        )
      );
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }

  return <ProductsContext.Provider value={{ products, setProducts, getProducts }}>{children}</ProductsContext.Provider>;
}
