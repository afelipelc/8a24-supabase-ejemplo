import PageClient from './page.client';

export const metadata = {
  title: `Agregar Producto - ${process.env.APP_NAME}`,
  description: "Crea una nuevo producto.",
};

export default function Page() {

  return <PageClient />
}
