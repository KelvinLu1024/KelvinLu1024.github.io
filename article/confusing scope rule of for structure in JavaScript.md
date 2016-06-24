# Confusing Scope Rule of `for` statement in JavaScript
**June 23, 2016**

## Story
A reason why I prefer JavaScript than Python is the intuitive scope rules. In JavaScript, it seems that every code block comes with a sub-scope, but I realize that it's not always true. For example, in `for` statement.

    var ls = [];
    for (var i = 0; i < 2; i++) {
      var n = i;
      ls.push(function(){ return n; });
    }
    var f1 = ls[0];
    var f2 = ls[1];
    console.log(f1(), f2());

What will you see in the console? It's not `0 1`, but `1 1`. Why? If you try to log the value of `n` with `f1()` and `f2()`, you will find that the value of `n` is not `undefined`, but `1`, implying that `n` was bound in the same scope as `ls`, `f1` and `f2`. This explains why `f1` returns `1`, as there are only one `n`, whose value is set to `2` during the second iteration.

## A Bad Design
The key point is that JavaScript only has function scope (Thanks Yin Wang for pointing out). I think that's the reason why ES6 introduces `let` statement. However, changing the scope rules of `for`, `while` and `do ... while` is a better solution, from the prespective of design.

If we treat `var`s in blocks as `let`s. We lose nothing but the complexity increace of JavaScript. To simulate 'traditional' behaviour, we can declare the variables before the `for` statement. For example,

    var ls = [];
    var n;
    for (var i = 0; i < 2; i++) {
      n = i;
      ls.push(function(){ return n; });
    }
    var f1 = ls[0];
    var f2 = ls[1];
    console.log(f1(), f2());

It's even more clear than previous program, as we know what new variables will be introduced to outer scope before reading the block of `for`. This becomes more beneficial when you are using an editor/IDE with 'code folding' feature.

## If You Don't Want To Use `let`

    var ls = [];
    for (var i = 0; i < 2; i++) {
      (function(){
        var n = i;
        ls.push(function(){ return n; });
      })();
    }
    var f1 = ls[0];
    var f2 = ls[1];
    console.log(f1(), f2());
