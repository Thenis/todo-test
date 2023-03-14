export interface IReadable<TModel> {
  get(): Promise<TModel>;
}
