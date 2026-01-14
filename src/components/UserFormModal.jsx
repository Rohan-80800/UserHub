import {useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  AtSign
} from "lucide-react";
import { Modal, Form, Input, Button, Spin } from "antd";

const UserFormModal = ({ isOpen, onClose, onSubmit, user, isLoading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        "company.name": user.company?.name,
        "address.city": user.address?.city
      });
    } else {
      form.resetFields();
    }
  }, [user, isOpen, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={user ? "Edit User" : "Create New User"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      maskClosable={!isLoading}
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
            "company.name": "",
            "address.city": ""
          }}
        >
          <Form.Item
            name="name"
            label={
              <span className="flex items-center gap-2">
                <User size={16} /> Full Name *
              </span>
            }
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="username"
            label={
              <span className="flex items-center gap-2">
                <AtSign size={16} /> Username *
              </span>
            }
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="johndoe" />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className="flex items-center gap-2">
                <Mail size={16} /> Email Address *
              </span>
            }
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" }
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label={
              <span className="flex items-center gap-2">
                <Phone size={16} /> Phone Number *
              </span>
            }
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="1-234-567-8900" />
          </Form.Item>

          <Form.Item
            name="website"
            label={
              <span className="flex items-center gap-2">
                <Globe size={16} /> Website
              </span>
            }
          >
            <Input placeholder="example.com" />
          </Form.Item>

          <Form.Item name={["company", "name"]} label="Company Name">
            <Input placeholder="Acme Inc." />
          </Form.Item>

          <Form.Item name={["address", "city"]} label="City">
            <Input placeholder="New York" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {user ? "Update User" : "Create User"}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UserFormModal;
