import React from "react"
import Layout from "../components/layout"

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
