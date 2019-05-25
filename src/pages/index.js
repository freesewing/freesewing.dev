import React from "react"
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
      top: "15px",
      right: "calc(50% - 175px)",
      opacity: 0.1,
      overflow: "hidden",
    },
    slogan: {
      marginBottom: "3rem",
    },
    button: {
      margin: "0.5rem",
      width: "180px",
    },
    boxes: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      padding: "2rem 0",
    },
    box: {
      padding: "1rem",
      maxWidth: "25%",
      minWidth: "314px",
    },
    slab: {
      margin: "1rem auto 0",
      padding: "2rem 20% 4rem",
    },
    right: {
      textAlign: "right",
    },
  }

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.header} className="altbg">
          <div style={styles.logo}>
            <Logo size={350} />
          </div>
          <h1>FreeSewing</h1>
          <h2 className="bare" style={styles.slogan}><FormattedMessage id="dev.slogan" defaultMessage="A JavaScript library for made-to-measure sewing patterns" /></h2>
          <Button
            size="large"
            color="primary"
            style={styles.button}
            href="/start" variant="contained"
          >Get started</Button>
          <Button
            size="large"
            color="secondary"
            style={styles.button}
            href="/tutorial"
            variant="contained"
          >Tutorial</Button>
          <p>
        (*) <b>Note</b>: This site is part of our FreeSewing 2.x efforts. It is a work in progress
          </p>
        </div>
        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2><FormattedMessage id="dev.getStartedInSeconds" defaultMessage="Get started in seconds"/></h2>
            <p>
              All you need to jump-start your development
              is one command:
            </p>
            <div className="gatsby-highlight">
              <pre className="language-bash">
              <code className="language-bash">
                npm init freesewing-pattern@beta
              </code>
              </pre>
            </div>
            <p>You can try it out right now, or learn more about what to expect.</p>
            <Button variant="outlined">Learn more</Button>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="dev.renderToSvgOrReact" defaultMessage="Render to SVG or React"/></h2>
            <p>Patterns are rendered in SVG, giving you flawless quality at every zoom level, and the ability to export to a number of formats including PDF.</p>
            <p>Or use our React component to further integrate patterns into your front-end.
    </p>
            <Button variant="outlined">Learn more</Button>
          </div>
          <div style={styles.box}>
            <h2><FormattedMessage id="dev.discoverTheEcosystem" defaultMessage="Discover the ecosystem"/></h2>
            <p>There's more to FreeSewing than our core library.</p>
            <p>Discover our collection of patterns, plugins, and other tools.</p>
            <Button variant="outlined">Learn more</Button>
          </div>
        </div>
        <div className="altbg" style={styles.slab}>
            <h2 className="bare"><FormattedMessage id="dev.getStartedInSeconds" defaultMessage="Learn by example"/></h2>
            <p>Tutorial yada yada</p>
            <Button variant="outlined">Learn more</Button>
        </div>

        <div style={{...styles.slab, ...styles.right}}>
            <h2 className="bare"><FormattedMessage id="dev.getStartedInSeconds" defaultMessage="Where to get help"/></h2>
            <p>FreeSewing is a 100% communal project.</p>
            <Button variant="outlined">Learn more</Button>
        </div>

        <div className="altbg" style={styles.slab}>
            <h2 className="bare"><FormattedMessage id="dev.getStartedInSeconds" defaultMessage="Support FreeSewing"/></h2>
            <p>FreeSewing is a 100% communal project.</p>
            <Button variant="outlined">Learn more</Button>
        </div>

      </div>
    </Layout>
  );
}

export default IndexPage;
