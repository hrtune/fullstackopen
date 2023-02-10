interface exerciseHours {
  dailyExerciseHours: number[];
  targetHours: number;
}

const parseArgumentsForExercise = (args: string[]): exerciseHours => {
  if (args.length < 4) {
    throw new Error("at least 2 arguments are required");
  }

  const numberedArgs = args.slice(2).map((n) => Number(n));

  numberedArgs.forEach((n) => {
    if (isNaN(n)) {
      throw new Error("arguments must be numbers");
    }
  });

  const dailyExerciseHours = numberedArgs.slice(1, args.length - 1);
  const targetHours = numberedArgs[0];

  return { dailyExerciseHours, targetHours };
};
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

try {
  const { dailyExerciseHours, targetHours } = parseArgumentsForExercise(
    process.argv
  );
  const result = calculateExercises(dailyExerciseHours, targetHours);
  console.log(result);
} catch (error: unknown) {
  if (!(error instanceof Error)) {
    console.log("Something bad happened.");
  } else {
    console.log("Error " + error.message);
  }
}
