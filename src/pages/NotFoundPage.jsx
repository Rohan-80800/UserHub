import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Result, Button } from "antd";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Space>
            <Link to="/">
              <Button type="primary" icon={<Home size={16} />}>
                Back to Home
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              icon={<ArrowLeft size={16} />}
            >
              Go Back
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default NotFoundPage;
