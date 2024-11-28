import { HelmetProvider } from "react-helmet-async";

const HelmetWrapper = ({ children }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default HelmetWrapper;
