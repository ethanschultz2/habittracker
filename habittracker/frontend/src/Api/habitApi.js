
const BASE_URL = "http://localhost:8080/api";

//getting habits by username
export async function getHabitsByUsername(username){
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/habit/user/${username}/habits`, {
        headers: { 
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!res.ok) throw new Error("Failed to fetch habits");
    return res.json();
}
//deleting habit by habit id
export async function deleteHabitById(id){
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/habit/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
}
//creating habit
export async function createHabit(habit){
    const token = localStorage.getItem("token");
    console.log("Sending habit data", habit);
    const res = await fetch(`${BASE_URL}/habit/create`,{
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(habit),
    });
    if(!res.ok)throw new Error("Failed to create habit");

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        alert(habit);
        console.log(data);
        return data;
    } else {
        throw new Error("Server returned non-JSON response");
    }
}