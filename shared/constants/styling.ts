/**
 * @constant
 * @type {number}
 * NOTE:
 *  - This is the z-index of the sidebar.
 *  - Use this convention for z-indexes:
 *   * 0 - 1000: For things that should be below the sidebar like in page content, cards, dropdowns, select popups etc.
 *   * 1002+   : For things that should be above the sidebar like tooltips near sidebar, modals etc.
 */

export const SIDEBAR_Z_INDEX = 1001;
