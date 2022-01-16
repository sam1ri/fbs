const QRCode = require('qrcode');
 // string

    //let data = req.query.data;
    // QRCode.toDataURL(data, (err, src) => {
    //     if(err){
    //         res.json({err: err})
    //     }
    //     else{
    //         var ImageSaved = req.protocol + '://' + req.get('host') + req.originalUrl;
    //         res.json({QRCode: src, urlImage: ImageSaved});
    //     }
    // });
const qrcodegen = (data,req,res) => {
    let QRName = `QR_${new Date().getTime()}.png`;
    QRCode.toFile(`./qrcode/${QRName}`,data, {color: {dark: '#000',light: '#fff'}}, (err) => {
        if(err){
            console.log(err);
        }
        var ImageSaved = req.protocol + '://' + req.get('host') + '/' + QRName;
        return res.json({urlImage: ImageSaved});
    })
}

module.exports = qrcodegen;
