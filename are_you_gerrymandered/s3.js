AWS.config.region = "us-east-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:4310d42d-bd30-442e-a3d9-274fb8112285',
});

printToS3 = function(){

    var s3 = new AWS.S3();
    var parent = $("#printReport").parent()
    $("#hidden-print").remove()
    $("#printReport").remove();

    $("#inputContainer").html("<h2 class='report-title'>" + address + "</h2>")
    var key = "reports/"+ address.join("").replace(/ /g,"_")  + ".html"
    ga('send', 'event', "interaction", "print_report", "key", key);


    $("head").append(`<meta property="og:url" content="http://areyougerrymandered.com/${key}">`)

    $("#social-share").show()
    $("#hide-me-first").show()
    $(".share-buttons").html(`
        <li>
          <h5 class="section-title" style="display:inline">Share this report</h5>
        </li>
        <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://areyougerrymandered.com/${key}" target="_blank" title="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on Facebook</span></a></li>

        <li><a href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fareyougerrymandered.com&text=:%20http%3A%2F%2Faareyougerrymandered.com&via=realsmartllc" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '%20' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i><span class="sr-only">Tweet</span></a></li>

    `)



    var file = new File(["<html>", document.head.outerHTML, document.body.outerHTML , "</html>"], "foo.html" ,{type: "text/html"});
    $("#social-share").hide()
    var params = {
            Bucket: "areyougerrymandered.com",
            Key: key,
            Body: file,
            ACL: 'public-read',
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
