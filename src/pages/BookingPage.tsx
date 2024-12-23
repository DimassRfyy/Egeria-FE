import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookingFormData } from "../types/type";
import { z } from "zod";

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    post_code: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    const cartData = localStorage.getItem("cart");

    if (!cartData || JSON.parse(cartData).length === 0) {
      navigate("/");
      return;
    }

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate]);

  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col gap-5 bg-[#F6F6F8] pb-[20px]">
      <section id="NavTop">
        <div className="px-5">
          <div className="mt-5 flex w-full flex-col gap-5 rounded-3xl bg-white pb-[44px] pt-3">
            <div className="relative">
              <Link to="/cart">
                <div className="absolute left-3 top-1/2 flex size-[44px] shrink-0 -translate-y-1/2 items-center justify-center rounded-full border border-cosmetics-greylight">
                  <img src="/assets/images/icons/left.svg" alt="icon" className="size-5 shrink-0" />
                </div>
              </Link>
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-center text-lg font-bold leading-[27px]">Booking</h1>
                <p className="text-center text-sm leading-[21px] text-cosmetics-grey">We’ll give best treat</p>
              </div>
            </div>
            <div id="ProgressBar" className="relative px-5">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="relative z-10 flex h-[25px] items-center">
                    <div className="h-2 w-[60px] rounded-full bg-cosmetics-purple" />
                    <div className="absolute right-0 top-0 translate-x-1/2">
                      <div className="flex flex-col items-center gap-[6px]">
                        <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-cosmetics-purple text-xs font-bold leading-[18px] text-white">1</div>
                        <p className="text-xs font-semibold leading-[18px]">Booking</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[25px] w-full items-center">
                  <div className="left-0 h-2 w-1/2 rounded-full bg-[#EDEDF5]" />
                  <div className="absolute right-1/2 top-0 translate-x-1/2">
                    <div className="flex flex-col items-center gap-[6px]">
                      <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#D8D8E4] text-xs font-bold leading-[18px]">2</div>
                      <p className="text-xs font-semibold leading-[18px]">Payment</p>
                    </div>
                  </div>
                  <div className="right-0 h-2 w-1/2 rounded-full bg-[#EDEDF5]" />
                </div>
                <div className="relative z-10 flex h-[25px] w-[60px] items-center">
                  <div className="absolute left-0 top-0 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-[6px]">
                      <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#D8D8E4] text-xs font-bold leading-[18px]">3</div>
                      <p className="text-xs font-semibold leading-[18px]">Delivery</p>
                    </div>
                  </div>
                  <div className="h-2 w-[60px] rounded-full bg-[#EDEDF5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header>
        <div className="flex flex-col gap-1 px-5">
          <h2 className="text-[26px] font-bold leading-[39px]">Start Booking</h2>
          <p className="text-cosmetics-grey">Data asli harus diberikan amet</p>
        </div>
      </header>
      <div>
        <form action="payment.html" className="flex flex-col gap-5 px-5">
          <section id="Informations">
            <div className="flex flex-col gap-5 rounded-3xl bg-white px-[14px] py-5">
              <div className="flex items-center gap-[10px]">
                <img src="/assets/images/icons/information.svg" alt="icon" className="size-[38px] shrink-0" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-[#030504]">Informations</h3>
                  <p className="text-sm leading-[21px] text-[#43484C]">Input correct lorem data</p>
                </div>
              </div>
              <div className="box h-[1px] w-full" />
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">Full Name</h4>
                <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                    <img src="/assets/images/icons/profil.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">Phone</h4>
                <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <input
                    type="tel"
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                    placeholder="Enter your phone"
                  />
                  <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                    <img src="/assets/images/icons/phone.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">Email Address</h4>
                <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <input
                    type="email"
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                    placeholder="Write your complete email"
                  />
                  <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                    <img src="/assets/images/icons/mail.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
            </div>
          </section>
          <section id="ShippingTo">
            <div className="flex flex-col gap-5 rounded-3xl bg-white px-[14px] py-5">
              <div className="flex items-center gap-[10px]">
                <img src="/assets/images/icons/shippingto.svg" alt="icon" className="size-[38px] shrink-0" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-[#030504]">Shipping to</h3>
                  <p className="text-sm leading-[21px] text-[#43484C]">Input correct lorem data</p>
                </div>
              </div>
              <div className="box h-[1px] w-full" />
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">City</h4>
                <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                    placeholder="Enter your city"
                  />
                  <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                    <img src="/assets/images/icons/city.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">Address</h4>
                <div className="group relative flex h-[130px] items-center justify-center rounded-3xl bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <textarea
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] resize-none rounded-3xl bg-[#F6F6F8] pl-[57px] pr-[13px] pt-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:rounded-[22px] focus:outline-none"
                    placeholder="Write your complete address"
                    defaultValue={""}
                  />
                  <div className="absolute left-[14px] top-[13px] flex w-[35px] justify-between">
                    <img src="/assets/images/icons/apartment.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
              <label className="flex flex-col gap-[6px]">
                <h4 className="font-semibold text-[#030504]">Post Code</h4>
                <div className="group relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC] transition-all duration-300 focus-within:bg-cosmetics-gradient-purple-pink">
                  <input
                    type="tel"
                    name=""
                    id=""
                    className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] transition-all duration-300 placeholder:font-normal placeholder:leading-[24px] placeholder:text-[#ACACB9] focus:h-[calc(100%_-_4px)] focus:w-[calc(100%_-_4px)] focus:outline-none"
                    placeholder="Write your post code"
                  />
                  <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                    <img src="/assets/images/icons/location.svg" alt="icon" className="size-[24px] shrink-0" />
                    <span className="h-[26px] w-px bg-[#E0E0EC] transition-all duration-300 group-focus-within:bg-cosmetics-gradient-purple-pink" />
                  </div>
                </div>
                <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p>
              </label>
            </div>
          </section>
          <button type="submit" className="mt-[10px] flex w-full items-center justify-between rounded-full bg-cosmetics-gradient-pink-white px-5 py-[14px] transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
            <strong className="font-semibold text-white">Continue to Payment</strong>
            <img src="/assets/images/icons/right.svg" alt="icon" className="size-[24px] shrink-0" />
          </button>
        </form>
      </div>
    </main>
  );
}
