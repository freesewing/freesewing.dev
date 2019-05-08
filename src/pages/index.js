import React from "react"
import { Link } from "gatsby"
import { Logo } from "@freesewing/components";
import Button from "@material-ui/core/Button";
import Layout from "../components/layout"
import { FormattedMessage } from "react-intl";

const IndexPage = props => {

  const styles = {
    container: {
      flexGrow: 2,
    },
    header: {
      textAlign: "center",
      minHeight: "300px",
      padding: "3rem 1rem",
      fontFamily: "'Roboto Condensed', sans-serif",
      position: "relative",
    },
    link: {
      fontSize: "3rem",
    },
    logo: {
      position: "absolute",
      top: "74px",
      right: "calc(50% - 200px)",
      opacity: 0.1,
      overflow: "hidden",
    },
    button: {
      margin: "0.5rem"
    }
  }

  const lang = process.env.GATSBY_LANG;
  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Logo size={400} />
        </div>
        <div style={styles.header}>
          <h1><a style={styles.link} href={`https://${lang}.freesewing.org/`}>FreeSewing</a></h1>
          <h2><FormattedMessage id="dev.slogan"/></h2>
          <h2>A JavaScript library for made-to-measure sewing patterns</h2>
          <Button
            size="large"
            color="primary"
            style={styles.button}
            href="/docs" variant="contained"
          >Get started</Button>
          <Button
            size="large"
            color="primary"
            style={styles.button}
            href="/tutorial"
            variant="outlined"
          >Tutorial</Button>
          <p>
        (*) <b>Note</b>: This site is part of our FreeSewing 2.x efforts. It is a work in progress
          </p>
        </div>
        <div>
          <div>
            <h2><FormattedMessage id="dev.hitTheGroundRunning"/></h2>
            <code>npm init freesewing pattern</code>
            <p>Yada yada one-liner, workbench, blah</p>
          </div>
          <div>
            <h2><FormattedMessage id="dev.renderToSvgOrReact"/></h2>
            <p>Yada yada SVG blah React</p>
          </div>
          <div>
            <h2><FormattedMessage id="dev.discoverTheEcosystem"/></h2>
            <p>Yada yada SVG blah all of the packages and repos</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage
