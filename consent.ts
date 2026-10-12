let Ads: any = null;
try {
  Ads = require('react-native-google-mobile-ads');
} catch {
  Ads = null;
}

/** Runs Google's UMP consent flow (required in the EEA/UK), then initialises the Mobile Ads SDK. */
export async function initAds(): Promise<boolean> {
  if (!Ads) return false;
  try {
    const { AdsConsent, default: mobileAds, MaxAdContentRating } = Ads;
    await AdsConsent.gatherConsent(); // requests info update + shows the form only if required
    const info = await AdsConsent.getConsentInfo();
    if (!info.canRequestAds) return false;
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
    await mobileAds().initialize();
    return true;
  } catch {
    return false;
  }
}

export async function showPrivacyOptions() {
  if (!Ads) return;
  try {
    await Ads.AdsConsent.showPrivacyOptionsForm();
  } catch {
    /* form not required or unavailable */
  }
}
