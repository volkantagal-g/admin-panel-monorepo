import { screen, waitFor } from '@testing-library/react';

export default async function waitForLoading() {
  // waits for spinners to disappear
  await waitFor(() => expect(screen.queryAllByAltText('spinner')).toEqual([]), { timeout: 10000 });
}
