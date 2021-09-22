import React, { useState } from 'react';

const MicroCalendar = props => {
    const {
        locale = 'default',
        monthDisplayLength = 'long',
        weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
        prevButton = '<',
        nextButton = '>',
        applySelectionButtonLabel = 'OK',
        onDateSelected,
    } = props;
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const weeks = Array.from({ length: 6 }, i => i);
    const startOfMonth = new Date(currentYear, currentMonth).getDay() - 1;
    const daysOnMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    let currentDayOfMonth = 0;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const prevMonth = () => {
        if (currentMonth - 1 < 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    const nextMonth = () => {
        if (currentMonth + 1 > 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    const isToday = date => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    const isPast = date => {
        return date.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)
    }

    const isFuture = date => {
        return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
    }

    const handleDateSelection = params => {
        const { currentYear, currentMonth, currentDay } = params;

        if (!startDate) {
            setStartDate(new Date(currentYear, currentMonth, currentDay));
        } else if (!endDate) {
            const selectedEndDate = new Date(currentYear, currentMonth, currentDay);
            if (selectedEndDate < startDate) {
                setEndDate(startDate);
                setStartDate(selectedEndDate);
            } else {
                setEndDate(selectedEndDate);
            }
        } else {
            setStartDate(new Date(currentYear, currentMonth, currentDay));
            setEndDate(null);
        }
    }

    const applyDateSelection = () => {
        onDateSelected({ startDate, endDate });
        setStartDate(null);
        setEndDate(null);
    }

    const isDaySelected = date => {
        return date.setHours(0,0,0,0) >= startDate?.setHours(0,0,0,0) && date.setHours(0,0,0,0) <= (endDate?.setHours(23,59,59,0) || startDate?.setHours(23,59,59,0));
    }

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={prevMonth}>{prevButton}</button>
                    <span>{new Date(currentYear, currentMonth).toLocaleString(locale, { month: monthDisplayLength })} {currentYear}</span>
                    <button onClick={nextMonth}>{nextButton}</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {weekdays.map((day, i) => <th key={i}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map((week, i) => {
                            return (
                                <tr key={i}>
                                    {weekdays.map((day, j) => {
                                        let dayClassList = [];
                                        if ((i === 0 && j < startOfMonth) || currentDayOfMonth >= daysOnMonth) {
                                            return <td key={j}></td>
                                        } else {
                                            currentDayOfMonth++;
                                            const currentDay = currentDayOfMonth;
                                            const date = new Date(currentYear, currentMonth, currentDay);
                                            isToday(date) && dayClassList.push('today');
                                            isPast(date) && dayClassList.push('past');
                                            isFuture(date) && dayClassList.push('future');
                                            isDaySelected(date) && dayClassList.push('selected');
                                            return (
                                                <td
                                                    key={j}
                                                    {...(dayClassList.length > 0 && { className: dayClassList.join(' ') })}
                                                    onClick={() => handleDateSelection({ currentYear, currentMonth, currentDay })}
                                                >
                                                    {currentDay}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="calendar-controls">
                <button onClick={applyDateSelection} disabled={!startDate && !endDate}>{applySelectionButtonLabel}</button>
            </div>
        </>
    );
}

export default MicroCalendar;