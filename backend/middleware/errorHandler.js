export default (err, req, res, next) => {
  console.error("Error generating response:", err);
  res
    .status(500)
    .send({ error: "An error occurred while generating the response" });
};
