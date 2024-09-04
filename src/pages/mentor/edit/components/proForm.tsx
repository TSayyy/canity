// import { zodResolver } from "@hookform/resolvers/zod";
// import { KeyboardEvent, useState } from "react";
// import { useForm } from "react-hook-form";
// import { IoMdRemoveCircle } from "react-icons/io";
// import { v4 as uuid } from "uuid";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { ProSectionSchema } from "@/schemas/mentorSchema";

export const ProForm = () => {
  // const form = useForm<z.infer<typeof ProSectionSchema>>({
  //   resolver: zodResolver(ProSectionSchema),
  //   defaultValues: {
  //     workExp: "I have worked as a front end developer for 5 years",
  //     education: "I have a degree in computer science",
  //     experience: "I have worked with many companies and have a lot of experience",
  //     location: "New York",
  //   },
  // });
  // const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);
  // const { isSubmitting } = form.formState;

  // const handleFormSubmit = (values: z.infer<typeof ProSectionSchema>) => {
  //   console.log(values);
  //   console.log(languages);
  // };

  // const handleAddLanguage = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (e.currentTarget.value) {
  //       const lang = e.currentTarget.value.trim();
  //       setLanguages((prev) => [...prev, lang]);
  //       e.currentTarget.value = "";
  //     }
  //   }
  // };

  // const handleRemoveLanguage = (lang: string) => setLanguages((prev) => prev.filter((l) => l !== lang));
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex gap-4 shadow-lg">
      {/* <div className="flex-grow">
        <h2 className="font-semibold text-lg">Professional Data</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="space-y-2 w-full">
              <FormField
                control={form.control}
                name="workExp"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">Work Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. I have worked as a front end developer for 5 years"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">Education</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. I have a degree in computer science"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. I have worked with many companies and have a lot of experience"
                      />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-1">
                <FormLabel className="ps-3">Languages</FormLabel>
                <Input
                  id=":rf:-form-item"
                  disabled={isSubmitting}
                  placeholder="e.g. English"
                  type="text"
                  onKeyDown={handleAddLanguage}
                />
              </FormItem>
              {languages && languages.length > 0 && (
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2 ps-3">
                    {languages.map((lang) => (
                      <div key={uuid()} className="bg-gray-300 px-2 py-1 rounded-lg space-x-2 flex items-center">
                        <span>{lang}</span>
                        <span
                          className="cursor-pointer"
                          title="Remove language"
                          onClick={() => handleRemoveLanguage(lang)}
                        >
                          <IoMdRemoveCircle />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="ps-3">Location</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} placeholder="e.g. New York" type="text" />
                    </FormControl>
                    <FormMessage className="ps-3 text-xs" />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Loading..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div> */}
    </div>
  );
};
