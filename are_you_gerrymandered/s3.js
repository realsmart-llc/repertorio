

printToS3 = function(){
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIYU2KUUXRQHSVHSA";
    AWS.config.secretAccessKey = "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";

    var s3 = new AWS.S3();
    var parent = $("#printReport").parent()
    $("#hidden-print").remove()
    $("#printReport").remove();

    $("#inputContainer").html("<h2 class='report-title'>" + address + "</h2>")
    $("#social-share").show()
    var key = "reports/"+ address.join("").replace(/ /g,"_")  + ".html"
    ga('send', 'event', "interaction", "print_report", "key", key);
    
    var file = new File(["<html>", document.head.outerHTML, document.body.outerHTML , "</html>"], "foo.html" ,{type: "text/html"});
    $("#social-share").hide()
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

            parent.append(`<a class="btn btn-share" href="${url}" target="_blank">Link to Infographic</a>`)
            $("#printReport").remove()
            console.log(url);
        }
    });

}
