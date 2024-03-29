import Link from "next/link";
import { useStore } from "../../store";
import styles from "./logo.module.css";

export function Logo() {
  const [setHomeMapLocations] = useStore((state) => [
    state.setHomeMapLocations,
  ]);

  function handleLogoClick() {
    setHomeMapLocations([]);
  }

  return (
    <Link className={styles.logo} href="/" onClick={handleLogoClick}>
      <svg
        width="46"
        height="30"
        viewBox="0 0 46 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37 12.6842C36.9329 15.3218 34.7895 18.579 31.8421 18.579H27.0526C25.9474 18.5789 24.8421 17.5474 24.8421 15.6316C24.8421 13.7158 25.9474 12.6842 27.0526 12.6842H37ZM37 12.6842C37.0562 10.4744 34.7895 6.78947 31.8421 6.78947H13.6053C11.2105 6.78947 6.42105 8.33684 6.42105 16C6.42105 23.6632 14.1579 25.2105 17.8421 25.2105H38.8421C41.0526 25.2105 44 22.7789 44 18.9474C44 15.1158 41.0526 12.6842 38.8421 12.6842H37ZM23.9211 10.4737H14.7105C12.3706 10.4737 10.4737 8.57679 10.4737 6.23684C10.4737 3.8969 12.3706 2 14.7105 2H23.9211C26.261 2 28.1579 3.8969 28.1579 6.23684C28.1579 8.57679 26.261 10.4737 23.9211 10.4737ZM15.4474 28.1579H6.23684C3.8969 28.1579 2 26.261 2 23.9211C2 21.5811 3.8969 19.6842 6.23684 19.6842H15.4474C17.7873 19.6842 19.6842 21.5811 19.6842 23.9211C19.6842 26.261 17.7873 28.1579 15.4474 28.1579Z"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </Link>
  );
}
