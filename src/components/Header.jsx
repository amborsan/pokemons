import logo from "../assets/pokemon.png";
function Header() {
  return (
    <header className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div id="nav" className="mt-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="sitename">
        <h1 className="text-2xl font-bold">Pokemons</h1>
      </div>
      <div id="logo" className="w-20 h-20 bg-white rounded-full ">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;
