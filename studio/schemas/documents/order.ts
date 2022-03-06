import { FaToiletPaper } from 'react-icons/fa';

export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: FaToiletPaper,
  fields: [
    {
      name: 'timestamp',
      title: 'Created On',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.isRequired(),
      readOnly: true
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { 
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Finished', value: 'finished' }
        ] 
      },
      initialValue: 'pending',
      validation: Rule => Rule.isRequired()
    },
    {
      name: 'item',
      title: 'Item',
      type: 'reference',
      to: { type: 'product' },
      readOnly: true
    },
    {
      name: 'buyer',
      title: 'Buyer',
      type: 'reference',
      to: { type: 'account' },
      readOnly: true
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required(),
      readOnly: true
    },
    {
      name: 'address',
      title: 'Shipping Address',
      type: 'text',
      readOnly: true
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      readOnly: true
    }
  ]
}
