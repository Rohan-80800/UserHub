import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Something Went Wrong
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {message || "We couldn't load the users. Please try again."}
      </p>
      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;
