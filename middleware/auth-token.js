/**
 * Axios middleware for using authentication tokens.
 */

export const axiosConfig = {
    interceptors: {
      request: [
        function ({ getState, dispatch, getSourceAction }, request) {
  
          // Interceptor for adding authorisation token and server name to requests
  
          const currentState = getState();
          request.url = `https://${currentState.api.server}${request.url}`;
          request.headers.common['Authorization'] = `Token ${currentState.api.key}`;
  
          return request;
  
        }
      ]
    }
  }