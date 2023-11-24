interface bmiValues {
  height: number;
  weight: number;
}

const calculateBmi = (height?: number, weight?: number): string => {
  const parseArgs = (): bmiValues => {
    if (process.argv.length !== 4) throw new Error('Incorrect arguments');
    if (process.argv.length === 4) {
      if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) {
        throw new Error('Provided values were not numbers!');
      }
    }
    const returnValue = {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3]),
    };
    return returnValue;
  };

  const args: bmiValues =
    !height && !weight ? parseArgs() : ({ height, weight } as bmiValues);
  const heightMeters = args.height / 100;
  const bmi: number = args.weight / (heightMeters * heightMeters);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else if (bmi < 35) {
    return 'Moderately obese';
  } else if (bmi < 40) {
    return 'Severely obese';
  } else {
    return 'Very severely obese';
  }
};

export const calculateBmiCLI = () => {
  console.log(calculateBmi());
};

export default calculateBmi;
