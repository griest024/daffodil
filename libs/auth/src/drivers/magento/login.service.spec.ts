import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import {
  DaffAccountRegistrationFactory,
  DaffAuthTokenFactory
} from '../../../testing/src';

import { DaffMagentoLoginService } from './login.service';
import { DaffMagentoAuthGraphQlQueryManagerService } from './queries/auth-query-manager.service';
import { DaffAccountRegistration } from '../../models/account-registration';
import { DaffAuthQueryManager } from '../injection-tokens/auth-query-manager.token';
import { DaffAuthToken } from '../../models/auth-token';
import { DaffAuthTransformer } from '../injection-tokens/auth-transformer.token';
import { DaffCustomerRegistration } from '../../models/customer-registration';
import { DaffLoginInfo } from '../../models/login-info';
import { GenerateTokenResponse } from './models/outputs/generate-token-response'
import { RevokeCustomerTokenResponse } from './models/outputs/revoke-customer-token-response';
import { DaffMagentoRevokeTokenTransformerService } from './transforms/revoke-token-transformer.service';

describe('Driver | Magento | Auth | LoginService', () => {
  let controller: ApolloTestingController;
  let loginService: DaffMagentoLoginService<
    DaffLoginInfo,
    DaffAuthToken,
    DaffCustomerRegistration,
    DaffAccountRegistration<DaffCustomerRegistration>,
    GenerateTokenResponse,
    RevokeCustomerTokenResponse
  >;

  const authTransformerServiceSpy = jasmine.createSpyObj('DaffMagentoAuthTransformerService', ['transform'])
  const revokeTokenTransformerServiceSpy = jasmine.createSpyObj('DaffMagentoRevokeTokenTransformerService', ['transform'])

  const registrationFactory: DaffAccountRegistrationFactory = new DaffAccountRegistrationFactory();
  const authTokenFactory: DaffAuthTokenFactory = new DaffAuthTokenFactory();

  let mockAuth: DaffAuthToken;
  let mockLoginInfo: DaffLoginInfo;
  let token: string;
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
        DaffMagentoLoginService,
        {
          provide: DaffAuthQueryManager,
          useExisting: DaffMagentoAuthGraphQlQueryManagerService
        },
        {
          provide: DaffAuthTransformer,
          useValue: authTransformerServiceSpy
        },
        {
          provide: DaffMagentoRevokeTokenTransformerService,
          useValue: revokeTokenTransformerServiceSpy
        }
      ]
    });

    loginService = TestBed.get(DaffMagentoLoginService);
    controller = TestBed.get(ApolloTestingController);
    authGraphQlQueryManagerService = TestBed.get(DaffMagentoAuthGraphQlQueryManagerService);

    mockRegistration = registrationFactory.create();
    mockAuth = authTokenFactory.create();

    token = mockAuth.token;
    firstName = mockRegistration.customer.firstName;
    lastName = mockRegistration.customer.lastName;
    email = mockRegistration.customer.email;
    password = mockRegistration.password;
    mockLoginInfo = {email, password};
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  describe('login | getting an access token', () => {
    let response;

    afterEach(() => {
      controller.verify();
    });

    beforeEach(() => {
      response = {
        generateCustomerToken: {
          token
        }
      };

      authTransformerServiceSpy.transform.withArgs(response).and.returnValue(mockAuth);
    });

    it('should call the transformer', () => {
      loginService.login(mockLoginInfo).subscribe((auth) => {
        expect(auth).toEqual(mockAuth);
        // need to do the expectation in here because the transformer is invoked inside a callback
        expect(authTransformerServiceSpy.transform).toHaveBeenCalledWith(response);
      });

      const op = controller.expectOne(authGraphQlQueryManagerService.generateATokenMutation(mockLoginInfo).mutation);

      op.flush({
        data: response
      });
    });

    it('should return the correct observable', done => {
      loginService.login(mockLoginInfo).subscribe((auth) => {
        expect(auth).toEqual(mockAuth);
        done();
      });

      const op = controller.expectOne(authGraphQlQueryManagerService.generateATokenMutation(mockLoginInfo).mutation);

      op.flush({
        data: response
      });
    });
  });

  describe('logout | revoking an access token', () => {
    let response: RevokeCustomerTokenResponse;
    let result: boolean;

    afterEach(() => {
      controller.verify();
    });

    beforeEach(() => {
      result = true;
      response = {
        revokeCustomerToken: {
          result
        }
      };

      revokeTokenTransformerServiceSpy.transform.withArgs(response).and.returnValue(result);
    });

    it('should call the transformer', () => {
      loginService.logout().subscribe(() => {
        // need to do the expectation in here because the transformer is invoked inside a callback
        expect(revokeTokenTransformerServiceSpy.transform).toHaveBeenCalledWith(response);
      });

      const op = controller.expectOne(authGraphQlQueryManagerService.revokeCustomerTokenMutation().mutation);

      op.flush({
        data: response
      });
    });

    describe('when the result is true', () => {
      it('should return void and not throw an error', done => {
        loginService.logout().subscribe((ret) => {
          expect(ret).toBeUndefined();
          done();
        });

        const op = controller.expectOne(authGraphQlQueryManagerService.revokeCustomerTokenMutation().mutation);

        op.flush({
          data: response
        });
      });
    });

    // TODO: determine if #logout should return an Error
    // describe('when the result is false', () => {
    //   beforeEach(() => {
    //     result = false;
    //     response = {
    //       revokeCustomerToken: {
    //         result
    //       }
    //     };

    //     revokeTokenTransformerServiceSpy.transform.withArgs(response).and.returnValue(result);
    //   });

    //   it('should throw an error', done => {
    //     loginService.logout().subscribe((ret: Error) => {
    //       expect<Error>(ret).toEqual(new Error('Token revocation failed'));
    //       done();
    //     });

    //     const op = controller.expectOne(authGraphQlQueryManagerService.revokeCustomerTokenMutation().mutation);

    //     op.flush({
    //       data: response
    //     });
    //   })
    // });
  });
});
