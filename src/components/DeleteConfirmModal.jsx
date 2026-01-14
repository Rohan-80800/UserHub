import { AlertTriangle } from "lucide-react";
import { Modal, Button } from "antd";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isLoading
}) => {
  return (
    <Modal
      title="Delete User"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          loading={isLoading}
          onClick={onConfirm}
        >
          Delete
        </Button>
      ]}
      centered
    >
      <div className="flex flex-col items-center py-6">
        <div className="mb-4 rounded-full bg-red-100 p-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <p className="text-center text-lg">
          Are you sure you want to delete <strong>{user?.name}</strong>?
        </p>
        <p className="text-center text-gray-500 mt-2">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
