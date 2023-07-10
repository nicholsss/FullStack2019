const calculateBmi = (height: number, weight: number)  => {
    const bmiHeight = height /100;
    const bmi = weight / (bmiHeight ** 2)
    if (bmi < 18.5) {
        return 'Underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
      } else {
        return 'Overweight';
      }
}
const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
console.log(calculateBmi(a, b))