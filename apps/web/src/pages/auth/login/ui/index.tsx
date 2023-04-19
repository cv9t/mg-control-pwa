import { Layout } from "antd";

import { Login } from "@/features/auth";
import { dom } from "@/shared/lib";
import { Content } from "@/shared/ui";

const LoginPage = () => {
  dom.useTitle("MG Control | Login");

  return (
    <Layout>
      <Content.Center>
        <Login.ByEmail />
      </Content.Center>
    </Layout>
  );
};

export default LoginPage;
