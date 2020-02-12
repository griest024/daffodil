import { TestBed } from '@angular/core/testing';

import {
  RevokeCustomerTokenResponse,
} from '../models/outputs/revoke-customer-token-response';

import { DaffMagentoRevokeTokenTransformerService } from './revoke-token-transformer.service';

describe('DaffMagentoRevokeTokenTransformerService', () => {
  let service: DaffMagentoRevokeTokenTransformerService;

  let mockRevokeTokenResponse: RevokeCustomerTokenResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffMagentoRevokeTokenTransformerService
      ]
    });

    service = TestBed.get(DaffMagentoRevokeTokenTransformerService);

    mockRevokeTokenResponse = {
      revokeCustomerToken: {
        result: true
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('transform | transforming the account registration into login info', () => {
    it('should return a DaffAuthToken with the correct token field', () => {
      const result = service.transform(mockRevokeTokenResponse);

      expect(result).toEqual(true);
    })
  })
});
