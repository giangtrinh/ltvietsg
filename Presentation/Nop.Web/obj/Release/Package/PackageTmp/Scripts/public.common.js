/*tg*/
(function ($, window, document) {
    "use strict";
    var $ui = null,
        $window = $(window),
        $document = $(document),
        productdetailreviews = null,
        templates = null,
        review = null,
        topNav = null,
        historylist = null,
        intqty = 0;
    var ui = {
        events: {
            sendMessage: 'tg.ui.sendMessage',
        },
        initialize: function () {
            $ui = $(this);
            productdetailreviews = $("#productreview-list-item");
            topNav = $(".header-menu");
            historylist = $("#historylist");
            templates = {
                message: $('#product-review-item-template')
            };
            $document.on('click', '.write-product-review-button', function () {
                var productid = jQuery(this).data('productid'),
                Title = $(".review-title").val(),
                ReviewText = $(".review-text").val(),
                Rating = $("input[name='AddProductReview.Rating']").val();
                var reviewmd = { "Title": Title, "ReviewText": ReviewText, "Rating": Rating, "DisplayCaptcha": false, "CanCurrentCustomerLeaveReview": false, "SuccessfullyAdded": false, "Result": "" }
                var prmodel = { "productId": productid, "aprmodel": reviewmd, "captchaValid": true }
                $ui.trigger(ui.events.sendMessage, prmodel);
            });
            $document.on('click', '.qty-minus', function () {
                if (intqty > 1) {
                    intqty = $(".qty-input").val();
                    intqty--;
                    $(".qty-input").val(intqty);
                }
            });
            $document.on('click', '.qty-plus', function () {
                intqty = $(".qty-input").val();
                intqty++;
                $(".qty-input").val(intqty);
            });
        },
        //add a review
        addproductreview: function (prmodel) {
            //if (this.loadWaiting != false) {
            //    return;
            //}
            //this.setLoadWaiting(true);
            console.log(prmodel.aprmodel);
            $.ajax({
                cache: false,
                url: "/addproductreviews?productId=" + prmodel.productId + "&captchaValid=" + prmodel.captchaValid,
                data: { "aprmodel": prmodel.aprmodel },
                type: 'POST',
                dataType: 'json',
                success: this.success_addreview,
                //complete: this.resetLoadWaiting,
                //error: this.ajaxFailure
            });
        },
        success_addreview: function (data) {
            console.log("seccess")
            $.tmpl(templates.message, data).appendTo(productdetailreviews);
        },
        topNavigation: function () {
            //sticky topnav 
            var offsetTop = topNav.offset().top;
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > offsetTop) {
                    topNav.css("top", 0).css("position", "fixed");
                    //if( $j("html").hasClass("touch")){
                    //$j(".back-to-top").show();
                    //}
                } else {
                    topNav.css("top", "").css("position", "relative").css("width", "");
                    //$j(".back-to-top").hide();
                }
            });
        },
        topHistorylist: function () {
            //sticky topnav 
            if (historylist.length) {
                var offsetTop = historylist.offset().top;
                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > offsetTop) {
                        historylist.css("top", 0).css("position", "fixed");
                        //if( $j("html").hasClass("touch")){
                        //$j(".back-to-top").show();
                        //}
                    } else {
                        historylist.css("top", "").css("position", "absolute").css("width", "");
                        //$j(".back-to-top").hide();
                    }
                });
            }
        }
    };
    if (!window.tg) {
        window.tg = {};
    }
    window.tg.ui = ui;
})(window.jQuery, window, window.document);

(function ($, window, ui) {
    var $ui = $(ui);
    $ui.bind(ui.events.sendMessage, function (ev, prmodel) {
        console.log("ok");
        console.log(prmodel);
        ui.addproductreview(prmodel)
    });
    $(function () {
        ui.initialize();
        ui.topHistorylist();
        //ui.topNavigation();
    });
})(window.jQuery, window, window.tg.ui);


function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function displayAjaxLoading(display) {
    if (display) {
        $('.ajax-loading-block-window').show();
    }
    else {
        $('.ajax-loading-block-window').hide('slow');
    }
}

function displayPopupNotification(message, messagetype, modal) {
    //types: success, error
    var container;
    if (messagetype == 'success') {
        //success
        container = $('#dialog-notifications-success');
    }
    else if (messagetype == 'error') {
        //error
        container = $('#dialog-notifications-error');
    }
    else {
        //other
        container = $('#dialog-notifications-success');
    }

    //we do not encode displayed message
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p>' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p>' + message[i] + '</p>';
        }
    }

    container.html(htmlcode);

    var isModal = (modal ? true : false);
    container.dialog({modal:isModal});
}

var AppTG = {};
var TG = {};
AppTG.Util = {};
//get parameter querystring 
AppTG.Util.getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
AppTG.Util.getParameterInHrefByNameTrinhGiang = function (name, href) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
//hightlight
AppTG.Util.highlight = function (pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            if (pos >= 0) {
                var spannode = document.createElement('span');
                spannode.className = 'highlight';
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        }
        else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.length && pat && pat.length ? this.each(function () {
        innerHighlight(this, pat.toUpperCase());
    }) : this;
};
AppTG.Util.removeHighlight = function () {
    return this.find("span.highlight").each(function () {
        this.parentNode.firstChild.nodeName;
        with (this.parentNode) {
            replaceChild(this.firstChild, this);
            normalize();
        }
    }).end();
};
//get short
AppTG.Util.getShort = function (inputlength, element) {
    var title = [];
    var $string = "";
    var $stringtitle = $(element).text();
    $stringtitle = $.trim($stringtitle);
    var $model;
    var A = $stringtitle.split(' ');
    var L = A.length;
    if (L > inputlength) {
        L = inputlength;
        for (var i = 0; i < L; i++) {
            $string = $string + A[i] + ' ';
        }
        $model = $.trim($string) + '...';
    }
    else {
        $model = $stringtitle;
    }
    return $model;
}

var barNotificationTimeout;
function displayBarNotification(message, messagetype, timeout) {
    clearTimeout(barNotificationTimeout);

    //types: success, error
    var cssclass = 'success';
    if (messagetype == 'success') {
        cssclass = 'success';
    }
    else if (messagetype == 'error') {
        cssclass = 'error';
    }
    //remove previous CSS classes and notifications
    $('#bar-notification')
        .removeClass('success')
        .removeClass('error');
    $('#bar-notification .content').remove();

    //we do not encode displayed message

    //add new notifications
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p class="content">' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class="content">' + message[i] + '</p>';
        }
    }
    $('#bar-notification').append(htmlcode)
        .addClass(cssclass)
        .fadeIn('slow')
        .mouseenter(function ()
            {
                clearTimeout(barNotificationTimeout);
            });

    $('#bar-notification .close').unbind('click').click(function () {
        $('#bar-notification').fadeOut('slow');
    });

    //timeout (if set)
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            $('#bar-notification').fadeOut('slow');
        }, timeout);
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}


jQuery(document).ready(function ($) {
     
    //-----get short-----------------   
    $(".news-items .item").each(function () {
        var $this = $(this).find(".news-details");
        $($this).text(AppTG.Util.getShort(23, $this));
    });
    //service customer
    var $serviceFlag = $('#service-flag-wrapper .service-flag'),
        $serviceTooltip = $('#service-flag-wrapper .service-flag-tooltip'),
        $serviceTooltipClose = $('#service-flag-wrapper .service-flag-tooltip-close');
    serviceTagDisplay();
    $(window).resize(function () {
        serviceTagDisplay();
    });

    function serviceTagDisplay() {
        if ($(document).width() >= 1440) {
            $serviceFlag.removeClass('closed').addClass('open');
        } else {
            $serviceFlag.removeClass('open').addClass('closed');
        }
    }

    $serviceFlag.hover(function () {
        $serviceFlag.fadeOut(350);
        $serviceTooltip.fadeIn(350);
    });

    $serviceTooltip.mouseleave(function () {
        $serviceFlag.fadeIn(350);
        $serviceTooltip.fadeOut(350);
    });

    $serviceTooltipClose.click(function () {
        $serviceFlag.fadeIn(350);
        $serviceTooltip.fadeOut(350);
    });

});