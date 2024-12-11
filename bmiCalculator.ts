import { isNotNumber } from "./utils";

interface CalculatorValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length > 4) throw new Error('Too many arguments!');
  if (args.length < 4) throw new Error('Too few arguments!');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / height / height * 10000;
  if (bmi > 40) {
    return 'Morbidly Obese';
  } else if (bmi > 35) {
    return 'Severely Obese';
  } else if (bmi > 30) {
    return 'Obese';
  } else if (bmi > 25) {
    return 'Overweight';
  } else if (bmi > 18.5) {
    return 'Normal range';
  } else {
    return 'Underweight';
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}