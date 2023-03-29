export const urlQueryParser = (rawUrl: string) => {
  return rawUrl
    .substring(rawUrl.indexOf("?") + 1)
    .split("&")
    .reduce(
      (memo, param) => ({
        ...memo,
        [param.split("=")[0]]: decodeURIComponent(param.split("=")[1]),
      }),
      {}
    );
};
