import { Fragment } from 'react';
import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { tableColumns } from './config';
import { ROLE_REQUEST_STATUSES, ROLE_REQUEST_STATES } from '@app/pages/Role/List/constants';

describe('tableColumns', () => {
  afterAll(cleanup);

  it('should generate columns with correct titles, data indexes, keys, and widths', () => {
    const language = 'en';
    const options = {
      hasAccessToRoleDetailPage: false,
      userId: 'user1',
      userRoleIds: ['role1', 'role2'],
      openRoleRequestModal: jest.fn(),
      openTeammatesModal: jest.fn(),
      roleRequests: [
        {
          _id: 'request1',
          status: ROLE_REQUEST_STATUSES.PENDING,
          user: 'user1',
          role: {
            _id: 'role1',
            name: 'Role 1',
            description: { en: 'Description 1', tr: 'Açıklama 1' },
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user1'],
            queryUsers: [],
          },
          requestReason: 'Reason 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
        {
          _id: 'request2',
          status: ROLE_REQUEST_STATUSES.COMPLETED,
          user: 'user2',
          role: {
            _id: 'role2',
            name: 'Role 2',
            description: { en: 'Description 2', tr: 'Açıklama 2' },
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user2'],
            queryUsers: [],
          },
          requestReason: 'Reason 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
      ],
    };

    const columns = tableColumns(language, options);

    expect(columns).toHaveLength(6);
    expect(columns[0].title).toBe('Activeness');
    expect(columns[0].dataIndex).toBe('isActive');
    expect(columns[0].key).toBe('isActive');
    expect(columns[0].width).toBe(80);
    expect(columns[1].title).toBe('YOUR_PERMISSION_LEVEL');
    expect(columns[1].dataIndex).toBe('roleOwners');
    expect(columns[1].key).toBe('roleOwners');
    expect(columns[1].width).toBe(140);
    expect(columns[2].title).toBe('Name');
    expect(columns[2].dataIndex).toBe('name');
    expect(columns[2].key).toBe('name');
    expect(columns[2].width).toBe(250);
    expect(columns[3].title).toBe('Description');
    expect(columns[3].dataIndex).toBe('description');
    expect(columns[3].key).toBe('description');
    expect(columns[4].title).toBe('Created At');
    expect(columns[4].dataIndex).toBe('createdAt');
    expect(columns[4].key).toBe('createdAt');
    expect(columns[4].width).toBe(120);
    expect(columns[5].title).toBe('Action');
    expect(columns[5].align).toBe('center');
    expect(columns[5].width).toBe(200);
  });

  it('should render isActive column with correct Tag color and text based on boolean value', () => {
    const language = 'en';
    const options = {
      hasAccessToRoleDetailPage: true,
      userId: 'user1',
      userRoleIds: ['role1', 'role2'],
      openRoleRequestModal: jest.fn(),
      openTeammatesModal: jest.fn(),
      roleRequests: [
        {
          _id: 'request1',
          status: ROLE_REQUEST_STATUSES.PENDING,
          user: 'user1',
          role: {
            _id: 'role1',
            name: 'Role 1',
            description: { en: 'Description 1', tr: 'Açıklama 1' },
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user1'],
            queryUsers: [],
          },
          requestReason: 'Reason 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
        {
          _id: 'request2',
          status: ROLE_REQUEST_STATUSES.COMPLETED,
          user: 'user2',
          role: {
            _id: 'role2',
            name: 'Role 2',
            description: { en: 'Description 2', tr: 'Açıklama 2' },
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user2'],
            queryUsers: [],
          },
          requestReason: 'Reason 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
      ],
    };

    const columns = tableColumns(language, options);
    const isActiveColumn = columns[0];

    expect(isActiveColumn.render(true).props.color).toBe('success');
    expect(isActiveColumn.render(false).props.color).toBe('error');
  });

  // Renders action column with correct buttons and links based on user's access and role data
  it('should display detail and teammates buttons', () => {
    const language = 'en';
    const options = {
      hasAccessToRoleDetailPage: true,
      userId: 'user1',
      userRoleIds: ['role1', 'role2'],
      openRoleRequestModal: jest.fn(),
      openTeammatesModal: jest.fn(),
      roleRequests: [
        {
          _id: 'request1',
          status: ROLE_REQUEST_STATUSES.PENDING,
          user: 'user1',
          role: {
            _id: 'role1',
            name: 'Role 1',
            description: { en: 'Description 1', tr: 'Açıklama 1' },
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user1'],
            queryUsers: [],
          },
          requestReason: 'Reason 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
        {
          _id: 'request2',
          status: ROLE_REQUEST_STATUSES.COMPLETED,
          user: 'user2',
          role: {
            _id: 'role2',
            name: 'Role 2',
            description: { en: 'Description 2', tr: 'Açıklama 2' },
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleOwners: ['user2'],
            queryUsers: [],
          },
          requestReason: 'Reason 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          requestState: ROLE_REQUEST_STATES.PENDING,
        },
      ],
    };

    const columns = tableColumns(language, options);

    expect(columns).toHaveLength(6);
    if (options.hasAccessToRoleDetailPage) {
      const actionColumn = columns[columns.length - 1];
      expect(actionColumn.render(options.roleRequests[0].role).type).toBe(Fragment);
    }
  });
});
