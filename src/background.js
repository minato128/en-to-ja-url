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

    chrome.tabs.update( tab.id, { url: url.replace(new RegExp('/' + cul.match, 'i'), '/' + cul.target) } );
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

//３つ以上の設定にも対応したけど、需要なさそうだからまだ設定画面には反映してない
function getCulture(url){
  if (url == null) return null;

  var locales = [ localStorage['culture1'] || 'en-us', localStorage['culture2'] || 'ja-jp'];
  for (var i = 0; i < locales.length; i++) {
    if(url.match(new RegExp('/' + locales[i], 'i'))){
      return {match:locales[i], target:locales[i == locales.length - 1 ? 0 : i+1], color:i % 2 == 0 ? 'blue' : 'red'};
    }
  }

  return null;
}


