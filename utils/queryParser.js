export const facts = (req) => {
  const q = req.query?.q;
  const fact = q.split(": ")[2];

  switch (fact) {
    case "what color is a banana":
      return "yellow";
    default:
      console.log("Unknown fact", q);
      return "";
  }
};
