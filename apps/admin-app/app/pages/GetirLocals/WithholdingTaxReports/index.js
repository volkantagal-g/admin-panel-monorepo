import WithholdingTaxReports from '../../GetirFood/WithholdingTaxReports/shared/WithholdingTaxReports';
import { VerticalType } from '../../GetirFood/WithholdingTaxReports/shared/constants';

const GetirLocalsWithholdingTaxReports = () => {
  return <WithholdingTaxReports vertical={VerticalType.Locals} />;
};

export default GetirLocalsWithholdingTaxReports;
