import NavBar from "@molecules/m-navbar";
import Footer from "@components/molecules/m-footer";

interface Props {
  children?: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative overflow-hidden font-space bg-dark01">
      <NavBar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
