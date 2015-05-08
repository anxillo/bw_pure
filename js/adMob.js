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




}

document.addEventListener("deviceready",onDeviceReady,false);

