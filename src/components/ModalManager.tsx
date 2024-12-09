import React from 'react';
import { useModalManager } from '../hooks/useModalManager';

const ModalManager: React.FC = () => {
  const { currentModal, hideModal } = useModalManager();

  if (!currentModal) return null;

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div data-testid="modal-container" className="modal-container bg-white p-6 rounded shadow-lg">
        <h1 data-testid="modal-title" className="text-xl font-bold mb-4">
          {currentModal.triggeredByUser ? 'User Modal' : 'API Modal'}
        </h1>
        <div data-testid="modal-content">{currentModal.content}</div>
        <div>{currentModal.priority}</div>
        <div>{currentModal.timestamp}</div>
        <div>{currentModal.id}</div>
        <button
          onClick={() => hideModal(currentModal.id)}
          data-testid="modal-close-button"
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalManager;