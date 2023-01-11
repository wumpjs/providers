import { redBright, greenBright } from "colorette";

const upperFirst = (str = "string!") => String(str).replace(/^\w/, (c) => c.toUpperCase());

class BaseError extends Error {
  constructor(message) {
    super(message);
  };

  name = this.constructor.name;
};

class InvalidType extends BaseError {
  constructor(argument, options = { expected: [], received: "Number" }) {
    super(`The required type for '${redBright(argument)}' was not specified.`);

    const { expected, received } = options;

    this.expected = expected;
    this.received = received;
  };
};

class NotRequestedFormat extends BaseError {
  constructor(argument, options = { expected: [], received: "aa,bb" }) {
    super(`'${redBright(argument)}' is not in the requested format.`);

    const { expected, received } = options;

    this.expected = expected;
    this.received = received;
  };
};

class DataLimitExceeded extends BaseError {
  constructor(name, storageSize, maxLimit) {
    super(`The maximum data limit of '${greenBright(name)}' has been exceeded.`);

    this.size = storageSize;
    this.maxLimit = maxLimit;
  };
};

class InvalidGuild extends BaseError {
  constructor(argument) {
    super(`'${redBright(argument)}' is not a valid guild.`);
  };
};

class InvalidRole extends BaseError {
  constructor(argument) {
    super(`'${redBright(argument)}' is not a valid guild role.`);
  };
};

class InvalidChannel extends BaseError {
  constructor(argument) {
    super(`'${redBright(argument)}' is not a valid guild channel.`);
  };
};

/**
 * Creates a new Error.
 * @param {boolean} condition 
 * @param {string} argument 
 * @param {{errorType?: string, expected?: string, received: string | null}}
 * @returns {void}
 */
export function createError(argument, { errorType = "InvalidType", expected = "String", received = "Number" }) {
  if (typeof argument !== "string") throw new InvalidType("argument", { expected: "String", received: upperFirst(typeof argument) });
  if (typeof errorType !== "string") throw new InvalidType("type", { expected: "String", received: upperFirst(typeof errorType) });

  const type = (errorType.replace(/ /g, "_")).toUpperCase();

  const fetched = upperFirst(received);

  let error = new InvalidType(argument, { expected, received: fetched });

  if (type === "INVALID_ROLE") error = new InvalidRole(argument);
  else if (type === "INVALID_CHANNEL") error = new InvalidChannel(argument);
  else if (type === "INVALID_GUILD") error = new InvalidGuild(argument);
  else if (type === "NOT_REQUESTED_FORMAT") error = new NotRequestedFormat(argument, { expected, received: fetched });
  else if (type === "DATA_LIMIT_EXCEEDED") error = new DataLimitExceeded(argument, expected, fetched);

  throw error;
};