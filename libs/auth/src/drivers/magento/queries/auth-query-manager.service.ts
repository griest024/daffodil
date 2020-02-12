import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { MutationOptions } from 'apollo-client';

import { DaffAuthQueryManagerInterface } from '../../interfaces/auth-query-manager.interface';
import { DaffLoginInfo } from '../../../models/login-info';
import { DaffAccountRegistration } from '../../../models/account-registration';
import { DaffCustomerRegistration } from '../../../models/customer-registration';
import { GenerateTokenResponse } from '../models/outputs/generate-token-response';
import { RevokeCustomerTokenResponse } from '../models/outputs/revoke-customer-token-response';

@Injectable({
  providedIn: 'root'
})
export class DaffMagentoAuthGraphQlQueryManagerService implements DaffAuthQueryManagerInterface<
  DaffAccountRegistration<DaffCustomerRegistration>,
  DaffCustomerRegistration,
  DaffLoginInfo
> {
  generateATokenMutation({email, password}: DaffLoginInfo): MutationOptions<GenerateTokenResponse> {
    return {
      mutation: gql`
        mutation GenerateAToken($email: String!, $password: String!) {
          generateCustomerToken(
            email: $email,
            password: $password
          ) {
            token
          }
        }
      `,
      variables: {
        email,
        password
      }
    }
  }

  revokeCustomerTokenMutation(): MutationOptions<RevokeCustomerTokenResponse> {
    return {
      mutation: gql`
        mutation revokeCustomerToken {
          revokeCustomerToken {
            result
          }
        }
      `
    }
  }

  createACustomerMutation({
    customer,
    password
  }: DaffAccountRegistration<DaffCustomerRegistration>) {
    return {
      mutation: gql`
        mutation CreateACustomer(
          $email: String!,
          $password: String!,
          $firstname: String!,
          $lastname: String!,
        ) {
          createCustomer(input: {
            firstname: $firstname,
            lastname: $lastname,
            email: $email,
            password: $password
          })
        }
      `,
      variables: {
        email: customer.email,
        password,
        firstname: customer.firstName,
        lastname: customer.lastName
      }
    }
  }
}
