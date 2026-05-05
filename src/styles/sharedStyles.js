import theme from "./theme";
const sharedStyles = {
  pageCard: {
    width: "420px",
    maxWidth: "90vw",
    minHeight: "540px",
    padding: "42px",
  
    background: "rgba(0, 0, 0, 0.68)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.18)",
  
    color: theme.colors.text,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  
    margin: "0 auto"
  },
    title: {
        textAlign: "center",
        marginBottom: "18px",
        fontSize: "38px",
        fontWeight: "bold",
        color: theme.colors.text
      },
      label: {
        marginBottom: "6px",
        fontSize: "14px",
        fontWeight: "bold",
        color: theme.colors.text
      },
      input: {
        width: "100%",
        padding: "12px",
        marginBottom: "18px",
        borderRadius: theme.radius.input,
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.inputBg,
        color: theme.colors.text,
        fontSize: "14px",
        outline: "none"
      },
      button: {
        width: "100%",
        padding: "12px",
        background: theme.colors.primary,
        border: "none",
        borderRadius: theme.radius.button,
        color: theme.colors.text,
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "8px"
      },
      link: {
        marginTop: "16px",
        textAlign: "center",
        color: theme.colors.primary,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold"
      },
      helperText: {
        textAlign: "center",
        color: theme.colors.mutedText,
        fontSize: "14px",
        marginTop: "10px"
      }
    };
    export default sharedStyles;