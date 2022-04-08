import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '../../lib/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  const shoppingBagRef = db.collection('shoppingBag');
  const shoppingBagDoc = shoppingBagRef.doc(session.user.name);

  try {
    switch (req.method) {
      case "GET": {
        const shoppingBag = await shoppingBagDoc.get(); 
        if (!shoppingBag.exists) return res.status(404).end();
        const { items } = shoppingBag.data();
        return res.status(200).json(items);
      }
      case "POST": {
        const { items } = req.body;
        await shoppingBagDoc.set({ items });
        return res.status(200).end();
      }
      default:
        return res.status(400).end();
    }
  }
  catch (error) {
    res.status(500).end();
  }
}
