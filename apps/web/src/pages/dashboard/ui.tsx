import { deviceModel } from "@/entities/device";
import { dom } from "@/shared/lib";
import { Loader } from "@/shared/ui";

const DashboardPage = () => {
  dom.useTitle("MG Control | Dashboard");

  const { isConnected } = deviceModel.useDeviceConnect();

  if (!isConnected) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Loader />
      </div>
    );
  }

  return null;
};

export default DashboardPage;
