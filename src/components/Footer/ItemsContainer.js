import Item from "./Item";
import { PRIVACY, CONTACT } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:px-8 px-5 py-16 items-center justify-center" style={{fontFamily: "poppins"}}>
      <Item Links={PRIVACY} title="PRODUCTS" />
      <Item Links={CONTACT} title="RESOURCES" />
    </div>
  );
};

export default ItemsContainer;
