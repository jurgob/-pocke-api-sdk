
export class PockeApiHTTPError extends Error {
  /** HTTP status code */
  public readonly statusCode: number;
  /** HTTP body */
  public readonly body: string;
  /** HTTP headers */
  public readonly headers: Headers;
  /** HTTP content type */
  public readonly contentType: string;
  /** Raw response */
  public readonly rawResponse: Response;

  constructor(
    message: string,
    httpMeta: {
      response: Response;
      request: Request;
      body: string;
    },
  ) {
    super(message);
    this.statusCode = httpMeta.response.status;
    this.body = httpMeta.body;
    this.headers = httpMeta.response.headers;
    this.contentType = httpMeta.response.headers.get("content-type") || "";
    this.rawResponse = httpMeta.response;

    this.name = "PockeApiHTTPError";
  }
}