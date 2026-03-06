import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';



export default function WhyPetCare() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[30px] lg:text-[34px] font-semibold text-[#1E293B]">
            ¿Por qué elegir PetCare?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-[#F6F7F5] rounded-2xl p-10 text-center">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <FontAwesomeIcon icon={faClipboardList} style={{ color: "#2f8f83", width: 34, height: 34 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">
              Indicaciones claras
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Seguimiento estructurado después de cada consulta.
            </p>
          </div>

          <div className="bg-[#F6F7F5] rounded-2xl p-10 text-center">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <FontAwesomeIcon icon={faCalendarDay} style={{ color: "#2f8f83", width: 34, height: 34 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">
              Control de citas
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Recordatorios automáticos y organización médica.
            </p>
          </div>

          <div className="bg-[#F6F7F5] rounded-2xl p-10 text-center">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <FontAwesomeIcon icon={faAddressBook} style={{ color: "#2f8f83", width: 34, height: 34 }} />
            </div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">
              Información centralizada
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Todo el historial en un solo lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
