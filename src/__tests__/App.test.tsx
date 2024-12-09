import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import HomePage from '../pages/index';
import { QueryClientWrapper } from '../test-utils';

jest.useFakeTimers();

test('should display and close API modal with user interaction', async () => {
  render(
    <QueryClientWrapper>
      <HomePage />
    </QueryClientWrapper>
  );

  act(() => {
    jest.advanceTimersByTime(10000);
  });

  await waitFor(() => {
    expect(screen.getByText(/Data from API: Example Title/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Close/i));

  await waitFor(() => {
    expect(screen.queryByText(/Data from API: Example Title/i)).toBeNull();
  });
});