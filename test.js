function abc() {
    console.log(abc.xyz);
}
abc();
abc.xyz = 400;
abc();
abc.xyz = 200;
abc();


const numbers = [1, 2, 3, 4];
numbers[10] = 500; console.log(numbers);

const newArr = numbers.map((num) => num > 4)
console.log(newArr);

const arr = [..."OmDev"];
console.log(arr);


console.log(typeof typeof 100)


console.log(parseInt("10+2"));
console.log(parseInt("7FM"));
console.log(parseInt("M7F"));

console.log([1, 2, 3].map(num => {
    if (num > 0) return;
    return num * 2
}))

function nullReturn() {
    return;
}
console.log(nullReturn());


function strictcheck(a, b) {

    "use strict";
    a = 100;
    b = 200;
    // return arguments[0] + arguments[1];
    return a + b;


}
console.log(strictcheck(500, 600))




// usememo vs usecallback
// lifecycle methods vs hooks
//useeffect
//usereducer
// usestate vs userducer memory management state management
// virtual doms and workin of react
// babel and vite





