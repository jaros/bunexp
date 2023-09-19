


const wrapper = (origFun: Function) => {
    const start = Date.now();
    origFun();
    console.log("execution time: ", Date.now() - start)
}

// function fancyLogger() {
//     console.log("first(): factory evaluated");
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log("target", target, "propertyKey", propertyKey)
//         const origFun = descriptor.value;
//         return descriptor.value = function (...args: any[]) {
//             const start = Date.now();
//             try {
//                 return origFun.apply(this, args);
//             } finally {
//                 console.log("execution time: ", Date.now() - start)
//             }
//         };
//     };
// }


const syncLogger = <A extends any[], R>(f: (...a: A) => R) => (
    ...args: A
): R => {
    let value;
    try {
        value = f(...args);
        console.log("info", f, value, ...args); // actual logging
    } catch (error) {
        console.log("error", f, error, ...args); //actual logging
        throw error;
    }
    return value;
};


const foo = syncLogger(
    (a: string, b: number): string => {
        console.log("str:", a, "num:", b);
        return "my_result"
    }
)

const loggedFoo = syncLogger(foo)

const res = loggedFoo("tchau", 7);
console.log("res", res)


class ExampleClass {
    @fancyLogger()
    bar(a: string, b: number): string {
        console.log("str:", a, "num:", b);
        return "my_result"
    }
}

function fancyLogger() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const targetMethod = descriptor.value!;
        descriptor.value = function (...args: any[]) {
            targetMethod.apply(this, args);
            const start = Date.now();
            try {
                return targetMethod.apply(this, args);
            } finally {
                console.log("execution time: ", Date.now() - start)
            }
        }
    };
}


console.log(new ExampleClass().bar("uno", 2));