const useJoiValidation = (schema) => {
  const validate = (formData) => {
    const { error, value } = schema.validate(formData, { abortEarly: false });

    if (!error) {
      return { isValid: true, errors: {}, value };
    }

    let errors = {};
    console.log({ error });
    if (error) {
      error.details.forEach((detail) => {
        const field = detail.path.join('.') || 'form';
        errors[field] = detail.message;
      });
    }

    return { isValid: false, errors, value: {} };
  };

  return { validate };
};

export { useJoiValidation };
