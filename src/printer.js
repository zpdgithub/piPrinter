var fs = require('fs');
var iconv = require('iconv-lite');

// #region 设置打印机地址
function setDevice(device) {
    printer.device = device;
    return printer;
}
// #endregion

// #region 对齐方式
// 22.ESC a n: 选择对齐方式
function align(align) {
    console.log('align:', align);
    var buffer;
    switch (align) {
        case 'left':
            buffer = Buffer.from([27, 97, 0]);
            break;
        case 'center':
            buffer = Buffer.from([27, 97, 1]);
            break;
        case 'right':
            buffer = Buffer.from([27, 97, 2]);
            break;
        default:
            buffer = Buffer.from([]);
    }
    printer.buffer = Buffer.concat([printer.buffer, buffer]);
    return printer;
}
// #endregion

// #region 打印文字
function text(text) {
    console.log('text:', text);
    var buffer = iconv.encode(text, 'gbk');
    printer.buffer = Buffer.concat([printer.buffer, buffer]);
    return printer;
}
// #endregion

// #region 执行打印
function print() {
    var buffer = Buffer.from([27, 100, 1]); // 24.ESC d n: 打印并向前走纸n行
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
// #endregion

var printer = {
    device: '/dev/usb/lp0',
    buffer: Buffer.from([]),
    setDevice: setDevice,
    align: align,
    text: text,
    print: print
};

module.exports = printer;