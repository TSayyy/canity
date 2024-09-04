import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { getRequest, usePatchData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { SocialMediaSchema } from "@/schemas/mentorSchema";
import { studentBasicInfoFormSchema, studentSchema } from "@/schemas/studentSchema";

import { ContactsForm } from "./components/ContactsFrom";
import { PasswordForm } from "./components/PasswordForm";
import { StudentBasicInfo } from "./components/StudentBasicInfo";

export type TStudentEditProfileForm = z.infer<typeof studentBasicInfoFormSchema> &
  z.infer<typeof changePasswordSchema> &
  z.infer<typeof SocialMediaSchema>;

export function StudentEditProfile() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editForm = useForm<TStudentEditProfileForm>({
    resolver: zodResolver(studentBasicInfoFormSchema.extend(SocialMediaSchema.shape).and(changePasswordSchema)),
    defaultValues: async () => {
      const { data: response } = (await getRequest("/students/profile")) as AxiosResponse;
      const { student }: { student: z.infer<typeof studentSchema> } = response?.data || {};
      if (student) {
        setStudentId(student?.id);
      }
      return {
        name: student?.user?.name,
        email: student?.user?.email,
        phoneNumber: student?.user.phoneNumber || "",
        country: student?.user?.country || "",
        city: student?.user?.city || "",
        education: student?.education || "",
        graduationYear: student?.graduationYear || undefined,
        facebook: student?.facebook || "",
        linkedIn: student?.linkedIn || "",
        github: student?.gitHub || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        image: student?.user?.image || "",
        dob: student?.user?.dob || undefined,
        bio: student?.user?.bio || "",
      };
    },
  });

  const updateStudent = usePatchData(`students/${studentId}`);
  const updatePassword = usePatchData(`users/updatepassword`);
  const updateImage = usePatchData(`users/upload/image`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  async function handleSubmit(formData: TStudentEditProfileForm) {
    const toastId = toast.loading("Updating profile...");
    const { oldPassword, newPassword, confirmPassword, image, ...rest } = formData;
    const updateData = { ...rest };
    // Check if password fields are not empty
    if (oldPassword && newPassword && confirmPassword) {
      const passwordData = {
        oldPassword,
        newPassword,
        confirmPassword,
      };
      const passwordResponse = await updatePassword.mutateAsync(passwordData);
      if (passwordResponse?.status === "failed") {
        toast.error(passwordResponse?.data?.errors[0].msg);
      }
    }
    // Check if image is updated
    if (editForm.formState.dirtyFields.image) {
      const file = new FormData();
      file.append("image", image);
      const imageResponse = await updateImage.mutateAsync(file);
      if (imageResponse?.status === "failed") {
        toast.error(imageResponse?.data?.errors[0].msg);
      }
    }
    // Update profile if any other field is updated
    if (editForm.formState.dirtyFields) {
      const response = await updateStudent.mutateAsync(updateData);
      if (response?.status === "failed") {
        toast.error(response?.data?.errors[0].msg, { id: toastId });
        return;
      }
    }
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey.includes("/nav"),
    });
    toast.success("Profile updated successfully", { id: toastId });
  }

  if (editForm.formState.isLoading) return <LoadingPage />;
  return (
    <main className=" container py-10">
      <header className="mb-5">
        <h1 className="text-3xl font-semibold">Edit Profile</h1>
      </header>
      <main>
        <Form {...editForm}>
          <form className="grid lg:grid-cols-[250px_1fr] gap-10" onSubmit={editForm.handleSubmit(handleSubmit)}>
            <aside className="flex flex-col items-center gap-2 mb-10 ">
              <FormField
                control={editForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader className="w-40 h-40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h1 className="font-semibold text-2xl">{editForm.formState.defaultValues?.name}</h1>
              <p className="text-zinc-400">{editForm.formState.defaultValues?.email}</p>
            </aside>
            <section className=" space-y-10">
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Basic Information</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <StudentBasicInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Password</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <PasswordForm form={editForm} formType={{} as TStudentEditProfileForm} />
              </div>

              <div>
                <header>
                  <h1 className="text-xl font-semibold">Contacts</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <ContactsForm form={editForm} formType={{} as TStudentEditProfileForm} />
              </div>
              <footer className="flex items-center justify-end gap-2">
                <Button
                  type="reset"
                  variant={"ghost"}
                  className="text-royal-blue hover:text-royal-blue/80"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </footer>
            </section>
          </form>
        </Form>
      </main>
    </main>
  );
}
