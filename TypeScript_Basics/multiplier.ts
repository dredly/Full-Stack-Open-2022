interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too many args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const multiplier = (a: number, b: number, displayText: string) => {
  console.log(displayText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplier(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result was `
  );
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
