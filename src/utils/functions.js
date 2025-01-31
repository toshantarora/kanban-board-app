export const getStatusColor = (status) => {
    switch (status) {
      case "To-Do List":
        return "fill-yellow-500"; // Yellow for To-Do
      case "In Progress":
        return "fill-blue-500"; // Blue for In-Progress
      case "Not Started":
        return "fill-orange-500"; // Orange for Not Started
      case "Done":
        return "fill-green-500"; // Green for Done
      default:
        return "fill-white-500"; // Default color if status is unknown
    }
  };
  export const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "To-Do List":
        return "bg-yellow-700"; // Yellow for To-Do
      case "In Progress":
        return "bg-blue-700"; // Blue for In-Progress
      case "Not Started":
        return "bg-orange-700"; // Orange for Not Started
      case "Done":
        return "bg-green-700"; // Green for Done
      default:
        return "bg-white-700"; // Default color if status is unknown
    }
  };