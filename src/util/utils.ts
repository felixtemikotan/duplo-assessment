import Joi from "joi";


export const addPostValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required()
  });

  export const updatePostValidator = Joi.object({
    id:Joi.string().required(),
    title: Joi.string().optional().allow('',' ',null),
    content: Joi.string().optional().allow('',' ',null),
    author: Joi.string().optional().allow('',' ',null),
    });

    export const paramsValidator = Joi.object({
      id:Joi.string().required(),
      });

  export const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: ''
      }
    }
  };
