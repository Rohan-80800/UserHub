import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";

const UserCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full skeleton" />

          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 rounded skeleton" />
            <div className="h-5 w-20 rounded-full skeleton" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 rounded skeleton" />
            <div
              className="h-4 flex-1 rounded skeleton"
              style={{ width: `${60 + Math.random() * 30}%` }}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-2 pt-4 border-t border-border">
        <div className="h-9 flex-1 rounded skeleton" />
        <div className="h-9 w-9 rounded skeleton" />
        <div className="h-9 w-9 rounded skeleton" />
      </CardFooter>
    </Card>
  );
};

export default UserCardSkeleton;
