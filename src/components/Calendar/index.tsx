"use client";
import { useState } from "react";
import Img from "next/image";
import left from "../../../public/images/left.png";
import right from "../../../public/images/right.png";

export default function Calendar() {
 
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 7, 1));

  const weddingDate = new Date(2024, 8, 2); 

  const daysOfWeek = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"];
  const months = [
    "Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", 
    "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"
  ];

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <div key={index} className="day-name">
        {day}
      </div>
    ));
  };

  const renderDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isWeddingDay =
        year === weddingDate.getFullYear() &&
        month === weddingDate.getMonth() &&
        day === weddingDate.getDate();
        
      days.push(
        <div
          key={day}
          className={`day ${isWeddingDay ? "wedding-day" : ""}`}
        >
          {day}
        </div>
      );
    }
  
    return days;
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="header mt-5 mb-5">
        <button onClick={() => changeMonth(-1)}><Img src={left} alt="previous" width={10} height={10} /></button>
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}><Img src={right} alt="next" width={10} height={10} /></button>
      </div>
      <div className="days-of-week">{renderDaysOfWeek()}</div>
      <div className="days">{renderDaysInMonth()}</div>

      <style jsx>{`
        .calendar {
          width: 300px;
          margin: 15px auto;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header button {
          margin: 0 20px;
        }
        .days-of-week,
        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .day-name,
        .day,
        .empty-day {
          padding: 10px;
          border: 1px solid #ddd;
        }
        .day {
          background-color: #f9f9f9;
          
        }
        .empty-day {
          background-color: #fff;
        }
        .wedding-day {
          background-color: transparent;
          border-color: red;
          border-radius: 50%;
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
