import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookingDetails } from "../types/type";
import { useEffect, useState } from "react";

interface LocationState {
  bookingDetails: BookingDetails | null;
  notFound: boolean;
}

export default function MyBookingDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const { bookingDetails, notFound } = (location.state as LocationState) || {};

  useEffect(() => {
    if (!bookingDetails && !notFound) {
      navigate("/");
    }
  }, [bookingDetails, notFound, navigate]);

  if (!bookingDetails && !notFound) {
    return null;
  }
  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;
  return (
    <main className="mx-auto flex flex-col min-h-screen max-w-[640px] bg-[#F6F6F8]">
      <section id="NavTop">
        <div className="relative mt-5 px-5">
          <div className="flex w-full items-center justify-between rounded-3xl bg-white px-3 py-3">
            <Link to={`/check-booking`}>
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-cosmetics-greylight">
                <img src="/assets/images/icons/left.svg" alt="icon" className="size-5 shrink-0" />
              </div>
            </Link>
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-center text-lg font-bold leading-[27px]">My Order Details</h1>
              <p className="text-center text-sm leading-[21px] text-cosmetics-grey">We’ll give you the best one</p>
            </div>
            <a href="">
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-cosmetics-greylight">
                <img src="/assets/images/icons/folder.svg" alt="icon" className="size-5 shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </section>
      {notFound ? (
        <section id="NotFound" className="px-5 my-auto">
          <div className="flex flex-col items-center gap-[30px]">
            <img src="/assets/images/icons/car-black.svg" alt="icon" className="size-[70px] shrink-0" />
            <div className="flex flex-col gap-1">
              <h2 className="text-center text-[26px] font-bold leading-[39px]">Order Not Found</h2>
              <p className="text-center leading-[26px]">
                Please check the transaction with a different <br /> booking code and email.
              </p>
            </div>
            <Link to={`/check-booking`} className="px-5">
              <div className="w-full rounded-full bg-cosmetics-gradient-pink-white px-5 py-[14px] transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
                <strong className="font-semibold text-white">Find Other Booking</strong>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        bookingDetails && (
          <div className="flex flex-col gap-5 pb-[50px] mt-5">
            <div id="Pending" className="flex flex-col gap-5">
              <section id="ProductPurchased" className="px-5">
                <div className="flex flex-col gap-5 rounded-3xl bg-white px-5 py-[30px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <img src="/assets/images/icons/guarantee.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">Product Purchased</h2>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">You purchased the following product</p>
                      </div>
                    </div>
                    <button onClick={toggleOpen} type="button" data-expand="ProductPurchasedPendingJ" className="shrink-0">
                      <img src="/assets/images/icons/bottom.svg" alt="icon" className={`${isOpen ? "-rotate-180" : ""} size-6 shrink-0`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div id="ProductPurchasedPendingJ" className="flex flex-col gap-5">
                      <div className="box h-[1px] w-full" />
                      {bookingDetails.transaction_details.map((detail) => (
                        <div key={detail.id} className="flex h-[143px] items-center justify-center rounded-3xl bg-cosmetics-greylight p-px transition-all duration-300 hover:bg-cosmetics-gradient-purple-pink hover:p-[2px]">
                          <div className="flex h-full w-full flex-col justify-center gap-[12px] rounded-[23px] bg-white px-4 transition-all duration-300 hover:rounded-[22px]">
                            <div className="flex items-center gap-4">
                              <div className="flex size-[60px] shrink-0 items-center justify-center">
                                <img src={`${BASE_URL}/${detail.cosmetic.thumbnail}`} alt="" className="h-full w-full object-contain" />
                              </div>
                              <div className="flex flex-col gap-[6px]">
                                <h4 className="text-xs leading-[18px] text-cosmetics-purple">{detail.cosmetic.brand.name.toLocaleUpperCase()}</h4>
                                <h3 className="line-clamp-2 h-[42px] w-full text-sm font-semibold leading-[21px]">{detail.cosmetic.name}</h3>
                              </div>
                            </div>
                            <div className="flex w-full items-center justify-between">
                              <strong className="text-sm font-semibold leading-[21px] text-cosmetics-pink">
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(detail.cosmetic.price)}
                              </strong>
                              <div className="rounded-full bg-[#F6F6F8] px-[12px] py-[6px]">
                                <p className="text-sm font-semibold leading-[21px]">{detail.quantity} qty</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
              <section id="PaymentDetails" className="px-5">
                <div className="flex flex-col gap-5 rounded-3xl bg-white px-5 py-[30px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <img src="/assets/images/icons/information.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">Payment Details</h2>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Details that have been paid</p>
                      </div>
                    </div>
                    <button onClick={toggleOpen} type="button" className="shrink-0" data-expand="PaymentDetailsPendingJ">
                      <img src="/assets/images/icons/bottom.svg" alt="icon" className={`${isOpen ? "-rotate-180" : ""} size-6 shrink-0`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div id="PaymentDetailsPendingJ" className="flex flex-col gap-5">
                      <div className="box h-[1px] w-full" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Status</p>
                        </div>
                        {bookingDetails.is_paid ? (
                          <span className="rounded-full bg-[#099954] px-[10px] py-1 text-xs font-semibold leading-[18px] text-white">SUCCESFUL</span>
                        ) : (
                          <span className="rounded-full bg-[#FF9D2A] px-[10px] py-1 text-xs font-semibold leading-[18px]">PENDING</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Booking ID</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.trx_id}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Total Quantity</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.quantity} Items</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Sub Total</p>
                        </div>
                        <strong className="font-semibold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(bookingDetails.sub_total_amount)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Tax 12%</p>
                        </div>
                        <strong className="font-semibold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(bookingDetails.total_tax_amount)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/list.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Grand Total</p>
                        </div>
                        <strong className="text-[22px] font-bold leading-[33px] text-cosmetics-pink">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(bookingDetails.total_amount)}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              {bookingDetails.is_paid ? (
                <section id="ProgressBar" className="relative flex items-center gap-5 px-5">
                  <div className="progress-bar flex flex-col justify-center">
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#360CAC]" />
                      <div className="h-[105px] w-1 rounded-full bg-[#360CAC]" />
                    </div>
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#360CAC]" />
                      <div className="h-[110px] w-1 rounded-full bg-[#360CAC]" />
                    </div>
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#360CAC]" />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-5">
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/guarantee.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Booking Created</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Transaction was created successfully</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/banktf.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Verifying Payment</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Payment is being verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/shippingto.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Shipping Now</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Order is being delivered</p>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section id="ProgressBar" className="relative flex items-center gap-5 px-5">
                  <div className="progress-bar flex flex-col justify-center">
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#360CAC]" />
                      <div className="h-[105px] w-1 rounded-full bg-[#360CAC]" />
                    </div>
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#360CAC]" />
                      <div className="box2 h-[110px] w-1 rounded-full" />
                    </div>
                    <div className="relative z-10 flex w-4 flex-col items-center">
                      <div className="absolute top-0 size-4 -translate-y-1/2 rounded-full bg-[#E0E0EC]" />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-5">
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/guarantee.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Booking Created</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Transaction was created successfully</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/banktf.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Verifying Payment</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Payment is being verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-3xl bg-white p-5">
                      <img src="/assets/images/icons/shippingto.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">Shipping Now</h3>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Order is being delivered</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <section id="PersonalInformations" className="px-5">
                <div className="flex flex-col gap-5 rounded-3xl bg-white px-5 py-[30px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <img src="/assets/images/icons/information.svg" alt="icon" className="size-[38px] shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">Personal Informations</h2>
                        <p className="text-sm leading-[21px] text-cosmetics-grey">Information and delivery address</p>
                      </div>
                    </div>
                    <button onClick={toggleOpen} type="button" className="shrink-0" data-expand="PersonalInformationsPendingJ">
                      <img src="/assets/images/icons/bottom.svg" alt="icon" className={`${isOpen ? "-rotate-180" : ""} size-6 shrink-0`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div id="PersonalInformationsPendingJ" className="flex flex-col gap-5">
                      <div className="box h-[1px] w-full" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/profil.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Name</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.name}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/phone.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Phone</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.phone}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/mail.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Email</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.email}</strong>
                      </div>
                      <div className="box h-[1px] w-full" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/city.svg" alt="icon" className="size-5 shrink-0" />
                          <p>City</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.city}</strong>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/apartment.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Home Address</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.address}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[6px]">
                          <img src="/assets/images/icons/location.svg" alt="icon" className="size-5 shrink-0" />
                          <p>Post Code</p>
                        </div>
                        <strong className="font-semibold">{bookingDetails.post_code}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              <a href="" className="px-5">
                <div className="flex w-full items-center justify-between rounded-full bg-cosmetics-gradient-pink-white px-5 py-[14px] transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
                  <strong className="font-semibold text-white">Call Service Center</strong>
                  <img src="/assets/images/icons/tel.svg" alt="icon" className="size-[24px] shrink-0" />
                </div>
              </a>
            </div>
          </div>
        )
      )}
    </main>
  );
}
