import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  Edit2,
  Trash2
} from "lucide-react";
import Header from "../components/Header.jsx";
import UserFormModal from "../components/UserFormModal.jsx";
import DeleteConfirmModal from "../components/DeleteConfirmModal.jsx";
import useUsers from "../hooks/useUsers.js";
import { Button, Card, Avatar, Spin, Descriptions, Tag, Space } from "antd";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { fetchUserById, updateUser, deleteUser, isOperating } = useUsers();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const userData = await fetchUserById(id);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [id, fetchUserById]);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdateUser = async (values) => {
    try {
      await updateUser(user.id, values);
      setUser({ ...user, ...values });
      setIsFormModalOpen(false);
    } catch (err) {
        console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id, user.name);
      navigate("/");
    } catch (err) {
     console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The user you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button type="primary">
                <ArrowLeft className="mr-2" size={16} />
                Back to Users
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Users
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar
                size={96}
                style={{ backgroundColor: "#1890ff" }}
                className="flex-shrink-0"
              >
                {getInitials(user.name)}
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Tag color="blue">@{user.username}</Tag>
                </div>

                <Space direction="vertical" size="small">
                  <a
                    href={`mailto:${user.email}`}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                  >
                    <Mail size={16} />
                    {user.email.toLowerCase()}
                  </a>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Phone size={16} />
                    {user.phone}
                  </div>
                </Space>
              </div>

              <Space>
                <Button
                  type="default"
                  icon={<Edit2 size={16} />}
                  onClick={() => setIsFormModalOpen(true)}
                >
                  Edit
                </Button>
                <Button
                  danger
                  icon={<Trash2 size={16} />}
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </Space>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Website</h3>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Globe size={16} />
                  {user.website}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin size={16} className="mt-1" />
                  <div>
                    <p>
                      {user.address?.street}, {user.address?.suite}
                    </p>
                    <p>
                      {user.address?.city}, {user.address?.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <Space>
                <Building size={18} /> Company
              </Space>
            }
          >
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Name">
                {user.company?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Business">
                {user.company?.bs}
              </Descriptions.Item>
              <Descriptions.Item label="Catch Phrase">
                <i>"{user.company?.catchPhrase}"</i>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title={
              <Space>
                <MapPin size={18} /> Location Coordinates
              </Space>
            }
            className="lg:col-span-3"
          >
            <Descriptions bordered size="small">
              <Descriptions.Item label="Latitude">
                <code>{user.address?.geo?.lat}</code>
              </Descriptions.Item>
              <Descriptions.Item label="Longitude">
                <code>{user.address?.geo?.lng}</code>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleUpdateUser}
        user={user}
        isLoading={isOperating}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        user={user}
        isLoading={isOperating}
      />
    </div>
  );
};

export default UserDetailPage;
