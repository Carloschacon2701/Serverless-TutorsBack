export const EN = {
  hello: "Hello",

  User: {
    newUser: {
      success: "User created successfully",
      error: "Error creating user",

      validations: {
        lastnameRequired: "Lastname is required",
        photoFormatInvalid:
          "Invalid photo format. Only .jpg, .jpeg, and .png are allowed",
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
        passwordMayus: "Password must contain at least one uppercase letter",
        passwordNumber: "Password must contain at least one number",
        passwordSpecial: "Password must contain at least one special character",
        passwordLength: "Password must have at least 8 characters",
      },
    },

    uploadPhoto: {
      validations: {
        photoFormatInvalid:
          "Invalid photo format. Only .jpg, .jpeg, and .png are allowed",
        photoRequired: "Photo is required",
      },
    },

    logOut: {
      success: "User logged out successfully",
      validations: {
        tokenRequired: "Access token is required",
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

  Appointment: {
    create: {
      validations: {
        mentorshipNotFound: "Mentorship not found",
        mentorshipFull: "Mentorship is full",
        invalidDate: "Invalid date, work days are: {{workDays}}",
        dateMustBeFuture: "Date must be in the future",
        dateRequired: "Date is required",
        mentorshipRequired: "Mentorship is required",
      },
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
      },
    },

    delete: {
      success: "Appointment cancelled successfully",
      validations: {
        appointmentNotFound: "Appointment not found",
        notOwner: "You are not the owner of this appointment",
        appointmentCancelled: "Appointment already cancelled",
      },
    },

    find: {
      validations: {
        notFound: "Appointment not found",
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
        capacityRequired: "Capacity is required",
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
        invalidFormat: "Invalid format. Only .pdf is allowed",
      },
    },

    delete: {
      success: "Document deleted successfully",
      validations: {
        notFound: "Document not found",
        notOwner: "You are not the owner of this document",
      },
    },

    find: {
      validations: {
        idRequired: "ID is required",
        notFound: "Document not found",
      },
    },
  },

  internalServerError: "Internal Server Error",
  userNotFound: "User not found",
  unathorized: "Unauthorized",
  forbidden: "You don't have permission to access this resource",
};
