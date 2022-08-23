interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.filter(
    (val) => val > 0
  ).length;
  const average: number =
    dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success: boolean = average >= target;
  let rating: number;
  let ratingDescription: string;
  if (average - target > 3) {
    rating = 3;
    ratingDescription = "Well done! You went well above the target";
  } else if (average - target >= 0) {
    rating = 2;
    ratingDescription = "Nice, you hit your target.";
  } else {
    rating = 1;
    ratingDescription = "YOU FAILED";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export {calculateExercises};