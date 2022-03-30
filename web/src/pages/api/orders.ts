import { NextApiRequest, NextApiResponse } from 'next';
import getClient from '../../lib/googleapi';

const ORDERS_ID = '1CkYtzZHQvkLSlMQwXBmLN4x30c7wcor3fUDtPA1NIGY';

// TODO
// - GET: Handle users wanting to see their past orders. (Use query params to pass in the user ID)
// - POST: Handle creation of new orders when users checkout. (Status should always be set to 'waiting for payment')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sheets } = await getClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ORDERS_ID });

  // TODO

  res.status(200).json({ test: 'Hello World' });
};