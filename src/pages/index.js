import React from "react"
import { Logo } from "@freesewing/components";
import Button from "@material-ui/core/Button";
import Layout from "../components/layout"
import { FormattedMessage } from "react-intl";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const IndexPage = props => {
  const mobile = useMediaQuery("(max-width:599px)");
  const tablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");

  const styles = {
    container: {
      flexGrow: 2,
    },
    headerWrapper: {
      backgroundImage: "url('/horizon.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
    },
    header: {
      minHeight: "300px",
      padding: "3rem 2rem",
      fontFamily: "'Roboto Condensed', sans-serif",
      position: "relative",
      backgroundImage: "url('/flag.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "90% -30%",
    },
    innerHeader: {
      maxWidth: "650px",
      padding: "1rem 2rem",
      ackground: "rgba(255,255,255,0.35)",
      borderRadius: "4px",

    },
    h1: {
      margin: "0 0 2rem 0",
      padding: 0,
      fontWeight: 900,
      color: "#fff",
    },
    h2: {
      borderColor: "rgba(255,255,255,0.25)",
      margin: "0 0 1rem 0",
      color: "#fff",
    },
    link: {
      fontSize: "3rem",
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
    primaryButton: {
      background: "#fff",
      borderColor: "#fff",
      color: "#212529",
      margin: "0.5rem",
    },
    secondaryButton: {
      background: "rgba(255,255,255,0.5)",
      color: "#212529",
      borderColor: "#fff",
    },
  }
  if (tablet) {
    styles.header.backgroundSize = "30vh";
    styles.header.backgroundPosition = "90% calc(100% + 40px)";
  }
  if (mobile) {
    styles.header.backgroundSize = "20vh";
    styles.header.backgroundPosition = "90% calc(100% + 20px)";
  }

  return (
    <Layout navbar={false}>
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          <div style={styles.header}>
            <div style={styles.innerHeader}>
              <h1 style={styles.h1}>FreeSewing</h1>
              <h2 style={styles.h2}><FormattedMessage id="dev.slogan" defaultMessage="A JavaScript library for made-to-measure sewing patterns" /></h2>
              <Button
                size="large"
                color="secondary"
                style={styles.button}
                href="/start" variant="contained"
                style={styles.primaryButton}
              >Get started</Button>
              <Button
                size="large"
                color="secondary"
                style={styles.button}
                href="/tutorial"
                variant="outlined"
                style={styles.secondaryButton}
              >Tutorial</Button>
            </div>
          </div>
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
            <Button variant="outlined" href="/start">Learn more</Button>
          </div>
          <div style={styles.box}>
            <h2>FreeSewing tutorial</h2>
            <p>Follow our step-by-step tutorial to familiarize yourself with the <a href="/concepts">basic concepts</a> and inner workings of FreeSewing.</p>
            <p>You'll learn everything you need to start designing your own made-to-measure sewing patterns.</p>
            <Button variant="outlined" href="/tutorial">Take the tutorial</Button>
          </div>
          <div style={styles.box}>
            <h2>API Reference</h2>
            <p>Detailed documentation for FreeSewing's API, including examples.</p>
            <p>We also have <a href="/do">best practices</a> and <a href="/advanced">advanced guides</a> to take your work to the next level.</p>
            <Button variant="outlined" href="/packages">API Documentation</Button>
          </div>
        </div>

        <div style={styles.boxes}>
          <div style={styles.box}>
            <h2>Where to get help</h2>
            <p>The FreeSewing is ready to help out when you get stuck or have questions.</p>
            <p>Join us <a href="https://gitter.im/freesewing/freesewing">in our chat room</a> for help, advice, or just a friendly chat.</p>
            <Button variant="outlined" href="https://gitter.im/freesewing/freesewing">Join our chat room</Button>
          </div>
          <div style={styles.box}>
            <h2>Contribute to FreeSewing</h2>
            <p>
              FreeSewing is a communal project carried entirely by voluntary contributors.
            </p>
            <p>Click below to find out more about how you can contribute to FreeSewing.</p>
            <Button variant="outlined" href="/contribute">How to contribute</Button>
          </div>
          <div style={styles.box}>
            <h2>Support FreeSewing</h2>
            <p>FreeSewing lives by the grace of <a href="https://freesewing.org/patrons">our patrons</a> who support the project financially.</p>
            <p>If you think what we do is worthwhile, and if you can spare a few coins each month without hardship, you too should <a href="https://freesewing.org/patrons/join">become a patron of FreeSewing</a>.</p>
            <Button variant="outlined" href="https://freesewing.org/patrons/join">Join the FreeSewing Patrons</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
