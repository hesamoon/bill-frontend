/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// icons
import closeIcon from "../../assets/close.svg";

// components
import Button from "../Button";
import SearchBox from "../SearchBox";

function ExistBillListModal({ data, clickHandler, onClose }) {
  const [searchVal, setSearchVal] = useState("");
  const [filterType, setFilterType] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [filtredList, setFiltredList] = useState([]);

  const handleClose = (event) => {
    if (event.target.id === "wrapper") {
      onClose();
      return;
    }
  };

  useEffect(() => {
    if (searchVal) {
      const newArr = data?.filter((bill) =>
        `${bill.billNumber} - ${bill.senderInfo.name} - ${bill.senderInfo.phone}`.includes(searchVal)
      );
      setFiltredList([...newArr]);
    } else {
      if (data) {
        setFiltredList([...data]);
      } else {
        setFiltredList([]);
      }
    }
  }, [searchVal]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start overflow-auto no-scrollbar scroll-smooth z-[999] py-10"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col bg-white rounded-lg divide-y-2">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 py-4 px-6">
          {/* title / close button */}
          <div className="flex items-center gap-2">
            <img
              className="cursor-pointer"
              id="close-btn"
              onClick={onClose}
              src={closeIcon}
              alt="close button"
            />
            <h3 className="text-bsae text-black">بارنامه های موجود</h3>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-col justify-between p-6 md:w-[700px] md:h-full mobile:h-screen">
          <SearchBox
            value={searchVal}
            onChange={setSearchVal}
            baseOn={filterType}
          />

          <div className="mt-5 rounded-lg border divide-y divide-[#EEEEEE] max-h-[20rem] ltr overflow-y-auto">
            {/* head */}
            <div className="grid grid-cols-8 rtl">
              <h4 className="text-low_important text-sm p-3 col-span-1">
                ردیف
              </h4>
              <h4 className="text-low_important text-sm p-3 col-span-2">
                فرستنده
              </h4>
              <h4 className="text-low_important text-sm p-3 col-span-2">
                گیرنده
              </h4>
              <h4 className="text-low_important text-sm p-3 col-span-3">
                مقصد
              </h4>
            </div>

            {filtredList.length > 0 ? (
              filtredList.map((bill, index) => (
                <div
                  key={bill.billNumber}
                  className={`grid rtl grid-cols-8 cursor-pointer custom-transition hover:bg-gray-50 ${
                    selectedBill?.billNumber === bill.billNumber
                      ? "bg-hover_primary"
                      : null
                  }`}
                  onClick={() => setSelectedBill({ ...bill })}
                >
                  <h4 className="text-tx_primary text-base p-3 col-span-1 font-semibold">
                    {index + 1}
                  </h4>
                  <h4 className="text-tx_primary text-base p-3 col-span-2">
                    {bill.senderInfo.name}
                  </h4>
                  <h4 className="text-tx_primary text-base p-3 col-span-2">
                    {bill.receiverInfo.name}
                  </h4>
                  <h4 className="text-tx_primary text-base p-3 col-span-3">
                    {`${bill.receiverInfo.address.state?.name}, ${bill.receiverInfo.address.city?.name}`}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-center text-low_important p-4">
                {searchVal ? "بارنامه یافت نشد" : "بارنامه ای وجود ندارد"}
              </p>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-4 p-4">
          <Button
            value="تایید"
            disable={!selectedBill}
            withoutLoader
            onClick={() => clickHandler({ ...selectedBill })}
          />
        </div>
      </div>
    </div>
  );
}

export default ExistBillListModal;
