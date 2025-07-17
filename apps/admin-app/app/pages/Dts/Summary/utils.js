export const mapDataForTable = (resultsData, warehouses, franchises, dtsCategoryRules) => {
  const warehousesMap = new Map();
  const franchisesMap = new Map();
  const dtsRulesMap = new Map();

  warehouses.forEach(warehouse => {
    warehousesMap.set(warehouse.id, warehouse);
  });

  franchises.forEach(franchise => {
    franchisesMap.set(franchise._id, franchise);
  });

  dtsCategoryRules.forEach(rule => {
    dtsRulesMap.set(rule._id, rule);
  });

  return resultsData.map(result => {
    const foundWarehouse = warehousesMap.get(result.warehouseId);
    if (!foundWarehouse){
      return false;
    }

    const foundFranchise = franchisesMap.get(foundWarehouse.franchise);
    const franchiseName = foundFranchise?.name || '';

    let compare = '';

    if (result.currentRank > result.previousRank) {
      compare = 'increased';
    }
    else if (result.currentRank < result.previousRank) {
      compare = 'decrased';
    }

    const currentRank = {
      score: result.currentRank,
      compare,
    };

    const categoryPoints = result.categoryPoints.map(resultCategory => {
      const foundCategory = dtsRulesMap.get(resultCategory.categoryId);
      if (!foundCategory) {
        return false;
      }

      return { id: foundCategory._id, 'score': resultCategory.score, 'title': foundCategory.title };
    });

    const key = `${result.franchiseId}_${foundWarehouse._id}`;

    return { ...foundWarehouse, ...result, _id: key, id: key, franchiseName, currentRank, categoryPoints };
  });
};
