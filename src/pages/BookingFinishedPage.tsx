import { Link, useLocation } from "react-router-dom";

export default function BookingFinishedPage() {

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const trxId = queryParams.get("trx_id");
const email = queryParams.get("email");

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[640px] flex-col gap-5 bg-[#F6F6F8] pb-[48px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img src="/assets/images/backgorunds/purple.png" alt="image" className="h-[522px] w-full object-cover object-bottom" />
      </div>
      <section id="NavTop" className="px-5">
        <div className="relative mt-5 flex w-full flex-col gap-5 rounded-3xl bg-white pb-[44px] pt-3">
          <div className="flex flex-col gap-[2px]">
            <h1 className="text-center text-lg font-bold leading-[27px]">Order Finished</h1>
            <p className="text-center text-sm leading-[21px] text-cosmetics-grey">We’ll give best treat</p>
          </div>
          <div id="ProgressBar" className="relative px-[12px]">
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
                <div className="left-0 h-2 w-1/2 rounded-full bg-cosmetics-purple" />
                <div className="absolute right-1/2 top-0 translate-x-1/2">
                  <div className="flex flex-col items-center gap-[6px]">
                    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-cosmetics-purple text-xs font-bold leading-[18px] text-white">2</div>
                    <p className="text-xs font-semibold leading-[18px]">Payment</p>
                  </div>
                </div>
                <div className="right-0 h-2 w-1/2 rounded-full bg-cosmetics-purple" />
              </div>
              <div className="relative z-10 flex h-[25px] w-[60px] items-center">
                <div className="h-2 w-[60px] rounded-full bg-cosmetics-purple" />
                <div className="absolute left-0 top-0 -translate-x-1/2">
                  <div className="flex flex-col items-center gap-[6px]">
                    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-cosmetics-purple text-xs font-bold leading-[18px] text-white">3</div>
                    <p className="text-xs font-semibold leading-[18px]">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header className="relative flex flex-col gap-4 px-5">
        <img src="/assets/images/icons/car-white.svg" alt="icon" className="size-[70px] shrink-0" />
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-[26px] font-bold leading-[39px] text-white">Order Finished</h2>
          <p className="text-white">Use the information below so you can see the order status</p>
        </div>
      </header>
      <section id="Information" className="relative px-5">
        <div className="flex w-full flex-col gap-5 rounded-3xl bg-white px-[14px] py-5">
          <label className="flex flex-col gap-[6px]">
            <h4 className="font-semibold text-[#030504]">TRX ID</h4>
            <div>
              <div className="relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC]">
                <input
                  defaultValue={trxId ? trxId : "undifined"}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] focus:outline-none"
                />
                <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                  <img src="/assets/images/icons/booking-trx-id.svg" alt="icon" className="size-[24px] shrink-0" />
                  <span className="h-[26px] w-px bg-[#E0E0EC]" />
                </div>
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-[6px]">
            <h4 className="font-semibold text-[#030504]">Email Address</h4>
            <div>
              <div className="relative flex h-[54px] items-center justify-center rounded-full bg-[#E0E0EC]">
                <input
                  defaultValue={email ? email : "undifined"}
                  readOnly
                  type="text"
                  name=""
                  id=""
                  className="absolute h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] rounded-full bg-[#F6F6F8] pl-[57px] pr-[13px] font-semibold text-[#030504] focus:outline-none"
                />
                <div className="absolute left-[14px] top-1/2 flex w-[35px] -translate-y-1/2 justify-between">
                  <img src="/assets/images/icons/mail.svg" alt="icon" className="size-[24px] shrink-0" />
                  <span className="h-[26px] w-px bg-[#E0E0EC]" />
                </div>
              </div>
            </div>
          </label>
        </div>
      </section>
      <section id="BookingButton" className="mt-[10px] flex flex-col gap-[14px] px-5">
        <Link to={`/`} className="flex w-full justify-center rounded-full bg-cosmetics-gradient-pink-white py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
          Order Again
        </Link>
        <Link to={'/check-booking'} className="flex w-full justify-center rounded-full bg-[#0C0422] py-[14px] font-semibold text-white transition-all duration-300">
          Check My Transaction
        </Link>
      </section>
    </main>
  );
}
