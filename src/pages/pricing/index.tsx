import { useNavigate } from "react-router-dom";

import faqImage from "@/assets/faq.png";
import { PageHeader } from "@/components/ui/PageHeader";
import { Spinner } from "@/components/ui/Spinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";

import headerImage from "../../assets/pricingHeaderImage.jpg";
import { PricingCard } from "../../components/ui/PricingCard";
import AccordionSkelton from "./AccordionSkelton";

const PLAN = {
  name: "Upgrade to Plus",
  description:
    "Lorem ipsum dolor sit amet. Qui autem modi et nobis dicta vel impedit dolore sed esse ratione quo distinctio totam.",
  price: 25,
  features: [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit Qui autem modi et nobis dicta vel impedi .",
    "Qui autem modi et nobis dicta vel impedi",
    "Qui autem modi et nobis dicta vel impedi",
    "Qui autem modi et nobis dicta vel impedi",
  ],
};

const FAQS = [
  {
    question: "What features does the web have?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How can a mentor help me achieve my academic goals?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "How often will I meet or communicate with my mentor?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What qualifications and experience do your mentors have?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "What if I am not satisfied with the mentorship experience?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

type Plan = {
  name: string;
  description: string;
  price: number;
  features: string[];
};
type Faq = {
  question: string;
  answer: string;
};

export function Pricing() {
  const navigate = useNavigate();

  // fetch Data
  const { data: response } = useGetData(`/pricing`);
  const { data, status } = response || {};
  const { plan, faqs }: { plan: Plan; faqs: Faq[] } = { plan: PLAN, faqs: FAQS } || data || {};

  if (status === "failed" && !PLAN) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 ">
        <h1 className="text-3xl font-semibold ">Something went wrong</h1>
        <p className="text-xl text-dark-navy font-semibold"> please try again</p>
        <Button className="max-w-48 w-48 text-base mt-5" type="button" onClick={() => navigate("/")}>
          Try again
        </Button>
      </div>
    );
  }
  return (
    <>
      <PageHeader
        title="Pricing"
        description="Our pricing is designed to provide you with the flexibility to choose the plan"
        image={headerImage}
      />
      <main className="container text-dark-navy py-10">
        <section>
          <h1 className="text-3xl sm:text-[40px] text-balance leading-tight text-center font-semibold">
            Choose your suitable plan
          </h1>
          <main className=" flex flex-wrap gap-10 justify-center my-10 ">
            {plan ? <PricingCard {...plan} /> : <Spinner className=" stroke-zinc-500 w-44 h-44" />}
          </main>
        </section>
        <section className="flex flex-col gap-2 pt-10">
          <h1 className="text-3xl sm:text-[40px] leading-tight text-center font-semibold">Frequently asked question</h1>
          <p className="text-neutral-gray text-balance text-center">Here are some common questions about Coursanity</p>
          <main className="py-10 grid lg:grid-cols-2 gap-10 lg:gap-0">
            <aside>
              {faqs ? (
                <Accordion type="single" collapsible defaultValue={FAQS[0].question}>
                  {faqs.map((faq, index) => (
                    <AccordionItem value={faq.question} key={index} className="hover:no-underline ">
                      <AccordionTrigger className=" text-xl text-left gap-4 font-semibold hover:no-underline [&[data-state=open]]:text-royal-blue">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-gray text-balance text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <AccordionSkelton />
              )}
            </aside>
            <aside className="flex justify-center items-start">
              <img src={faqImage} alt="faq image" loading="lazy" className="w-96 -scale-x-100" />
            </aside>
          </main>
        </section>
      </main>
    </>
  );
}
