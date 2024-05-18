/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import useSWR from "swr";

function DetailProduct() {
    const { query } = useRouter();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);

    const changePriceToIdr = data?.data?.price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });

  return (
    <div className="flex gap-8 py-12 ml-32">
        <div className="w-1/5">
                <div className="mb-4">
                    <img src={data?.data?.image} alt={data?.data?.name} />
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="font-bold">
                        {data?.data?.category}
                    </h4>
                    <p className="text-gray-500">
                        {data?.data?.name}
                    </p>
                    <p className="font-bold mt-2">
                        {changePriceToIdr}
                    </p>
                </div>
            </div>
    </div>
  )
}

export default DetailProduct;