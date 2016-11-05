## An Advantage of Scheme
2016-10-29

Supposed that there is a function which returns two types of value, and 
these values are themselves indiscernible. And supposed that these two 
types of values should be subsequently processed in different way, how 
would the caller function look like in different programming languages? 

Let's call the caller `f` and the callee `g`. A c/c++ programmer may write 
something like this:

    int f(...)
    {
        Value v;
        Type t;
        v = g(&t);
        switch (t) {
            case Type1: ...; break
            ...
        }
    }


While a Scheme programmer can write:

    (define f
      (lambda (...)
        (g (lambda (v) ...)
           (lambda (v) ...))))
  
It eliminate the use of `t` by directly providing `g` two continuations. 

Programming languages supporting first-class function enjoy the same 
convenience. However, Scheme has more advantages in such paradigm because of 
its supports for anonymous function declaration and perper tail-call. 

