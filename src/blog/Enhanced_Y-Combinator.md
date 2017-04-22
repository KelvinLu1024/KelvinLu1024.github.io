# Enhanced Y-Combinator

I am working on an implement of a dialect of Scheme, which eliminates variable assignment. While writing macro expander, I found trouble to expand 'letrec' syntax. Traditional implement of letrec is impossible, because of disallowment of variable assignment. So I tried to extend Y combinator, which is known to help implement self-recursive procedures, to support mutual recursive procedures. I succeeded! [Here](https://github.com/KelvinLu1024/Enhanced-Y-combinator/blob/master/main.rkt) is the code.

## Known Issues

The bound values must be procedure.
