import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { checkBookingSchema } from "../types/validation";
import apiClient from "../services/apiServices";
import { isAxiosError } from "axios";

export default function MyOrdersPage() {
  const [formData, setFormData] = useState({
    trx_id: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = checkBookingSchema.safeParse(formData);
    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }
    setLoading(true);
    setFormErrors([]);

    try {
      const response = await apiClient.post("/check-booking", formData);

      if (response.status === 200 && response.data.data) {
        navigate("/my-booking", { state: { bookingDetails: response.data.data, notFound: false } });
      } else {
        navigate("/my-booking", { state: { bookingDetails: null, notFound: true } });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          navigate("/my-booking", { state: { bookingDetails: null, notFound: true } });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="min-h-screen flex justify-center items-center">Loading...</p>;
  }

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[640px] flex-col gap-5 bg-[#F6F6F8] pb-[162px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img src="/assets/images/backgorunds/cosmetic-equipment.png" alt="image" className="h-[421px] w-full object-cover object-bottom" />
      </div>
      <div className="mt-[155px] flex flex-col gap-[30px] px-5">
        <header className="relative flex flex-col gap-1">
          <img src="/assets/images/icons/car-black.svg" alt="icon" className="mx-auto size-[70px] shrink-0" />
          <h1 className="text-center text-[26px] font-bold leading-[39px]">Track Your Orders</h1>
          <p className="text-center">Use the information below so you can see the order status</p>
        </header>
        <form id="Information" className="relative" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-5 rounded-3xl bg-white px-[14px] py-5">
            <label className="flex flex-col gap-[6px]">
              <h4 className="font-semibold text-[#030504]">TRX ID</h4>
              <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                <input
                  type="text"
                  name="trx_id"
                  onChange={handleChange}
                  value={formData.trx_id}
                  id=""
                  className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                  placeholder="Enter your Booking ID"
                />
                <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                  <img src="/assets/images/icons/booking-trx-id.svg" alt="icon" className="size-[24px] shrink-0" />
                  <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                </div>
              </div>
              {formErrors.find((error) => error.path.includes("trx_id")) && <p className="text-sm leading-[21px] text-[#E70011]">{formErrors.find((error) => error.path.includes("trx_id"))?.message}</p>}
            </label>
            <label className="flex flex-col gap-[6px]">
              <h4 className="font-semibold text-[#030504]">Email Address</h4>
              <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  id=""
                  className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                  placeholder="Write your complete email"
                />
                <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                  <img src="/assets/images/icons/mail.svg" alt="icon" className="size-[24px] shrink-0" />
                  <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                </div>
              </div>
              {formErrors.find((error) => error.path.includes("email")) && <p className="text-sm leading-[21px] text-[#E70011]">{formErrors.find((error) => error.path.includes("email"))?.message}</p>}
            </label>
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-full bg-cosmetics-gradient-pink-white py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
              {loading ? "Checking..." : "Check My Order"}
            </button>
          </div>
        </form>
      </div>
      <BottomNav />
    </main>
  );
}
