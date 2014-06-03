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
    if (tab == null) return;
    var url = tab.url;
    if (url == null) return;
    url = url.toLowerCase();
    if (url.indexOf('/ja-jp/') !== -1){
      chrome.tabs.update( tab.id, { url: url.replace('ja-jp','en-us') } );
    } else if (url.indexOf('/en-us/') !== -1) {
      chrome.tabs.update( tab.id, { url: url.replace('en-us','ja-jp') } );
    }
});

function setIcon(tabId){
  chrome.tabs.get(tabId,function(tab){
    if (tab == null) return;
    var url = tab.url;
    if (url == null) return;
    url = url.toLowerCase();
    if (url.indexOf('/ja-jp/') !== -1){
      chrome.pageAction.setIcon({path: "icon1.png", tabId: tabId});   
      chrome.pageAction.show(tabId);
    } else if (url.indexOf('/en-us/') !== -1) {
      chrome.pageAction.setIcon({path: "icon2.png", tabId: tabId});   
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.hide(tabId);
    }
  });
};




