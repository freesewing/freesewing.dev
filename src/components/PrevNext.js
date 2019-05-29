import React from "react";
import { Link } from "gatsby"
import PrevIcon from "@material-ui/icons/KeyboardArrowLeft";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";

const PrevNext = props => {

  const link = (slug, type) => (
    <React.Fragment>
      <Link to={slug} className={type}>
        { type === "prev"
          ? <span className="arrow prev">&laquo;</span>
          : null
        }
        {props.markdown[slug].node.node.frontmatter.title}
        { type === "next"
          ? <span className="arrow next">&raquo;</span>
          : null
        }
      </Link>
    </React.Fragment>
  );

  return (
    <div className="prev-next">
      <div>
        {props.prev
          ? link(props.prev, 'prev')
          : null
        }
      </div>
      <div>
        {props.next
          ? link(props.next, 'next')
          : null
        }
      </div>
    </div>
  );
};

export default PrevNext;
