import { Helmet } from "react-helmet";
import { MainLayout, MainTheme } from "../components";
import { SettingsProvider } from "../context/SettingsContext";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Tablero - ASAP</title>
        <meta name="Tablero" content="Tablero de administración" />
      </Helmet>
      <SettingsProvider>
        <MainTheme>
          <MainLayout></MainLayout>
        </MainTheme>
      </SettingsProvider>
    </>
  );
}
