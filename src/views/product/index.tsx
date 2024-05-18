import Link from "next/link";

type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string
};

export const Skeleton = () => {
    return (
        <div className="animate-pulse w-1/5">
            <div className="bg-gray-500 w-full aspect-square"></div>
            <div className="flex flex-col gap-3 pt-3">
                <div className="bg-gray-500 h-5 w-full"></div>
                <div className="bg-gray-500 h-5 w-full"></div>
                <div className="bg-gray-500 h-5 w-full"></div>
            </div>
        </div>
    );
}

const ProductView = ({ products }: { products: ProductType[] }) => {
    
    const renderedProduct = products.map((product: ProductType) => {
        
        const changePriceToIdr = product.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        return(
            <Link href={`/product/${product.id}`} key={product.id} className="w-1/5">
                <div className="mb-4">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="font-bold">
                        {product.category}
                    </h4>
                    <p className="text-gray-500">
                        {product.name}
                    </p>
                    <p className="font-bold mt-2">
                        {changePriceToIdr}
                    </p>
                </div>
            </Link>
        );
      });

    return (
        <div className="w-full px-20">
            <h1 className="text-center font-bold text-4xl py-2 mt-4">Products Page</h1>
            <div className="flex gap-8 py-12">
                {products.length > 0 ? (
                    renderedProduct
                ) : (
                    <Skeleton />
                )}
            </div>
        </div>
    );
}

export default ProductView;