import scrollIntoView from 'scroll-into-view';

export const scrollToTop = firstRowClassName => {
  scrollIntoView(document.querySelector(`.${firstRowClassName}`), { align: { top: 0 } });
  // TODO I had some problems while doing this with vanilla way, this is why I have chosen to use the library for now.
  // It would be nice to find a way to convert this later on.
  // Check this out; https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
};
