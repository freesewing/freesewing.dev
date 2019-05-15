import React from "react";

const Menu = props => {
  return (
    <div className="menu only-xs" onClick={props.closeNav}>
      <div>
        <p>Show menu please</p>
      </div>
    </div>
  );
};

export default Menu;
