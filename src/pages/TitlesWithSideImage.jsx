import sideImg from "../assets/person1.png"; // بدّلها للصورة اللي تحبها

export default function TitlesWithSideImage() {
  const titles = ["Your Health History Anytime", "On Demand"]; // عدّل النصوص
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* النصوص على اليسار */}
        <div className="space-y-5 md:pr-6">
          {titles.map((t, i) => (
            <h2
              key={i}
              className="text-[2rem] md:text-[2.8rem] font-extrabold text-[#14591D] leading-tight flex items-end gap-3"
            >
              <span className="block">{t}<span className="inline-block w-3.5 h-3.5 translate-y-2  translate-x-1 rounded-md bg-[#7EDF5E] mb-2"></span></span>
              
            </h2>
          ))}

          <p className="pt-2 text-[#2f9e44]/80 text-lg md:text-xl max-w-xl">
            All your records in one secure place.
          </p>
        </div>

        {/* الصورة على اليمين (نصف العرض على الديسكتوب) */}
        <div className="md:order-last flex justify-center md:justify-end">
          <img
            src={sideImg}
            alt="Side"
            className="w-full max-w-[520px] md:max-w-[560px] lg:max-w-[620px] h-auto select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}