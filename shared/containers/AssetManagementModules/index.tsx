import Loadable from '@shared/utils/loadable';

export const ComplianceRecordModule = Loadable(() => {
  return import('./ComplianceRecord');
});

export const DamageRecordModule = Loadable(() => {
  return import('./DamageRecord');
});

export const TrafficPenaltyModule = Loadable(() => {
  return import('./TrafficPenalty');
});

export const AssignedGetiriansModule = Loadable(() => {
  return import('./AssignedGetirians');
});

export const EquipmentInformationModule = Loadable(() => {
  return import('./EquipmentInformation');
});
