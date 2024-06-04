export const EN = {
  hello: "Hello",

  User: {
    newUser: {
      success: "User created successfully",
      error: "Error creating user",

      validations: {
        careerRequired: "Career is required",
        careerInvalid: "Career is invalid",
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

    logIn: {
      success: "User logged in successfully",
      validations: {
        emailRequired: "Email is required",
        passwordRequired: "Password is required",
        invalidCredentials: "Invalid credentials",
        userNotConfirmed: "User not confirmed",
      },
    },
  },

  Subject: {
    find: {
      validations: {
        notFound: "Subject not found",
        idRequired: "ID is required",
      },
    },
  },

  Mentorship: {
    create: {
      success: "Mentorship created successfully",
      validations: {
        tutorNotFound: "Tutor not found",
        mentorshipAlreadyExists: "A mentorship for this subject already exists",
        currencyNotFound: "Currency not found",
        hourlyPriceRequired: "Hourly price is required",
        workDaysRequired: "Work days are required",
        subjectIdRequired: "Subject ID is required",
        categoryIdRequired: "Category ID is required",
        tutorIdRequired: "Tutor ID is required",
        currencyIdRequired: "Currency ID is required",
      },
    },
    delete: {
      success: "Mentorship deleted successfully",
      validations: {
        mentorshipNotFound: "Mentorship not found",
        mentorshipIdRequired: "Mentorship ID is required",
      },
    },

    find: {
      validations: {
        mentorshipNotFound: "Mentorship not found",
      },
    },
  },

  Docs: {
    list: {
      validations: {
        subjectNotFound: "Subject not found",
      },
    },
    upload: {
      validations: {
        nameRequired: "Name is required",
        categoryRequired: "Category is required",
        subjectRequired: "Subject is required",
        FileTypeInvalid: "Invalid file type",
        subjectNotFound: "Subject not found",
      },
    },
  },

  internalServerError: "Internal Server Error",
  userNotFound: "User not found",
  unathorized: "Unauthorized",
  forbidden: "You don't have permission to access this resource",
};
