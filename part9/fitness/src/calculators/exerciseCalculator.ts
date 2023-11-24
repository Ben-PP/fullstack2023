interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface exceriseValues {
  target: number;
  hours: number[];
}

const calculateExercises = (targetHours?: number, days?: number[]): Result => {
  const parseArgs = (): exceriseValues => {
    if (process.argv.length <= 4) throw new Error('Incorrect arguments');
    const target: number = Number(process.argv[2]);
    const hours: number[] = process.argv.slice(3).map((h) => Number(h));
    if (process.argv.length >= 4) {
      if (isNaN(Number(process.argv[2])) || !hours.every((h) => !isNaN(h))) {
        throw new Error('Provided values were not numbers!');
      }
    }
    const returnValue: exceriseValues = {
      target: target,
      hours: hours,
    };
    return returnValue;
  };

  const args: exceriseValues =
    !targetHours && !days
      ? parseArgs()
      : ({ target: targetHours, hours: days } as exceriseValues);
  const hours: number[] = args.hours;
  const trainingDays: number = hours.filter((h) => h > 0).length;
  const target: number = args.target;
  const rating: number = hours.reduce((a, b) => a + b, 0) / hours.length;
  let ratingDescription: string = '';
  if (rating - target < -0.5) {
    ratingDescription = 'You are not doing enough';
  } else if (rating - target > -0.5 && rating - target < 0.5) {
    ratingDescription = 'You are doing ok';
  } else {
    ratingDescription = 'You are doing great';
  }

  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: rating >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: hours.reduce((a, b) => a + b, 0) / hours.length,
  };
};

export const excerciseCalculatorCLI = () => {
  console.log(calculateExercises());
};

export default calculateExercises;
