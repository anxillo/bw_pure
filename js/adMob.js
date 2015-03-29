/**
 * Created by andrea on 29.03.15.
 */
function onDeviceReady () {


    admob.createBannerView({
        publisherId: "ca-app-pub-4711044414330488/7526333057",
        autoShowBanner: false,
        overlap: true



    });



}

document.addEventListener("deviceready",onDeviceReady,false);

