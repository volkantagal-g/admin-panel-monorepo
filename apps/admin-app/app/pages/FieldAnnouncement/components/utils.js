export const getActiveFranchises = franchises => franchises.filter(
  franchise => franchise.isActivated,
);
