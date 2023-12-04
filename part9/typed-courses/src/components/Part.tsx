import { ReactElement } from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const { part } = props;

  const details = (): ReactElement => {
    switch (part.kind) {
      case 'basic':
        return <div>{part.description}</div>;
      case 'group':
        return <div>project exercises {part.groupProjectCount}</div>;
      case 'background':
        return (
          <div>
            {part.description} <br />
            required background {part.backgroundMaterial}
          </div>
        );
      case 'special':
        return (
          <div>
            {part.description} <br />
            required skills: {part.requirements.join(', ')}
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      <h3>
        {part.name} {part.exerciseCount}
      </h3>
      {details()}
    </div>
  );
};

export default Part;
