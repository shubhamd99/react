// Environment variables
declare const process: {
  env: {
    NODE_ENV: string;
    [key: string]: string | undefined;
  };
};

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "*.css" {
  const css: string;
  export default css;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
