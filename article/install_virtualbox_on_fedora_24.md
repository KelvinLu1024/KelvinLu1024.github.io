# Install VirtualBox on Fedora 24
**June 23, 2016**

## Story
I download the rpm package from the website of VirtualBox and install it with

    sudo dnf install ...

Everything goes well until I try to boot an installed virtual machine.

The software told me that

    Result Code:
    NS_ERROR_FAILURE (0x80004005)
    Component:
    MachineWrap
    Interface:
    IMachine {f30138d4-e5ea-4b3a-8858-a059de4c93fd}

and that

    Kernel driver not installed (rc=-1908)

    The VirtualBox Linux kernel driver (vboxdrv) is either not
    loaded or there is a permission problem with /dev/vboxdrv.
    Please reinstall the kernel module by executing

    '/sbin/rcvboxdrv setup'

## Solution
    sudo dnf install kernel-devel
    sudo dnf install gcc
    sudo /sbin/rcvboxdrv setup
