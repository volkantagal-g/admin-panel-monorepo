import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

const BASE_URL = '/commerceChain';

export const CATEGORY_LEVEL_ENUM = {
  L1: 10,
  L2: 20,
  L3: 30,
  L4: 40,
};

export const VALID_CATEGORY_PROPERTIES = [
  'name',
  'level',
  'parent',
  '_id',
];

export const marketProductChainManagementAPI = {
  products: {
    /**
     * Fetches products with pagination, sorting and filtering
     * @param {Object} params Request parameters
     * @param {Object} params.filters - Filter parameters for products
     * @param {string} [params.filters.search] - Search term for product name or description
     * @param {string} [params.filters.status] - Product status filter
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     productList: Array<{
     *       productVertexId: string,
     *       productId: string,
     *       name: { tr: string, en: string },
     *       domainTypes: number[],
     *       demographies: number[],
     *       sizes: number[],
     *       category: { tr: string, en: string },
     *       segment: number,
     *       darkstoreCount: number,
     *       supplierCount: number,
     *       chainCount: number
     *     }>,
     *     totalCount: number
     *   }
     * }>} Response containing products data
     */
    getProducts: async ({ filters = {}, pagination = {}, sort = {} }) => {
      // Pagination parametrelerini doğru şekilde ayarla
      const { page = 1, pageSize = 10 } = pagination;

      // Sort parametrelerini doğru şekilde ayarla
      const { field: sortField, order: sortOrder } = sort;
      // Eğer order 'ascend' veya 'descend' ise, backend'in beklediği 'asc' veya 'desc' formatına dönüştür
      let normalizedOrder = sortOrder;
      if (sortOrder === 'ascend') {
        normalizedOrder = 'asc';
      }
      else if (sortOrder === 'descend') {
        normalizedOrder = 'desc';
      }

      // Filtreleri backend'in beklediği formata dönüştür
      const mappedFilters = {};

      // Kategori ID'sini masterSubClass olarak map et
      if (filters.category) {
        mappedFilters.masterSubClass = filters.category;
      }

      // Diğer filtreleri doğrudan map et
      if (filters.search) mappedFilters.search = filters.search;
      if (filters.segment) mappedFilters.segment = filters.segment;
      if (filters.domain) mappedFilters.domainType = filters.domain;
      if (filters.size) mappedFilters.size = filters.size;
      if (filters.demography) mappedFilters.demography = filters.demography;
      if (filters.warehouseType) mappedFilters.warehouseType = filters.warehouseType;
      if (filters.isLocal === true) mappedFilters.isLocal = true;

      // Boş değerleri temizle
      Object.keys(mappedFilters).forEach(key => {
        if (mappedFilters[key] === '' || mappedFilters[key] === null || mappedFilters[key] === undefined) {
          delete mappedFilters[key];
        }
      });

      // Backend'in beklediği formatta request body oluştur
      const requestBody = {
        // Filtreleri ekle (eğer varsa)
        ...(Object.keys(mappedFilters).length > 0 && { filter: mappedFilters }),

        // Pagination her zaman zorunlu
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
        },

        // Sort parametreleri varsa ve geçerliyse ekle
        ...(sortField && normalizedOrder && {
          sort: {
            field: sortField,
            order: normalizedOrder,
          },
        }),
      };

      const { data } = await axios.post(`${BASE_URL}/product`, requestBody);
      return data;
    },

    /**
     * Fetches product detail by id
     * @param {string} productId - Unique identifier of the product
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     productId: string,
     *     name: { tr: string, en: string },
     *     domainTypes: number[],
     *     demographies: number[],
     *     sizes: number[],
     *     category: { tr: string, en: string },
     *     segment: number,
     *     darkstoreCount: number,
     *     supplierCount: number,
     *     chainCount: number,
     *     storageType: number,
     *     isLocal: boolean,
     *     warehouseType: number
     *   }
     * }>} Product detail data
     */
    getProductDetail: async productId => {
      const { data } = await axios.get(`${BASE_URL}/product/${productId}`);
      return data;
    },

    /**
     * Fetches product warehouses
     * @param {string} productId - Unique identifier of the product
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for warehouses
     * @param {string} [params.filters.status] - Warehouse status filter
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   data: Array<Object>,
     *   total: number,
     *   page: number,
     *   pageSize: number
     * }>} Product warehouses data
     */
    getProductWarehouses: async (productId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField, order: sortOrder } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        ...(sortField && sortOrder && { sort: { field: sortField, order: sortOrder } }),
        ...(Object.keys(filters).length > 0 && { filters }),
      };

      const { data } = await axios.post(`${BASE_URL}/products/${productId}/warehouses`, requestBody);
      return data;
    },

    /**
     * Fetches dark stores associated with a product
     * @param {string} productId - Product ID or Vertex ID
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for dark stores
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     darkstores: Array<Object>,
     *     totalCount: number
     *   }
     * }>} Response containing dark stores data
     */
    getDarkStores: async (productId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        filter: filters,
        sort: { field: sortField, order: sortOrder },
      };

      const { data } = await axios.post(`${BASE_URL}/product/darkstore/${productId}`, requestBody);
      return data;
    },

    /**
     * Fetches suppliers associated with a product
     * @param {string} productId - Product ID or Vertex ID
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for suppliers
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     suppliers: Array<Object>,
     *     totalCount: number
     *   }
     * }>} Response containing suppliers data
     */
    getSuppliers: async (productId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: {
          page,
          pageSize,
        },
        filter: filters || {},
        sort: {
          field: sortField,
          order: sortOrder.toLowerCase(),
        },
      };

      const { data } = await axios.post(`${BASE_URL}/product/supplier/${productId}`, requestBody);
      return data;
    },

    /**
     * Fetches central warehouses associated with a product
     * @param {string} productId - Product ID or Vertex ID
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for central warehouses
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     centralWarehouses: Array<Object>,
     *     totalCount: number
     *   }
     * }>} Response containing central warehouses data
     */
    getCentralWarehouses: async (productId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: {
          page,
          pageSize,
        },
        filter: filters || {},
        sort: {
          field: sortField,
          order: sortOrder.toLowerCase(),
        },
      };

      const { data } = await axios.post(`${BASE_URL}/product/centralwarehouse/${productId}`, requestBody);
      return data;
    },
    getPlanogramProductsImportUrl: () => {
      return axios({
        method: 'GET',
        url: `${BASE_URL}/product/getSignedPlanogramProductsImportUrl`,
      }).then(({ data }) => data);
    },
    importPlanogramProducts: ({ fileName }) => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/product/importPlanogramProducts`,
        data: { fileName },
      }).then(({ data }) => data);
    },
    exportPlanogramProduct: () => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/product/exportPlanogramProduct`,
        data: { lang: getLangKey() },
      }).then(({ data }) => data);
    },
  },
  centralWarehouse: {
    /**
     * Fetches central warehouse list
     * @returns {Promise<{
     *   success: boolean,
     *   data: Array<{
     *     id: string,
     *     name: { tr: string, en: string },
     *     city: string,
     *     warehouses: Array<{
     *       id: string,
     *       name: { tr: string, en: string }
     *     }>
     *   }>
     * }>} Response containing central warehouse list
     */
    getCentralWarehouseList: async () => {
      const { data } = await axios.get(`${BASE_URL}/centralWarehouse`);
      return data;
    },
    getCentralWarehouseImportUrl: () => {
      return axios({
        method: 'GET',
        url: `${BASE_URL}/centralWarehouse/getCentralWarehouseImportUrl`,
      }).then(({ data }) => data);
    },
    importCentralWarehouse: ({ fileName }) => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/centralWarehouse/importCentralWarehouse`,
        data: { fileName },
      }).then(({ data }) => data);
    },
    exportCentralWarehouse: () => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/centralWarehouse/exportCentralWarehouse`,
        data: { lang: getLangKey() },
      }).then(({ data }) => data);
    },
  },
  location: {
    /**
     * Fetches city lookup by search
     * @param {string} search - Search query
     * @returns {Promise<{
     *   success: boolean,
     *   data: Array<{
     *     id: string,
     *     name: string
     *   }>
     * }>} Response containing city lookup data
     */
    getCityLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/location/city/lookup`, { params: { search } });
      return data;
    },
    getRegionLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/location/region/lookup`, { params: { search } });
      return data;
    },
  },
  common: {
    getDomainTypeLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/common/lookup/domainType`, { params: { search } });
      return data;
    },
    getProductLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/common/lookup/product`, { params: { search } });
      return data;
    },
    getDemographyLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/common/lookup/demography`, { params: { search } });
      return data;
    },
    getSizeLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/common/lookup/size`, { params: { search } });
      return data;
    },
    getWarehouseTypeLookup: async (search = '') => {
      const { data } = await axios.get(`${BASE_URL}/common/lookup/warehouseType`, { params: { search } });
      return data;
    },
  },
  supplier: {
    getSuppliers: async () => {
      const { data } = await axios.get(`${BASE_URL}/supplier`);
      return data;
    },
  },
  darkstore: {
    /**
     * Fetches dark stores with filters
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for dark stores
     * @param {Object} params.pagination - Pagination parameters
     * @param {number} [params.pagination.page=1] - Current page number
     * @param {number} [params.pagination.pageSize=10] - Number of items per page
     * @param {Object} params.sort - Sort parameters
     * @param {string} [params.sort.field] - Field to sort by
     * @param {string} [params.sort.order] - Sort order ('asc' or 'desc')
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     darkstoreList: Array<Object>,
     *     totalCount: number
     *   }
     * }>} Response containing dark stores data
     */
    getDarkStores: async ({ filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        filter: filters || {},
        sort: { field: sortField, order: sortOrder },
      };

      const { data } = await axios.post(`${BASE_URL}/darkstore/filter`, requestBody);
      return data;
    },

    /**
     * Fetches planogram darkstores with filters
     * @param {Object} filterParams - The filter parameters
     * @param {number[]} [filterParams.warehouseTypes] - Warehouse types filter
     * @param {number[]} [filterParams.domainTypes] - Domain types filter
     * @param {number[]} [filterParams.demographies] - Demographies filter
     * @param {number[]} [filterParams.sizes] - Sizes filter
     * @param {string[]} [filterParams.centralWarehouseVertexIds] - Central warehouse vertex IDs
     * @param {string[]} [filterParams.cityVertexIds] - City vertex IDs
     * @param {string} [filterParams.search] - Search term
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     darkstores: Array<Object>,
     *   }
     * }>} Response containing darkstores data
     */
    filterPlanogramDarkstores: async filterParams => {
      const requestBody = filterParams || {};

      const { data } = await axios.post(`${BASE_URL}/darkstore/filterPlanogram`, requestBody);
      return data;
    },

    getDarkStoreDetail: async darkStoreId => {
      const { data } = await axios.get(`${BASE_URL}/darkstore/${darkStoreId}`);
      return data;
    },
    getProducts: async requestBody => {
      const { data } = await axios.post(`${BASE_URL}/darkstore/filter/products`, requestBody);
      return data;
    },
    getCentralWarehouses: async requestBody => {
      const { data } = await axios.post(`${BASE_URL}/darkstore/filter/central-warehouses`, requestBody);
      return data;
    },
    getSuppliers: async requestBody => {
      const { data } = await axios.post(`${BASE_URL}/darkstore/filter/suppliers`, requestBody);
      return data;
    },
    updateDarkStoreDetail: async (darkStoreId, requestBody) => {
      const { data } = await axios.put(`${BASE_URL}/darkstore/${darkStoreId}`, requestBody);
      return data;
    },
    getDarkStoreImportUrl: () => {
      return axios({
        method: 'GET',
        url: `${BASE_URL}/darkstore/getSignedDarkstoresImportUrl`,
      }).then(({ data }) => data);
    },
    importDarkStore: ({ fileName }) => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/darkstore/importDarkStores`,
        data: { fileName },
      }).then(({ data }) => data);
    },
    exportDarkStore: () => {
      return axios({
        method: 'POST',
        url: `${BASE_URL}/darkstore/exportDarkStores`,
        data: { lang: getLangKey() },
      }).then(({ data }) => data);
    },
  },
  warehouses: {
    getWarehouseDetail: async warehouseId => {
      const { data } = await axios.get(`${BASE_URL}/warehouse/${warehouseId}`);
      return data;
    },

    getWarehouseProducts: async (warehouseId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        filter: filters,
        sort: { field: sortField, order: sortOrder },
      };

      const { data } = await axios.post(`${BASE_URL}/warehouse/${warehouseId}/products`, requestBody);
      return data;
    },

    getWarehouseDarkStores: async (warehouseId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        filter: filters,
        sort: { field: sortField, order: sortOrder },
      };

      const { data } = await axios.post(`${BASE_URL}/warehouse/${warehouseId}/darkstores`, requestBody);
      return data;
    },

    getWarehouseSuppliers: async (warehouseId, { filters = {}, pagination = {}, sort = {} }) => {
      const { page = 1, pageSize = 10 } = pagination;
      const { field: sortField = 'name', order: sortOrder = 'asc' } = sort;

      const requestBody = {
        pagination: { page, pageSize },
        filter: filters,
        sort: { field: sortField, order: sortOrder },
      };

      const { data } = await axios.post(`${BASE_URL}/warehouse/${warehouseId}/suppliers`, requestBody);
      return data;
    },
  },
  darkstores: {
    getDarkStoresForMatch: async filters => {
      const { data } = await axios.post('/commerceChain/darkstore/filter/cw-match', { filter: filters });
      return data;
    },
    getDarkStoreNamesForMatch: async filters => {
      const { data } = await axios.post('/commerceChain/darkstore/filter/cw-match/ds', { filter: filters });
      return data;
    },
    getDarkStores: async body => {
      const { data } = await axios.post('/commerceChain/darkstore/filter', body);
      return data;
    },
  },
  platform: {
    createPlatform: async request => {
      const { data } = await axios.post(`${BASE_URL}/platform`, request);
      return data;
    },
  },
  chain: {
    /**
     * Fetches chain list with filters
     * @param {Object} params - Request parameters
     * @param {Object} params.filters - Filter parameters for chains
     * @param {Object} params.pagination - Pagination parameters
     * @param {string} [params.cursor] - Cursor for pagination
     * @param {Object} params.sort - Sort parameters
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     items: Array<Object>,
     *     nextCursor: string,
     *     hasNextPage: boolean
     *   }
     * }>} Response containing chains data
     */
    getChainList: async () => {
      const { data } = await axios.get(`${BASE_URL}/chain`);
      return data;
    },

    /**
     * Filter chains with given parameters
     * @param {Object} params - Request parameters
     * @param {string} [params.cursor] - Cursor for pagination
     * @param {string[]} [params.domains] - Domain filters
     * @param {boolean} [params.isEnabled] - Enabled status filter
     * @param {string[]} [params.locationTypes] - Location type filters
     * @param {string[]} [params.locations] - Location filters
     * @param {number} [params.pageSize] - Page size for pagination
     * @param {string[]} [params.products] - Product filters
     * @param {string} [params.search] - Search term
     * @param {string} [params.sortBy] - Sort field
     * @param {string} [params.sortOrder] - Sort order
     * @param {string} [params.storageType] - Storage type filter
     * @param {string[]} [params.supplierTypes] - Supplier type filters
     * @param {string[]} [params.suppliers] - Supplier filters
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     items: Array<Object>,
     *     nextCursor: string,
     *     hasNextPage: boolean
     *   }
     * }>} Response containing filtered chains data
     */
    filterChains: async params => {
      const { data } = await axios.post(`${BASE_URL}/chain/filter`, params);
      return data;
    },

    /**
     * Load more chains using cursor pagination
     * @param {string} cursor - Pagination cursor
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     items: Array<Object>,
     *     nextCursor: string,
     *     hasNextPage: boolean
     *   }
     * }>} Response containing next page of chains data
     */
    loadMoreChains: async cursor => {
      const { data } = await axios.post(`${BASE_URL}/chain/filter`, { cursor });
      return data;
    },

    /**
     * Bulk edit multiple chains
     * @param {Object} params - Bulk edit parameters
     * @param {Object} params.body - Request body containing chains to update
     * @param {Array<Object>} params.body.chains - Array of chain objects with chainId, domainTypeId (optional), and update fields
     * @returns {Promise<{
     *   success: boolean,
     *   data: {
     *     updatedChains: Array<Object>
     *   }
     * }>} Response containing updated chains data
     */
    bulkEditChains: async params => {
      const { data } = await axios.post(`${BASE_URL}/chain/bulk-update`, params.body);
      return data;
    },

    getChainDetail: async (id, options = {}) => {
      const { domainType } = options || {};
      let url = `${BASE_URL}/chain/${id}`;
      if (domainType) {
        url = `${BASE_URL}/chain/${id}/${domainType}`;
      }
      const { data } = await axios.get(url);
      return data;
    },

    /**
     * Fetches chain nodes by edge type (PRODUCT, LOCATION, SUPPLIER)
     * @param {string} edgeType - Type of edge (PRODUCT, LOCATION, SUPPLIER)
     * @returns {Promise<{
     *   success: boolean,
     *   data: Array<{
     *     id: string,
     *     legacyId: string,
     *     name: {
     *       en: string,
     *       tr: string
     *     }
     *   }>
     * }>} Response containing chain nodes data
     */
    getChainNodes: async edgeType => {
      const { data } = await axios.get(`${BASE_URL}/chain/chainNodes/${edgeType}`);
      return data;
    },

    /**
     * Fetches all L4 categories
     * @returns {Promise<{
     *   success: boolean,
     *   data: Array<{
     *     id: string,
     *     legacyId: string,
     *     name: {
     *       en: string,
     *       tr: string
     *     },
     *     parentId: string
     *   }>
     * }>} Response containing all L4 categories
     */
    L4Lookup: async () => {
      const { data } = await axios.get(`${BASE_URL}/masterSubClass/lookup`);
      return data;
    },

    /**
     * Updates a chain with given updates
     * @param {Object} params - Update parameters
     * @param {string} params.chainId - Chain ID to update
     * @param {Object} params.updates - Updates to apply
     * @param {string|number} [params.domainType] - Domain type for the update
     * @returns {Promise<{ success: boolean, data: Object }>} Response containing updated chain
     */
    updateChain: async ({ chainId, updates, domainType }) => {
      let url = `${BASE_URL}/chain/${chainId}`;
      if (domainType) {
        url = `${BASE_URL}/chain/${chainId}/${domainType}`;
      }
      // Don't include domainType in the request body, only in the URL
      const { data } = await axios.put(url, updates);
      return data;
    },
  },
  categories: {
    /**
     * Fetches categories by level with pagination and filtering
     * @param {Object} params - Request parameters
     * @param {string} params.countryCode - Country code (e.g., 'TR')
     * @param {number} params.level - Category level (10, 20, 30, 40)
     * @param {number} [params.limit=100] - Number of items per page
     * @param {number} [params.offset=0] - Offset for pagination
     * @param {string[]} [params.fields] - Fields to include in response
     * @param {string} [params.parent] - Parent category ID for filtering
     * @returns {Promise<{
     *   success: boolean,
     *   data: Array<{
     *     _id: string,
     *     name: string,
     *     level: number,
     *     parent: string
     *   }>
     * }>} Response containing categories data
     */
    getMasterCategoryV2: async ({ level, limit = 10000, offset = 0, fields = VALID_CATEGORY_PROPERTIES, parent }) => {
      const { data } = await axios.post('/supplyLogistic/getMasterCategoriesV2', {
        level,
        limit,
        offset,
        fields,
        ...(parent && { parent }),
      });
      return data;
    },
  },
  centralWarehouses: {
    getCentralWarehouses: async body => {
      const { data } = await axios.post('/commerceChain/centralWarehouse/filter', body);
      return data;
    },
    getCentralWarehousesForMatch: async () => {
      const { data } = await axios.get('/commerceChain/centralWarehouse/for-match');
      return data;
    },
    getSupplierMatches: async warehouseId => {
      const { data } = await axios.get(`/commerceChain/centralWarehouse/${warehouseId}/supplier-matches`);
      return data;
    },
    updateSupplierMatches: async (warehouseId, body) => {
      const { data } = await axios.post(`/commerceChain/centralWarehouse/${warehouseId}/supplier-matches`, body);
      return data;
    },
    updateMatchDarkStore: async body => {
      const { data } = await axios.post('/commerceChain/darkstore/match-with-cw', body);
      return data;
    },
  },
};

export const { getCentralWarehouses } = marketProductChainManagementAPI.centralWarehouses;
export const { getDarkStores } = marketProductChainManagementAPI.darkstores;
export const updateProductConfiguration = async (productId, request) => {
  try {
    const response = await axios.put(`${BASE_URL}/product/${productId}`, request);
    return response.data;
  }
  catch (error) {
    throw error?.response?.data || error;
  }
};
export const { getCentralWarehousesForMatch } = marketProductChainManagementAPI.centralWarehouses;
export const { getSupplierMatches } = marketProductChainManagementAPI.centralWarehouses;
export const { updateSupplierMatches } = marketProductChainManagementAPI.centralWarehouses;
export const { updateMatchDarkStore } = marketProductChainManagementAPI.centralWarehouses;
export const getCities = async () => {
  const { data } = await axios.get('/commerceChain/location/city/lookup');
  return data;
};
export const getDarkStoreList = async () => {
  const { data } = await axios.get('/commerceChain/darkstore/darkstores');
  return data;
};
