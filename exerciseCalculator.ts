import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Too few arguments!');
  if (isNotNumber(args[2])) throw new Error('Argument for target not a number!');

  const input = args.slice(3);
  const dailyHours = input.map(d => {
    if (isNotNumber(d)) throw new Error('Arguments for daily hours not of type number!');
    return Number(d);
  });

  return {
    target: Number(args[2]),
    dailyHours
  };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(d => d !== 0).length;
  const hoursSum = dailyHours.reduce((a, d) => a + d, 0);
  const average = hoursSum / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'very good';
  } else if ((target - average) < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}