export class Result<TResponse, THeaders> {
  constructor(
    private readonly _response: TResponse,
    private readonly _headers: THeaders
  ) {}

  get response() {
    return this._response;
  }

  get headers() {
    return this._headers;
  }

  static ok<U, H>(response: U, headers: H): Result<U, H> {
    return new Result(response, headers);
  }
}
