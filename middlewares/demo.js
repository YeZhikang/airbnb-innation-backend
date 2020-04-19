function func(num) {
    console.log(this)
    console.log(num)
}

// // it might not work
// // const func = () => {
// //     console.log(this.a)
// //     console.log(this.b)
// // }


const foo  = {
    a: "it is a",
    b: "it is b"
}


// turn the this to foo
// func.bind(foo)(4)

Function.prototype.my_bind = function() {
    var self = this, // 保存原函数
      context = Array.prototype.shift.call(arguments), // 保存需要绑定的this上下文
      // 上一行等价于 context = [].shift.call(arguments);
      args = Array.prototype.slice.call(arguments); // 剩余的参数转为数组
    return function() { // 返回一个新函数
        // 这里的 arguments 指的是二级函数中的参数，利用 concat 进行拼接
        console.log(arguments);
      self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)));
    }
}

func.my_bind(foo)(4)

// const bar = 11

// const obj = {
//     showThis(){
//         console.log(this)
//     },
//     showThisByArrow: () => {
//         console.log(this)
//     }
// }


// const showThis = obj.showThis
// showThis()