

printToS3 = function(){

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIYU2KUUXRQHSVHSA";
    AWS.config.secretAccessKey = "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";

    var s3 = new AWS.S3();

    $("#hidden-print").remove()

    $("#inputContainer").html("<h2 class='section-title'>" + address + "</h2>")
    $("#social-share").show()
    var key = "reports/"+ address.join("").replace(/ /g,"_")  + ".html"
    var file = new File(["<html>", document.head.outerHTML, document.body.outerHTML , "</html>"], "foo.html" ,{type: "text/html"});
    var params = {
            Bucket: "areyougerrymandered.com",
            Key: key,
            Body: file,
            // ACL: 'public-read',
            ContentType: 'text/html'
        };
    s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);

        else{
            url = `http://areyougerrymandered.com/${key}`
            console.log(url);            
        }     
    });

}
