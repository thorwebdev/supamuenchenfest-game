export const facts = (req) => {
  const q = req.query?.q;
  const fact = q.split(": ")[1];

  switch (fact) {
    case "what color is a banana":
    case "what colour is a banana":
      return "yellow";
    default:
      console.log("Unknown fact", q);
      return "";
  }
};
