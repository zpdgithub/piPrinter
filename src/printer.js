var fs = require('fs');
var iconv = require('iconv-lite');

function setDevice(device){
    printer.device = device;
    return printer;
}

function align(align) {
    console.log('align:', align);
    var buffer;
    switch (align) {
        case 'center':
            buffer = Buffer.from([0x1B, 0x61, 0x01]);
            break;
        default:
            buffer = Buffer.from([]);
    }
    printer.buffer = Buffer.concat([printer.buffer, buffer]);
    return printer;
}

function text(text) {
    console.log('text:', text);
    var buffer = iconv.encode(text, 'gbk');
    printer.buffer = Buffer.concat([printer.buffer, buffer]);
    return printer;
}

function print() {
    var buffer = Buffer.from([0x1B, 0x64, 0x01]);
    var content = Buffer.concat([printer.buffer, buffer]);
    console.log('print:', content);
    fs.writeFile(printer.device, content, function (error) {
        if (error) {
            console.log('error', error);
        } else {
            console.log('It\'s printed!');
        }
        printer.buffer = Buffer.from([]);
    });
}

var printer = {
    device: '/dev/usb/lp0',
    buffer: Buffer.from([]),
    setDevice: setDevice,
    align: align,
    text: text,
    print: print
};

module.exports = printer;