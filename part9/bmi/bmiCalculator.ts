
// calculate bmi and returns a message of the result
// height in centimeters, weight in kilograms
const calculateBmi = (height: number, weight: number) : string => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters ** 2)
    if (bmi < 0) {
        return "Something is wrong (BMI cannot be negative)"
    }
    if (bmi < 18.5) {
        return "Underweight (Unhealthy)"
    } else if (bmi < 25) {
        return "Normal (Healthy)"
    } else if (bmi < 30) {
        return "Overweight (At risk)"
    } else {
        return "Obese"
    }
}

console.log(calculateBmi(180, 74))