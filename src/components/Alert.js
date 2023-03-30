import React from "react";

export default function Alert(props) {
    const toupper = (text)=>{
        if(text === "danger")
            text = "error";
        let word = text.toLowerCase();
        return word.charAt(0).toUpperCase()+word.slice(1);
    }
  return (
      props.alert && <div className={`alert alert-${props.alert.type}`} style={{ position: `absolute`, width: `100vw` }} role="alert">
        {toupper(props.alert.type)} : {props.alert.msg}
      </div>
  );
}
