"use client";

import NavBar from "@molecules/m-navbar admin";
import Footer from "@components/molecules/m-footer admin";
import ApolloProvider from "@/app/provider/ApolloProvider";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ApolloProvider>
      <div className="relative overflow-hidden font-space bg-dark01">
        <div className="min-h-screen">{children}</div>
      </div>
      </ApolloProvider>
  );
};

export default Layout;
