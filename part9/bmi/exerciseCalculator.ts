interface resultObject {
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
  targetHours: number
): resultObject => {
  const result: resultObject = {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((h) => h !== 0).length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: targetHours,
    average: 0,
  };
  result.average =
    dailyExerciseHours.reduce((sum, num) => sum + num, 0) / result.periodLength;
  result.success = result.average >= result.target;
  result.rating = result.success
    ? 3
    : result.average / result.target > 0.7
    ? 2
    : 1;
  switch (result.rating) {
    case 3:
      result.ratingDescription = "well done!";
      break;
    case 2:
      result.ratingDescription = "not too bad but could be better";
      break;
    default:
      result.ratingDescription = "too bad!";
  }
  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
