/* eslint-disable */
import _ from 'lodash';
const DATA_TYPE = 'data:application/vnd.ms-excel';
const TEMPLATE = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets>
<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>
</x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>`;

class Excel {
  /**
   * @param {{name?: string, data: Array<object>, fields: Array<object>}} config
   */
  constructor({ name = 'SHEET', data, fields }) {
    this.name = `${name}_${Excel.today()}`;
    this.fields = fields;
    this.data = data;
  }

  /**
   * @param {{asBase64?: boolean}} config
   */
  export({ asBase64 } = {}) {
    const dictionary = {
      worksheet: this.name,
      table: this.createTable(),
    };

    this.download(Excel.format(TEMPLATE, dictionary), asBase64);
  }

  /**
   * @returns {string}
   */
  createTable() {
    return `<table><tbody>${this.createTitles()}${this.createRows()}</tbody></table>`;
  }

  /**
   * @returns {string}
   * @private
   */
  createTitles() {
    return `<tr>${this.fields.map(field => {
      return `<th>${field.title.replace(/ /g, '&nbsp;')}</th>`;
    }).join('')}</tr>`;
  }

  /**
   * @returns {string}
   * @private
   */
  createRows() {
    const mapColumns = row => {
      return this.fields.map(field => {
        const prefix = field.prefix || '';
        const suffix = field.suffix || '';
        let value = row[field.key];
        value = (_.isBoolean(value) || _.isNumber(value) || value) ? `${prefix}${value}${suffix}` : field.default;

        return `<td>${value.replace(/ /g, '&nbsp;')}</td>`;
      });
    };

    return this.data.map(row => {
      return `<tr>${mapColumns(row).join('')}</tr>`;
    }).join('');
  }

  /**
   * @param {string} table
   * @param {boolean} [asBase64=false] asBase64
   */
  download(table, asBase64 = false) {
    const anchor = document.createElement('a');

    let dataType = DATA_TYPE;
    let data = table;

    if (asBase64) {
      dataType += ';base64';
      data = Excel.base64(table);
    }

    anchor.href = `${dataType}, ${data}`;
    anchor.download = `${this.name}.xls`;
    anchor.click();
  }

  /**
   * @param {string} content
   * @returns {string}
   * @private
   */
  static base64(content) {
    return window.btoa(unescape(encodeURIComponent(content)));
  }

  /**
   * @param {string} template
   * @param {object} dictionary
   * @returns {string}
   * @private
   */
  static format(template, dictionary) {
    return template.replace(/{(\w+)}/g, (string, key) => {
      return dictionary[key];
    });
  }

  /**
   * @return {string}
   */
  static today() {
    return new Date().toLocaleDateString().replace(/\//g, '_');
  }
}

export default Excel;
