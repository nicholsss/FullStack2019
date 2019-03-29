import React from "react";

const Course = props =>
  props.courses.map(course => (
    <div key={course.id}>
      <h1>{course.name} </h1>
      {course.parts.map(part => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      yhteensa {course.parts.reduce((s, p) => s + p.exercises, 0)} tehtavaa
    </div>
  ));

export default Course;
