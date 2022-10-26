import { CoreApiResponse } from "@api/core/CoreApiResponse";

interface PostRequest {
  endPoint: string;
  headers?: any;
  body?: any;
}

export class FetchAPI {
  private readonly baseUrl = "http://localhost:3001/";

  public async post<Data>(props: PostRequest): Promise<CoreApiResponse<Data>> {
    const response = await fetch(this.baseUrl + props.endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...props.headers
      },
      body: JSON.stringify(props.body)
    });
    return await response.json();
  }
}
