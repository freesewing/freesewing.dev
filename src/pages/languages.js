import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../components/layout"
import { Robot } from "@freesewing/components";
import { languages } from "@freesewing/i18n";

const LanguagePage = props => {

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
    text: {
      maxWidth: "600px"
    },
    heading: {
      margin: "2rem 0 0"
    }
  }

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <h1 style={styles.heading}>Languages</h1>
          <Robot size={300} pose="shrug"/>
          <div style={styles.text}>
            <p>Unfortunately, our developer documentation is currently only available in English.</p>
            <p>If you'd like to help us translate the developer documentation to other languages,
            please <a href="https://gitter.im/freesewing/freesewing">get in touch</a>.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LanguagePage;
