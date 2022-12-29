import styles from "./button.module.css";

interface IButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export function Button({
  children,
  className = undefined,
  disabled = false,
  onClick = undefined,
  type = "button",
}: IButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${className && className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
