import sharedStyles from "../styles/sharedStyles";

export default function AppButton({ text, onClick, type = "button" }) {
  return (
    <button type={type} style={sharedStyles.button} onClick={onClick}>
      {text}
    </button>
  );
}