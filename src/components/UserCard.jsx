import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  Edit2,
  Trash2,
  ExternalLink
} from "lucide-react";
import { Card, Avatar, Badge, Button } from "antd";

const UserCard = ({ user, onEdit, onDelete }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getAvatarColor = (id) => {
    const colors = [
      "#1890ff",
      "#52c41a",
      "#faad14",
      "#f5222d",
      "#722ed1",
      "#eb2f96"
    ];
    return colors[id % colors.length];
  };

  return (
    <Card
      hoverable
      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <Card.Meta
        avatar={
          <Avatar
            size={56}
            style={{ backgroundColor: getAvatarColor(user.id) }}
          >
            {getInitials(user.name)}
          </Avatar>
        }
        title={
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{user.name}</span>
            <Badge count={`@${user.username}`} color="#108ee9" />
          </div>
        }
      />

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-blue-600" />
          <a
            href={`mailto:${user.email}`}
            className="text-gray-600 hover:text-blue-600"
          >
            {user.email.toLowerCase()}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-blue-600" />
          <span className="text-gray-600">{user.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-blue-600" />
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            {user.website}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-blue-600" />
          <span className="text-gray-600 truncate">{user.company?.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-gray-600">{user.address?.city}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Link to={`/user/${user.id}`} className="flex-1">
          <Button type="default" icon={<ExternalLink size={16} />} block>
            View Details
          </Button>
        </Link>
        <Button
          type="primary"
          icon={<Edit2 size={16} />}
          onClick={() => onEdit(user)}
        />
        <Button
          danger
          icon={<Trash2 size={16} />}
          onClick={() => onDelete(user)}
        />
      </div>
    </Card>
  );
};

export default UserCard;
