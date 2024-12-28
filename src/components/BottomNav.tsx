import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto w-full">
      <div className="mx-auto max-w-[640px]">
        <div className="h-[89px] bg-white px-[30px] shadow-[0px_-4px_30px_0px_#1107260D]">
          <ul className="flex justify-between">
            <li className="flex items-center">
              <Link to={`/`}>
                <div className="flex w-[50px] flex-col items-center gap-1">
                  <img src="/assets/images/icons/browse.svg" alt="icon" className="size-6 shrink-0" />
                  <p className="text-sm font-semibold leading-[21px] text-cosmetics-pink">Browse</p>
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link to={"/check-booking"}>
                <div className="flex w-[50px] flex-col items-center gap-1">
                  <img src="/assets/images/icons/car.svg" alt="icon" className="size-6 shrink-0" />
                  <p className="text-sm leading-[21px]">Orders</p>
                </div>
              </Link>
            </li>
            <li>
              <a href="" className="relative -top-[23px]">
                <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FAF9FA]">
                  <div className="flex size-[65px] items-center justify-center rounded-full bg-cosmetics-gradient-pink-white transition-shadow duration-300 hover:shadow-[0px_6px_10px_0px_#FF4D9E6E]">
                    <img src="/assets/images/icons/video.svg" alt="icon" className="size-[30px] shrink-0" />
                  </div>
                </div>
              </a>
            </li>
            <li className="flex items-center">
              <a href="">
                <div className="flex w-[50px] flex-col items-center gap-1">
                  <img src="/assets/images/icons/gift.svg" alt="icon" className="size-6 shrink-0" />
                  <p className="text-sm leading-[21px]">Perks</p>
                </div>
              </a>
            </li>
            <li className="flex items-center">
              <a href="">
                <div className="flex w-[50px] flex-col items-center gap-1">
                  <img src="/assets/images/icons/message.svg" alt="icon" className="size-6 shrink-0" />
                  <p className="text-sm leading-[21px]">Helps</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
