import { TestBed } from '@angular/core/testing';

import {
  DaffAccountRegistration,
  DaffCustomerRegistration
} from '@daffodil/auth';
import { DaffAccountRegistrationFactory } from '@daffodil/auth/testing';

import { DaffMagentoLoginInfoTransformerService } from './login-info-transformer.service';

describe('DaffMagentoLoginInfoTransformerService', () => {
  let service: DaffMagentoLoginInfoTransformerService;

  const accountRegistrationFactory = new DaffAccountRegistrationFactory();

  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffMagentoLoginInfoTransformerService
      ]
    });

    service = TestBed.get(DaffMagentoLoginInfoTransformerService);

    mockRegistration = accountRegistrationFactory.create();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('transform | transforming the account registration into login info', () => {
    it('should return a DaffAuthToken with the correct token field', () => {
      const result = service.transform(mockRegistration);

      expect(result).toEqual(jasmine.objectContaining({
        email: mockRegistration.customer.email,
        password: mockRegistration.password
      }));
    })
  })
});
