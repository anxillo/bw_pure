/**
 * Created by andrea on 29.03.15.
 */
function onDeviceReady () {
    //splashscreen plugin
    if (navigator.splashscreen && navigator.splashscreen.hide) {
        navigator.splashscreen.hide();
    }

    //admob plugin
    admob.createBannerView({
        publisherId: "ca-app-pub-4711044414330488/7526333057",
        autoShowBanner: false,
        overlap: true
    });

    admob.requestInterstitialAd({
        publisherId:          "ca-app-pub-4711044414330488/7526333057",
        interstitialAdId:     "ca-app-pub-4711044414330488/3176858659",
        autoShowInterstitial: false
    });

    //google analytics plugin
    analytics.startTrackerWithId('UA-61376811-2', function(){alert("GA success")}, function(){alert("GA failure")});



    //media plugin

    BW.appSrc = "http://num.ga-lab.com";
    BW.screenPre = "file://";
    if (device.platform == "Android") {
        BW.src = "/android_asset/www/";

    }

    BW.popSound = new Media (BW.src + "asset/sounds/pop.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 1);
        });

    BW.clickSound = new Media (BW.src + "asset/sounds/click.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 2);
        });

    BW.swipeSound = new Media (BW.src + "asset/sounds/swipe.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 3);
        });

    BW.blobSound = new Media (BW.src + "asset/sounds/blob.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 4);
        });

    BW.finalSound = new Media (BW.src + "asset/sounds/final.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 5);
        });

    BW.gameoverSound = new Media (BW.src + "asset/sounds/gameover.mp3",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
            analytics.trackEvent('Error','onLoad','audio plugin', 6);
        });



}

document.addEventListener("deviceready",onDeviceReady,false);

