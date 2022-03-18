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
    case "which city is the Eiffel tower in".toLowerCase():
      return "paris";
    case "which year was Theresa May first elected as the Prime Minister of Great Britain".toLowerCase():
      return "2016";
    case "who played James Bond in the film Dr No".toLowerCase():
      return "Sean Connery";
    case "what is your name".toLowerCase():
      return "Kopfsteinhammer";
    default:
      console.log("Unknown fact", q);
      return "";
  }
};
