import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../components/layout"
import { FormattedMessage } from "react-intl";
import { languages } from "@freesewing/i18n";

const SearchPage = props => {

  const styles = {
    container: {
      display: "flex",
      minHeight: "50vh",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      textAlign: "center",
    },
    button: {
      margin: "0.5rem",
      width: "120px",
    },
  }

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <h1>404</h1>
          FIXME: Not found
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
