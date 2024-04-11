// for(let i=0; i<5; i++) {
//     console.log("hehe", i);
// }

// console.log("javascript for the first time");

// console.log(process.argv);

let args = process.argv;

for(let i=2; i<args.length; i++) {
    console.log("hello " + args[i]);
}