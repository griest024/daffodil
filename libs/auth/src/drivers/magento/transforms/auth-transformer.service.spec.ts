import { TestBed } from '@angular/core/testing';

import { DaffAuthToken } from '@daffodil/auth';
import { DaffAuthTokenFactory } from '@daffodil/auth/testing';

import { DaffMagentoAuthTransformerService } from './auth-transformer.service';
import { DaffAuthTransformer } from '../../injection-tokens/auth-transformer.token';
import { GenerateTokenResponse } from '../models/outputs/generate-token-response';

describe('DaffMagentoAuthTransformerService', () => {
  let service: DaffMagentoAuthTransformerService;

  const authTokenFactory = new DaffAuthTokenFactory();

  let mockResponse: GenerateTokenResponse;
  let mockAuthToken: DaffAuthToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DaffAuthTransformer,
          useExisting: DaffMagentoAuthTransformerService
        }
      ]
    })

    service = TestBed.get(DaffAuthTransformer);

    mockAuthToken = authTokenFactory.create();
    mockResponse = {
      generateCustomerToken: {
        token: mockAuthToken.token
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('transform | transforming the token response into a DaffAuthToken', () => {
    it('should return a DaffAuthToken with the correct token field', () => {
      const result = service.transform(mockResponse);

      expect(result).toEqual(mockAuthToken);
    })
  })
});
