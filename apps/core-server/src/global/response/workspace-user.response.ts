import {
  createErrorResponse,
  createMessageResponse,
  createPaginationResponse,
  createResponse,
} from './common';

export const WorkspaceUserResponse = {
  updateWorkspaceRole: {
    200: createMessageResponse({
      statusCode: 200,
      message: '워크스페이스에서 유저의 권한을 수정합니다.',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '워크스페이스에서 유저의 정보를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  saveWorkspaceUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Invite Workspace User',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Workspace',
      error: 'NOT FOUND',
    }),
  },
  deleteWorkspaceUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: 'Delete Workspace User',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: 'Not Found Workspace User',
      error: 'NOT FOUND',
    }),
  },
  findWorkspaceUserList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 4,
            role: 'VIEWER',
            teamUser: {
              id: 3,
              user: {
                email: 'admin11',
                nickname: 'Pinomake1r',
              },
            },
          },
        ],
        count: 1,
      },
      statusCode: 200,
      message: 'Find Workspace User List',
    }),
  },
  findInviteUserList: {
    200: createResponse({
      data: {
        data: [
          {
            id: 1,
            role: 'VIEWER',
            user: {
              id: 1,
              email: 'admin',
              nickname: 'Pinomaker',
            },
          },
          {
            id: 3,
            role: 'VIEWER',
            user: {
              id: 3,
              email: 'admin11',
              nickname: 'Pinomake1r',
            },
          },
          {
            id: 4,
            role: 'VIEWER',
            user: {
              id: 4,
              email: 'admin33333',
              nickname: 'Pinomaker',
            },
          },
          {
            id: 5,
            role: 'VIEWER',
            user: {
              id: 5,
              email: 'admin312123333',
              nickname: 'Pinomaker',
            },
          },
          {
            id: 6,
            role: 'VIEWER',
            user: {
              id: 6,
              email: 'admin3121233331212',
              nickname: 'Pinomaker',
            },
          },
        ],
        count: 5,
      },
      statusCode: 200,
      message: 'Find Team List to invite workspace',
    }),
  },
};