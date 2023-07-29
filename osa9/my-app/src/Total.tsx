
type CoursePart = {
    name: string;
    exerciseCount: number;
}

type ContentProps = {
    courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
    return <p> Number of exercises{" "} {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} </p>

};

export default Content;