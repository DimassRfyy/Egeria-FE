import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../types/type";
import apiClient from "../services/apiServices";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(`/category/${slug}`)
      .then((response) => {
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p className="min-h-screen flex justify-center items-center">Loading...</p>;
  }

  if (error) {
    return <p className="min-h-screen flex justify-center items-center">Error: {error}</p>;
  }

  if (!category) {
    return <p className="min-h-screen flex justify-center items-center">Category not found</p>;
  }

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col gap-5 bg-[#F6F6F8] pb-[102px]">
      <section id="NavTop" className="mt-5 px-5">
        <div className="flex w-full flex-col gap-5 rounded-3xl bg-white px-3 pb-5 pt-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-cosmetics-greylight">
                <img src="/assets/images/icons/left.svg" alt="icon" className="size-5 shrink-0" />
              </div>
            </Link>
            <div className="flex flex-col gap-[2px]">
              <h1 className="text-center text-lg font-bold leading-[27px]">Category</h1>
              <p className="text-center text-sm leading-[21px] text-cosmetics-grey">You deserve beauty life</p>
            </div>
            <a href="my-cart.html">
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-cosmetics-greylight">
                <img src="/assets/images/icons/cart.svg" alt="icon" className="size-5 shrink-0" />
              </div>
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                <img src={`${BASE_URL}/${category.photo}`} alt="image" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold leading-[27px]">{category.name}</h2>
                <p className="text-sm leading-[21px] text-cosmetics-grey">{category.cosmetics_count} Products</p>
              </div>
            </div>
            <div className="stars flex items-center">
              <img src="/assets/images/icons/star-big.svg" alt="icon" className="size-5 shrink-0" />
              <img src="/assets/images/icons/star-big.svg" alt="icon" className="size-5 shrink-0" />
              <img src="/assets/images/icons/star-big.svg" alt="icon" className="size-5 shrink-0" />
              <img src="/assets/images/icons/star-big.svg" alt="icon" className="size-5 shrink-0" />
              <img src="/assets/images/icons/star-big.svg" alt="icon" className="size-5 shrink-0" />
            </div>
          </div>
          <div className="box w-full h-[1px]" />
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="flex items-center gap-[10px]">
              <img src="/assets/images/icons/guarantee.svg" alt="icon" className="size-[32px] shrink-0" />
              <div>
                <h3 className="text-sm font-semibold leading-[21px] text-[#030504]">Guarantee</h3>
                <p className="text-sm leading-[21px] text-[#43484C]">BPOM Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img src="/assets/images/icons/top-service.svg" alt="icon" className="size-[32px] shrink-0" />
              <div>
                <h3 className="text-sm font-semibold leading-[21px] text-[#030504]">Top Service</h3>
                <p className="text-sm leading-[21px] text-[#43484C]">Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="ListItems">
        <div className="flex flex-col gap-4 px-5">
          {category.cosmetics.length > 0 ? (
            category.cosmetics.map((cosmetic) => (
              <Link to="/cosmetic" key={cosmetic.id}>
                <div className="flex h-[130px] items-center justify-center rounded-3xl transition-all duration-300 hover:bg-cosmetics-gradient-purple-pink">
                  <div className="flex h-full w-full hover:h-[calc(100%_-_4px)] hover:w-[calc(100%_-_4px)] transtion-all duration-300 gap-4 rounded-[23px] hover:rounded-[22px] items-center bg-white px-4">
                    <div className="flex size-[90px] shrink-0 items-center justify-center">
                      <img src={`${BASE_URL}/${cosmetic.thumbnail}`} alt="image" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex w-full flex-col gap-[2px]">
                      <h4 className="text-xs leading-[18px] text-cosmetics-purple">{cosmetic.brand.name.toLocaleUpperCase()}</h4>
                      <h3 className="line-clamp-2 h-[48px] w-full font-semibold">{cosmetic.name}</h3>
                      <div className="flex items-center justify-between">
                        <strong className="font-semibold text-cosmetics-pink">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cosmetic.price)}</strong>
                        <div className="flex items-center justify-center gap-[2px]">
                          <img src="/assets/images/icons/star.svg" alt="icon" className="size-4 shrink-0" />
                          <p className="text-xs font-bold leading-[18px]">4.8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm leading-[21px] text-cosmetics-grey">No products found</p>
          )}
        </div>
      </section>
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px]">
          <button type="button" className="mx-auto flex items-center gap-[10px] rounded-full bg-cosmetics-gradient-pink-white px-5 py-[14px] transition-all duration-300 hover:shadow-[0px_6px_22px_0px_#FF4D9E82]">
            <p className="font-semibold text-white">Item Filters</p>
            <img src="/assets/images/icons/filter.svg" alt="icon" className="size-[24px] shrink-0" />
          </button>
        </div>
      </nav>
    </main>
  );
}
