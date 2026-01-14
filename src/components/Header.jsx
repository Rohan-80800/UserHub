import { Link } from "react-router-dom";
import { Users} from "lucide-react";

const Header = () => {

  return (
    <header className="sticky top-0 z-50 glass border-b border-border bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition-transform group-hover:scale-105">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">UserHub</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                User Management System
              </p>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
