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
    analytics.startTrackerWithId('UA-61376811-2', function(){console.log("GA success")}, function(){console.log("GA failure")});



    //media plugin

    BW.appSrc = "http://num.ga-lab.com";
    BW.screenPre = "file://";
    if (device.platform == "Android") {
        //BW.src = "/android_asset/www/";

    }


    //sound


        //pop
        window.plugins.NativeAudio.preloadSimple( 'pop', BW.src + 'asset/sounds/pop.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin pop', 1);
        });

        //click
        window.plugins.NativeAudio.preloadSimple( 'click', BW.src + 'asset/sounds/click.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin click', 1);
        });

        //swipe
        window.plugins.NativeAudio.preloadSimple( 'swipe', BW.src + 'asset/sounds/swipe.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin swipe', 1);
        });

        //blob
        window.plugins.NativeAudio.preloadSimple( 'blob', BW.src + 'asset/sounds/blob.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin blob', 1);
        });

        //final
        window.plugins.NativeAudio.preloadSimple( 'final', BW.src + 'asset/sounds/final.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin final', 1);
        });

        //gameover
        window.plugins.NativeAudio.preloadSimple( 'gameover', BW.src + 'asset/sounds/gameover.mp3', function(msg){
        }, function(msg){
            analytics.trackEvent('Error','onLoad','audio plugin gameover', 1);
        });




    /*BW.popSound = new Media (BW.src + "asset/sounds/pop.mp3",
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
*/


}

document.addEventListener("deviceready",onDeviceReady,false);

