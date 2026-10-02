import LogoIcon from "@/assets/images/logo.svg";

export function Logo() {
  return (
    <a href="/">
      <img src={LogoIcon} alt="Fx Checker Logo" className="w-28 md:w-fit" />
    </a>
  );
}
