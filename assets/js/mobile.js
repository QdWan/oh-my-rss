var NET_ERROR_MSG="\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01";function getTextReadTime(a){console.log((new Date).valueOf());for(var b=0,c=0;c<a.length;c++)b=4<escape(a.charAt(c)).length?b+2:b+1;console.log((new Date).valueOf());return parseInt(b/900)}function genUidV0(){var a=uuid.v4(),b=md5(a+atob("bDNsU3BxNXM2b1NyRFJ0dFQwa1o=")).substring(0,10);return a+atob("MDA=")+b}function toast(a,b){M.toast({html:a,displayLength:void 0===b?1E3:b})}
function warnToast(a){M.toast({html:'<span style="color: #eeff41;">'+a+"</span>",displayLength:3E3})}function getOrSetUid(){var a=localStorage.getItem("UID");if(a)return a;localStorage.setItem("UID",genUidV0());return localStorage.getItem("UID")}function hasReadArticle(a){return localStorage.getItem("READ/"+a)}function setReadArticle(a){localStorage.setItem("READ/"+a,"1")}function hasLikeArticle(a){return localStorage.getItem("LIKE/"+a)}
function setLeaveMsgToday(){localStorage.setItem("LMSG/"+(new Date).toDateString(),"1")}function hasLeaveMsgToday(){return localStorage.getItem("LMSG/"+(new Date).toDateString())}function setLikeArticle(a){localStorage.setItem("LIKE/"+a,"1")}function hasOpenSrc(a){return localStorage.getItem("OPEN/"+a)}function setOpenSrc(a){localStorage.setItem("OPEN/"+a,"1")}function getSubFeeds(){var a=localStorage.getItem("SUBS");return a?JSON.parse(a):{}}
function getUnsubFeeds(){var a=localStorage.getItem("UNSUBS");return a?JSON.parse(a):{}}function subFeed(a){var b=getSubFeeds(),c=getUnsubFeeds();delete c[a];b[a]=1;localStorage.setItem("SUBS",JSON.stringify(b));localStorage.setItem("UNSUBS",JSON.stringify(c))}function unsubFeed(a){var b=getSubFeeds(),c=getUnsubFeeds();delete b[a];c[a]=1;localStorage.setItem("SUBS",JSON.stringify(b));localStorage.setItem("UNSUBS",JSON.stringify(c))}
function enterFullscreen(){var a=document.documentElement;(a.requestFullscreen||a.webkitRequestFullScreen||a.mozRequestFullScreen||a.msRequestFullscreen).call(a)}function isInFullscreen(){return document.fullscreenElement&&null!==document.fullscreenElement||document.webkitFullscreenElement&&null!==document.webkitFullscreenElement||document.mozFullScreenElement&&null!==document.mozFullScreenElement||document.msFullscreenElement&&null!==document.msFullscreenElement}
function exitFullscreen(){try{document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}catch(a){console.warn("\u9000\u51fa\u5168\u5c4f\u65f6\u9047\u5230\u5f02\u5e38",a.msg)}return!0}function getCurPage(){var a=localStorage.getItem("CURPG");return a?a:"1"}
function updateReadStats(){var a=$("#omrss-third"),b=a.text().trim().length,c=a.find("img").length,d=a.find("a").length;a="\u9884\u8ba1\u9605\u8bfb\u65f6\u95f4<b> "+(getTextReadTime(a.text().trim())+parseInt(c/20)+parseInt(d/20))+" </b>\u5206\u949f\uff08\u5171 "+b+" \u4e2a\u5b57\uff0c "+c+" \u5f20\u56fe\u7247\uff0c "+d+" \u4e2a\u94fe\u63a5\uff09";$("#omrss-read-stats").html(a)}
function updateUnreadCount(){var a=JSON.parse(localStorage.getItem("TOREADS")),b=0;if(a){for(var c=0;c<a.length;c++)hasReadArticle(a[c])||(b+=1);0<b?($("#omrss-unread").html('<a href="#!"><span class="new badge">'+b+"</span></a>"),localStorage.setItem("NEW",b.toString())):$("#omrss-unread").html("")}return b}function markReadAll(){var a=JSON.parse(localStorage.getItem("TOREADS"));if(a)for(var b=0;b<a.length;b++)setReadArticle(a[b])}
function setToreadList(a){a=void 0===a?!1:a;$.post("/api/lastweek/articles",{uid:getOrSetUid(),sub_feeds:Object.keys(getSubFeeds()).join(","),unsub_feeds:Object.keys(getUnsubFeeds()).join(","),ext:window.screen.width+"x"+window.screen.height},function(b){localStorage.setItem("TOREADS",JSON.stringify(b.result));b=updateUnreadCount();!0===a&&0<b&&window.Notification&&"granted"===Notification.permission&&new Notification("\u60a8\u6709"+b+"\u6761\u672a\u8bfb\u8ba2\u9605",{tag:"OMRSS",icon:"https://ohmyrss.com/assets/img/logo.png",
body:"\u8bf7\u5237\u65b0\u9875\u9762\u540e\u67e5\u770b"})})}var lruCache=new Cache(50,!1,new Cache.LocalStorageCacheStorage("OMRSS")),cacheVer="20`";function setLruCache(a,b){return 102400>b.length&&512<b.length?(lruCache.setItem(cacheVer+a,b),!0):!1}function getLruCache(a){return lruCache.getItem(cacheVer+a)}var isBgWin=!1;
function isQQApp(){var a=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)&&/\sQQ/i.test(navigator.userAgent),b=/(Android)/i.test(navigator.userAgent)&&/MQQBrowser/i.test(navigator.userAgent)&&/\sQQ/i.test(navigator.userAgent);return a||b}function isInWebview(){var a=navigator.userAgent.toLowerCase();return/micromessenger/i.test(a)||isQQApp()||/WeiBo/i.test(a)}
function fixThirdStyleTag(){$("#omrss-third p, #omrss-third span, #omrss-third section, #omrss-third div").each(function(){void 0!==$(this).attr("style")&&$(this).removeAttr("style")});$("#omrss-third img, #omrss-third video").each(function(){$(this).removeAttr("width");$(this).removeAttr("height")})};function getPageSize(){return 10}
function loadPage(a){$("#omrss-loader").removeClass("hide");$.post("/api/html/articles/list",{uid:getOrSetUid(),page_size:getPageSize(),page:a,mobile:!0,sub_feeds:Object.keys(getSubFeeds()).join(","),unsub_feeds:Object.keys(getUnsubFeeds()).join(",")},function(a){a=$(a);a.find(".collection li[id]").each(function(a){hasReadArticle(this.id)&&(a=$(this).find("i.unread"),a.removeClass("unread").addClass("read"),a.text("check"),$(this).find(".omrss-title").removeClass("omrss-title-unread"));hasLikeArticle(this.id)&&
$(this).find("i.thumb-icon").addClass("omrss-color");hasOpenSrc(this.id)&&$(this).find("i.open-icon").addClass("omrss-color")});a.find(".prettydate").prettydate();$("#omrss-main").html(a)}).fail(function(a){warnToast(a.responseText)}).always(function(){$("#omrss-loader").addClass("hide");localStorage.setItem("CURPG",a);document.body.scrollTop=document.documentElement.scrollTop=0})}
$(document).ready(function(){getOrSetUid();"/"===window.location.pathname&&loadPage(1);"/"!==window.location.pathname&&(updateReadStats(),fixThirdStyleTag());setToreadList(notify=!1);setInterval(function(){!0===isBgWin&&setToreadList(notify=!0)},72E5);$(document).on("click",".ev-cnt-list",function(){var a=this.id,b=$(this);if(!hasReadArticle(a)){setReadArticle(a);var c=b.find("i.unread");c.removeClass("unread").addClass("read");c.text("check");b.find(".omrss-title").removeClass("omrss-title-unread");
updateUnreadCount();setTimeout(function(){$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"VIEW"},function(){})},1E3)}});$(document).on("click",".ev-intro",function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/homepage/intro",{uid:getOrSetUid(),mobile:!0},function(a){target=0!==$("#omrss-article").length?$("#omrss-article"):$("#omrss-main");target.html(a);target.scrollTop(0);updateReadStats()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});
$(document).on("click",".ev-faq",function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/faq",{uid:getOrSetUid(),mobile:!0},function(a){target=0!==$("#omrss-article").length?$("#omrss-article"):$("#omrss-main");target.html(a);target.scrollTop(0);updateReadStats()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(document).on("click",".ev-mark-readall",function(){markReadAll();updateUnreadCount();toast("\u5df2\u5c06\u5168\u90e8\u8bbe\u4e3a\u5df2\u8bfb^o^")});
$(document).on("click",".ev-my-feed",function(){warnToast("\u529f\u80fd\u6b63\u5728\u5f00\u53d1\u4e2d\uff0c\u656c\u8bf7\u671f\u5f85^o^")});$(document).on("click",".ev-toggle-feed",function(){var a=$(this).text(),b=$(this).attr("data-name");"\u8ba2\u9605"===a?(subFeed(b),toast("\u8ba2\u9605\u6210\u529f^o^"),$(this).text("\u53d6\u6d88\u8ba2\u9605"),$(this).addClass("omrss-bgcolor")):"\u53d6\u6d88\u8ba2\u9605"===a&&(unsubFeed(b),toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^"),$(this).removeClass("omrss-bgcolor"),
$(this).text("\u8ba2\u9605"))});$(document).on("click",".ev-page",function(){var a=$(this).attr("data-page");loadPage(a)});$(document).on("click","#omrss-like",function(){var a=$(this).attr("data-id");hasLikeArticle(a)?warnToast("\u5df2\u7ecf\u70b9\u8fc7\u8d5e\u4e86\uff01"):$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"THUMB"},function(b){setLikeArticle(a);toast("\u70b9\u8d5e\u6210\u529f^o^")}).fail(function(){warnToast(NET_ERROR_MSG)})});$(document).on("click",".ev-open-src",function(){var a=
$(this).attr("data-id");hasOpenSrc(a)||$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"OPEN"},function(b){setOpenSrc(a)})});$(document).on("click",".ev-display-btn",function(){$(this).addClass("hide");$("#omrss-rss-hide").removeClass("hide")});$(document).on("click",".ev-window-close",function(){isInWebview()?location.href="/":window.close()});$(document).on("click","#omrss-unlike",function(){var a=$(this).attr("data-site");unsubFeed(a);toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^")});
$(window).bind("focus",function(){isBgWin=!1;console.log("\u8f6c\u5230\u524d\u53f0")});$(window).bind("blur",function(){isBgWin=!0;console.log("\u8f6c\u5230\u540e\u53f0")})});