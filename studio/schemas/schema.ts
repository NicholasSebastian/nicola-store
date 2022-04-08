import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import homePage from './documents/homePage';
import socials from './documents/socials';
import collection from './documents/collection';
import category from './documents/category';
import product from './documents/product';

import blockContent from './types/blockContent';
import localeBlockContent from './types/localeBlockContent';
import localeString from './types/localeString';
import productVariant from './types/variant';
import banner from './types/banner';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Documents.
    homePage,
    socials,
    product,
    collection,
    category,
    
    // Objects.
    blockContent,
    localeBlockContent,
    localeString,
    productVariant,
    banner
  ])
});
