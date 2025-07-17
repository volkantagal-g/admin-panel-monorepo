import axios from '@shared/axios/common';

export const getConfigDetail = ({
  key,
  namespace,
}) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getConfigDetail/${key}`,
  })
    .then(response => {
      return response.data;
    });
};

export const getConfigValue = ({
  key,
  namespace,
}) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getConfig/${key}`,
  })
    .then(response => {
      return response.data;
    });
};
export const getConfigList = ({
  namespace,
  page = 1,
  pageSize = 20,
  filters,
}) => {
  return axios({
    method: 'POST',
    url: `/algorithm/config/${namespace}/getConfigs`,
    data: {
      page,
      pageSize,
      filters,
    },
  })
    .then(response => {
      return response.data;
    });
};

export const updateConfigValue = ({
  namespace,
  key,
  value,
}) => {
  return axios({
    method: 'PUT',
    url: `/algorithm/config/${namespace}/updateConfig`,
    data: {
      key,
      value,
    },
  })
    .then(response => {
      return response.data;
    });
};

export const linkCustomConfig = ({
  namespace,
  leftKey,
  rightKey,
}) => {
  return axios({
    method: 'POST',
    url: `/algorithm/config/${namespace}/linkConfig`,
    data: {
      leftKey,
      rightKey,
    },
  })
    .then(response => {
      return response.data;
    });
};

export const unlinkCustomConfig = ({
  namespace,
  leftKey,
  rightKey,
}) => {
  return axios({
    method: 'POST',
    url: `/algorithm/config/${namespace}/unlinkConfig`,
    data: {
      leftKey,
      rightKey,
    },
  })
    .then(response => {
      return response.data;
    });
};

export const getLinkedConfigs = ({
  key,
  namespace,
}) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getLinkedConfigs/${key}`,
  })
    .then(response => {
      return response.data;
    });
};

export const createConfig = ({
  namespace,
  key,
  alias,
  configType,
  value,
}) => {
  return axios({
    method: 'POST',
    url: `/algorithm/config/${namespace}/createConfig`,
    data: {
      key,
      alias,
      type: configType,
      value,
    },
  })
    .then(response => {
      return response.data;
    });
};

export const updateConfigNode = ({
  namespace,
  key,
  updateBody,
}) => {
  return axios({
    method: 'PUT',
    url: `/algorithm/config/${namespace}/updateConfigNode/${key}`,
    data: updateBody,
  })
    .then(response => {
      return response.data;
    });
};

export const deleteConfigNode = ({
  namespace,
  key,
}) => {
  return axios({
    method: 'DELETE',
    url: `/algorithm/config/${namespace}/deleteConfig/${key}`,
  })
    .then(response => {
      return response.data;
    });
};
export const getNamespaceList = () => {
  return axios({
    method: 'GET',
    url: '/algorithm/config/general/getNamespaces',
  })
    .then(response => {
      return response.data;
    });
};

export const getTypeList = ({ namespace }) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getTypes`,
  })
    .then(response => {
      return response.data;
    });
};

export const getDomainSettings = ({ namespace }) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getDomainSettings`,
  })
    .then(response => {
      return response;
    });
};

export const getDomainConfigDetail = ({
  key,
  namespace,
}) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getDomainConfigDetail/${key}`,
  })
    .then(response => {
      return response;
    });
};

export const updateDomainConfigValue = ({
  namespace,
  key,
  value,
}) => {
  return axios({
    method: 'PUT',
    url: `/algorithm/config/${namespace}/updateDomainConfig`,
    data: {
      key,
      value,
    },
  })
    .then(response => {
      return response;
    });
};

export const getDomainConfigValue = ({
  key,
  namespace,
}) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getDomainConfig/${key}`,
  })
    .then(response => {
      return response;
    });
};

export const getConfigSchema = ({ namespace }) => {
  return axios({
    method: 'GET',
    url: `/algorithm/config/${namespace}/getSchema`,
  })
    .then(response => {
      return response.data;
    });
};

export const validateConfigValue = ({
  namespace,
  value,
}) => {
  return axios({
    method: 'POST',
    url: `/algorithm/config/${namespace}/validateConfig`,
    data: { value },
  })
    .then(response => {
      return response.data;
    });
};

export const bulkEditWithCsv = ({
  namespace,
  data,
  isDomain,
}) => {
  return axios({
    method: 'PUT',
    url: `/algorithm/config/${namespace}/bulk-edit-with-csv`,
    data: {
      file: data,
      isDomain,
    },
  })
    .then(response => {
      return response.data;
    });
};
