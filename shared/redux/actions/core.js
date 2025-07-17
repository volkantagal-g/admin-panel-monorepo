import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  searchPanelDocsRequest: { searchText: null },
  searchPanelDocsSuccess: { data: null },
  searchPanelDocsFailure: { error: null },

  searchPagesRequest: { searchText: null },
  searchPagesSuccess: { data: null },
  searchPagesFailure: { error: null },

  searchRolesRequest: { searchText: null },
  searchRolesSuccess: { data: null },
  searchRolesFailure: { error: null },

}, {});
