import ItemsContainer from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center">
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
        style={{ fontFamily: "poppins" }}
      >
        <span>© 2022 Apply. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
