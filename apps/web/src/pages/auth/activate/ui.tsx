import { Layout } from "antd";

import { ActivateForm } from "@/features/auth";
import { dom } from "@/shared/lib";
import { Content } from "@/shared/ui";

const ActivatePage = () => {
  dom.useTitle("MG Control | Activate");

  return (
    <Layout>
      <Content.Center>
        <ActivateForm />
      </Content.Center>
    </Layout>
  );
};

export default ActivatePage;
