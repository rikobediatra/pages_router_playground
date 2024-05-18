import ProductView from '@/views/product';
import axios from "axios";

type ProductType = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string
};

const ProductPage = (props: { products: ProductType[] }) => {
    const { products } = props;
  return (
    <div>
        <ProductView products={products} />
    </div>
  )
}

export default ProductPage

// dipanggil ketika melakukan 
export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
    const response = await res.json();
    return {
        props: {
            products: response.data
        }
    };
}