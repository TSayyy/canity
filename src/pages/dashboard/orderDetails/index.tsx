import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

import RoundedCheckbox from "@/components/ui/RoundedCheckbox";
import { Button } from "@/components/ui/button";
import { globalResponseFormat, patchRequest, useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { orderSchema } from "@/schemas/orderSchema";
import { formatCurrency } from "@/utils/helpers";

import { OrderField } from "./components/OrderField";
import { OrderImageField } from "./components/OrderImageField";

const Statuses = ["Pending", "Accepted", "Rejected"];
const PAGE_SIZE = 10;

type OrderType = z.infer<typeof orderSchema>;
export function OrderDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { orderId } = useParams();
  const [selectedStatuses, setSelectedStatuses] = useState<string | undefined>();

  const page = searchParams.get("page") || 1;
  // fetch Orders
  const { data: response, isLoading } = useGetData(`/applications?page=${page}&size=${PAGE_SIZE}`);
  const { data } = response || {};
  const { applications } = data || {};
  const currentOrder: OrderType = applications?.find((order: OrderType) => order.id === orderId);

  const handleStatusChange = (value: string) => {
    setSelectedStatuses(value);
  };

  const handleSubmit = async () => {
    if (!selectedStatuses || selectedStatuses.toLocaleLowerCase() === currentOrder.status) {
      toast.error("Please select a different status");
      return;
    }
    const toastId = toast.loading("Updating status...");
    const requestBody = { status: selectedStatuses.toLocaleLowerCase() };
    const res = await patchRequest(`/applications/${currentOrder.id}`, requestBody);
    const { status } = globalResponseFormat(res);
    if (status === "failed") {
      toast.error("Failed to update status", { id: toastId });
      return;
    }
    toast.success(`Application has been ${selectedStatuses} successfully`, { id: toastId });
    navigate("/dashboard/orders-list");
  };

  if (isLoading) return <LoadingPage />;
  if (!currentOrder) return <Navigate to="/dashboard/orders-list" />;
  return (
    <main className=" container py-5 shadow-custom rounded-xl space-y-5 ">
      <header className=" mb-5">
        <h1 className=" text-2xl font-semibold mb-2">Mentor Form</h1>
        <hr className=" border-[1px] border-zinc-300" />
      </header>
      <section className=" space-y-3">
        <header className=" flex justify-between flex-wrap items-center ">
          <h2 className="text-lg font-semibold">Basic information</h2>
          <OrderImageField className=" grow-0 " image={currentOrder?.image} />
        </header>
        <div className="flex flex-col gap-5">
          <div className=" w-full flex flex-wrap gap-5 grow *:grow">
            <OrderField header="Full Name">
              <span>{currentOrder?.name}</span>
            </OrderField>
            <OrderField header="Email">
              <span>{currentOrder?.email}</span>
            </OrderField>
            <OrderField header="Mobile Number">
              <span>{currentOrder?.phoneNumber}</span>
            </OrderField>
          </div>
        </div>
        <div className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          <OrderField header="Date of birth">
            <span>{format(currentOrder?.dob, "dd/MM/yyyy")}</span>
          </OrderField>
          <OrderField header="Country">
            <span>{currentOrder?.country}</span>
          </OrderField>
          <OrderField header="city">
            <span>{currentOrder?.city}</span>
          </OrderField>
          <OrderField header="Languages">
            <span className=" text-wrap">{currentOrder?.language}</span>
          </OrderField>
        </div>
        <OrderField header="About">
          <span className=" text-balance">{currentOrder?.about}</span>
        </OrderField>
      </section>
      <section className=" space-y-3">
        <h2 className="text-lg font-semibold">Education information</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 *:break-words ">
          <OrderField header="Education">
            <span>{currentOrder?.education}</span>
          </OrderField>
          <OrderField header="Work Experience">
            <span>{currentOrder?.workExp}</span>
          </OrderField>
          <OrderField header="Experience in years">
            <span>{currentOrder?.experience} years</span>
          </OrderField>
          <OrderField header="Title">
            <span>{currentOrder?.title}</span>
          </OrderField>
          <OrderField header="Price per hour">
            <span>{formatCurrency(currentOrder?.pricePerHour)}</span>
          </OrderField>
          <OrderField header="CV/Resume">
            <a
              onClick={(e) => e.stopPropagation()}
              href={currentOrder?.resume}
              target="_blank"
              rel="noreferrer"
              className="w-fit max-w-xl text-royal-blue  hover:underline underline-offset-2"
            >
              Resume.pdf
            </a>
          </OrderField>
        </div>
      </section>
      <section className=" space-y-3">
        <h2 className="text-lg font-semibold">Social information</h2>
        <div className=" grid  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-5 *:break-words ">
          <OrderField header="FaceBook">
            <span>{currentOrder?.facebook}</span>
          </OrderField>
          <OrderField header="Linkedin">
            <span>{currentOrder?.linkedIn}</span>
          </OrderField>
          <OrderField header="Github">
            <span>{currentOrder?.github}</span>
          </OrderField>
        </div>
      </section>
      <footer className="flex flex-col justify-between gap-3 items-center">
        <div className="flex flex-wrap place-self-start  gap-2 md:gap-5">
          {Statuses.map((status) => (
            <RoundedCheckbox
              key={status}
              label={status}
              checked={
                selectedStatuses ? selectedStatuses === status : currentOrder?.status === status.toLocaleLowerCase()
              }
              onChange={handleStatusChange}
              value={status}
            />
          ))}
        </div>
        <Button onClick={handleSubmit} className=" place-self-end px-8">
          submit
        </Button>
      </footer>
    </main>
  );
}
