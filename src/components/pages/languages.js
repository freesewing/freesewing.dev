import React, { useEffect } from "react"
import Robot from "@freesewing/components/Robot";
import { FormattedMessage } from "react-intl";

const LanguagePage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="account.language" />);
  }, []);

  return (
    <React.Fragment>
      <Robot size={300} pose="shrug"/>
      <p>Unfortunately, our developer documentation is currently only available in English.</p>
      <p>If you'd like to help us translate the developer documentation to other languages,
      please <a href="https://gitter.im/freesewing/freesewing">get in touch</a>.</p>
    </React.Fragment>
  );
}

export default LanguagePage;
