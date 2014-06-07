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
    var cul = getCulture(url);
    if (cul == null) return;

    url = url.toLowerCase();
    chrome.tabs.update( tab.id, { url: url.replace(cul.match, cul.target) } );
});

function setIcon(tabId){
  chrome.tabs.get(tabId,function(tab){
    var cul = getCulture(tab.url);
    if (cul == null) {chrome.pageAction.hide(tabId);return;}

    chrome.pageAction.setIcon({imageData: createIconImage(cul.match, cul.color), tabId: tabId});
    chrome.pageAction.setTitle({tabId: tabId, title: 'Go to ' + cul.target});
    chrome.pageAction.show(tabId);
  });
};

function createIconImage(locale, fontColor) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '13px Times New Roman';
  context.textAlign = 'center';
  context.fillStyle = fontColor;
  context.fillText(locale.substring(0,2), 10, 13);
  return context.getImageData(0, 0, 19, 19);
}

function getCulture(url){
  if (url == null) return null;
  url = url.toLowerCase();
  var culture1 = localStorage['culture1'] || 'en-us';
  var culture2 = localStorage['culture2'] || 'ja-jp';
  if (url.indexOf('/' + culture1) !== -1){
    return {match:culture1, target:culture2, color:'blue'}
  } else if (url.indexOf('/' + culture2) !== -1) {
    return {match:culture2, target:culture1, color:'red'}
  }
  return null;
}


