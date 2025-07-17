import PropTypes from 'prop-types';

export const BOXES_DEFAULT_PROPS = {
  data: {},
  isPending: false,
  editPermKey: '',
};

export const BOXES_PROP_TYPES = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gsm: PropTypes.string,
    roles: PropTypes.array,
    // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
    rolesGroups: PropTypes.array,
    // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
    franchise: PropTypes.shape({}),
    groupType: PropTypes.number,
    active: PropTypes.bool,
    isOwner: PropTypes.bool,
    reports: PropTypes.array,
    // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
    isGetirEmployee: PropTypes.bool,
  }),
  editPermKey: PropTypes.string,
  isPending: PropTypes.bool,
};
