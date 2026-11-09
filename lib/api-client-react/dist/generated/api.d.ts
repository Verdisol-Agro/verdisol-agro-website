import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { ContactEnquiryInput, ContactEnquiryResponse, ErrorResponse, HealthStatus } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitContactEnquiryUrl: () => string;
/**
 * @summary Send a contact enquiry to VerdiSol Agro
 */
export declare const submitContactEnquiry: (contactEnquiryInput: ContactEnquiryInput, options?: RequestInit) => Promise<ContactEnquiryResponse>;
export declare const getSubmitContactEnquiryMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContactEnquiry>>, TError, {
        data: BodyType<ContactEnquiryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitContactEnquiry>>, TError, {
    data: BodyType<ContactEnquiryInput>;
}, TContext>;
export type SubmitContactEnquiryMutationResult = NonNullable<Awaited<ReturnType<typeof submitContactEnquiry>>>;
export type SubmitContactEnquiryMutationBody = BodyType<ContactEnquiryInput>;
export type SubmitContactEnquiryMutationError = ErrorType<ErrorResponse>;
/**
* @summary Send a contact enquiry to VerdiSol Agro
*/
export declare const useSubmitContactEnquiry: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContactEnquiry>>, TError, {
        data: BodyType<ContactEnquiryInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitContactEnquiry>>, TError, {
    data: BodyType<ContactEnquiryInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map