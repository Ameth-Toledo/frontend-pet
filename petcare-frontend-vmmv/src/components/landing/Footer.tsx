export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          Pet<span className="text-primary-600">Care</span>
        </h3>

        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Plataforma digital de seguimiento post-consulta diseñada para mejorar la continuidad del cuidado veterinario.
        </p>

        <div className="h-px w-24 bg-primary-200 mx-auto"></div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} PetCare. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}