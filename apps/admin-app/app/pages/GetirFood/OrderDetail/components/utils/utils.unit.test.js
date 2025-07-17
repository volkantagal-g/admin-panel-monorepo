import { salesAgreementHTMLen } from './en/salesAgreementHTML';
import { salesAgreementHTMLtr } from './tr/salesAgreementHTML';

const testObject = { foodOrder: { restaurant: { companyName: 'Test Company Name' } } };

describe('Get agreement html', () => {
  describe('#salesAgreementHTMLen', () => {
    it('should return string for all case', () => {
      expect(salesAgreementHTMLen({})).toContain('GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ PRE-DISCLOSURE FORM');
    });
    it('should contain foodOrder Detail', () => {
      expect(salesAgreementHTMLen(testObject)).toContain('Test Company Name');
    });
  });

  describe('#salesAgreementHTMLtr', () => {
    it('should return  string for all case', () => {
      expect(salesAgreementHTMLtr({})).toContain('GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ ÖN BİLGİLENDİRME FORMU');
    });
    it('should contain foodOrder Detail', () => {
      expect(salesAgreementHTMLen(testObject)).toContain('Test Company Name');
    });
  });
});
