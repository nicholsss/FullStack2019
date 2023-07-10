interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number

}
const calculateExercises = (dailyExercises: number[], target: number): Result => {
    let trainingDays = 0;
    dailyExercises.forEach((day) => {
        if (day > 0) {
            trainingDays++;
        }
    })
    let averageSum = 0
    dailyExercises.forEach((day) => {
        averageSum += day
    })
    const average = averageSum / dailyExercises.length
    const success = average >= target

    let rating
    let ratingDescription

    if (success) {
        rating = 3;
        ratingDescription ='GJ'
    }else if( average >= target ){
        rating = 2
        ratingDescription='Do More'
    } else{
        rating =1
        ratingDescription='bad results'
    }

    const result: Result = {
        periodLength: dailyExercises.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
    return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))