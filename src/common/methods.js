import toast from "react-hot-toast";

export const ParseAIDate = (timestamp) => {
  const convertToEventDate = (input) => {
    if (
      typeof input?.seconds === "number" &&
      typeof input?.nanoseconds === "number"
    ) {
      return new Date(
        input.seconds * 1000 + Math.floor(input.nanoseconds / 1e6)
      );
    } else if (input instanceof Date) {
      return input;
    } else if (typeof input === "number") {
      return new Date(input);
    } else {
      throw new Error("Invalid timestamp format");
    }
  };

  const event = convertToEventDate(timestamp);
  const currentDate = new Date();

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const isToday =
    event.getDate() === currentDate.getDate() &&
    event.getMonth() === currentDate.getMonth() &&
    event.getFullYear() === currentDate.getFullYear();

  const isYesterday =
    event.getDate() === yesterday.getDate() &&
    event.getMonth() === yesterday.getMonth() &&
    event.getFullYear() === yesterday.getFullYear();

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${displayHours}:${displayMinutes} ${period}`;
  };

  if (isToday) {
    return `${formatTime(event)}`;
  } else if (isYesterday) {
    return `yesterday`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[event.getMonth()];
    const day = event.getDate();
    const year = event.getFullYear();

    return `${month} ${day} ${
      year !== currentDate.getFullYear() ? year : ""
    }`.trim();
  }
};

export const convertToEventDate = (input) => {
  if (
    typeof input?.seconds === "number" &&
    typeof input?.nanoseconds === "number"
  ) {
    return new Date(input.seconds * 1000 + Math.floor(input.nanoseconds / 1e6));
  } else if (input instanceof Date) {
    return input;
  } else if (typeof input === "number") {
    return new Date(input);
  } else {
    throw new Error("Invalid timestamp format");
  }
};

export const ParseFullDate = (timestamp) => {
  const event = convertToEventDate(timestamp);
  const currentDate = new Date();

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const isToday =
    event.getDate() === currentDate.getDate() &&
    event.getMonth() === currentDate.getMonth() &&
    event.getFullYear() === currentDate.getFullYear();

  const isYesterday =
    event.getDate() === yesterday.getDate() &&
    event.getMonth() === yesterday.getMonth() &&
    event.getFullYear() === yesterday.getFullYear();

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${displayHours}:${displayMinutes} ${period}`;
  };

  if (isToday) {
    return `${formatTime(event)}`;
  } else if (isYesterday) {
    return `${formatTime(event)}, yesterday`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[event.getMonth()];
    const day = event.getDate();
    const year = event.getFullYear();

    return `${month} ${day} ${
      year !== currentDate.getFullYear() ? year : ""
    }`.trim();
  }
};

export function getUniqueLanguages(dataArray) {
  const langset = new Set();
  dataArray.forEach((item) => {
    if (item.language) {
      langset.add(item.language);
    }
  });
  return Array.from(langset);
}

export function getUniqueWebLanguages(dataArray) {
  const langset = new Set();
  dataArray.forEach((item) => {
    if (item.frameworks) {
      langset.add(item.frameworks);
    }
  });
  return Array.from(langset);
}

export function getAdminLanguages(dataArray) {
  console.log(dataArray);
  const langset = new Set();
  dataArray.forEach((item) => {
    if (item.language) {
      langset.add(item.language);
    }
    if (item.frameworks && item.frameworks !== "code") {
      langset.add(item.frameworks);
    }
  });
  console.log(langset);
  return Array.from(langset);
}

export function extractJsonObject(data) {
  try {
    const jsonMatch = data.match(/```json([\s\S]*?)```/);

    if (jsonMatch && jsonMatch[1]) {
      const jsonObject = JSON.parse(jsonMatch[1].trim());
      return jsonObject;
    } else {
      throw new Error("No JSON object found in the input.");
    }
  } catch (error) {
    console.error("Error extracting JSON:", error.message);
    toast.error("Unable to Optimize the Given code");
    return data;
  }
}

export function extractWebJsonObject(data) {
  try {
    // Match the JSON content inside the ```json ``` block
    const jsonMatch = /```json([\s\S]*?)```/.exec(data);

    if (jsonMatch && jsonMatch[1]) {
      // Parse the matched JSON string
      const jsonObject = JSON.parse(jsonMatch[1].trim());
      return jsonObject;
    }

    throw new Error("No valid JSON object found in the input.");
  } catch (error) {
    console.error("Error extracting JSON:", error.message);
    toast.error("Failed to optimize the provided code.");
    return data;
  }
}
