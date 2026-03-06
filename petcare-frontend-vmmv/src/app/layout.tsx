import './globals.css';

export const metadata = {
  title: 'PetCare',
  description: 'Plataforma digital de seguimiento veterinario',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="scroll-smooth bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}