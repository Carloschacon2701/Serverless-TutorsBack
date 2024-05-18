export const ES = {
  hello: "Hola",

  User: {
    newUser: {
      success: "Usuario creado exitosamente",
      error: "Error creando usuario",

      validations: {
        nameRequired: "El Nombre es requerido",
        emailRequired: "El Email es requerido",
        roleRequired: "El Rol es requerido",
        roleInvalid: "El Rol es inválido",
        descriptionRequired: "La Descripción es requerida",
        emailExists: "Un usuario con este email ya existe",
      },
    },
  },

  Config: {
    create: {
      validations: {
        tutorNotFound: "Tutor no encontrado",
        configAlreadyExists:
          "Ya existe una configuración para la materia {subject_name}",
        currencyNotFound: "Moneda no encontrada",
        hourlyPriceRequired: "El precio por hora es requerido",
        workDaysRequired: "Los días de trabajo son requeridos",
        subjectIdRequired: "El ID de la materia es requerido",
        categoryIdRequired: "El ID de la categoría es requerido",
        tutorIdRequired: "El ID del tutor es requerido",
        currencyIdRequired: "El ID de la moneda es requerido",
      },
    },
  },

  internalServerError: "Error interno del servidor",
};
