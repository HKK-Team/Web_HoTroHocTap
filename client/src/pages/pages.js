import React, { Fragment } from "react";
import PagesLecturers from "../lecturers/pagesLecturers";
import PagesStudents from "../students/pages/pagesStudents";
import PagesHome from "./pagesHome";
function Pages() {
  
  return (
    <Fragment>
      <PagesHome/>
      <PagesStudents/>
      <PagesLecturers />
    </Fragment>
  );
}
export default Pages;
