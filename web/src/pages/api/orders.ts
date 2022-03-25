import { NextApiRequest, NextApiResponse } from 'next';
import getSheets from '../../lib/sheets';

const ORDERS_ID = '1CkYtzZHQvkLSlMQwXBmLN4x30c7wcor3fUDtPA1NIGY';

const orders = getSheets(ORDERS_ID);

// TODO
// - GET: Handle users wanting to see their past orders. (Use query params to pass in the user ID)
// - POST: Handle creation of new orders when users checkout. (Status should always be set to 'waiting for payment')

export default (req: NextApiRequest, res: NextApiResponse) => {
  // TODO
  res.status(200).json({ test: 'Hello World' });
};