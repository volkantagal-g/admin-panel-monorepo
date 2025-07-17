import { getColumnInputSearchProps, getTableColumns } from './config';

describe('Tobb Gib Request page - config.js', () => {
  test('getColumnInputSearchProps', () => {
    const props = getColumnInputSearchProps({ dataIndex: 'name', classes: {} });

    expect(props).toHaveProperty('filterDropdown');
    expect(props).toHaveProperty('filterIcon');
    expect(props).toHaveProperty('onFilter');
    expect(props).toHaveProperty('onFilterDropdownVisibleChange');
  });

  test('#getTableColumns', () => {
    const table = getTableColumns(() => {});
    expect(table).toBeDefined();
    expect(table).toHaveLength(20);

    expect(table[0].render('VKN')).toBe('VKN');
    expect(table[1].render('tckn')).toBe('tckn');
    expect(table[2].render('ad')).toBe('ad');
    expect(table[3].render('adresBilgileri')).toBe('adresBilgileri');
    expect(table[4].render('caddeSokak')).toBe('caddeSokak');
    expect(table[5].render('disKapiNo')).toBe('disKapiNo');
    expect(table[6].render('icKapiNo')).toBe('icKapiNo');
    expect(table[7].render('ilAdi')).toBe('ilAdi');
    expect(table[8].render('ilKodu')).toBe('ilKodu');
    expect(table[9].render('ilceAdi')).toBe('ilceAdi');
    expect(table[10].render('ilceKodu')).toBe('ilceKodu');
    expect(table[11].render('koy')).toBe('koy');
    expect(table[12].render('mahalleSemt')).toBe('mahalleSemt');
    expect(table[13].render('faalTerkDurumu')).toBe('faalTerkDurumu');
    expect(table[14].render('kimlikUnvani')).toBe('kimlikUnvani');
    expect(table[15].render('soyad')).toBe('soyad');
    expect(table[16].render('sirketinTuru')).toBe('sirketinTuru');
    expect(table[17].render('unvan')).toBe('unvan');
    expect(table[18].render('vergiDairesiAdi')).toBe('vergiDairesiAdi');
    expect(table[19].render('mersisNo')).toBe('mersisNo');
  });

  it('should return an array of objects with the correct properties', () => {
    const columns = getTableColumns({ classes: {} });

    expect(columns).toBeInstanceOf(Array);
    expect(columns).toHaveLength(20);

    columns.forEach(column => {
      expect(column).toHaveProperty('title');
      expect(column).toHaveProperty('dataIndex');
      expect(column).toHaveProperty('key');
      expect(column).toHaveProperty('render');
      expect(column).toHaveProperty('width');

      if (column.key === 'vkn' || column.key === 'tckn') {
        expect(column).toHaveProperty('filterDropdown');
        expect(column).toHaveProperty('filterIcon');
        expect(column).toHaveProperty('onFilter');
        expect(column).toHaveProperty('onFilterDropdownVisibleChange');
      }
      else {
        expect(column).not.toHaveProperty('filterDropdown');
        expect(column).not.toHaveProperty('filterIcon');
        expect(column).not.toHaveProperty('onFilter');
        expect(column).not.toHaveProperty('onFilterDropdownVisibleChange');
      }
    });
  });
});
