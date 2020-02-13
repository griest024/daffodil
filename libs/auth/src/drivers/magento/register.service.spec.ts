import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import {
  DaffAccountRegistrationFactory,
} from '@daffodil/auth/testing';
import { DaffMagentoRegisterService } from './register.service';
import { DaffMagentoAuthGraphQlQueryManagerService } from './queries/auth-query-manager.service';
import { DaffAccountRegistration } from '../../models/account-registration';
import { DaffAuthQueryManager } from '../injection-tokens/auth-query-manager.token';
import { DaffAuthToken } from '../../models/auth-token';
import { DaffLoginInfo } from '../../models/login-info';
import { DaffCustomerRegistration } from '../../models/customer-registration';

describe('Driver | Magento | Auth | RegisterService', () => {
  let controller: ApolloTestingController;
  let registerService: DaffMagentoRegisterService<
    DaffLoginInfo,
    DaffCustomerRegistration,
    DaffAccountRegistration<DaffCustomerRegistration>
  >;

  const registrationFactory: DaffAccountRegistrationFactory = new DaffAccountRegistrationFactory();

  let mockLoginInfo: DaffLoginInfo;
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;
  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;

  let authGraphQlQueryManagerService: DaffMagentoAuthGraphQlQueryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule
      ],
      providers: [
        DaffMagentoRegisterService,
        {
          provide: DaffAuthQueryManager,
          useExisting: DaffMagentoAuthGraphQlQueryManagerService
        },
      ]
    });

    registerService = TestBed.get(DaffMagentoRegisterService);
    controller = TestBed.get(ApolloTestingController);
    authGraphQlQueryManagerService = TestBed.get(DaffMagentoAuthGraphQlQueryManagerService);

    mockRegistration = registrationFactory.create();

    firstName = mockRegistration.customer.firstName;
    lastName = mockRegistration.customer.lastName;
    email = mockRegistration.customer.email;
    password = mockRegistration.password;
    mockLoginInfo = {email, password};
  });

  it('should be created', () => {
    expect(registerService).toBeTruthy();
  });

  describe('register | getting login info', () => {
    let response;

    afterEach(() => {
      controller.verify();
    });

    beforeEach(() => {
      response = {
        createCustomer: {
          customer: mockRegistration.customer
        }
      };
    });

    it('should return the correct observable', done => {
      registerService.register(mockRegistration).subscribe(loginInfo => {
        expect(loginInfo).toEqual(mockLoginInfo);
        done();
      });

      const op = controller.expectOne(authGraphQlQueryManagerService.createACustomerMutation(mockRegistration).mutation);

      op.flush({
        data: response
      });
    });
  });
});
