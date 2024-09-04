import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostData } from "@/hooks/useApi";
import { usePurchasedCourses } from "@/hooks/usePurchasedCourses";
import { RootState } from "@/redux/store";

type BuyCourseBtnProps = {
  courseId: string | undefined;
};
export default function BuyCourseBtn({ courseId }: BuyCourseBtnProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);

  // purchased courses check
  const { isLoading, purchasedCoursesIds } = usePurchasedCourses();
  const isPurchased = purchasedCoursesIds?.includes(courseId || "");

  const buyCourse = usePostData(`courses/checkout/${courseId}`);

  if (!courseId) return null;

  // handle buy course function
  const handleBuyCourse = async () => {
    if (!authStatus) {
      toast.error("Please login to purchase course");
      navigate("/auth/login");
      return;
    }
    const toastId = toast.loading("Purchasing Course...");
    const { status } = await buyCourse.mutateAsync({});
    if (status === "success") {
      toast.success("Course Purchased Successfully", { id: toastId });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey?.includes("courses/me"),
      });
    } else toast.error("Failed to purchase course", { id: toastId });
  };

  // handle continue course function
  const handleContinueCourse = () => {
    navigate(`/course/lecture/${courseId}`);
  };

  if (isLoading) return <Skeleton className="w-full h-10 bg-royal-blue/30" />;
  if (isPurchased) return <Button onClick={handleContinueCourse}>Continue To Course</Button>;
  return <Button onClick={handleBuyCourse}>Buy Course</Button>;
}
