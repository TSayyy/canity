import { TbMessage } from "react-icons/tb";

import { Button } from "@/components/ui/button";

export const MessageBox = () => {
  return (
    <div className="flex gap-x-4">
      <Button type="button" className="rounded-full px-6">
        <TbMessage className="mr-2" />
        <span>Message</span>
      </Button>
      <Button
        type="button"
        className="flex flex-col bg-transparent hover:bg-white/10 items-center justify-center gap-1 border border-royal-blue rounded-full w-10 h-10"
      >
        <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
        <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
        <div className="w-1 h-1 rounded-full bg-royal-blue"></div>
      </Button>
    </div>
  );
};
