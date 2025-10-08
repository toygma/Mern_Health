import { useEffect, useState } from "react";
import { doctors, type Doctor } from "../../doctors/_components/dataDoctor";
import { useNavigate } from "react-router";
import { generateSlugify } from "../../../utils/helper";

interface Props {
  speciality: string;
  docId: string;
}

const RelatedDoctors = ({ speciality, docId }: Props) => {
  const [relDocs, setRelDocs] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.categoryName === speciality && doc.id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 max-w-7xl mx-auto">
      {relDocs.length > 0 && relDocs ? (
        <>
          {" "}
          <h1 className="text-3xl font-medium">Top Doctors to book</h1>
          <p className="sm:w-1/3 text-center text-sm">
            Simply browse through our extensive list
          </p>
          <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">
            {relDocs.slice(0, 10).map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/doctor/${generateSlugify(item.href)}/${item.id}`)
                }
                className="cursor-pointer group w-[400px]"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image Container */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />

                    {/* Availability Badge */}
                    {item.available && (
                      <div className="absolute bottom-3 right-3 bg-green-500 rounded-full h-3 w-3 border-2 border-white"></div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.categoryName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-xl font-semibold tracking-wide text-gray-900">We do not have a doctor at the moment.</h2>
      )}
    </div>
  );
};

export default RelatedDoctors;
