import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const VersionResponse = {
  findLastestVersion: {
    200: createResponse({
      data: {
        createdDate: '2024-03-25T16:08:53.645Z',
        modifiedDate: '2024-03-25T16:08:53.645Z',
        id: 5,
        _version: '2.0.5',
        program: 'https://s3.bucket.com/123.pdf',
        type: 'WINDOW',
        memo: '메모할 것',
        createdId: 'admin',
        modifiedId: 'admin',
      },
      statusCode: 200,
      message: '가장 최신 Version을 조회합니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '해당 type 버전이 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  saveVersion: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Version을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 버전입니다.',
      error: 'BAD REQUEST',
    }),
  },
  updateVersion: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Version을 생성했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 존재하는 버전입니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 버전입니다.',
      error: 'NOT FOUND',
    }),
  },
  findVersionList: {
    200: createResponse({
      data: {
        data: [
          {
            createdDate: '2024-02-07T03:37:55.334Z',
            modifiedDate: '2024-02-07T03:37:55.334Z',
            id: 1,
            version: '1.0.5',
            memo: '메모할 것',
            createdId: 'admin',
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Version 리스트를 조회합니다.',
    }),
  },
  findVersion: {
    200: createResponse({
      data: {
        createdDate: '2024-02-07T03:37:55.334Z',
        modifiedDate: '2024-02-07T03:37:55.334Z',
        id: 1,
        version: '1.0.5',
        program: 'https://s3.bucket.com/123.pdf',
        type: 'MAC',
        memo: '메모할 것',
        createdId: 'admin',
        modifiedId: 'admin',
      },
      statusCode: 200,
      message: 'Version을 조회합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 버전입니다.',
      error: 'NOT FOUND',
    }),
  },
  deleteVersion: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Version을 삭제했습니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 버전입니다.',
      error: 'NOT FOUND',
    }),
  },
};
