var XSYD_WebSettings = {
	newsPage: "newsdisplay.html?id=",
	newsContent404GoBack: "index.html",
	baseURL: "../", //This can be an absolute URL(https://www.interactiveplus.org/) or relative directory.
	languageCookieDuration: 365
};

var bootstrapSize = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1140
}

var XSYD_CurrentPage = {
	width: 0,
	height: 0,
	correspondingBootstrapSize: "none", //can be none, sm, md, lg, xl
	browser: "none", //firefox,chrome,edge,safari,opera,webkit,blink,gecko,quirksmode,unknown
};

function getGETParam(name) {
	//构造一个含有目标参数的正则表达式对象
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//匹配目标参数
	var r = window.location.search.substr(1).match(reg);
	//返回参数值
	if(r != null) {
		return decodeURI(r[2]);
	}
	return null;
}

function setSelectorWithRemoteContent(Selector,URL){
	"use strict";
	$.ajax(
		{
			url: URL,
			dataType: "html",
			data: null,
			type: "GET",
			async: true
		}
	)
	.done(function(data, textStatus, jqXHR ){
		$(Selector).html(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.error("Document(" + URL + ") failed to load: " + textStatus);
	});
}
function appendSelectorWithRemoteContent(Selector, URL){
	"use strict";
	$.ajax(
		{
			url: URL,
			dataType: "html",
			data: null,
			type: "GET",
			async: true
		}
	)
	.done(function(data, textStatus, jqXHR ){
		$(Selector).append(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.error("Document(" + URL + ") failed to load: " + textStatus);
	});
}
function prependSelectorWithRemoteContent(Selector, URL){
	"use strict";
	$.ajax(
		{
			url: URL,
			dataType: "html",
			data: null,
			type: "GET",
			async: true
		}
	)
	.done(function(data, textStatus, jqXHR ){
		$(Selector).prepend(data);
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.error("Document(" + URL + ") failed to load: " + textStatus);
	});
}

function detectBrowser(){//returns string, firefox,chrome,edge,ie,safari,opera,webkit,blink,gecko,quirksmode,unknown
	  
	var agent = navigator.userAgent.toLowerCase();
	var opera = ((window.opr && opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);

	var browser = {  
		ie: document.documentMode == true, // /(msie\s|trident.*rv:)([\w.]+)/.test(agent)
		edge: !this.ie && window.styleMedia,
		opera: (opera && opera.version),
		quirks: (document.compatMode == 'BackCompat'),
		firefox: typeof InstallTrigger !== 'undefined',
		chrome: (/chrome\/(\d+\.\d)/i.test(agent)) ? +RegExp['\x241'] : false,
		safari:  (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) ? (+(RegExp['\x241'] || RegExp['\x242'])) : false,
		blink: (this.chrome || this.opera) && window.CSS,
		webkit: ((this.chrome || this.opera) && !window.CSS) || this.safari || (agent.indexOf(' applewebkit/') > -1),
		gecko: (navigator.product == 'Gecko' && !this.webkit && !this.opera && !this.ie)
	}; 

	if(browser.ie){
		return "ie";
	}else if(browser.edge){
		return "edge";
	}else if(browser.opera){
		return "opera";
	}else if(browser.firefox){
		return "firefox";
	}else if(browser.chrome){
		return "chrome";
	}else if(browser.safari){
		return "safari";
	}else if(browser.quirks){
		return "quirks";
	}else if(browser.blink){
		return "blink";
	}else if(browser.gecko){
		return "gecko";
	}else if(browser.webkit){
		return "webkit";
	}
}

function getBootstrapType(width){
	if(width < bootstrapSize.sm){
		return "none";
	}else if(width < bootstrapSize.md){
		return "sm";
	}else if(width < bootstrapSize.lg){
		return "md";
	}else if(width < bootstrapSize.xl){
		return "lg";
	}else{
		return "xl";
	}
}

$(document).ready(function() { //$().load function is deprecated
	"use strict";
	//******************* Start Reading BrowserName/Width/Height/BootstrapSize **************************/
	XSYD_CurrentPage.width = $(window).width();
	XSYD_CurrentPage.height = $(window).height();
	XSYD_CurrentPage.correspondingBootstrapSize = getBootstrapType(XSYD_CurrentPage.width);
	XSYD_CurrentPage.browser = detectBrowser();
	//******************* End Reading BrowserName/Width/Height/BootstrapSize ***********************/

	//******************* Start Cookie Prompt ********************/
	if($.cookie("XSYD_Language") === null || $.cookie("XSYD_Language") === undefined){
		$.cookie("XSYD_Language","cn",{expires:XSYD_WebSettings.languageCookieDuration, path:'/'}); //Cookie is supposed to be set at the language detection page.
	}
	var CookieConsent = {message:'', dismiss:''};
	if($.cookie("XSYD_Language") === "cn"){
		CookieConsent.message = "此网站需要使用Cookie，以便于我们可以给您更好的访问体验";
		CookieConsent.dismiss = "我知道了";
		CookieConsent.link = '了解更多';
	}else if($.cookie("XSYD_Language") === "en"){
		CookieConsent.message = "This website needs your cookie in order for us to give you a better experience";
		CookieConsent.dismiss = "Got it";
		CookieConsent.link = 'Learn more';
	}
	cookieconsent.initialise(
		{
			'palette': {
			'popup': {
				'background': '#efefef',
				'text': '#404040'
			},
			'button': {
				'background': '#1f1915',
				'text': '#ffffff'
			}
			},
			'theme': 'edgeless',
			'position': 'bottom',
			'content': CookieConsent
		}
	);

	$('#LoginInput').click(function (e) {

			
	if ($('#LoginInput').prop('className') != 'form-login form-login-active')  
    {
    	
	 	$('#LoginInput').addClass('form-login-active');
	}

	e.stopPropagation();
});

	$('body').click(function (e) {
	if ($('#LoginInput').prop('className') == 'form-login form-login-active')  
	{

		$('#LoginInput').removeClass('form-login-active');
	}

			});
	
	//********************* End Cookie Prompt ********************/
});
$(window).resize(function(){
	//******************* Start Reading Width/Height/BootstrapSize **************************
	XSYD_CurrentPage.width = $(window).width();
	XSYD_CurrentPage.height = $(window).height();
	XSYD_CurrentPage.correspondingBootstrapSize = getBootstrapType(XSYD_CurrentPage.width);
	//******************* End Reading Width/Height/BootstrapSize ***********************
});

$('#LangSelection_English').click(function() {
	"use strict";
	$.cookie('XSYD_Language','en');
});
$('#LangSelection_Chinese').click(function() {
	"use strict";
	$.cookie('XSYD_Language','cn');
});

