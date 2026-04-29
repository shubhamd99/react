interface FetchOptions extends RequestInit {
  data?: unknown;
}

export async function httpClient<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { data, headers, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
