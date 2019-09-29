var printer = require('./src/printer');
printer.setDevice('/dev/usb/lp0')
    .align('center')
    .text('hello易云\n')
    .print();