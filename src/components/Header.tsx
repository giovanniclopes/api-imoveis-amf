import logo from "../assets/black.png";

export function Header() {
  return (
    <header className="fixed w-full h-[60px] bg-white text-black z-50 md:h-[70px]">
      <div className="px-6">
        <img
          className="w-auto h-[60px] md:h-[70px] md:hover:cursor-pointer"
          src={logo}
          alt="Logo AM Fernandes Incorporadora"
        />
      </div>
    </header>
  );
}
