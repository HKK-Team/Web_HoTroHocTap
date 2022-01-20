import React from "react";
import "./headerTable.css";

export default function headerTable(props) {
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
    </div>
  );
}
export function HeaderTable(props) {
  return (
    <div className="header-table">
      <h1 className="header-table-title">{props.title}</h1>
    </div>
  );
}
