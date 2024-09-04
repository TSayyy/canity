import { zodResolver } from "@hookform/resolvers/zod";
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
import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema, mentorSchema } from "@/schemas/mentorSchema";

import { ContactsForm } from "./components/ContactsFrom";
import { MentorBasicInfo } from "./components/MentorBasicInfo";
import { MentorEducationInfo } from "./components/MentorEducationInfo";
import { PasswordForm } from "./components/PasswordForm";

const MentorEditFormSchema = BasicInfoFormSchema.extend(
  ProSectionSchema.omit({ trackName: true, pricePerHour: true }).shape
)
  .extend(SocialMediaSchema.shape)
  .and(changePasswordSchema);

export type TMentorEditProfileForm = z.infer<typeof MentorEditFormSchema>;

export function MentorEditProfile() {
  const [mentorId, setMentorId] = useState<string | null>(null);
  const navigate = useNavigate();
  const editForm = useForm<TMentorEditProfileForm>({
    resolver: zodResolver(MentorEditFormSchema),
    defaultValues: async () => {
      const { data: response } = (await getRequest("/mentors/profile")) as AxiosResponse;
      const { mentor }: { mentor: z.infer<typeof mentorSchema> } = response || {};
      if (mentor) {
        setMentorId(mentor?.id);
      }
      return {
        name: mentor?.user?.name,
        email: mentor?.user?.email,
        phoneNumber: mentor?.user.phoneNumber || "",
        country: mentor?.user?.country || "",
        title: mentor?.title || "",
        city: mentor?.user?.city || "",
        languages: mentor?.languages || [],
        education: mentor?.education || "",
        workExp: mentor?.workExperience || "",
        experience: mentor?.experience || "",
        facebook: mentor?.facebook || "",
        linkedIn: mentor?.linkedIn || "",
        github: mentor?.gitHub || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        image: mentor?.user?.image || "",
        dob: mentor?.user?.dob || new Date(),
        about: mentor?.about || "",
        resume: mentor?.resume || undefined,
      };
    },
  });

  const updateStudent = usePatchData(`mentors/${mentorId}`);
  const updatePassword = usePatchData(`users/updatepassword`);
  const updateImage = usePatchData(`users/upload/image`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const updateCv = usePatchData(`mentors/upload/cv`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  async function handleSubmit(formData: TMentorEditProfileForm) {
    const toastId = toast.loading("Updating profile...");
    const { oldPassword, newPassword, confirmPassword, image, resume, ...rest } = formData;
    const updateData = { ...rest };
    // Update password if oldPassword, newPassword and confirmPassword are provided
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
    // Update image if new image is provided
    if (editForm.formState.dirtyFields.image) {
      const file = new FormData();
      file.append("image", image);
      const imageResponse = await updateImage.mutateAsync(file);
      if (imageResponse?.status === "failed") {
        toast.error(imageResponse?.data?.errors[0].msg);
      }
    }
    // Update resume if new resume is provided
    if (editForm.formState.dirtyFields.resume) {
      const file = new FormData();
      file.append("cv", resume);
      const imageResponse = await updateCv.mutateAsync(file);
      if (imageResponse?.status === "failed") {
        toast.error(imageResponse?.data?.errors[0].msg, { id: toastId });
      }
    }
    // Update profile if any other field is updated
    if (editForm.formState.dirtyFields) {
      const response = await updateStudent.mutateAsync({
        ...updateData,
        workExperience: updateData.workExp,
      });
      if (response?.status === "failed") {
        toast.error(response?.data?.errors[0].msg, { id: toastId });
        return;
      }
    }

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
                <MentorBasicInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Password</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <PasswordForm form={editForm} formType={{} as TMentorEditProfileForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Education</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <MentorEducationInfo form={editForm} />
              </div>
              <div>
                <header>
                  <h1 className="text-xl font-semibold">Contacts</h1>
                  <hr className="my-2 bg-zinc-300" />
                </header>
                <ContactsForm form={editForm} formType={{} as TMentorEditProfileForm} />
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
