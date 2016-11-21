export enum CODE {
  REST_DEFINE_DUPLICATED,

  RESOURCE_CONSTRUCTOR_NO_REQUESTER,
  RESOURCE_CONSTRUCTOR_NO_BASE_URL
}

const MESSAGE: { [index: number]: string } = {
  [CODE.REST_DEFINE_DUPLICATED]: 'defining a resource already defined',
  [CODE.RESOURCE_CONSTRUCTOR_NO_REQUESTER]: 'resource cannot be constructed without RequestDelegate',
  [CODE.RESOURCE_CONSTRUCTOR_NO_BASE_URL]: 'resource cannot be constructed without baseUrl'
};

export function CustomError(code: CODE): Error {
  return new Error(MESSAGE[code]);
}
