import React from "react";

type Props = {
  timestamp: number;
  isConnected: boolean;
};

const TimeComponent = ({ timestamp, isConnected }: Props) => {
  return (
    <div className={`time-data__value${!isConnected ? " time-data__disabled" : ""}`}>
      <div className="time-data__icon">🕔</div>
      <div className="time-data__timestamp">{`${timestamp}`}</div>
    </div>
  );
};

export default React.memo(TimeComponent);
