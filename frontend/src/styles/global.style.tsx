import { Global } from "@mantine/core";

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme) => ({
          body:{
              background:"linear-gradient(352.6deg, #ACBBC1 -45.21%, #F3F3F3 101.92%)",
              minHeight:'100vh'
          },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "table.md, table.md th:nth-of-type(odd), table.md td:nth-of-type(odd)":
          {
            background:"linear-gradient(352.6deg, #ACBBC1 -45.21%, #F3F3F3 101.92%)",

      },
        "table.md td": {
          paddingLeft: "0.5em",
          paddingRight: "0.5em",
        },
      })}
    />
  );
};
export default GlobalStyle;
