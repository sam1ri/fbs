const QRCode = require('qrcode');
 // string

    // QRCode.toDataURL(data, (err, src) => {
    //     if(err){
    //         res.json({err: err})
    //     }
    //     else{
    //         var ImageSaved = req.protocol + '://' + req.get('host') + req.originalUrl;
    //         res.json({QRCode: src, urlImage: ImageSaved});
    //     }
    // });
    

const generateQRCode = (data, req) => {
    let QRName = `QR_${new Date().getTime()}.png`;
    QRCode.toFile(`./qrcode/${QRName}`,data, {color: {dark: '#000',light: '#fff'}}, (err) => {
        if(err){
                console.log(err);
            }
            var ImageSaved = req.protocol + '://' + req.get('host') + '/' + QRName;
                return {urlImage: ImageSaved};
        })
}

module.exports = generateQRCode;
