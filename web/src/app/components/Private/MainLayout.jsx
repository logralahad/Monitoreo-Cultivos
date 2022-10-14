import { LoadingSuspense } from "../../components";
import useSettings from "../../hooks/useSettings";
import { MatxLayouts } from "./index";

const MainLayout = (props) => {
  const { settings } = useSettings();
  const ActiveLayout = MatxLayouts[settings.activeLayout];

  return (
    <LoadingSuspense>
      <ActiveLayout {...props} />
    </LoadingSuspense>
  );
};

export default MainLayout;
