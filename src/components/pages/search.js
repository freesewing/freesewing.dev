import React, { useEffect } from "react"
import Robot from "@freesewing/components/Robot";
import { FormattedMessage } from "react-intl";

const SearchPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(<FormattedMessage id="app.search" />);
  }, []);

  return (
    <React.Fragment>
      <Robot size={300} pose="shrug2"/>
      <p>FIXME: Under construction</p>
    </React.Fragment>
  );
}

export default SearchPage;
