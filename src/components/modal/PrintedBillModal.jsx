/* eslint-disable react/prop-types */
import { useRef } from "react";

// helpers
import { e2p, sp } from "../../helpers/helper";

// logo
import logo from "../../assets/farabar-logo.png";

function PrintedBillModal({ data, onClose }) {
  const {
    billNumber,
    payMethod,
    exporterName,
    senderInfo,
    receiverInfo,
    productInfo,
    priceInfo,
    created,
  } = data;

  const timestamp = {
    date: new Date(created).toLocaleDateString("fa"),
    time: `${new Date(created).getHours()}:${new Date(created).getMinutes()}`,
  };

  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html lang="fa" dir="rtl">
        <head>
          <title>چاپ بارنامه</title>
           <script src="https://cdn.tailwindcss.com"></script>
           <style>
          @page { margin: 10; }
          body { margin: 0; }
        </style>
        </head>
        <body>
          <div className="flex flex-col bg-white max-w-[630px] max-h-[890px] rounded-lg p-4">
            ${printContent}
          </div>
          <script>
            setTimeout(() => {
              window.print();
            }, 500); // Delay of 0.5 second before printing

            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);
  };

  const handleClose = (event) => {
    if (event.target.id === "wrapper") {
      onClose();
      return;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start overflow-auto no-scrollbar scroll-smooth z-[999] py-10"
      id="wrapper"
      onClick={handleClose}
    >
      <div
        ref={printRef}
        className="flex flex-col bg-white w-[559px] h-[794px] rounded-lg p-4"
      >
        <div className="border-4 border-black w-full h-full divide-y-4 divide-black flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between p-2">
            <div>
              <div className="flex items-center justify-center w-14 h-14">
                <img src={logo} alt="logo" />
              </div>
            </div>

            <div className="text-[22px] font-semibold text-black">
              شرکت حمل و نقل هوایی فرابار پرواز
            </div>

            <div className="">
              <span className="text-[10px] text-low_important">
                شماره بارنامه:
              </span>
              <h5 className="text-black text-sm font-semibold -mt-1">
                {billNumber}
              </h5>
            </div>
          </div>

          {/* origin / destination loaction */}
          <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
            {/* origin */}
            <div className="p-2 relative">
              <span className="absolute top-3 right-2 text-black text-xs">
                مبدا:
              </span>
              <h3 className="text-center text-black font-semibold text-sm">
                {senderInfo.address.state?.name}
              </h3>
            </div>

            {/* destination */}
            <div className="p-2 relative">
              <span className="absolute top-3 right-2 text-black text-xs">
                مقصد:
              </span>
              <h3 className="text-center text-black font-semibold text-sm">
                {receiverInfo.address.state?.name}
              </h3>
            </div>
          </div>

          {/* sender / receiver info */}
          <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
            {/* sender info */}
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-4">
                <span className="text-black text-xs">فرستنده:</span>
                <h3 className="font-semibold text-sm">{senderInfo.name}</h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-black text-xs">تلفن:</span>
                <h3 className="font-semibold text-sm">{senderInfo.phone}</h3>
              </div>

              <div className="flex items-center justify-end">
                <div className="h-[0.125rem] rounded-full w-[85%] bg-black" />
              </div>

              <div className="flex items-start gap-4">
                <span className="text-black text-xs">نشانی:</span>
                <h3 className="font-semibold text-sm">{`${senderInfo.address.state?.name}, ${senderInfo.address.city?.name}, ${senderInfo.address.street}, ${senderInfo.address.alley}, ${senderInfo.address.postalCode}`}</h3>
              </div>
              <h3 className="font-semibold text-[10px]">{senderInfo.desc}</h3>
            </div>

            {/* receiver info */}
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-4">
                <span className="text-black text-xs">فرستنده:</span>
                <h3 className="font-semibold text-sm">{receiverInfo.name}</h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-black text-xs">تلفن:</span>
                <h3 className="font-semibold text-sm">{receiverInfo.phone}</h3>
              </div>

              <div className="flex items-center justify-end">
                <div className="h-[0.125rem] rounded-full w-[85%] bg-black" />
              </div>

              <div className="flex items-start gap-4">
                <span className="text-black text-xs">نشانی:</span>
                <h3 className="font-semibold text-sm">{`${receiverInfo.address.state?.name}, ${receiverInfo.address.city?.name}, ${receiverInfo.address.street}, ${receiverInfo.address.alley}, ${receiverInfo.address.postalCode}`}</h3>
              </div>
              <h3 className="font-semibold text-[10px]">{receiverInfo.desc}</h3>
            </div>
          </div>

          {/* product info */}
          <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
            {/* qty, type, dim */}
            <div className="grid grid-cols-3 divide-x-4 divide-x-reverse divide-black">
              {/* qty */}
              <div className="divide-y-4 text-center divide-black">
                <h4 className="whitespace-nowrap text-xs text-tx_primary font-semibold p-1">
                  تعداد
                </h4>
                <h3 className="text-base font-semibold text-tx_primary p-1">
                  {productInfo.count}
                </h3>
              </div>

              {/* type */}
              <div className="divide-y-4 text-center divide-black">
                <h4 className="whitespace-nowrap text-xs text-tx_primary font-semibold p-1">
                  نوع
                </h4>
                <h3 className="text-base font-semibold text-tx_primary p-1">
                  {productInfo.productType}
                </h3>
              </div>

              {/* dim */}
              <div className="divide-y-4 text-center divide-black">
                <h4 className="whitespace-nowrap text-xs text-tx_primary font-semibold p-1">
                  ابعاد
                </h4>
                <h3 className="text-xs font-semibold text-tx_primary p-1">{`${productInfo.dim.w}x${productInfo.dim.l}x${productInfo.dim.h} (cm)`}</h3>
              </div>
            </div>

            {/* weight, calc weight */}
            <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
              {/* weight */}
              <div className="divide-y-4 text-center divide-black">
                <h4 className="whitespace-nowrap text-xs text-tx_primary font-semibold p-1">
                  وزن <span className="text-[8px]">(کیلوگرم)</span>
                </h4>
                <h3 className="text-base font-semibold text-tx_primary p-1">
                  {productInfo.weight}
                </h3>
              </div>

              {/* calc weight */}
              <div className="divide-y-4 text-center divide-black">
                <h4 className="whitespace-nowrap text-xs text-tx_primary font-semibold p-1">
                  وزن احتساب شده
                </h4>
                <h3 className="text-base font-semibold text-tx_primary p-1">
                  {productInfo.culcWeight}
                </h3>
              </div>
            </div>
          </div>

          {/* prices / some notes and details */}
          <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black flex-1">
            {/* some notes and details */}
            <div className="divide-y-4 divide-black">
              {/* products content */}
              <div className="h-1/5 overflow-y-auto no-scrollbar">
                <span className="text-[10px] pr-2 text-low_important">
                  محتویات بنا به اظهار فرستنده
                </span>
                <h3 className="px-4 font-semibold break-words">
                  {productInfo.content}
                </h3>
              </div>

              {/* note */}
              <div className="">
                <h3 className="p-2 text-center text-[11px] font-semibold break-words">
                  فرستنده متعهد میگردد این محموله فاقد کالای خطرناک میباشد و هر
                  گونه کشف فساد به عهده ی صاحب کالا میباشد و در صورت بروز هر
                  گونه خسارت مسولیت به عهدهی فرستنده میباشد.
                </h3>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black h-[24%]">
                <div className="">
                  <span className="text-[10px] pr-2 text-tx_primary">
                    امضا فرستنده:
                  </span>
                </div>
                <div className="">
                  <span className="text-[10px] pr-2 text-tx_primary">
                    امضا گیرنده:
                  </span>
                </div>
              </div>

              {/* office address */}
              <div className="py-2 space-y-4">
                <h4 className="px-2 text-sm font-semibold text-tx_primary gap-1">
                  <span className="text-[10px]">دفتر عسلویه: </span>خیابات فرهنگ
                  فرعی 9 روبروی صنعت و معدن و تجارت دفتر فراپرواز - 09352410605
                  - 09389910605
                </h4>
                <h4 className="px-2 text-sm font-semibold text-tx_primary ">
                  <span className="text-[10px]">دفتر تهران: </span>فرودگاه
                  مهرآباد ترمینال 6 و 4 پارکینگ 3 شرکت غدک سیر - 02144690401
                </h4>
              </div>

              {/* office number
              <div className="py-1">
                <h4 className="px-2 text-sm font-semibold text-tx_primary flex items-center gap-1">
                  <span className="text-[10px]">دفتر عسلویه: </span>09352410605
                  - 09389910605
                </h4>
                <h4 className="px-2 text-sm font-semibold text-tx_primary flex items-center gap-1">
                  <span className="text-[10px]">دفتر تهران: </span>02144690401
                </h4>
              </div> */}
            </div>

            {/* prices / exporter name */}
            <div className="divide-y-4 divide-black flex flex-col">
              {/* shipping */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه حمل بار</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.shipping.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* service */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه خدمات</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.service.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* collect */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه جمع آوری</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.collect.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* packaging */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه بسته بندی</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.packaging.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* stamp */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">
                  هزینه تمبر و بارنامه
                </div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.stamp.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* representative */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">حق نمایندگی</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.representative.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* dispensation */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه توزیع</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.dispensation.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* xry */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">هزینه ایکس ری</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.xry.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* tax */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">
                  مالیات بر ارزش افزوده
                </div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {sp(+priceInfo.tax.replaceAll(",", ""))}
                  </h5>
                </div>
              </div>

              {/* total price */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="font-bold text-start text-sm p-1">مبلغ کل</div>
                <div className="relative p-1">
                  <span className="text-low_important text-[10px] absolute top-2 left-1">
                    ريال
                  </span>
                  <h5 className="text-base text-tx_primary font-semibold text-center">
                    {sp(
                      Object.values(priceInfo).reduce(
                        (accumulator, currentValue) =>
                          accumulator + +currentValue.replaceAll(",", ""),
                        0
                      )
                    )}
                  </h5>
                </div>
              </div>

              {/* pay method */}
              <div className="grid grid-cols-2 divide-x-4 divide-x-reverse divide-black">
                <div className="text-start text-xs p-1">نوع پرداخت</div>
                <div className="p-1">
                  <h5 className="text-sm text-tx_primary font-semibold text-center">
                    {payMethod}
                  </h5>
                </div>
              </div>

              {/* exporter name and signature */}
              <div className="flex flex-col justify-between h-full">
                <div className="">
                  <span className="text-[10px] pr-2 text-tx_primary">
                    مهر و امضا صادر کننده:
                  </span>{" "}
                  <span className="text-base font-semibold text-tx_primary">
                    {exporterName}
                  </span>
                </div>

                <h5 className="font-semibold text-sm text-tx_primary text-end p-2">
                  {e2p(timestamp.time)} - {timestamp.date}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="fixed bottom-10 mt-4 bg-gray-50 text-black px-4 py-2 rounded"
        >
          آماده سازی جهت چاپ
        </button>
      </div>
    </div>
  );
}

export default PrintedBillModal;
