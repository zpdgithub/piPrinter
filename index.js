var printer = require('./src/printer');
printer.setDevice('/dev/usb/lp0')
    .align('center')
    .size(1, 1)
    .text('hello易云\n')
    .print();