const debugLog = (...messages) => {
  console.log("process.env.DEBUG: ", process.env.DEBUG);
  if (process.env.REACT_APP_DEBUG === "true") {
    console.log(...messages);
  }
};

export default debugLog;
