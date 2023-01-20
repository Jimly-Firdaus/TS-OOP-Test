// cc: https://stackoverflow.com/questions/63915237/annotate-method-override-in-typescript-to-make-easy-in-code-reviews
export const Override = () => {
    return function(target: Object, key: string, descriptor: PropertyDescriptor) {
        descriptor.value = function() {
            const baseMethod = Object.getPrototypeOf(target)[key];
            return baseMethod.apply(this, arguments);
        }
    }
}