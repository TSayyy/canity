// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SocialMediaSchema } from "@/schemas/mentorSchema";

export const SocialMediaForm = () => {
  //   const form = useForm<z.infer<typeof SocialMediaSchema>>({
  //     resolver: zodResolver(SocialMediaSchema),
  //     defaultValues: {
  //       email: "example@mail.com",
  //       linkedIn: "https://www.linkedin.com/in/example",
  //       gitHub: "https://www.github.com/example",
  //       x: "https://www.x.com/example",
  //     },
  //   });
  //   const { isSubmitting } = form.formState;

  //   const handleFormSubmit = (values: z.infer<typeof SocialMediaSchema>) => {
  //     console.log(values);
  //   };
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex gap-4 shadow-lg">
      {/* <div className="flex-grow">
        <h2 className="font-semibold text-lg">Social Media</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="space-y-2 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} placeholder="e.g. example@mail.com" type="email" />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. https://www.linkedin.com/in/example"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gitHub"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">GitHub</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. https://www.github.com/example"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="x"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">X</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. https://www.x.com/example"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div> */}
    </div>
  );
};
