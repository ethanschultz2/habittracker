
const BASE_URL = "http://localhost:8080/api";

//getting habits by username
export async function getHabitsByUsername(username){
    const res = await fetch(`${BASE_URL}/user/${username}/habits`);
    if(!res.ok)throw new Error("Failed to fetch habits");
    return res.json();
}
//creating habit
export async function createHabit(habit){
    const res = await fetch(`${BASE_URL}/habit/create`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({habit}),
    });
    if(!res.ok)throw new Error("Failed to create habit");
    return res.json();
}