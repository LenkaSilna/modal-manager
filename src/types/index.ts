export type Modal = {
    id: string;
    priority: number;
    content: React.ReactNode;
    triggeredByUser: boolean;
    timestamp: number;
  };
