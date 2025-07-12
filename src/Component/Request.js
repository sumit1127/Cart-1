const request = (url, options) => {
  try {
    const response = fetch(url, options);
    if (!response.ok) throw new Error("Something went wrong");
    return null;
  } catch (err) {
    return err.message;
  }
};

export default request;
