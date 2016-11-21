export enum CODE {
  REST_DEFINE_DUPLICATED,
  REST_DEFINE_REQUEST_NOT_FOUND,
  REST_DEFINE_BASE_URL_NOT_FOUND
}

const MESSAGE: { [index: number]: string } = {
  [CODE.REST_DEFINE_DUPLICATED]: 'defining a resource already defined',
  [CODE.REST_DEFINE_REQUEST_NOT_FOUND]: 'could not find RequestDelegate to define resource',
  [CODE.REST_DEFINE_BASE_URL_NOT_FOUND]: 'could not find baseUrl to define resource'
};

export function CustomError(code: CODE): Error {
  return new Error(MESSAGE[code]);
}
