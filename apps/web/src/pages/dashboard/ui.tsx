import { Layout, Typography } from "antd";

import { dom } from "@/shared/lib";
import { Content } from "@/shared/ui";

const DashboardPage = () => {
  dom.useTitle("MG Control | Dashboard");

  return (
    <Layout>
      <Content.Center>
        <Typography.Title level={1}>Dashboard</Typography.Title>
      </Content.Center>
    </Layout>
  );
};

export default DashboardPage;
