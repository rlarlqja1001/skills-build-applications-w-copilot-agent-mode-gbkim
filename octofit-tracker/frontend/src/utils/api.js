const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getBackendApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return trimTrailingSlash(process.env.REACT_APP_API_BASE_URL);
  }

  if (process.env.REACT_APP_CODESPACE_NAME) {
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
  }

  const { hostname } = window.location;
  if (hostname.endsWith('-3000.app.github.dev')) {
    const codespace = hostname.replace('-3000.app.github.dev', '');
    return `https://${codespace}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const getApiEndpoint = (componentName) => {
  const baseUrl = getBackendApiBaseUrl();
  return `${baseUrl}/${componentName}/`;
};

export const normalizeListPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};