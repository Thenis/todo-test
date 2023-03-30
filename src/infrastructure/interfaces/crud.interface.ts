export interface IReadable<TModel> {
  get(): Promise<TModel>;
}

export interface ICreatable<TCriteria, TResult = void> {
  create(criteria: TCriteria): Promise<TResult>;
}
