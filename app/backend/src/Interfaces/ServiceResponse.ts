export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'invalidData' | 'unauthorized' | 'notFound' | 'conflict';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
