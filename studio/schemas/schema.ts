import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import category from './documents/category';
import product from './documents/product';
import account from './documents/account';
import order from './documents/order';

import blockContent from './types/blockContent';
import localeBlockContent from './types/localeBlockContent';
import productVariant from './types/variant';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Documents.
    product,
    category,
    account,
    order,
    
    // Objects.
    blockContent,
    localeBlockContent,
    productVariant
  ])
});

// TODO: Add 'Collection' to be referenced by Products.
// TODO: Add 'Shopping Bag' to be saved under Accounts.
