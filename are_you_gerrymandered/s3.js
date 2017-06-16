

printToS3 = function(){

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIYU2KUUXRQHSVHSA";
    AWS.config.secretAccessKey = "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";

    var s3 = new AWS.S3();

    $("#hidden-print").remove()
    $("#inputContainer").html("<h3 class='section-title'>" + address + "</h3>")

    var file = new File(["<html>", document.head.outerHTML, document.body.outerHTML , "</html>"], "foo.html" ,{type: "text/html"});
    var params = {
            Bucket: "areyougerrymandered.com",
            Key: "reports/foo2"  + ".html",
            Body: file,
            // ACL: 'public-read',
            ContentType: 'text/html'
        };
    s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    });

}