import PageCard from "../components/PageCard";
import PageTitle from "../components/PageTitle";
import AppButton from "../components/AppButton";
import sharedStyles from "../styles/sharedStyles";

export default function PageTemplate() {
  return (
    <PageCard>
      <PageTitle>Page Title</PageTitle>

      <p style={sharedStyles.helperText}>
        Replace this content with your page feature.
      </p>

      <AppButton text="Continue" onClick={() => alert("Button clicked")} />
    </PageCard>
  );
}