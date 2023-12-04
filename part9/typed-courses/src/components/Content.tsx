import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const { parts } = props;
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
