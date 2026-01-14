import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = ({ onAddUser }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Users Found
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        There are no users in the system yet. Start by adding your first user to
        get going.
      </p>
      <Button onClick={onAddUser} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Add First User
      </Button>
    </div>
  );
};

export default EmptyState;
