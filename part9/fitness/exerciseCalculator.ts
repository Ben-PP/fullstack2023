interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateWeek = (hours: number[]): Result => {
  const trainingDays: number = hours.filter((h) => h > 0).length;
  const target: number = 2;
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

console.log(calculateWeek([3, 0, 10, 10, 0, 3, 1]));
