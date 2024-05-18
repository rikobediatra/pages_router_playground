/* eslint-disable react-hooks/rules-of-hooks */
import ProductView from "@/views/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());


function index() {
  const { data, error, isLoading} = useSWR("/api/product", fetcher);
  const router = useRouter();

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/product").then((response) => {
  //     setProducts(response.data.data);
  //   });
  // }, []);

  return (
    <>
      <ProductView products={isLoading ? [] : data.data}/>
    </>
  );
}

export default index;
