import { useState } from "react";
import { UserPlus, Search, LayoutGrid, List } from "lucide-react";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/Header.jsx";
import UserCard from "../components/UserCard.jsx";
import UserFormModal from "../components/UserFormModal.jsx";
import DeleteConfirmModal from "../components/DeleteConfirmModal.jsx";
import useUsers from "../hooks/useUsers.js";
import { Button, Input, Empty, Spin } from "antd";

const { Search: AntSearch } = Input;

const HomePage = () => {
  const {
    users,
    isLoading,
    isOperating,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUsers();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.company?.name?.toLowerCase().includes(q)
    );
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, values);
      } else {
        await createUser(values);
      }
      setIsFormModalOpen(false);
    } catch {}
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUser.id, selectedUser.name);
      setIsDeleteModalOpen(false);
    } catch {}
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty
          description={`Error: ${error}`}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={fetchUsers}>
            Try Again
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Users</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your team members and their information
            </p>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
            size="large"
          >
            Add User
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <AntSearch
            placeholder="Search users by name, email, or company..."
            allowClear
            enterButton="Search"
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: 500 }}
          />

          <div className="flex gap-2">
            <Button
              type={viewMode === "grid" ? "primary" : "default"}
              icon={<LayoutGrid size={16} />}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              type={viewMode === "list" ? "primary" : "default"}
              icon={<List size={16} />}
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <Empty
            description={
              searchQuery ? "No matching users found" : "No users yet"
            }
          >
            {!searchQuery && (
              <Button type="primary" onClick={handleAddUser}>
                Add First User
              </Button>
            )}
          </Empty>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-3"
            }
          >
            {filteredUsers.map((user) =>
              viewMode === "grid" ? (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteClick}
                />
              ) : (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                      {user.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.company?.name || "No company"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                    <Button size="small" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button
                      danger
                      size="small"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isOperating}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        user={selectedUser}
        isLoading={isOperating}
      />
    </div>
  );
};

export default HomePage;
