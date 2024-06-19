export const ES = {
  hello: "Hola",

  User: {
    newUser: {
      success: "Usuario creado exitosamente",
      error: "Error creando usuario",

      validations: {
        lastnameRequired: "El Apellido es requerido",
        photoFormatInvalid:
          "Formato de foto inválido. Solo se permiten .jpg, .jpeg, y .png",
        careerRequired: "La Carrera es requerida",
        careerInvalid: "La Carrera es inválida",
        nameRequired: "El Nombre es requerido",
        emailRequired: "El Email es requerido",
        roleRequired: "El Rol es requerido",
        roleInvalid: "El Rol es inválido",
        descriptionRequired: "La Descripción es requerida",
        emailExists: "Un usuario con este email ya existe",
        passwordRequired: "La Contraseña es requerida",
        userNotFound: "Usuario no encontrado",
        idRequired: "ID es requerido",
        passwordMayus: "La contraseña debe contener al menos una mayúscula",
        passwordNumber: "La contraseña debe contener al menos un número",
        passwordSpecial:
          "La contraseña debe contener al menos un caracter especial",
        passwordLength: "La contraseña debe tener al menos 8 caracteres",
      },
    },

    changePassword: {
      success: "Contraseña cambiada exitosamente",
      validations: {
        currentPasswordRequired: "Contraseña actual es requerida",
        newPasswordRequired: "Nueva contraseña es requerida",
        invalidCredentials: "Usuario o contraseña inválidos",
      },
    },

    uploadPhoto: {
      validations: {
        photoFormatInvalid:
          "Formato de foto inválido. Solo se permiten .jpg, .jpeg, y .png",
        photoRequired: "La foto es requerida",
      },
    },

    logOut: {
      success: "Usuario deslogueado exitosamente",
      validations: {
        tokenRequired: "El Token de acceso es requerido",
      },
    },

    logIn: {
      success: "Usuario logueado exitosamente",
      validations: {
        emailRequired: "El email es requerido",
        passwordRequired: "La contraseña es requerida",
        invalidCredentials: "Credenciales inválidas",
        userNotConfirmed: "Usuario no confirmado",
      },
    },
  },

  Appointment: {
    create: {
      validations: {
        mentorshipNotFound: "Mentoria no encontrada",
        mentorshipFull: "Mentoria llena",
        invalidDate: "Fecha inválida, los días de trabajo son: {{workDays}}",
        dateMustBeFuture: "La fecha debe ser en el futuro",
        dateRequired: "La fecha es requerida",
        mentorshipRequired: "La mentoria es requerida",
      },
      days: {
        monday: "Lunes",
        tuesday: "Martes",
        wednesday: "Miércoles",
        thursday: "Jueves",
        friday: "Viernes",
        saturday: "Sábado",
        sunday: "Domingo",
      },
    },

    delete: {
      success: "Cita cancelada exitosamente",
      validations: {
        appointmentNotFound: "Cita no encontrada",
        notOwner: "No eres el dueño de esta cita",
        appointmentCancelled: "Cita ya cancelada",
      },
    },

    find: {
      validations: {
        notFound: "Cita no encontrada",
      },
    },
  },

  Subject: {
    find: {
      validations: {
        notFound: "Materia no encontrada",
        idRequired: "ID es requerido",
      },
    },
  },

  Mentorship: {
    create: {
      success: "Mentoria creada exitosamente",
      validations: {
        tutorNotFound: "Tutor no encontrado",
        mentorshipAlreadyExists: "Ya existe una Mentoria para esta materia",
        currencyNotFound: "Moneda no encontrada",
        hourlyPriceRequired: "El precio por hora es requerido",
        workDaysRequired: "Los días de trabajo son requeridos",
        subjectIdRequired: "El ID de la materia es requerido",
        categoryIdRequired: "El ID de la categoría es requerido",
        tutorIdRequired: "El ID del tutor es requerido",
        currencyIdRequired: "El ID de la moneda es requerido",
        capacityRequired: "La capacidad es requerida",
      },
    },

    delete: {
      success: "Mentoria eliminada exitosamente",
      validations: {
        mentorshipNotFound: "Mentoria no encontrada",
        mentorshipIdRequired: "El ID de la mentoria es requerido",
      },
    },

    find: {
      validations: {
        mentorshipNotFound: "Mentoria no encontrada",
      },
    },
  },

  Docs: {
    list: {
      validations: {
        subjectNotFound: "Materia no encontrada",
      },
    },
    upload: {
      validations: {
        nameRequired: "El nombre es requerido",
        categoryRequired: "La categoría es requerida",
        subjectRequired: "La materia es requerida",
        fileTypeInvalid: "Tipo de archivo inválido",
        subjectNotFound: "Materia no encontrada",
        invalidFormat: "Formato inválido, solo se permiten .pdf",
      },
    },

    delete: {
      success: "Documento eliminado exitosamente",
      validations: {
        notFound: "Documento no encontrado",
        notOwner: "No eres el dueño de este documento",
      },
    },

    find: {
      validations: {
        idRequired: "El ID es requerido",
        notFound: "Documento no encontrado",
      },
    },
  },

  Category: {
    find: {
      validations: {
        idRequired: "ID es requerido",
      },
    },
  },

  internalServerError: "Error interno del servidor",
  userNotFound: "Usuario no encontrado",
  unathorized: "No autorizado",
  forbidden: "No está autorizado para realizar esta acción",
};
