export enum CODE {
  REST_DEFINE_DUPLICATED
}

export const MESSAGE: { [index: number]: string } = {
  [CODE.REST_DEFINE_DUPLICATED]: 'defining a resource already defined'
};
