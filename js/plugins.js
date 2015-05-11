/**
 * Created by andrea on 29.03.15.
 */
function onDeviceReady () {

    if (navigator.splashscreen && navigator.splashscreen.hide) {
        navigator.splashscreen.hide();
    }

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


    if (device.platform == "Android") {
        BW.src = "/android_asset/www/";
    }



    BW.popSound = new Media (BW.src + "asset/sounds/pop.wav");
    BW.clickSound = new Media (BW.src + "asset/sounds/click.ogg");
    BW.swipeSound = new Media (BW.src + "asset/sounds/swipe.wav");
    BW.blobSound = new Media (BW.src + "asset/sounds/blob.wav");
    BW.finalSound = new Media (BW.src + "asset/sounds/final.wav");


}

document.addEventListener("deviceready",onDeviceReady,false);

