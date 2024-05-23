export const EN = {
  hello: "Hello",

  User: {
    newUser: {
      success: "User created successfully",
      error: "Error creating user",

      validations: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        roleRequired: "Role is required",
        roleInvalid: "Role is invalid",
        descriptionRequired: "Description is required",
        emailExists: "An user with this email already exists",
        passwordRequired: "Password is required",
        userNotFound: "User not found",
        idRequired: "ID is required",
      },
    },
  },

  Config: {
    create: {
      validations: {
        tutorNotFound: "Tutor not found",
        configAlreadyExists:
          "A configuration for the subject {subject_name} already exists",
        currencyNotFound: "Currency not found",
        hourlyPriceRequired: "Hourly price is required",
        workDaysRequired: "Work days are required",
        subjectIdRequired: "Subject ID is required",
        categoryIdRequired: "Category ID is required",
        tutorIdRequired: "Tutor ID is required",
        currencyIdRequired: "Currency ID is required",
      },
    },

    list: {
      validations: {
        configNotFound: "Configuration not found",
      },
    },
  },

  internalServerError: "Internal Server Error",
};
