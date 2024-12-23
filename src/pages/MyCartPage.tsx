import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItem, Cosmetic } from "../types/type";
import apiClient from "../services/apiServices";

export default function MyCartPage() {
  const navigate = useNavigate();

  const [cosmeticDetails, setCosmeticDetails] = useState<Cosmetic[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      const cartItems: CartItem[] = JSON.parse(savedCart);
      setCart(cartItems);

      const fetchCosmeticDetails = async () => {
        const validCosmetics: Cosmetic[] = [];
        const updatedCart: CartItem[] = [];

        for (const item of cartItems) {
          try {
            const response = await apiClient.get(`/cosmetic/${item.slug}`);
            const cosmetic = response.data.data;

            if (cosmetic) {
              validCosmetics.push(cosmetic);
              updatedCart.push(item);
            } else {
              console.warn(`Cosmetic with slug ${item.slug} is no longer available`);
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              setError(error.message);
              console.error(`Error fetching cosmetic with slug ${item.slug}: ${error.message}`);

              const updatedCartAfterError = cartItems.filter((cartItem) => cartItem.slug !== item.slug);
              setCart(updatedCartAfterError);
              localStorage.setItem("cart", JSON.stringify(updatedCartAfterError));
            }
          }
        }
        setCosmeticDetails(validCosmetics);
        setLoading(false);
      };
      fetchCosmeticDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const subTotal = cosmeticDetails.reduce((acc, cosmetic) => {
    const cartItem = cart.find((item) => item.cosmetic_id === cosmetic.id);
    return acc + (cartItem ? cosmetic.price * cartItem.quantity : 0);
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const tax = subTotal * 0.12;
  const grandTotal = subTotal + tax;

  const handleIncreaseQuantity = (slug: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => (item.slug === slug && item.quantity < 10 ? { ...item, quantity: item.quantity + 1 } : item));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (slug: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => (item.slug === slug && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (slug: string) => {
    const updatedCart = cart.filter((item) => item.slug !== slug);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCosmeticDetails((prevDetails) => prevDetails.filter((cosmetic) => cosmetic.slug !== slug));
  };

  if (loading) {
    return <p className="min-h-screen flex justify-center items-center">Loading...</p>;
  }

  if (error) {
    return <p className="min-h-screen flex justify-center items-center">Error: {error}</p>;
  }

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col gap-5 bg-[#F6F6F8]">
      <section id="NavTop">
        <div className="px-5">
          <div className="relative mt-5 w-full rounded-3xl bg-white py-3">
            <Link to="#" onClick={() => navigate(-1)}>
              <div className="absolute left-3 top-1/2 flex size-[44px] shrink-0 -translate-y-1/2 items-center justify-center rounded-full border border-cosmetics-greylight">
                <img src="/assets/images/icons/left.svg" alt="icon" className="size-5 shrink-0" />
              </div>
            </Link>
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-center text-lg font-bold leading-[27px]">My Cart</h1>
              <p className="text-center text-sm leading-[21px] text-cosmetics-grey">You deserve beauty life</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-[40px]">
        <section id="ListItems">
          <div className="flex flex-col gap-[16px] px-5">
            {cosmeticDetails.length > 0
              ? cosmeticDetails.map((cosmetic) => {
                  const cartItem = cart.find((item) => item.cosmetic_id === cosmetic.id);
                  return (
                    <div key={cosmetic.id} id="Item" className="flex h-[143px] items-center justify-center rounded-3xl transition-all duration-300 hover:bg-cosmetics-gradient-purple-pink hover:p-[2px]">
                      <div className="flex h-full w-full flex-col justify-center gap-[12px] rounded-[23px] bg-white px-4 hover:rounded-[22px]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex size-[60px] shrink-0 items-center justify-center">
                              <img src={`${BASE_URL}/${cosmetic.thumbnail}`} alt="image" className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-[6px]">
                              <h4 className="text-xs leading-[18px] text-cosmetics-purple">{cosmetic.brand.name.toLocaleUpperCase()}</h4>
                              <h3 className="line-clamp-2 h-[42px] w-full text-sm font-semibold leading-[21px]">{cosmetic.name}</h3>
                            </div>
                          </div>
                          <button onClick={() => handleRemoveItem(cosmetic.slug)} className="shrink-0">
                            <img src="/assets/images/icons/trash-red.svg" alt="icon" className="size-5 shrink-0" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm leading-[21px] text-cosmetics-grey">
                            <strong className="text-sm font-semibold leading-[21px] text-cosmetics-pink">
                              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cosmetic.price)}
                            </strong>
                          </p>
                          <div className="flex w-[89px] items-center justify-between gap-1 rounded-full bg-[#F6F6F8] px-2 py-[6px]">
                            <button onClick={() => handleDecreaseQuantity(cosmetic.slug)}>
                              <img src="/assets/images/icons/min.svg" alt="icon" className="h-[21px] w-5 shrink-0" />
                            </button>
                            <p className="text-center text-sm font-semibold leading-[21px]">{cartItem?.quantity}</p>
                            <button onClick={() => handleIncreaseQuantity(cosmetic.slug)}>
                              <img src="/assets/images/icons/plus.svg" alt="icon" className="h-[21px] w-5 shrink-0" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "Belum ada product yg ditambahkan"}
          </div>
        </section>
        <section id="BookingDetails">
          <div className="flex flex-col gap-5 rounded-t-[30px] bg-white px-5 pb-[30px] pt-[30px]">
            <h2 className="font-bold">Booking Details</h2>
            <div className="flex flex-col gap-[6px]">
              <div className="relative h-[49px]">
                <input
                  placeholder="Enter your discount code"
                  type="text"
                  className="absolute w-full rounded-full bg-[#F6F6F8] py-[14px] pl-4 pr-[92px] font-semibold text-[#030504] placeholder:text-sm placeholder:font-normal placeholder:leading-[21px] placeholder:text-cosmetics-grey focus:outline-none"
                />
                <button type="button" className="absolute right-[6px] top-1/2 -translate-y-1/2 rounded-full bg-cosmetics-purple px-[14px] py-2 text-sm font-semibold leading-[21px] text-white">
                  Apply
                </button>
              </div>
              {/* <p className="text-sm leading-[21px] text-[#E70011]">Lorem tidak valid silahkan coba lagi ya</p> */}
            </div>
            <div className="box h-[1px] w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src="/assets/images/icons/note.svg" alt="icon" className="size-5 shrink-0" />
                <p>Total Quantity</p>
              </div>
              <strong className="font-semibold">{totalQuantity} Items</strong>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src="/assets/images/icons/note.svg" alt="icon" className="size-5 shrink-0" />
                <p>Sub Total</p>
              </div>
              <strong className="font-semibold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(subTotal)}</strong>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src="/assets/images/icons/note.svg" alt="icon" className="size-5 shrink-0" />
                <p>Discount Code</p>
              </div>
              <strong className="font-semibold">Rp 0</strong>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src="/assets/images/icons/note.svg" alt="icon" className="size-5 shrink-0" />
                <p>Tax 12%</p>
              </div>
              <strong className="font-semibold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(tax)}</strong>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src="/assets/images/icons/note.svg" alt="icon" className="size-5 shrink-0" />
                <p>Grand Total</p>
              </div>
              <strong className="text-[22px] font-bold leading-[33px] text-cosmetics-pink">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(grandTotal)}
              </strong>
            </div>
            {cart.length > 0 && (
              <Link to="/booking" className="flex w-full items-center justify-between rounded-full bg-cosmetics-gradient-pink-white px-5 py-[14px] transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
                <strong className="font-semibold text-white">Continue Booking</strong>
                <img src="/assets/images/icons/right.svg" alt="icon" className="size-[24px] shrink-0" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
