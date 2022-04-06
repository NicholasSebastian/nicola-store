import { NextApiRequest, NextApiResponse } from 'next';
import Sheets from '../../lib/sheets';

export const NEWSLETTER_ID = '1FTW2kJMOV5tQKTrosJ_ut2xBcyuylcn7Lzdqe8eaagE';
export const NEWSLETTER_SHEET = 'Subscriptions';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  const sheets = await Sheets.getInstance(NEWSLETTER_ID);
  await sheets.addRow(NEWSLETTER_SHEET, [email, "Anonymous"]);
  res.status(200).end();
}