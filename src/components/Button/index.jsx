import React from "react";
import './button.scss';

const Button = ({btnType, url, children}) => {

  return (
    <div id="CustomButton">
        <button className={btnType}>
            <a href={url}>{children}</a>
        </button>
    </div>
  );
};

export default Button;