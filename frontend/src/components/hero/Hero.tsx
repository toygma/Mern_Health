import Button from "../../ui/Button";
import image from "/hero/line.webp";
import shape from "/hero/shape.png";
import doctor from "/hero/doctor.webp";
import modal from "/hero/modal-line.svg";
import box from "/hero/doctorpatient.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center justify-center mt-24 gap-4">
        <div className="relative">
          <h1 className="max-w-[800px] text-center">
            Elevate your care with verified, premium medication
          </h1>
          <img
            src={image}
            alt="image"
            title="image-line"
            className="absolute top-0 -z-10 opacity-45"
          />
        </div>
        <p className="max-w-lg text-center ">
          Seize control of your wellness journey. Our platform delivers the
          healthcare benefits you deserve.
        </p>
        <img
          src={shape}
          alt="image"
          className="absolute opacity-40 -z-10 right-0 top-0 float"
        />
        <img
          src={shape}
          alt="image"
          className="absolute opacity-40 -z-10 left-0 bottom-0 float"
        />
        <div className="flex gap-4 items-center">
          <Button type="button" children="About Us" className="py-4 bg-primary text-white" />
          <Button type="button"  children="Book an Appointment" className="py-4" />
        </div>
        <div className="mt-24 flex items-center gap-4">
          <img src={modal} alt="modal" className="" />
          <img src={doctor} alt="doctor" className="-ml-32" />
          <img
            src={box}
            alt="doctor"
            className="w-[270px] h-[290px] rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
