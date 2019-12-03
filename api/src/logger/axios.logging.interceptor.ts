import { HttpService } from '@nestjs/common';
import { Logger } from 'winston';
import { AxiosResponse, AxiosError } from 'axios';

export function setupAxiosLogging(httpService: HttpService, logger: Logger) {
  httpService.axiosRef.interceptors.request.use(
    config => {
      // Do something before request is sent
      config.startMilliseconds = Date.now();
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  httpService.axiosRef.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const { summary, requestDetails, responseDetails } = parseResponse(
        response,
      );
      if (logger.isLevelEnabled('debug')) {
        logger.info(`${summary}\n${requestDetails}\n${responseDetails}`);
      } else {
        logger.info(`${summary}`);
      }
      return response;
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const { summary, requestDetails, errorDetails } = parseError(error);
      if (logger.isLevelEnabled('debug')) {
        logger.error(`${summary}\n${requestDetails}\n${errorDetails}`);
      } else {
        logger.error(`${summary}`);
      }
      return Promise.reject(error);
    },
  );

  function parseResponse(response: AxiosResponse) {
    let elapsedMilliseconds: string | number = 'unknown time';
    if (response.config.startMilliseconds) {
      elapsedMilliseconds = Date.now() - response.config.startMilliseconds;
    }
    const summary = `${(
      response.config.method || 'unknown method'
    ).toUpperCase()} ${response.config.url} ${
      response.status
    } ${elapsedMilliseconds}`;
    const requestDetails = JSON.stringify({
      requestDetails: {
        headers: response.config.headers,
        body: JSON.parse(response.config.data),
      },
    });
    const responseDetails = JSON.stringify({
      responseDetails: {
        headers: response.headers,
        body: response.data,
      },
    });
    return {
      summary,
      requestDetails,
      responseDetails,
    };
  }

  function parseError(error: AxiosError) {
    let elapsedMilliseconds: string | number = 'unknown time';
    let summary = 'unknown summary';
    let requestDetails = 'unknown request details';
    let errorDetails = 'unknown response details';

    if (error.response) {
      if (error.config.startMilliseconds) {
        elapsedMilliseconds = Date.now() - error.config.startMilliseconds;
      }
      summary = `${(error.config.method || 'unknown method').toUpperCase()} ${
        error.config.url
      } ${error.response.status} ${elapsedMilliseconds}`;
      requestDetails = JSON.stringify({
        requestDetails: {
          headers: error.config.headers,
          body: JSON.parse(error.config.data),
        },
      });
      errorDetails = JSON.stringify({
        responseDetails: {
          headers: error.response.headers,
          body: error.response.data,
        },
      });
    }
    return {
      summary,
      requestDetails,
      errorDetails,
    };
  }
}
