// to be able to see page content
// with screen.debug(): everything prints, side bars and other html nodes clutter the log
function panelDebugPage(screen) {
  // eslint-disable-next-line
  screen.debug(document.querySelector('.ant-layout-content'));
}

// NOTE: returns first table body, if there are multiple tables
function panelDebugTable(screen, nearestContainer = document) {
  // eslint-disable-next-line
  screen.debug(nearestContainer.querySelector('.ant-table-body'));
}

global.panelDebugPage = panelDebugPage;
global.panelDebugTable = panelDebugTable;
