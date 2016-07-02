# 在KDE5上安装ibus输入框架
_2016, July 2_ ibus-pinyin有bug，用ibus-libpinyin

## 安装过程（Fedora 24）

    sudo dnf install ibus-qt ibus-gtk
    sudo dnf install ibus-libpinyin
    
## ibus-pinyin的bug
1. 选择的文字会被删除（比如，在浏览器中按Ctrl-l选择地址栏， 网址会全部被删除，用光标双击选中也会，Ctrl-a全选也会）。
2. 输入法切换需要按两次。我把切换输入法的快捷键设定为Super-Space。用ibus-pinyin需要按两次快捷键才能成功切换输入法。

以上两个bug，应该是ibus-pinyin引起的，因为用ibus-libpinyin时都不会出现。

## 输入法的配置
参考ibus-setup启动时弹出窗口中的信息，修改`.bashrc`。如果你和我一样用的是fish（而非bash），需要注意fish没有`export`。


