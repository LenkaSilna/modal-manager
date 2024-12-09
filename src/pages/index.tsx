import React, { useEffect } from 'react';
import { useModalManager } from '../hooks/useModalManager';
import ModalManager from '../components/ModalManager';

const HomePage: React.FC = () => {
  const { showModal } = useModalManager();

  useEffect(() => {
    const interval = setInterval(() => {
      showModal({
        id: `api-modal-${Date.now()}`,
        priority: 10,
        content: <div>Data from API: Example Title</div>,
        triggeredByUser: false,
      });
    }, 10000);
  
    return () => clearInterval(interval);
  }, [showModal]);

  const openUserModal = () => {
    showModal({
      id: 'user-modal',
      priority: 10,
      content: <div>User Modal Content</div>,
      triggeredByUser: true,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modal Manager Example</h1>
      <button
        onClick={openUserModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open User Modal
      </button>
      <ModalManager />
    </div>
  );
};

export default HomePage;