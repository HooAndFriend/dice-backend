import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const TeamResponse = {
  findTeamList: {
    200: createResponse({
      data: {
        data: [
          {
            team_created_date: '2024-02-14T00:57:33.299Z',
            team_id: 1,
            team_name: 'Pinomaker',
            team_uuid: '7f09bfdf-ee4b-4479-bcdc-6f8e022e77c4',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:35.960Z',
            team_id: 2,
            team_name: 'Pinomaker',
            team_uuid: '7c30ce06-5436-4b50-b155-cb24d4e23b5c',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:39.516Z',
            team_id: 3,
            team_name: 'Pinomaker',
            team_uuid: '785b3910-1051-423e-b702-4ff4eeaf18e3',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:42.616Z',
            team_id: 4,
            team_name: 'Pinomaker',
            team_uuid: 'e7eda22e-9dd2-4be6-b0d1-b4b3efa4ae8c',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:44.282Z',
            team_id: 5,
            team_name: 'Pinomaker',
            team_uuid: '3ad7673d-254a-41e4-b2ee-99a73b30ac59',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:45.695Z',
            team_id: 6,
            team_name: 'Pinomaker',
            team_uuid: '5a674b0f-d0ed-4e7e-8caf-53cda06cfa38',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:47.334Z',
            team_id: 7,
            team_name: 'Pinomaker',
            team_uuid: '3e7956e5-3383-4844-91c4-0f79c1658176',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:48.570Z',
            team_id: 8,
            team_name: 'Pinomaker',
            team_uuid: '881157aa-3391-4798-bfc9-0df8b3f9de74',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:50.274Z',
            team_id: 9,
            team_name: 'Pinomaker',
            team_uuid: '62837c6b-c72c-4261-934b-57100de0f426',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:51.697Z',
            team_id: 10,
            team_name: 'Pinomaker',
            team_uuid: 'b024cdb8-f47f-4fa7-9132-5e2f2a1cc224',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
          {
            team_created_date: '2024-02-14T00:57:53.091Z',
            team_id: 11,
            team_name: 'Pinomaker',
            team_uuid: 'ab3c4b48-11da-4999-8c1d-b8db2706ade3',
            team_createdId: '',
            team_description: '',
            teamUserCount: '1',
            workspaceCount: '1',
          },
        ],
        count: 11,
      },
      statusCode: 200,
      message: '팀 리스트를 조회합니다.',
    }),
  },
};