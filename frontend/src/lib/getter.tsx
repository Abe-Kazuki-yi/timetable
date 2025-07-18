export async function getProgressFromDay(day: number){
    const response = await fetch('http://localhost:8080/api/test/progress/' + day)
    const value: number = await response.json();
    return value;
}