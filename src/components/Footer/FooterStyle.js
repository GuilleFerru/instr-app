export const footerStyle = (theme) => {
  return {
    content: {
      display:"flex",
      justifyContent:"center",
      flexGrow: "1",
      overflow: "auto",
      "& a": {
        textDecoration: "none",
        color: "inherit",
      },
    },
  };
};
