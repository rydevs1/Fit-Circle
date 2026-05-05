import sharedStyles from "../styles/sharedStyles";

export default function PageTitle({ children }) {
  return <h1 style={sharedStyles.title}>{children}</h1>;
}