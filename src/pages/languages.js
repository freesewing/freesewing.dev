import React from "react"
import Button from "@material-ui/core/Button";
import Layout from "../components/layout"
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
  }

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.wrapper}>

      { Object.keys(languages).map( locale => {
          return <Button
            variant="contained"
            size="large"
            color="primary"
            style={styles.button}
            href={"https://"+locale+".freesewing.dev/"}
          >{languages[locale]}</Button>
        })
      }
        </div>
      </div>
    </Layout>
  );
}

export default LanguagePage;
