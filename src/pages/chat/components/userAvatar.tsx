import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TUserAvatar = {
  className: string;
  image?: string;
  name: string;
};

export const UserAvatar = ({ className, name, image }: TUserAvatar) => (
  <Avatar className={className} title={name}>
    <AvatarImage src={image} alt={name} title={name} />
    <AvatarFallback className="bg-white/40 text-white font-semibold cursor-default">
      {name.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>
);
