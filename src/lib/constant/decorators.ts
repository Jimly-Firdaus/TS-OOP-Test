// cc: https://stackoverflow.com/questions/63915237/annotate-method-override-in-typescript-to-make-easy-in-code-reviews
export const Override = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    descriptor.writable = true;
}
