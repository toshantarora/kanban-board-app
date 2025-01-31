import { getStatusBackgroundColor, getStatusColor } from "../../utils/functions";

const ProgressBadge = ({ name }) => {
  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-full ${getStatusBackgroundColor(name)} px-2 py-1 text-xs font-medium text-white`}>
      <svg
        viewBox="0 0 6 6"
        aria-hidden="true"
        className={`size-2.5 ${getStatusColor(name)}`}
      >
        <circle r={3} cx={3} cy={3} />
      </svg>
      {name}
    </span>
  );
};

export default ProgressBadge;
