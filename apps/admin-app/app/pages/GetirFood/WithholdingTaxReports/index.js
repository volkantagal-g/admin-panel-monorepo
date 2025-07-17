import WithholdingTaxReports from './shared/WithholdingTaxReports';
import { VerticalType } from './shared/constants';

const GetirFoodWithholdingTaxReports = () => {
  return <WithholdingTaxReports vertical={VerticalType.Food} />;
};

export default GetirFoodWithholdingTaxReports;
