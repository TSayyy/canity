import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mentorSchema } from "@/schemas/mentorSchema";
import { formatCurrency } from "@/utils/helpers";

type MentorTableProps = {
  mentors: z.infer<typeof mentorSchema>[];
};

export function MentorsTable({ mentors }: MentorTableProps) {
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow className="*:text-dark-navy *:font-semibold *:whitespace-nowrap">
          <TableHead>No</TableHead>
          <TableHead>Id Mentor</TableHead>
          <TableHead>Mentor Name</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Learner</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Price/hr</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(!mentors || mentors?.length === 0) && (
          <TableRow className=" cursor-pointer">
            <TableCell colSpan={7} className="text-center font-semibold py-10">
              No mentors Found
            </TableCell>
          </TableRow>
        )}
        {mentors?.map((mentor, index) => (
          <TableRow key={mentor.id}>
            <TableCell className="font-medium">{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</TableCell>
            <TableCell>#{mentor?.id}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <UserAvatar
                fallbackClassName="text-xs text-white"
                name={mentor?.user?.name}
                imageUrl={mentor?.user?.image}
                className=" w-6 h-6"
              />
              {mentor?.user?.name}
            </TableCell>
            <TableCell>{mentor?.track?.title}</TableCell>
            <TableCell>{mentor?.noStudents}</TableCell>
            <TableCell>{mentor?.rating}</TableCell>
            <TableCell>{formatCurrency(mentor?.pricePerHour)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
