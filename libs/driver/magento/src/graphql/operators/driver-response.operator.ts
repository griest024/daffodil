import {
  ApolloError,
  ApolloQueryResult,
} from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import {
  Observable,
  catchError,
  map,
  of,
  pipe,
  switchMap,
  throwError,
} from 'rxjs';

import { DaffError } from '@daffodil/core';
import { DaffDriverResponse } from '@daffodil/driver';

export type DaffDriverMagentoResponseTransform<Response, Return> = (data: Response) => Return;
export type DaffDriverMagentoResponseErrorTransform = (error: ApolloError) => DaffError[];

export const daffDriverMagentoResponse = <Response, Return>(
  responseTransform: DaffDriverMagentoResponseTransform<Response, Return>,
  errorTransform: DaffDriverMagentoResponseErrorTransform,
) => pipe<
Observable<ApolloQueryResult<Response> | MutationResult<Response>>,
Observable<(ApolloQueryResult<Response> | MutationResult<Response>) & {error: ApolloError}>,
Observable<DaffDriverResponse<Return>>,
Observable<DaffDriverResponse<Return>>
>(
  map((resp) =>
    (<any>resp).error
      ? resp
      : <any>{
        ...resp,
        error: <ApolloError>{
          graphQLErrors: resp.errors,
        },
      },
  ),
  map(({ data, error }) => <DaffDriverResponse<Return>>({
    response: data ? responseTransform(data) : undefined,
    errors: error ? errorTransform(error) : [],
  })),
  switchMap((resp) =>
    resp.errors.reduce((acc, err) => acc && err.recoverable, true)
      ? of(resp)
      : throwError(() => resp.errors.filter((err) => !err.recoverable)[0]),
  ),
  // catchError((err: ApolloError) => throwError(() => errorTransform(err)))
  );
