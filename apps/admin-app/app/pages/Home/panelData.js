import { Link } from 'react-router-dom';

import { GETIR_GROW_URL, GETIR_HUB_URL } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';

export const homePageSections = [
  {
    link: '/role/list/allRoles',
    permKey: permKey.PAGE_ROLE_LIST,
    en: {
      title: 'Search for Roles',
      description: (
        <><Link to="/role/list/allRoles">Click</Link> to go to the Roles page to start a search for available Roles.</>
      ),
    },
    tr: {
      title: 'Roller Sayfası',
      description: (
        <>Roller sayfasına erişmek ve arama yapmak için <Link to="/role/list/allRoles">tıklayın</Link>.</>
      ),
    },
  },
  {
    link: '/panelDoc/search',
    permKey: permKey.PAGE_PANEL_DOC_SEARCH,
    en: {
      title: 'Documentation',
      description: (
        <><Link to="/panelDoc/search">Click</Link> to go to the Documentations page and to look for available Documents in Panel.</>
      ),
    },
    tr: {
      title: 'Dokümantasyonlar',
      description: (
        <>Paneldeki dokümanları görüntülemek ve Dokümanlar arasında bir arama yapmak için <Link to="/panelDoc/search">tıklayın</Link>.</>
      ),
    },
  },
  {
    link: '/employee/list',
    permKey: permKey.PAGE_EMPLOYEE_LIST,
    en: {
      title: 'Getirians',
      description: (
        <><Link to="/employee/list">Click</Link> to go to the Getirians page and look for your colleagues.</>
      ),
    },
    tr: {
      title: 'Getirliler',
      description: (
        <>Getirliler sayfasına gidip iş arkadaşlarınızı bulmak için <Link to="/employee/list">tıklayın</Link>.</>
      ),
    },
  },
  {
    link: '/',
    permKey: permKey.PAGE_EMPLOYEE_HOME,
    en: {
      title: 'Leave Request',
      description: (
        <><Link to="/employee/leaveAndHolidays">Click</Link> to make an Off-Site Work Request or Leave Request.</>
      ),
    },
    tr: {
      title: 'İzinler',
      description: (
        <>İzin ve Ofis Dışı Çalışma Talebi girmek için <Link to="/employee/leaveAndHolidays">tıklayın</Link>.</>
      ),
    },
  },
  // {
  //   link: '/',
  //   en: {
  //     title: 'Leave Management',
  //     description: (
  //       <>Leave Management is now on <a href="https://wd103.myworkday.com/getir/d/home.htmld">Workday</a>.<Link to="/employee/leaveAndHolidays">Panel Leave Data</Link> is read-only.</>
  //     ),
  //   },
  //   tr: {
  //     title: 'İzin YÖnetimi',
  //     description: (
  //       <>İzin Yönetimi artık <a href="https://wd103.myworkday.com/getir/d/home.htmld">Workday</a> üzerinde.<Link to="/employee/leaveAndHolidays">Paneldeki izin verisi</Link> sadece görüntüleme amaçlı tutulmaktadır.</>
  //     ),
  //   },
  // },
  {
    link: 'https://hub.getir.com/',
    target: '_blank',
    permKey: permKey.PAGE_MENU_EXTERNAL_LINKS_COMPONENT_GETIR_HUB,
    en: {
      title: 'GetirHub',
      description: (
        <>
          <a href={GETIR_HUB_URL} target="_blank" rel="noreferrer">Click</a>
          &nbsp;to go to the internal hub for news from and information about Getir,
          its culture and people.
        </>
      ),
    },
    tr: {
      title: 'GetirHub',
      description: (
        <>
          Getir ile ilgili haberler, kültür ve Getirlilerle ilgili daha fazla bilgiler için&nbsp;
          <a href={GETIR_HUB_URL} target="_blank" rel="noreferrer">tıklayın</a>.
        </>
      ),
    },
  },
  {
    link: 'https://www.feedback4e.com/Corporate/Login?clientName=getir',
    target: '_blank',
    permKey: permKey.PAGE_MENU_EXTERNAL_LINKS_COMPONENT_GETIR_GROW,
    en: {
      title: 'GetirGrow',
      description: (
        <>
          <a href={GETIR_GROW_URL} target="_blank" rel="noreferrer">Click</a>
          &nbsp;to go to GetirGrow to see the feedback from your peers and manager,
          give feedback or give Cheers to other Getirians.
        </>
      ),
    },
    tr: {
      title: 'GetirGrow',
      description: (
        <>
          İş arkadaşlarınızdan ve yöneticinizden gelen geri bildirimleri görmek,
          diğer Getirlilere Cheers vermek için&nbsp;
          <a href={GETIR_GROW_URL} target="_blank" rel="noreferrer">tıklayın</a>.
        </>
      ),
    },
  },
  {
    permKey: permKey.PAGE_HOME_COMPONENT_DOCUMENT_OPERATION_DEPARTMENT_TIPS,
    en: {
      title: 'Tips & Tricks on Ops-Related Pages',
      description: (
        <>
          <a href="https://docs.google.com/document/d/1X3m0oakqePJuPgS99LmxX3velaVlcNGczh-G6QZMgl4/edit" target="_blank" rel="noreferrer">This training content</a>&nbsp;
          provides comprehensive insights into the admin panel,&nbsp;
          specifically focusing on operations-related pages and offering valuable tips and tricks for optimizing their usage.
        </>
      ),
    },
    tr: {
      title: 'Operasyon Sayfalarıyla İlgili İpuçları',
      description: (
        <>
          <a href="https://docs.google.com/document/d/1X3m0oakqePJuPgS99LmxX3velaVlcNGczh-G6QZMgl4/edit" target="_blank" rel="noreferrer">Bu eğitim dokümanı</a>&nbsp;
          admin paneldeki operasyonla alakalı sayfalarla alakalı&nbsp;
          kapsamlı bilgiler ve daha iyi kullanabilmek için ipuçları içerir.
        </>
      ),
    },
  },
  {
    link: '/page/list',
    permKey: permKey.PAGE_PAGE_LIST,
    en: {
      title: 'About the Admin Panel',
      /* eslint-disable max-len */
      description: (
        <>
          Admin panel is the internal platform for all office employees of Getir and serves as the hub to manage the administrative data and processes&nbsp;
          of the company through the hundreds of multi-purpose pages.&nbsp;
          These pages are owned by different development squads and product managers in tech organisation. For the full list of pages,&nbsp;
          click <Link to="/page/list">here</Link>.
        </>
      ),
    },
    tr: {
      title: 'Admin Panel Hakkında',
      /* eslint-disable max-len */
      description: (
        <>
          Admin panel Getir&apos;in tüm ofis çalışanları için ortak bir platformdur ve içerdiği yüzlerce çok amaçlı sayfa sayesinde&nbsp;
          şirketin idari işlerinin yönetilmesini sağlamayı amaçlamaktadır.&nbsp;
          Admin paneldeki sayfalar teknoloji departmanındaki farklı yazılım geliştirme takımlarına ve ürün yöneticilerine aittir.&nbsp;
          Sayfaların tam listesi için lütfen&nbsp;
          <Link to="/page/list">buraya tıklayın</Link>.
        </>
      ),
    },
  },
];
