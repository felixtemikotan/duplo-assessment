import Joi from "joi";


export const addPostValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required()
  });

  export const updatePostValidator1 = Joi.object({
    id:Joi.string().required(),
    title: Joi.string().optional().allow('',' ',null),
    content: Joi.string().optional().allow('',' ',null),
    author: Joi.string().optional().allow('',' ',null),
    });

    export const updatePostValidator = Joi.object({
      id: Joi.string().required(),
      title: Joi.string().allow(null, ''),
      content: Joi.string().allow(null, ''),
      author: Joi.string().allow(null, ''),
    }).or('title', 'content', 'author');

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
