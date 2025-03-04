import NavBar from "@molecules/m-navbar admin";
import Footer from "@components/molecules/m-footer admin";

interface Props {
  children?: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative overflow-hidden font-space bg-dark01">
      
      <div className="min-h-screen">
        {children}
      </div>
      
    </div>
  );
};

export default Layout;
