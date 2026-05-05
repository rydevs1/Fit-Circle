import sharedStyles from "../styles/sharedStyles";

export default function PageCard({ children }) {
  const centeredCard = {
    ...sharedStyles.pageCard,
    margin: "0 auto"
  };

  return <div style={centeredCard}>{children}</div>;
}