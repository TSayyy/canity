import { List } from "react-content-loader";
import { z } from "zod";

import TrackCard from "@/components/ui/TrackCard";
import { trackSchema } from "@/schemas/trackSchema";

export default function TrackSection({ tracks }: { tracks: z.infer<typeof trackSchema>[] }) {
  if (!tracks)
    return (
      <div className="flex justify-center items-center py-20">
        <List title="Tracks" viewBox="-80 0 400 110" height={"15rem"} />
      </div>
    );
  return (
    <section className="container py-20 flex justify-center items-center text-center">
      <main className="flex flex-col gap-6 max-w-screen-xl">
        <h1 className="text-4xl text-dark-navy text-balance  font-semibold ">Start your journey with your track</h1>
        <p className="text-neutral-gray text-balance leading-6 ">
          Lorem ipsum dolor sit amet. Sit facere dignissimos et rerum ducimus non nihil consequatur est sapiente illo in
          ipsum repellendus et dolores velit. Vel Quis velit et fuga nostrum ut ipsum beatae ea tenetur soluta et illum
          ducimus! Id sint galisum et corrupti obcaecati qui quisquam quam hic sint aliquam nam Quis porro qui velit
          soluta et eius natus.
        </p>
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center ">
          {tracks.map((track) => (
            <TrackCard key={track.id} {...track} />
          ))}
        </div>
      </main>
    </section>
  );
}
