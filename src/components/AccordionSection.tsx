import { useState } from "react";

interface AccordionSectionProps {
    title: string;
    subTitle: string;
    iconSrc: string;
    children: React.ReactNode;
}

function AccordionSection(
    { title, subTitle, iconSrc, children }: AccordionSectionProps
) {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };
  return (
    <section id="Informations" className="px-5">
      <div className="flex flex-col gap-5 rounded-3xl bg-white px-5 py-[30px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <img src={iconSrc} alt="icon" className="size-[38px] shrink-0" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-[#0C0422]">{title}</h3>
              <p className="text-sm leading-[21px] text-[#8C8582]">{subTitle}</p>
            </div>
          </div>
          <button type="button" onClick={toggleOpen} data-expand="PaymentDetailsJ" className="shrink-0">
            <img src="/assets/images/icons/bottom.svg" alt="icon" className={`${isOpen ? "-rotate-180" : ""} size-6 shrink-0 transition-all duration-300`} />
          </button>
        </div>
        {isOpen && <div className="flex flex-col gap-5">{children}</div>}
      </div>
    </section>
  );
}

export default AccordionSection;
