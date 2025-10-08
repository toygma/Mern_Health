import slugify from "slugify";

export const generateSlugify = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
};

