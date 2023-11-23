const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const bmi: number = weight / (heightMeters * heightMeters);

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

console.log(calculateBmi(181, 78));
