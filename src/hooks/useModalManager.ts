import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { Modal } from '../types';

const MODALS_QUERY_KEY: QueryKey = ['modals'];

export const useModalManager = () => {
  const queryClient = useQueryClient();

  const showModal = useMutation({
    mutationFn: async (modal: Omit<Modal, 'timestamp'>): Promise<Modal> => ({
      ...modal,
      timestamp: Date.now(),
    }),
    onMutate: async (newModal) => {
      await queryClient.cancelQueries({ queryKey: MODALS_QUERY_KEY });

      const currentModals = queryClient.getQueryData<Modal[]>(MODALS_QUERY_KEY) || [];
      const updatedModals = [...currentModals, { ...newModal, timestamp: Date.now() }].sort(
        (a, b) => b.priority - a.priority || a.timestamp - b.timestamp
      );

      queryClient.setQueryData(MODALS_QUERY_KEY, updatedModals);

      return { previousModals: currentModals };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(MODALS_QUERY_KEY, context?.previousModals || []);
    },
  });

  const hideModal = useMutation({
    mutationFn: async (id: string): Promise<string> => id,
    onMutate: async (idToRemove) => {
      await queryClient.cancelQueries({ queryKey: MODALS_QUERY_KEY });

      const currentModals = queryClient.getQueryData<Modal[]>(MODALS_QUERY_KEY) || [];
      const updatedModals = currentModals.filter((modal) => modal.id !== idToRemove);

      queryClient.setQueryData(MODALS_QUERY_KEY, updatedModals);

      return { previousModals: currentModals };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(MODALS_QUERY_KEY, context?.previousModals || []);
    },
  });

  const getCurrentModal = () => {
    const modals = queryClient.getQueryData<Modal[]>(MODALS_QUERY_KEY) || [];
    return modals[0] || null;
  };

  return {
    showModal: showModal.mutateAsync,
    hideModal: hideModal.mutateAsync,
    currentModal: getCurrentModal(),
  };
};