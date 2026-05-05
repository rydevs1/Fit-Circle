import sharedStyles from "../styles/sharedStyles";

export default function AppInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder
}) {
  return (
    <>
      <label style={sharedStyles.label}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={sharedStyles.input}
      />
    </>
  );
}