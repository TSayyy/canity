import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema } from "@/schemas/mentorSchema";

import { StatusTag } from "./StatusTag";

type OrderType = z.infer<typeof BasicInfoFormSchema> &
  z.infer<typeof changePasswordSchema> &
  z.infer<typeof ProSectionSchema> &
  z.infer<typeof SocialMediaSchema> & {
    id: string;
    status: "rejected" | "pending" | "accepted";
    date: Date;
  };
type MentorTableProps = {
  orders: OrderType[];
};

export function OrdersTable({ orders }: MentorTableProps) {
  const navigate = useNavigate();
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow className="*:text-dark-navy *:font-semibold">
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Mentor CV</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(!orders || orders?.length === 0) && (
          <TableRow className=" cursor-pointer">
            <TableCell colSpan={7} className="text-center font-semibold py-10">
              No Orders Found
            </TableCell>
          </TableRow>
        )}
        {orders?.map((mentor, index) => (
          <TableRow
            key={index}
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${mentor.id}`);
            }}
          >
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={mentor?.name}
                imageUrl={mentor?.image}
                className=" w-6 h-6"
              />
              {mentor?.name}
            </TableCell>
            <TableCell>{mentor?.title}</TableCell>
            <TableCell>{mentor?.experience}</TableCell>
            <TableCell>
              <a
                onClick={(e) => e.stopPropagation()}
                href={mentor?.resume}
                target="_blank"
                rel="noreferrer"
                className="w-fit max-w-xl text-royal-blue hover:underline underline-offset-2"
              >
                view CV
              </a>
            </TableCell>
            <TableCell>{format(mentor.dob, "dd-MM-yyyy")}</TableCell>

            <TableCell>
              <StatusTag status={mentor.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
