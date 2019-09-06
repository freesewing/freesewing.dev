import React from 'react'

const ShoutOuts = props => {
  const styles = {
    wrapper: {
      background: '#212529',
      margin: '0',
      color: '#fffa',
      textAlign: 'center',
      padding: '2rem 1rem'
    },
    inner: {
      margin: '0 auto',
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    box: {
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flexGrow: 2
    },
    intro: {
      fontFamily: 'Roboto Condensed',
      fontSize: '1rem'
    },
    logo: {
      maxWidth: '200px',
      maxHeight: '51px'
    },
    h6: {
      margin: "1rem 0 0.5rem"
    }
  }

  return (
    <section style={styles.wrapper}>
      <div style={styles.intro}>These awesome companies harbour us</div>
      <div style={styles.inner}>
        <div style={styles.box}>
          <h6 style={styles.h6}>Search</h6>
          <a href="https://www.algolia.com">
            <img src="/brands/algolia.svg" alt="Search by Algolia" style={styles.logo} />
          </a>
        </div>
        <div style={styles.box}>
          <h6 style={styles.h6}>Translation</h6>
          <a href="https://crowdin.com">
            <img src="/brands/crowdin.svg" alt="Translation by Crowdin" style={styles.logo} />
          </a>
        </div>
        <div style={styles.box}>
          <h6 style={styles.h6}>Hosting</h6>
          <a href="https://www.netlify.com">
            <img src="/brands/netlify.svg" alt="Deploys by Netlify" style={styles.logo} />
          </a>
        </div>
        <div style={styles.box}>
          <h6 style={styles.h6}>Error handling</h6>
          <a href="https://www.bugsnag.com/">
            <img src="/brands/bugsnag.svg" alt="Error handling by Bugsnag" style={styles.logo} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ShoutOuts
