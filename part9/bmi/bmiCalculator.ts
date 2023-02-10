interface bodyStats {
  height: number;
  weight: number;
}

// parse command line arguments and return them as an array
const parseArgumentsForBmi = (args: string[]): bodyStats => {
  if (args.length !== 4) {
    throw new Error("number of arguments must be 2");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("arguments must be numbers");
  }

  return { height, weight };
};

// calculate bmi and returns a message of the result
// height in centimeters, weight in kilograms
const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;
  if (bmi < 0) {
    return "Something is wrong (BMI cannot be negative)";
  }
  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi < 25) {
    return "Normal (Healthy)";
  } else if (bmi < 30) {
    return "Overweight (At risk)";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = parseArgumentsForBmi(process.argv);
  const message = calculateBmi(height, weight);
  console.log(message);
} catch (error: unknown) {
  if (!(error instanceof Error)) {
    console.log("Something bad happened.");
  } else {
    console.log("Error " + error.message);
  }
}
