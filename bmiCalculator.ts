const calculateBmi = (height: number, weight: number): string => {
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

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));