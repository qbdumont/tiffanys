$(document).ready(function() {
    $('.loser-page').hide();
    $('.hash-page').hide();
    $(".jewelryBack").hide();
    $('.spin').hide();
    var location = window.location.pathname;
    location = location.substr(location.indexOf("/") + 1);

    if ($("#video" + location).length) {

        $(".opening-sequence-container").attr("onclick", "setTimeout($('#video" + location + "').get(0).play(),4000)");

    }

    $('.result').hide();
    //    $('.video-container').hide();
    $(".dropdown-menu li a").click(function() {
        console.log($(this).attr("id"));
        var info = $(this).children().text().split(',');
        console.log(info)
        $("#thisIsMyID").text(info[1]);
        $("#thisIsMyAsset").text(info[2]);

        console.log($(this).children().text());
        $(".toggleTxt" + $(this).attr("id")).text(info[0]);
        $(".toggleTxt" + $(this).attr("id")).val(info[0]);
    });

    var rigTablet = function(index) {
        var tabletIndex = index;
        console.log($(".toggleTxt" + index).text);

    }
    $(".rigTablet").on("click", function() {
        var tabletIndex = $(this).attr("id");
        var prizeName = $(".toggleTxt" + tabletIndex).text();
        var id = $("#thisIsMyID").text();
        var assetString = $("#thisIsMyAsset").text();
        var nextTouch = $("#checkbox" + tabletIndex).val();
        console.log("nex", nextTouch);
        if (nextTouch === 'on') {
            nextTouch = true;
        }
        var data = {
            tablet: tabletIndex,
            prizeName: prizeName,
            prizeAsset: assetString,
            id: id,
            nextTouch: nextTouch
        }
        console.log(JSON.stringify(data))
        $.ajax({
            type: "POST",
            url: "/addWinner/",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(response) {
                console.log(response)
                sweetAlert("Added Winner", "Thanks", "success");
            }
        });


    })


    $(".winner-image").hide();
    var didOnce = false;
    var doWinnerSequence = function() {
//        $('#video' + location).get(0).pause();
    if ($("#video" + location).length) {
        $("#video" + location).get(0).pause();

    }
        $(".opening-sequence-container").fadeOut("slow", function() {
            $(".winner-image").fadeIn("slow", function() {
                console.log("showing winner image.");
                //                $("#video" + location)[0].pause();
                if (didOnce === false) {
                    console.log("calling interval set")
                    didOnce = true;
                    setInterval(function() {
                        // toggle the class every five second
                        console.log("adding light class")
                        $('#winner-img').toggleClass('light');
                        setTimeout(function() {
                            // toggle back after 1 second
                            $('#donate').toggleClass('light');
                        }, 90);

                    }, 400);
                }
                setTimeout(fadeToHashFromWinner, 7000);
            })
        })
    }

    function UrlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }
    var fadeBackToInitial = function() {
        $(".hash-page").fadeOut("slow", function() {
            $(".opening-sequence-container").fadeIn("slow")
        })
    }
    var fadeToHashFromWinner = function(){
        $(".winner-image").fadeOut("slow", function() {
            $(".hash-page").fadeIn("slow", function() {
//                setTimeout(fadeBackToInitial, 7000);
            }) 
        })
    }
    var fadeToHashAfterJewelry = function(){
        $(".jewelryBack").css("background-image", "url('/assets/"+location+"j.jpg')")
        $(".jewelryBack").fadeOut("slow", function() {
            $(".hash-page").fadeIn("slow", function() {
//                setTimeout(fadeBackToInitial, 7000);
            })
        })
    }
    var fadeToHashtag = function() {
        console.log(";osjdf", location)
                $(".jewelryBack").css("background-image", "url('/assets/"+location+"j.jpg')")

        if (location === "19" || location === "20" || location === "21"){
            console.log("in here")
        $(".loser-page").fadeOut("slow", function() {
            $(".jewelryBack").fadeIn("slow", function() {
                setTimeout(fadeToHashAfterJewelry, 7000);
            })
        })
        } else {
        $(".loser-page").fadeOut("slow", function() {
            $(".hash-page").fadeIn("slow", function() {
//                setTimeout(fadeBackToInitial, 7000);
            })
        })
        }

    }

    var doLoserSequence = function() {
        console.log("doing loser")
        var location = window.location.pathname;
        location = location.substr(location.indexOf("/") + 1);
        console.log(location)
        $(".opening-sequence-container").fadeOut("slow", function() {
            console.log("fadeded out ")
            console.log("exist", UrlExists("/assets/loser-images/" + location + ".jpg"));

            if (UrlExists("/assets/loser-images/" + location + ".jpg") !== false) {
                $("#loser-video").hide();
                $(".loser-image").css("background-image", "url('/assets/loser-images/" + location + ".jpg')");
                $(".loser-image").css("z-index", "99999999999");
                $(".loser-video").css("z-index", "-1");

                $(".loser-page").fadeIn("slow", function() {
                    console.log("loaded")
                })
                
                
                setTimeout(fadeToHashtag, 10000)
            } else {
                $("#video" + location).css("z-index", "99999999999");
                $(".loser-page").fadeIn("slow", function() {
                    $("#video" + location)[0].play();
                    console.log("loaded");
                    var showingVid = false;
                    setInterval(function() {
                        if (showingVid == false) {
                            if ($("#video" + location).get(0).currentTime > $("#video" + location).get(0).duration - 2) {
                                showingVid = true;
                                console.log("2 seconds left!")
                                $("#video" + location).parent().fadeOut('slow', function() {
                                    setTimeout(fadeToHashtag, 100)

                                })
                            }
                        }

                    }, 1000);
                })
            }

        })
    }
    var checkIfWinnerNew = function() {
        console.log("new")
        $.ajax({
            type: "POST",
            url: "/riggedOnlyWinner/",
            success: function(response) {
                console.log(response);
                if (response[0].immediateWin === true) {
                    doWinnerSequence();
                } else {
                    doLoserSequence();
                }
            }
        });
    }

    $(".opening-sequence-container").on("click", function() {
        checkIfWinnerNew();
    })
})