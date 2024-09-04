import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import mentorImage from "@/assets/mentors/mentorT.webp";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { UserAvatar } from "./UserAvatar";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

type Notification = {
  id: string;
  status?: "read" | "unread";
  type: "info" | "warning" | "meeting";
  content: {
    title: string;
    message: string;
    mentor: {
      name: string;
      image: string;
    };
    link: string;
  };
  date: string;
};

const notifications: Notification[] = [
  {
    id: "1",
    status: "unread",
    type: "info",
    content: {
      title: "New meeting",
      message: "You have a new meeting with John Doe",
      mentor: {
        name: "John Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "2 hours ago",
  },
  {
    id: "2",
    status: "unread",
    type: "warning",
    content: {
      title: "Meeting reminder",
      message: "Your meeting with Jane Doe is in 30 minutes",
      mentor: {
        name: "Jane Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "30 minutes ago",
  },
  {
    id: "3",
    status: "unread",
    type: "meeting",
    content: {
      title: "New meeting",
      message: "You have a new meeting with John Doe",
      mentor: {
        name: "John Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "2 hours ago",
  },
  {
    id: "4",
    status: "unread",
    type: "info",
    content: {
      title: "New meeting",
      message: "You have a new meeting with John Doe",
      mentor: {
        name: "John Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "2 hours ago",
  },
  {
    id: "5",
    status: "read",
    type: "warning",
    content: {
      title: "Meeting reminder",
      message: "Your meeting with Jane Doe is in 30 minutes",
      mentor: {
        name: "Jane Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "30 minutes ago",
  },
  {
    id: "6",
    status: "read",
    type: "meeting",
    content: {
      title: "New meeting",
      message: "You have a new meeting with John Doe",
      mentor: {
        name: "John Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "2 hours ago",
  },
  {
    id: "7",
    status: "read",
    type: "info",
    content: {
      title: "New meeting",
      message: "You have a new meeting with John Doe",
      mentor: {
        name: "John Doe",
        image: mentorImage,
      },
      link: "/meetings",
    },
    date: "2 hours ago",
  },
];

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <GoBell size={22} />
      </PopoverTrigger>
      <PopoverContent className=" md:w-96  mt-3 mr-3 px-0">
        <ScrollArea className="h-96">
          <header className="flex justify-between items-center px-4">
            <h1 className=" text-lg font-semibold">Inbox</h1>
            <Button className=" py-1 h-fit" size={"sm"} variant={"outline"}>
              Mark all as read
            </Button>
          </header>
          <Separator className="my-2" />
          <main className=" grid px-2 ">
            {notifications.map((notification) => (
              <Fragment key={notification.id}>
                <Link
                  to={notification.content.link}
                  className="hover:bg-gray-100 p-2 transition-colors divide-y-2 rounded-lg"
                >
                  <div className="flex gap-2">
                    <aside>
                      <UserAvatar
                        imageUrl={notification.content.mentor.image}
                        name={notification.content.mentor.image}
                      />
                    </aside>
                    <main>
                      <h2 className=" font-semibold">{notification.content.title}</h2>
                      <p className=" text-sm">{notification.content.message}</p>
                      <small className=" text-xs text-gray-400">{notification.date}</small>
                    </main>
                  </div>
                </Link>
                <Separator className="my-1 last-of-type:hidden" />
              </Fragment>
            ))}
          </main>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
