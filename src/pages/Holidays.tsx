
import HolidayHero from "@/components/holidays/HolidayHero";
import HolidayPackages from "@/components/holidays/HolidayPackages";
import HolidayDestinations from "@/components/holidays/HolidayDestinations";
import HolidayTestimonials from "@/components/holidays/HolidayTestimonials";

const Holidays = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HolidayHero />
      <HolidayPackages />
      <HolidayDestinations />
      <HolidayTestimonials />
    </div>
  );
};

export default Holidays;
