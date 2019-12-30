// 1. type
// 2. boolean (true/false)
// 3. string
// 4. number
// 5. object - class, OOP - lap trinh huong doi tuong // next session
// 6. array
// .push() - .pop()  them/xoa o cuoi mang
// .unshift() - .shift()  them/xoa o dau mang
// .find() - findIndex() - includes()  tim kiem trong mang
// .filter()  loc mang
// .map()  bien doi mang
// 7. (condition) ? (value if true) : (value if false)
// 8. destructering
// 9. arrow function


// let arr1 = [1, 2, 3]
// arr1.find(function(number) {
//   return number % 2 == 0
// })  // 2
// // .sort()
// let arr2 = [3, 1, -1, 5]
// arr2.sort() // [-1, 1, 3, 5]
// let arr3 = [{ id: 2 }, { id: 1 }, { id: 3 }]
// arr3.sort(function(o1, o2) {
//   // return <0 >> o1 < o2
//   // return 0 >> o1 == o2
//   // return >0 >> o1 > 02
//   return o1.id - o2.id
// })











// 1. async / await, asynchronous ~ bất đồng bộ, synchronous ~ đồng bộ
// async function test() {
//   await asyncTask()
//   console.log('task 1 end!')
//   await asyncTask()
//   console.log('task 2 end!')
// }

// test()

// /**
//  * async >> không biết khi nào hàm kết thúc
//  */
// function asyncTask() {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, 2000)
//   })
// }

// 2. try / catch / throw / Error
// function test() {
//   let i = 10
//   try {
//     console.log(1)
//     console.log(2)
//     if(i < 0) {
//       console.log(3)
//       let error = new Error('Number i must greater than 0!')
//       throw error
//     }
//     console.log('Success!')
//   } catch(err) {
//     console.warn(err)
//     console.log('Error!')
//   }
// }

// test()


