chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  setIcon(tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
  setIcon(tabId);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  setIcon(tabs[0].id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
    var url = tab.url;
    var pair = getLocalePair(url);
    if (pair == null) return;

    url = url.toLowerCase();
    chrome.tabs.update( tab.id, { url: url.replace(pair.match, pair.target) } );
});

function setIcon(tabId){
  chrome.tabs.get(tabId,function(tab){
    var pair = getLocalePair(tab.url);
    if (pair == null) {chrome.pageAction.hide(tabId);return;}

    chrome.pageAction.setIcon({path: 'icon-' + pair.match + '.png', tabId: tabId});
    chrome.pageAction.setTitle({tabId: tabId, title: pair.target + 'に移動します。'});
    chrome.pageAction.show(tabId);
  });
};

function getLocalePair(url){
  if (url == null) return null;
  url = url.toLowerCase();
  if (url.indexOf('/ja-jp/') !== -1){
    return {match:'ja-jp', target:'en-us'}
  } else if (url.indexOf('/en-us/') !== -1) {
    return {match:'en-us', target:'ja-jp'}
  }
  return null;
}


