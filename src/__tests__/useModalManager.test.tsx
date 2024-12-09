import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useModalManager } from '../hooks/useModalManager';

const createQueryClientWrapper = () => {
  const queryClient = new QueryClient();

  const QueryClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  QueryClientWrapper.displayName = 'QueryClientWrapper';

  return QueryClientWrapper;
};

describe('useModalManager Hook', () => {
  it('should handle modals with different priorities', async () => {
    const { result } = renderHook(() => useModalManager(), {
      wrapper: createQueryClientWrapper(),
    });

    await act(async () => {
      await result.current.showModal({
        id: 'A',
        priority: 10,
        content: <div>Modal A</div>,
        triggeredByUser: true,
      });
    });

    await act(async () => {
      await result.current.showModal({
        id: 'B',
        priority: 20,
        content: <div>Modal B</div>,
        triggeredByUser: false,
      });
    });

    await waitFor(() => {
      expect(result.current.currentModal?.id).toBe('B');
    });
  });

  it('should handle FIFO for modals with the same priority', async () => {
    const { result } = renderHook(() => useModalManager(), {
      wrapper: createQueryClientWrapper(),
    });

    await act(async () => {
      await result.current.showModal({
        id: 'A',
        priority: 10,
        content: <div>Modal A</div>,
        triggeredByUser: true,
      });
    });

    await act(async () => {
      await result.current.showModal({
        id: 'B',
        priority: 10,
        content: <div>Modal B</div>,
        triggeredByUser: false,
      });
    });

    await waitFor(() => {
      expect(result.current.currentModal?.id).toBe('A');
    });

    await act(async () => {
      await result.current.hideModal('A');
    });

    await waitFor(() => {
      expect(result.current.currentModal?.id).toBe('B');
    });
  });

  
});