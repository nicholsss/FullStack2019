
type CoursePart = {
    name: string;
    exerciseCount:number;
}

type ContentProps = {
    courseParts: CoursePart[];
  };

const Content = ({ courseParts }: ContentProps) => {
    const contentPart = courseParts.map(course => (
        <div key={course.name}>
            <p>{course.name} {course.exerciseCount}</p>
        </div>
    ))
    return <div>{contentPart}</div>
  };
  
  export default Content;