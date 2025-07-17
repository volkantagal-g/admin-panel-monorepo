import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '@app/pages/Promo/Detail';
import { expectToHavePageHeaderText, waitPageToRenderSomething } from '@test/publicUtils/assertions';

const promoTestId = '659d494750d97ba2bbe9cbb1';
const initialUrl = `/promo/detail/${promoTestId}`;
const PAGE_HEADER = 'Promo Detail';

export async function renderPromoDetailPage() {
  const { ...result } = await renderPage({
    pagePermKey: permKey.PAGE_PROMO_DETAIL,
    pageUrl: initialUrl,
    pageComponent: PageComponent,
  });

  await waitPageToRenderSomething();

  await waitFor(() => {
    expectToHavePageHeaderText(PAGE_HEADER);
  });

  return result;
}

export async function clickByNamesWithin(container: HTMLElement, ...names: string[]): Promise<void> {
  names.forEach(name => userEvent.click(within(container).getByText(name)));
}

export async function clickByNames(...names: string[]): Promise<void> {
  names.forEach(name => userEvent.click(screen.getByText(name)));
}

export async function clickByTitlesWithin(container: HTMLElement, ...names: string[]): Promise<void> {
  names.forEach(name => userEvent.click(within(container).getByTitle(name)));
}

export async function clickByTitles(...names: string[]): Promise<void> {
  names.forEach(name => userEvent.click(screen.getByTitle(name)));
}
