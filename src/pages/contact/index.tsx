import headerImage from "@/assets/contactHeaderImage.jpg";

import { PageHeader } from "../../components/ui/PageHeader";
import { SocialCard } from "../../components/ui/SocialCard";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <>
      <PageHeader
        image={headerImage}
        title="Contact"
        description="Leave us a message, and we will get back to you within few business day."
      />
      <main className="container py-20 space-y-10">
        <h3 className="text-3xl sm:text-4xl font-semibold text-center sm:text-left text-dark-navy">
          Send us a message
        </h3>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-48 items-start">
          <ContactForm className="grow w-full" />
          <SocialCard
            className="w-full md:w-fit"
            mail="Coursanity@gmail.com"
            facebook="facebook.com/Coursanity"
            twitter="twitter.com/Coursanity"
            linkedin="linkedin.com/Coursanity"
            github="github.com/Coursanity"
          />
        </div>
      </main>
    </>
  );
}
