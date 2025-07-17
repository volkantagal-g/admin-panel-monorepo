import { Link } from 'react-router-dom';

export const getAboutList = t => [
  {
    title: {
      tr: 'Yeni panel, yeni izin sistemi',
      en: 'New panel, new permission system',
    },
    description: {
      tr: <>Detaylar için: {getPermDriveLink()}</>,
      en: <>For details: {getPermDriveLink()}</>,
    },
  },
  {
    title: {
      tr: 'Her sayfaya dokümantasyon',
      en: 'Documentation for every page',
    },
    description: {
      tr: <>Sağ üst köşede bulunan {getDocElement(t)} butonu ile bulunduğunuz sayfanın kullanımına dair dokümanlara ulaşabilirsiniz.</>,
      en: (
        <>
          You can use the {getDocElement(t)} button at the upper right corner to read documentations of the page you are currently visiting.
        </>
      ),
    },
  },
  {
    title: {
      tr: 'Genel dokümantasyon arama',
      en: 'General documentation search',
    },
    description: {
      tr: <>Paneldeki herhangi bir sayfanın dokümantasyonunu aramak için: {getDocSearchLink()}</>,
      en: <>Search documentations for any page: {getDocSearchLink()}</>,
    },
  },
];

function getPermDriveLink() {
  return (
    <a
      href="https://drive.google.com/drive/u/0/folders/1Rt-Sdz32etApWp7Z9BzfBaerxprUfuuZ"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://drive.google.com/...
    </a>
  );
}
const docsMenuItemId = 'panel_doc_search_menu_item';

function getDocSearchLink() {
  return (
    <Link
      to="/panelDoc/search"
      onMouseOver={() => highlight(docsMenuItemId)}
      onFocus={() => highlight(docsMenuItemId)}
      onMouseOut={() => unhighlight(docsMenuItemId)}
      onBlur={() => unhighlight(docsMenuItemId)}
    >
      {window.location.origin}/...
    </Link>
  );
}

const docsId = 'headerDocsButton';

function getDocElement(t) {
  return (
    <b
      onMouseOver={() => highlight(docsId)}
      onFocus={() => highlight(docsId)}
      onMouseOut={() => unhighlight(docsId)}
      onBlur={() => unhighlight(docsId)}
      style={{ cursor: 'pointer' }}
    >
      {t('DOCUMENTATIONS')}
    </b>
  );
}

function highlight(id) {
  document.getElementById(id).classList.add('panelPulse');
}

function unhighlight(id) {
  document.getElementById(id).classList.remove('panelPulse');
}
