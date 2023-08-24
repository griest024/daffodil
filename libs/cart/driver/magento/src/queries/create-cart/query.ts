import { gql } from 'apollo-angular';

import { MagentoCreateCartResponse } from './response.type';
import { MagentoCartCreateCartQueryVariables } from './variables.type';

export const createCart = gql<MagentoCreateCartResponse, MagentoCartCreateCartQueryVariables>`
  mutation MagentoCreateCart {
    createEmptyCart
  }
`;
