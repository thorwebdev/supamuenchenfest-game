export const facts = (req) => {
  const q = req.query?.q;
  const fact = q.split(": ")[1].toLowerCase();

  switch (fact) {
    case "what color is a banana":
    case "what colour is a banana":
      return "yellow";
    case "what is your location":
      return "munich";
    case "roses are red violets are blue":
      return "sugar is sweet, and so are you.";
    default:
      console.log("Unknown fact", q);
      return "";
  }
};
