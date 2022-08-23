type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) {
        throw new Error("Don't do it...");
      }
      return a / b;
    default:
      throw new Error("Invalid operation");
  }
};

// try {
//   console.log(calculator(1, 1, "add"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }

export { calculator };
