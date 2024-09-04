import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function UserAvatar({
  imageUrl,
  name,
  className = "",
  fallbackClassName = "",
}: {
  imageUrl: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} title={name} alt={name} />
      <AvatarFallback className={cn(" bg-royal-blue text-lg", fallbackClassName)}>
        {name?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
