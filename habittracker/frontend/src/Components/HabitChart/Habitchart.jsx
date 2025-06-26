import { useEffect, useState } from 'react';
import './Habitchart.jsx';
import { Bar } from "react-chartjs-2";
import { getHabitsByUsername } from "../../Api/habitApi.js";
import "./Habitchart.scss";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale, 
    BarElement,
    Title,
    Legend
} from "chart.js";
ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend
);
const HabitChart = () =>{
    const [habits, setHabitData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {//fetch chartData on every render
        const fetchData = async () =>{
            try{
                const username = localStorage.getItem('username');
                const res = await getHabitsByUsername(username);
                console.log('getHabitsByUsername returned:', res);
                setHabitData(res);
            }catch(err){
                console.log("Error with habitchart useEffect", err);
            }
        };
        fetchData();
    }, [])

useEffect(() => {
  if (habits.length > 0) {
    const numericDurations = habits.map((habit) => {
      // Remove anything that's not a digit
      const cleaned = habit.duration.replace(/\D/g, "");
      const num = parseInt(cleaned, 10); 
      return isNaN(num) ? 0 : num;
    });
    setChartData({
      labels: habits.map((habit) => habit.name),
      datasets: [
        {
          label: "Duration (Min)",
          data: numericDurations,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        }
      ]
    });
  } else {
    setChartData(null);
  }
}, [habits]);//run when habits array is changed
    return(
        <div className='wrapper'>
            <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Daily Habit Chart</h2>
            {chartData?.labels ? (
                <Bar data={chartData}/>
            ): (
                <p>No Habits To Chart ...</p>
            )}
            </div>
        </div>
  );
};
export default HabitChart;