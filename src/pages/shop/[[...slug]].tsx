import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

function ShopPage({}: Props) {
    const { query } = useRouter();

    const slugQuery = query.slug ? query.slug[0] : "";
  return (
    <div>
        <h1>Shop Page</h1>
        <h3>{slugQuery}</h3>
    </div>
  )
}

export default ShopPage;