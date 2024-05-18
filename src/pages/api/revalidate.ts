// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean,
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.query.data !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).send({ revalidated: false, message: "Silahkan perbaharui token" });
    }

    if (req.query.data !== "product") {
        return res.status(500).send({ revalidated: false, message: "Pilih data yang akan di revalidated"});
    } else  {
        try {
          await res.revalidate("/product/static");
          return res.json({ revalidated: true });
        } catch (error) {
          return res.status(500).send({revalidated: false});
        }
    }
}
