# Thinking of File System

2017-05-09

I have thought a lot on the design of file systems. Here collects main ideas.


## Permission Control

In operating systems of UNIX family, files have three types of permission, including readability, writability and executability. This permission controling system has two problems. Firstly, some permission combinations are not sensible. For example, a file without any permission is basically useless. Another problem is that it is strange to have a permission called executability. Because to execute a program, the content of the program is required. In another word, readability is a prerequirement for executability. We can further conclude that all program are executed by interpretation. Actually, the execution of binary executable files can be thought as the process of interpretation performed by CPU.

To clarify the permission controling system, both executability and readability can be removed. The reason why remove readability is that a unreadable file is useless, and that although we need write-only files in some cases, it is fine to have readability at the same time in those cases. After the improvement, file systems only has to control one permission - writability.


## File Name

File names should be able to contain arbitrary character (ideally, full unicode support).


## Process-specific File System

Nowadays, almost all not-so-naive *nix users know avoiding login as root user to avoid destroy files accidentally. However, to login as a normal user is not safe enought. Consider such a case. A user once executed a program which claimed that it would only helps download a file to a specific directory. However, after the execution, the user astonishly find that all his data are deleted, as the program lied. There are many solution on modern operating systems, but the most straight-forward solution, in my opinion, is process-specific file system. We can execute the program in a seperated file system, which has the directory containing files to download mounted in the new file system.

_to be continue_
