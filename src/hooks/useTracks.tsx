import { z } from "zod";

import { trackSchema } from "@/schemas/trackSchema";

import { useGetData } from "./useApi";

export function useTracks() {
  const { data: response } = useGetData("/nav");
  const { tracks }: { tracks: z.infer<typeof trackSchema>[] } = response?.data || {};

  return tracks;
}
