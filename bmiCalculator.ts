const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / height / height * 10000;
  if (bmi > 40) {
    return 'Morbidly Obese range';
  } else if (bmi > 35) {
    return 'Severely Obese range';
  } else if (bmi > 30) {
    return 'Obese range';
  } else if (bmi > 25) {
    return 'Overweight range';
  } else if (bmi > 18.5) {
    return 'Normal range';
  } else {
    return 'Underweight range';
  }
};

console.log(calculateBmi(180, 74));