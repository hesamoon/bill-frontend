/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

// icons
import arrowIcon from "../assets/arrow-down.svg";

function SelectOptionList({
  title,
  options,
  selectedOption,
  setSelectedOption,
}) {
  const [openOption, setOpenOption] = useState(false);
  const ref = useRef();

  const optionClickHandler = (option) => {
    setSelectedOption(option);
    setOpenOption(false);
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOption && setOpenOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openOption]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-black">{title}</label>
      <div className="relative w-fit" ref={ref}>
        <div
          className="flex items-center justify-between py-1 px-3 border border-outline rounded-lg  cursor-pointer"
          onClick={() => setOpenOption((prev) => !prev)}
        >
          <span
            className={`text-sm p-1.5 ${
              selectedOption ? "text-primary font-bold" : "text-secondary"
            }`}
          >
            {selectedOption ? selectedOption.senderInfo.name : "انتخاب کنید"}
          </span>
          <img
            className={`${openOption ? "rotate-180" : null}`}
            src={arrowIcon}
            alt="arrow"
          />
        </div>

        {openOption && (
          <div className="w-full max-h-40 overflow-y-auto no-scrollbar absolute top-12 right-0 border border-outline rounded-xl divide-y-[1px] z-30 bg-gray-50 shadow-md">
            <p
              className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl rounded-t-lg text-secondary opacity-75`}
              onClick={() => optionClickHandler(null)}
            >
              انتخاب کنید
            </p>
            {options.map((option, index) => (
              <p
                className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl ${
                  index === options.length - 1 ? "rounded-b-lg" : null
                } ${
                  selectedOption?.id === option?.id
                    ? "bg-hover_primary text-primary font-bold"
                    : "text-secondary"
                }`}
                key={option?.id}
                onClick={() => optionClickHandler(option)}
              >
                {option?.senderInfo.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectOptionList;
