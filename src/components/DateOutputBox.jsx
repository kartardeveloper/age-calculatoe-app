export const DateOutputBox = ({ age }) => {
  return (
    <div className="date-output-box">
      <div className="date-output__list">
        <p className="date-output">
          <span className="date-value">{age.years ? age.years : `--`}</span>{" "}
          years
        </p>
        <p className="date-output">
          <span className="date-value">{age.months ? age.months : `--`}</span>{" "}
          months
        </p>
        <p className="date-output">
          <span className="date-value">{age.days ? age.days : `--`}</span> days
        </p>
      </div>
    </div>
  );
};
