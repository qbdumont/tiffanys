$(document).ready(function() {
    //    var video = document.getElementById('video');
    //video.addEventListener('click',function(){
    //    video.play();
    //},false);
    $('.spin').hide();

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
//        var id = $(".toggleTxt" + tabletIndex " a").text();
//        var assetString = $("#asset" + tabletIndex);
        var id = $("#thisIsMyID").text();
        var assetString = $("#thisIsMyAsset").text();
        var nextTouch = $("#checkbox"+tabletIndex).val();

//        var id = $(this).parent();
        console.log("nex", nextTouch);
        if (nextTouch === 'on'){
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

    var checkIfWinner = function(index) {
        console.log("index", index);
        $(".result").remove();
        var response = [];
        //        $('.winner-video').remove();
        $(".video-container").after('<div class="result"></div>');
        $('.result').hide();

        $.ajax({
            type: "POST",
            url: "/winner/" + index,
            success: function(response) {
                console.log(index, response);
                var prizeInfo = null;

                for (var i = 0; i < response.length; i++) {
                    console.log(response[i].immediateWin)
                    if (response[i].immediateWin === true) {
                        console.log("immediate win!", response[i])
                        $('#' + index).get(0).play();
                        prizeInfo = [];
                        prizeInfo = response[i];
                        var instantWin = true;

                        //                        $('#' + index).fadeOut(function() {
                        //                            $('.video-container').fadeIn(function() {
                        //                                $('.winner-video').get(0).play();
                        //                            });
                        //                        });
                        var showingVid = false;
                        setInterval(function() {
                            if ($('.individual-matrix-square').get(0).currentTime > $('.individual-matrix-square').get(0).duration - 2 && showingVid == false) {
                                showingVid = true;
                                console.log("2 seconds left!")
                                $('.individual-matrix-square').parent().fadeOut('slow', function() {
                                console.log("prizeInfo", prizeInfo)
                                $('#'+prizeInfo.id).show();
                            })
                            }
                        }, 1000);



                        $('.individual-matrix-square').bind('ended', function() {

                        })
                    } else if (response[i].highPercentagePrize === true || response[i].mediumPercentagePrize === true || response[i].lowPercentagePrize === true && response[i].immediateWin !== false) {
                        console.log("chance win!", response[i])
                        $('#' + index).get(0).play();
                        prizeInfo = [];
                        prizeInfo = response[i];
                        var instantWin = true;

                        //                        $('#' + index).fadeOut(function() {
                        //                            $('.video-container').fadeIn(function() {
                        //                                $('.winner-video').get(0).play();
                        //                            });
                        //                        });
                        var showingVid = false;
                        setInterval(function() {
                            if ($('.individual-matrix-square').get(0).currentTime > $('.individual-matrix-square').get(0).duration - 2 && showingVid == false) {
                                showingVid = true;
                                console.log("2 seconds left!")
                                $('.individual-matrix-square').parent().fadeOut('slow', function() {
                                console.log("prizeInfo", prizeInfo)
                                $('.winner-video').show();
                            })
                            }
                        }, 1000);



                        $('.individual-matrix-square').bind('ended', function() {

                        })
                    } else if (response[i].highPercentagePrize === false || response[i].mediumPercentagePrize === false || response[i].lowPercentagePrize === false && instantWin !== true) {
                        $('#' + index).get(0).play();
                        //                        $(".winner-video").remove();

                        //                        $('#' + index).fadeOut(function() {
                        //                            $('.video-container').fadeIn(function() {
                        //                                $('.winner-video').get(0).play();
                        //                            });
                        //                        });
                        $('.individual-matrix-square').bind('ended', function() {
                            $(this).parent().fadeOut(function() {
                                var imageUrl = "./assets/loser-images/" + index + ".jpg"
                                $(".result").css("background-image", 'url(' + imageUrl + ')');
                                $('.result').fadeIn(function() {
                                    setTimeout(function() {
                                        $('.result').fadeOut(function() {
                                            console.log("vuideo faded out")
                                            $('.video-container').fadeIn();
                                        });
                                    }, 3000);


                                });


                            })
                        })
                    }
                }

                //                if (response === true) {
                //                    $('#' + index).fadeOut(function() {
                //                        $('.video-container').fadeIn(function() {
                //                            $('.winner-video').get(0).play();
                //                        });
                //                    });
                //                    $('.winner-video').bind('ended', function() {
                //                        $(this).parent().fadeOut(function() {
                //                            $('#' + index).fadeIn();
                //                        })
                //                    })
                //                } else {
                //                    sweetAlert("Better Luck Next time...", "Try again", "error");
                //                }
            }
        });
    }

    $(".individual-matrix-square").on("click", function() {
        console.log("in here")
        var index = $(this).attr('id');
        checkIfWinner(index);
    })



    var untouchedPads = [];

    function addLocation() {

        untouchedPads.push(window.location.pathname);
    }
    var removeLocation = function() {
        console.log(untouchedPads)
        for (var i = 0; i < untouchedPads.length; i++) {
            if (window.location.pathname === untouchedPads[i]) {
                untouchedPads.splice(i, 1);
            }
        }
    }
    var initial = setTimeout(addLocation, 6000);

    $(document).click(function(event) {
        removeLocation();
        clearTimeout(initial);
        initial = setTimeout(addLocation, 12000);
    });
    var randomSpin = function() {
        if (window.location.pathname === untouchedPads[0]) {
            console.log("doing it")
            $('.individual-matrix-square').hide();
            $('.spin').show().get(0).play();
            //            $('.individual-matrix-square').attr('src', "./assets/spin-video.mp4");
            //            $('.individual-matrix-square')[0].load();
            //            $('.individual-matrix-square').get(0).play();
            $(".spin").bind('ended', function() {
                $('.spin').hide()
                $('.individual-matrix-square').show();
                console.log("vuideo faded outfrom random spin")
                    //                $('.individual-matrix-square').attr('src', "./assets/openbox.m4v");
                    //                $('.individual-matrix-square')[0].load();
                    //                                            $('.individual-matrix-square').get(0).play();
            })
        }

    }
    setInterval(function() {
        randomSpin();
    }, Math.floor(Math.random() * 120000) + 60000)
    console.log()

})