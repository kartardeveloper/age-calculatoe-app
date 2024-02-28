import { useRef } from "react";
import arrowSvg from "../assets/images/icon-arrow.svg";

export const DateInputForm = ({
  birthDayHandler,
  birthMonthHandler,
  birthYearHandler,
  errorMessage,
  birthAgeSubmitHandler,
}) => {
  const birthDayRef = useRef(0);
  const birthMonthRef = useRef(0);
  const birthYearRef = useRef(0);

  return (
    <div className="date-form__wrapper">
      <form
        action="#"
        className="date-form"
        onSubmit={(event) =>
          birthAgeSubmitHandler(
            event,
            birthDayRef.current.value,
            birthMonthRef.current.value,
            birthYearRef.current.value
          )
        }
      >
        <div
          className={
            errorMessage?.dayErrorMessage
              ? "form-field__wrapper form-field__error"
              : "form-field__wrapper"
          }
        >
          <label htmlFor="day" className="field-label">
            Day
          </label>
          <input
            type="number"
            name="day"
            id="day"
            className="form-field"
            placeholder="DD"
            autoFocus="true"
            ref={birthDayRef}
            onChange={() =>
              birthDayHandler(
                birthDayRef.current.value,
                birthMonthRef.current.value,
                birthYearRef.current.value
              )
            }
          />
          {errorMessage?.dayErrorMessage && (
            <p className="error-message">{errorMessage.dayErrorMessage}</p>
          )}
        </div>
        <div
          className={
            errorMessage?.monthErrorMessage
              ? "form-field__wrapper form-field__error"
              : "form-field__wrapper"
          }
        >
          <label htmlFor="month" className="field-label">
            Month
          </label>
          <input
            type="number"
            name="month"
            id="month"
            className="form-field"
            placeholder="MM"
            ref={birthMonthRef}
            onChange={() =>
              birthMonthHandler(
                birthDayRef.current.value,
                birthMonthRef.current.value,
                birthYearRef.current.value
              )
            }
          />
          {errorMessage?.monthErrorMessage && (
            <p className="error-message">{errorMessage.monthErrorMessage}</p>
          )}
        </div>
        <div
          className={
            errorMessage?.yearErrorMessage
              ? "form-field__wrapper form-field__error"
              : "form-field__wrapper"
          }
        >
          <label htmlFor="year" className="field-label">
            Year
          </label>
          <input
            type="number"
            name="year"
            id="year"
            className="form-field"
            placeholder="YYYY"
            ref={birthYearRef}
            onChange={() =>
              birthYearHandler(
                birthDayRef.current.value,
                birthMonthRef.current.value,
                birthYearRef.current.value
              )
            }
          />
          {errorMessage?.yearErrorMessage && (
            <p className="error-message">{errorMessage.yearErrorMessage}</p>
          )}
        </div>
        <button type="submit" className="form-submit__button">
          <img src={arrowSvg} alt="Arrow Image" />
        </button>
      </form>
    </div>
  );
};
