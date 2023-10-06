export const handleServerError = (err, req, res, next) => {
  console.log(err);
  if (err.details) {
    var errors = err.details;
    errors = errors.map((el) => ({
      msg: el.message,
      params: el.context.key,
    }));
  } else {
    var errors = err.errors;
    for (const field in errors) {
      const errorDetails = errors[field];
      errors = [
        {
          msg: errorDetails.message,
          params: field,
        },
      ];
    }
  }

  if (err.name === "ValidationError") {
    return res.status(400).send({
      msg: "Bad request",
      error: errors,
    });
  }
  res.status(500).send({ msg: "Server error", err });
};

// export default {
//   handleServerError,
// };
