export interface IViewModel<TModel> {
  update(model: TModel): void;
}
