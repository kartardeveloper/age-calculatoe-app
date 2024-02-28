import { useState } from "react";
import { DateInputForm } from "./components/DateInputForm";
import { DateOutputBox } from "./components/DateOutputBox";

function App() {
  const today = new Date();
  const [age, setAge] = useState({});

  const [dayErrorMessage, setDayErrorMessage] = useState("");
  const [monthErrorMessage, setMonthErrorMessage] = useState("");
  const [yearErrorMessage, setYearErrorMessage] = useState("");

  const checkMaxDays = (birthDay, birthMonth, birthYear) => {
    const maxDays = new Date(birthYear, birthMonth, 0).getDate();
    if (birthDay > maxDays) {
      setDayErrorMessage("Must be a valid day");
    } else {
      setDayErrorMessage("");
    }
  };

  const birthDayLogicErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthDay > 31) {
      setDayErrorMessage("Must be a valid day");
    } else {
      if (
        Number(birthDay) >= today.getDate() &&
        birthYear == today.getFullYear()
      ) {
        setDayErrorMessage("Must be in the past");
      } else {
        checkMaxDays(birthDay, birthMonth, birthYear);
        setDayErrorMessage("");
      }
    }
  };

  const birthMonthLogicErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthMonth > 12) {
      setMonthErrorMessage("Must be a valid month");
    } else {
      if (
        birthMonth > today.getMonth() + 1 &&
        birthYear == today.getFullYear()
      ) {
        setMonthErrorMessage("Must be in the past");
      } else {
        setMonthErrorMessage("");
        checkMaxDays(birthDay, birthMonth, birthYear);
      }
    }
  };

  const birthYearLogicErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthYear > today.getFullYear()) {
      setYearErrorMessage("Must be in the past");
    } else {
      setYearErrorMessage("");
      checkMaxDays(birthDay, birthMonth, birthYear);
    }
  };

  const birthDayErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthDay === "") {
      setDayErrorMessage("This field is required");
    } else {
      if (birthDay < 1) {
        setDayErrorMessage("Must be a valid day");
      } else {
        birthDayLogicErrorHandler(birthDay, birthMonth, birthYear);
      }
    }
  };

  const birthMonthErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthMonth === "") {
      setMonthErrorMessage("This field is required");
    } else {
      if (birthMonth < 1) {
        setMonthErrorMessage("Must be a valid month");
      } else {
        birthDayLogicErrorHandler(birthDay, birthMonth, birthYear);
        birthMonthLogicErrorHandler(birthDay, birthMonth, birthYear);
        birthYearLogicErrorHandler(birthDay, birthMonth, birthYear);
      }
    }
  };

  const birthYearErrorHandler = (birthDay, birthMonth, birthYear) => {
    if (birthYear === "") {
      setYearErrorMessage("This field is required");
    } else {
      if (birthYear < 1) {
        setYearErrorMessage("Must be a valid year");
      } else {
        birthDayLogicErrorHandler(birthDay, birthMonth, birthYear);
        birthMonthLogicErrorHandler(birthDay, birthMonth, birthYear);
        birthYearLogicErrorHandler(birthDay, birthMonth, birthYear);
      }
    }
  };

  const birthDayHandler = (birthDay, birthMonth, birthYear) => {
    birthDayErrorHandler(birthDay, birthMonth, birthYear);
  };

  const birthMonthHandler = (birthDay, birthMonth, birthYear) => {
    birthMonthErrorHandler(birthDay, birthMonth, birthYear);
  };

  const birthYearHandler = (birthDay, birthMonth, birthYear) => {
    birthYearErrorHandler(birthDay, birthMonth, birthYear);
  };

  const birthAgeSubmitHandler = (event, birthDay, birthMonth, birthYear) => {
    event.preventDefault();
    birthDayErrorHandler(birthDay, birthMonth, birthYear);
    birthMonthErrorHandler(birthDay, birthMonth, birthYear);
    birthYearErrorHandler(birthDay, birthMonth, birthYear);

    let years = today.getFullYear() - birthYear;
    let months = today.getMonth() - birthMonth + 1;
    let days = today.getDate() - birthDay;

    if (months < 0 || (months === 0 && today.getDate() < birthDay)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      var prevMonthLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days = prevMonthLastDay - birthDay + today.getDate();
      months--;
    }

    if (birthDay != "" && birthMonth != "" && birthYear != "") {
      setAge({
        days: days,
        months: months,
        years: years,
      });
    }
  };

  return (
    <div className="content-box">
      <DateInputForm
        birthDayHandler={birthDayHandler}
        birthMonthHandler={birthMonthHandler}
        birthYearHandler={birthYearHandler}
        errorMessage={{
          dayErrorMessage,
          monthErrorMessage,
          yearErrorMessage,
        }}
        birthAgeSubmitHandler={birthAgeSubmitHandler}
      />
      <DateOutputBox age={age} />
    </div>
  );
}

export default App;
