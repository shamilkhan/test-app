import React from "react";

type Props = {
  timestamp: number;
};

const TimeComponent = ({ timestamp }: Props) => {
  return (
    <div className="time-data__value">
      <div className="time-data__icon">🕔</div>
      <div className="time-data__timestamp">{`${timestamp}`}</div>
    </div>
  );
};

export default React.memo(TimeComponent);
