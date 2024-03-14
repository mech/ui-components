// https://github.com/GriffinJohnston/uiball-loaders/blob/main/src/components/RaceBy.js
const RaceBy = ({
  size = 50,
  color = "black",
  lineWeight = 5,
  speed = 1.2,
  compact = true,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${compact ? "" : "my-4"}`}
    >
      <div
        className="race-by"
        style={{
          "--uib-size": size + "px",
          "--uib-color": color,
          "--uib-line-weight": lineWeight + "px",
          "--uib-speed": speed + "s",
        }}
      />
    </div>
  );
};

export default RaceBy;
