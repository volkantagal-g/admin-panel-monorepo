import HighCharts from 'highcharts';

import { getLangKey } from '@shared/i18n';

const highChartOptions = () => {
  if (getLangKey() === 'tr') {
    HighCharts.setOptions({
      lang: {
        loading: "Yükleniyor",
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        shortMonths: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        weekdays: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        shortWeekdays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
      },
    });
  }
};

export default highChartOptions;
