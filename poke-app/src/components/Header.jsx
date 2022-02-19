import Navbar from "./Navbar";

const Header = (props) => {
  return (
    <header>
      <div >
        <Navbar search={props.search} />
      </div>
    </header>
  );
};

export default Header;
