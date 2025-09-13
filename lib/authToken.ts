let currentAccessToken: string | undefined = undefined;

export function setAccessToken(token?: string) {
  currentAccessToken = token;
}

export function getAccessToken() {
  return currentAccessToken;
}
