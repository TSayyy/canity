import { z } from "zod";

import { wishlistResponseSchema } from "@/schemas/wishlistSchema";

import { useGetData } from "./useApi";

type WishlistResponseType = z.infer<typeof wishlistResponseSchema>;

export function useWishlist() {
  const { data: response, isLoading } = useGetData("courses/wishlist");
  const { wishlist: wishListObject }: { wishlist: WishlistResponseType } = response?.data || {};
  const { courses: wishlist } = wishListObject || {};
  const wishlistIds = wishlist?.map((course) => course.courseId);

  return { wishlist, wishlistIds, isLoading };
}
