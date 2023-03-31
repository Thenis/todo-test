export const validateUrl = (value: string) => {
  if (!value) {
    return true; // If the value is empty, don't validate it
  }

  try {
    const url = new URL(value);

    // Check the protocol
    const protocol = url.protocol.toLowerCase();
    if (
      protocol !== "http:" &&
      protocol !== "https:" &&
      protocol !== "ftp:" &&
      protocol !== "ftps:" &&
      protocol !== "ws:" &&
      protocol !== "wss:"
    ) {
      throw new Error(
        "Please enter a valid URL with a valid protocol (HTTP, HTTPS, FTP, FTPS, WS, WSS)"
      );
    }

    // Check the hostname
    const hostname = url.hostname.toLowerCase();
    if (
      !/^[a-z0-9-.]+$/.test(hostname) ||
      hostname.startsWith(".") ||
      hostname.endsWith(".") ||
      hostname.split(".").some((part) => part.length > 63)
    ) {
      throw new Error("Please enter a valid URL with a valid hostname");
    }

    // Check the port (if specified)
    if (
      url.port !== "" &&
      (isNaN(Number(url.port)) ||
        Number(url.port) < 1 ||
        Number(url.port) > 65535)
    ) {
      throw new Error(
        "Please enter a valid URL with a valid port number (between 1 and 65535)"
      );
    }

    // Check the path
    if (!/^[/\\!$&'()*+,;=a-z0-9._~-]+$/i.test(url.pathname)) {
      throw new Error("Please enter a valid URL with a valid path");
    }

    // Check the query string
    if (
      url.search &&
      !/^([a-z0-9._%-]+=[a-z0-9._%-]+&?)*$/i.test(url.search.slice(1))
    ) {
      throw new Error("Please enter a valid URL with a valid query string");
    }

    // Check the fragment identifier
    if (url.hash && !/^[/\\!$&'()*+,;=a-z0-9._~-]+$/i.test(url.hash.slice(1))) {
      throw new Error(
        "Please enter a valid URL with a valid fragment identifier"
      );
    }

    return true; // The URL is valid
  } catch (error: any) {
    return error.message; // The URL is not valid
  }
};
