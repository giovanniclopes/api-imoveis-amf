import logo from "../assets/logo.png";

export function Header() {
  return (
    <header className="fixed w-full h-[60px] bg-white text-black z-50 md:h-[70px]">
      <div className="px-6">
        <a href="#">
          <img
            className="w-auto h-[60px] md:h-[70px] md:hover:cursor-pointer"
            src={logo}
            alt="Logo fictícia GCL Imóveis"
          />
        </a>
      </div>
    </header>
  );
}
