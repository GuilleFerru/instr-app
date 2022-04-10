export const footerStyle = (theme) => {
  return {
    content: {
      position: "fixed",
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent:"center",
      marginTop:'auto',
      marginBottom:'10px',
      "& a": {
        textDecoration: "none",
        color: "inherit",
      },
      
    },
  };
};
