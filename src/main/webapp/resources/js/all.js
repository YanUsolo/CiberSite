// use strict;

$(document).ready(function () {

    //Обновление новосте при нажатии на стрелки. Доделать
    (function () {
        const pageTitle = {
            cs: "CS GO",
            paragon: "Paragon",
            dota: "Dota 2",
            wot: "World of tanks"
        }

        var pageTitleId = $('.page-container').attr('data-id-game'),
            newsPageDirectly = 'next',
            latestArrow,
            isLoaded = true;

        localStorage.clear();
        console.log('localStorage  length ', localStorage.length);

        if (localStorage.length !== 0) {
            newsPageDirectly = localStorage.getItem('pageNumber');
            console.log('pageNumber from store ', localStorage.getItem('pageNumber'));
        }

        function fillBlankByNewsForViewPage(obj) {
            newsItem = $(
                '<tr >' +
                '<th>' + obj.id + '</th>' +
                '<th>' + obj.name + '</th>' +
                '<th>' + obj.Image + '</th>' +
                '<th>' + obj.any + '</th>' +
                '<th>' + obj.date + '</th>' +
                '<th>' + obj.any + '</th>' +
                '</tr>'
            );
            return newsItem;
        }

        function fillBlankByNewsForViewPage_Default(any) {
            newsItem = $(
                '<tr >' +
                '<th>' + 'id' + '</th>' +
                '<th>' + 'name' + '</th>' +
                '<th>' + 'Image' + '</th>' +
                '<th>' + 'date' + '</th>' +
                '<th>' + any + '</th>' +
                '</tr>'
            );
            return newsItem;
        }


        $('#selectTable').change(function () {
            alert('The option with value ' + $(this).val() + ' and text ' + $(this).text() + ' was selected.' + $('#selectTitel').val());
            getPostsForViewPage($(this).val(), $('#selectTitel').val())
        });

        $('#selectTitel').change(function () {
            alert('The option with value ' + $(this).val() + ' and text ' + $(this).text() + ' was selected.');
            getPostsForViewPage($('#selectTable').val(), $(this).val())
        });

        function getPostsForViewPage(table, titel) {
            alert("GetNewsForViewPage");

            console.log(document.title);
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/getPostForView",
                data: ({
                    titel: titel,
                    table: table
                }),
                dataType: "JSON",
                success: function (result) {
                    //  alert('ajax result' + result + ' 0 ' + result[0] + '  1  titel ' + result[1].titel)
                    replaceNewsPostsForViewPage(result);

                },
                error: function (result) {
                    //  newsPageDirectly = localStorage.getItem('pageNumber');
                    console.log('result fail ', result);
                    // var obj = jQuery.parseJSON( result);
                    // var obj = JSON.parse(result);
                    //)  alert('ajax result' + result + ' 0 ' + result[0] + '  1  titel ' + result[1])
                    // alert('ajax json' + obj + ' 0 ' + obj[0] + '  1   ' + obj[1] + '  titel  ' + titel)
                    //  alert('ajax json' + json + ' 0 ' + json[0] + '  1   ' + json[1])


                }

            });
        }

        function replaceNewsPostsForViewPage(result) {
            //pageInfo = result.PageInfo;
            //Если пустой список - оставить старые. Не заменять ничего
            //    if(result.NewsViewModelList.lenght === 0) { return; }

            // localStorage.setItem('pageNumber', pageInfo.PageNumber);
            //   console.log('replaceNewsPosts -- newsPageDirectly ', pageInfo.PageNumber);


            var headerHeight = $("#tableOfPost").css("height")

            var newsContainer = $("#tableOfPost");
            var newsPosts = newsContainer.children();

            //newsPosts.remove();

            newsContainer.css("opacity", 0);
            isLoaded = false;

            console.log('height : ' + headerHeight);
            setTimeout(function () {
                var newsArray = Array.prototype.slice.call(result);
                console.log('array : ' + newsArray[0].anyKey);
                newsContainer.append(fillBlankByNewsForViewPage_Default('Content'));
                newsArray.map(function (obj, index) {
                    newsContainer.append(fillBlankByNewsForViewPage(obj));
                    console.log('!!!!!!!!!!!!       0');
                });

                newsPosts.remove();
                $("#tableOfPost").height(headerHeight);
                newsContainer.css("opacity", 1);

                isLoaded = true;
            }, 300);
        }


        $(".news").on("click", getNews);

        function getNews(e) {

            if (!isLoaded) return;
            var headerHeight = $(".news__header").css("height"),
                newsContainer = $(".news__container"),
                newsPosts = newsContainer.children(),
                pageInfo,
                sendNewsParams,
                arrowDeriction = e.target.parentNode,
                arrowClassName = arrowDeriction.className;


            newsPageDirectly = getPageNumber(arrowClassName, newsPageDirectly);
            console.log('newsPageDirectly ', newsPageDirectly);

            sendNewsParams = {
                theme: pageTitleId,
                page: newsPageDirectly,
                newsPerPage: 3
            }

            if (arrowClassName == 'news__arrow-l' || arrowClassName == 'news__arrow-r') {
                getNewPosts(sendNewsParams, replaceNewsPosts);
            }

            //Замена новыми постами
            function replaceNewsPosts(result) {
                //pageInfo = result.PageInfo;
                //Если пустой список - оставить старые. Не заменять ничего
                //    if(result.NewsViewModelList.lenght === 0) { return; }

                // localStorage.setItem('pageNumber', pageInfo.PageNumber);
                //   console.log('replaceNewsPosts -- newsPageDirectly ', pageInfo.PageNumber);
                newsContainer.css("opacity", 0);
                isLoaded = false;
                disaibleNewsArrow(arrowDeriction);

                setTimeout(function () {
                    var newsArray = result;
                    newsArray.map(function (obj, index) {
                        if (index > 2) return;
                        newsContainer.append(fillBlank(obj));
                    });

                    newsPosts.remove();
                    $(".news__header").height(headerHeight);
                    newsContainer.css("opacity", 1);

                    isLoaded = true;
                }, 300);
            }
        }

        //Получить предыдущие посты для моб. устройств
        $(".news__more-news button").on('click', function (e) {
            newsPageDirectly = 1;

            var sendNewsParams = {
                theme: pageTitleId,
                page: newsPageDirectly,
                newsPerPage: 3
            }

            var headerHeight = $(".news__header").css("height"),
                newsContainer = $(".news__container"),
                newsPosts = newsContainer.children(),
                arrowDeriction = e.target.parentNode,
                arrowClassName = arrowDeriction.className;

            getNewPosts(sendNewsParams, replaceNewsPostsMobile)

            function replaceNewsPostsMobile() {
                var newsArray = result.NewsViewModelList;
                newsArray.map(function (obj, index) {
                    if (index > 2) return;
                    newsContainer.append(fillBlank(obj));
                });

                $(".news__header").height(headerHeight);
            }
        });

        //Функции'<img src="../resources/img/'+ obj.image +'">' +
        function fillBlank(obj) {
            newsItem = $(
                '<div class="news__item">' +
                '<div class="news__img">' +
                '<img src="' + obj.Image + '">' +
                '</div>' +
                '<div class="news_tag">Новости</div>' +
                '<h4 class="news__header">' +
                obj.Title +
                '</h4>' +
                '<p class="news__preview-text">' +
                obj.Content +
                ' </p>' +
                '<div class="news__more-l">' +
                '<a href="/News/Index?id=' +
                obj.NewsId +
                '"class="news__more">Подробнее...</a></div>' +
                '<span class="news__data">' +
                obj.PublishDate +
                '</span>' +
                '</div>'
            );
            return newsItem;
        }


        function getNewPosts(newsParams, callback) {
            alert("GetNews");
            console.log(document.title);
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/getNewsForCibersite",
                data: ({
                    theme: getIdOfPage(document.title),
                    // theme : '2',
                    page: newsPageDirectly,
                    newsPerPage: '3'
                }),
                dataType: "JSON",
                success: function (result) {
                    callback(result);
                },
                error: function (result) {
                    //  newsPageDirectly = localStorage.getItem('pageNumber');
                    console.log('Fail newsPageDirectly: ', newsPageDirectly);
                    console.log('result fail ', result);
                }
            });
        }

        function getIdOfPage(pageType) {
            switch (pageType) {
                case pageTitle.cs:
                    return 1;
                case pageTitle.paragon:
                    return 2;
                case pageTitle.dota:
                    return 3;
                case pageTitle.wot:
                    return 4;
                default:
                    return 5;
            }
        }

        function getPageNumber(arrowClassName, newsPageDirectly) {
            if (arrowClassName == "news__arrow-l") {
                if (newsPageDirectly == 1) return newsPageDirectly;
                return newsPageDirectly = 'priv';
            } else if (arrowClassName == "news__arrow-r") {
                return newsPageDirectly = 'next';
            } else return newsPageDirectly;
        }

        function disaibleNewsArrow(arrow, pageInfo) {
            function disaibleNewsArrow(arrow, pageInfo) {
                if (pageInfo.PageNumber == pageInfo.TotalPages) {
                    $(arrow).css({visibility: 'hidden'});
                } else if (pageInfo.PageNumber == 1) {
                    $(arrow).css({visibility: 'hidden'});
                } else {
                    $(latestArrow).css({visibility: 'visible'});
                }
                latestArrow = arrow;
            }
        }

    })();


    //Кнопка бана
    var BanAction = (function () {
        var userName;
        var menu = $(".ban-actions-menu");

        function getBanMenu(e) {
            e.stopPropagation();
            menu.css("display", "none");
            userName = $(this).parent().find(".chat__user").find(".chat__user-name").text();
            console.log(userName);
            var position = $(this).offset();
            displayBanActions(position.left, position.top);
        }

        function closeMenu() {
            menu.css("display", "none");
        }

        function displayBanActions(x, y) {
            var menu = $(".ban-actions-menu");
            var menuWidth = menu.css("width");
            var left = (x + 20);
            var styles = {
                display: "block",
                opacity: 1,
                top: y + 25,
                left: left
            };

            if (menu.css("display") == "none") {
                menu.css(styles);

            } else {
                menu.css({display: "none"});

            }
        }


        function sendData() {
            var banOption = $("input[type='radio']:checked").val();

            if (banOption == undefined) {
                return;
            }
            console.log(banOption + "  -- " + userName);
            $.ajax({
                type: "POST",
                url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
                contentType: "application/json; charset=utf-8",
                data: {banOption: banOption, userName: userName},
                dataType: "json",
                success: function (result) {
                    console.log('It worked!');
                    //  returning something
                    console.log('result... ' + result);

                },
                error: function (result) {
                    console.log('Error :(');
                }
            });
        }

        //Клик на кнопку бана(всплывающее окно)
        $(".chat-container").on("click", function (e) {
            e.stopPropagation();
            var chatBanButton = $(this).find(".chat_ban-actions");
            var tName = e.target.className;
            if (tName === "chat_ban-actions") {
                userName = $(e.target).parent().find(".chat__user-name").text();
                console.log(userName);
                var position = $(e.target).offset();
                var x = position.left;
                var y = position.top;
                var menu = $(".ban-actions-menu");
                var styles = {
                    display: "block",
                    opacity: 1,
                    top: y + 25,
                    left: x + 20
                };

                if (menu.css("display") == "none") {
                    menu.css(styles);

                } else {
                    menu.css({display: "none"});

                }
            }
            var chatSendDataButton = $('html').find(".ban-actions__act");
            chatSendDataButton.off("click", BanAction.sendData).on("click", BanAction.sendData);


        });

        return {
            displayMenu: getBanMenu,
            sendData: sendData,
            closeMenu: closeMenu,
            getMenu: (function () {
                return menu;
            })()
        }
    })();

    $(".ban-actions-menu__close").click(BanAction.closeMenu);

    $(document).scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    //Вообще перестает отображать банменю
    window.onclick = function (event) {
        if (!$(event.target).closest($(".ban-actions-menu")).length) {
            $(".ban-actions-menu").css({display: "none"});
        }
    };

    //Отправка сообщения на сервер. ЧAT
    (function () {
        var chatDialog = $(".chat__dialog");

        function isBottom() {
            var isBottom = true;
            var scrollBottom = chatDialog.scrollTop() + chatDialog.height();
            if (scrollBottom !== chatDialog.prop("scrollHeight")) {
                return false;
            }
            return true;
        }

        //Спустить скролл вниз
        function scrollDown(el) {
            el.animate({scrollTop: el.prop("scrollHeight")}, 400);
        }

        $(document).ready(function () {
            scrollDown(chatDialog);
        });

        //Кнопка для скролла вниз. Если скролл не внизу то показать кнопку. Иначе скрыть
        chatDialog.scroll(function () {
            var buttonToBottom = $(".chat-container__toBottom");
            var isB = isBottom();
            if (!isB) {
                buttonToBottom.addClass("isScrolled");
            } else {
                buttonToBottom.removeClass("isScrolled");
            }
        });

        //Кнопка для скролла вниз. Обработчик нажатия
        $("#toBottom").on("click", function (e) {
            scrollDown(chatDialog);
        })

        $(".chat__button").click(function () {
            var dataMessage = $("#chat__input-text").val();

            if (dataMessage == undefined || dataMessage == "") {
                return;
            }
            console.log(dataMessage);
            $.ajax({
                type: "POST",
                url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
                contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
                data: {dataMessage: dataMessage},
                dataType: "json",
                success: function (result) {
                    if (isBottom()) scrollDown(chatDialog);
                    appendMessage(dataMessage);

                },
                error: function (result) {
                    //Тест. Потом убрать
                    //Ессли проскролили сообщения то при добалении новой не скролить вниз. Отобразить кнопку для скролинга вниз
                    // if (isBottom()) scrollDown(chatDialog);
                    // //Тест. Потом убрать
                    // appendMessage(dataMessage);
                    console.log('Error :(');
                }
            });
        });
    })();

//Добавление сообщения в чат. Добавление обработчиков на кнопки бана
    var appendMessage = function appendMessage(dataMessage) {

        var messege = $('<li class="chat__messenge">' +
            '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
            '<em class="chat__user-name">' + "Poollooer" + '</em>' +
            '<em class="chat__time">' + "12:25" + '</em></div>' +
            '<p class="chat__messenge-content">' + "кэшированию информации, чтобы на их платформах контент предоставлялся пользователю с оптимальной скоростью. Поэтому использование АМ" + '</p></li>');

        $("#team-chat").append(messege);
    }


    $(".videos__list, .streams__list, .matches__table, .team__list, .search__list, .notification-list").mCustomScrollbar({alwaysShowScrollbar: 1});

});

// Чат ттугл
(function () {
    var toggleChat = document.getElementsByClassName("chat__toggle")[0];
    var isToggle = false;
    var screenMd = 1024;

    function toggle() {
        var chat = document.getElementsByClassName("chat--aside")[0];
        var wrapper = document.getElementsByClassName("page-container")[0];
        var w = document.documentElement.clientWidth;

        if (!isToggle) {
            chat.style.transform = "translateX(0px)";
            if (w > screenMd) {
            }
            isToggle = true
        } else {
            chat.style.transform = "translateX(-310px)";
            wrapper.style.marginLeft = "0";
            isToggle = false;
        }
    }

    window.toggle = toggle;
})();


//Поиск игроков .В личном кабинете
(function () {
    var searchButton = $("#search_button");
    var searchInput = $("#search_input");

    searchInput.keypress(function (e) {
        console.log(this.value);
    })

    searchButton.on('click', function (e) {
        var requestGemer = searchInput[0].value;
        var gamerListWrapper = $("#mCSB_2");
        var gamerList;

        $.ajax({
            type: "POST",
            url: "SomeServlet/getSearchListOfGamers",
            contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
            data: {requestGemer: requestGemer},
            dataType: "json",
            success: function (result) {
                console.log('Yiiii');
            },
            error: function (result) {
                gamerList = $('#mCSB_2_container');
                gamerList.empty();

                for (var i = 0; i < 20; i++) {
                    var li = $('<li></li>').attr('class', 'search__item');
                    var a = $('<a></a>');
                    var img = $('<img>').attr('src', '../img/user-img.jpg');
                    var span = $('<span>' + 'NickName' + i + '</span>').attr('class', 'name');
                    a.append(img);
                    li.append(a);
                    li.append(span);
                    gamerList.append(li[0]);
                }
                gamerListWrapper.append(gamerList);
            }
        });
    })
})();


//Управление командой. Командир
(function () {
    var isDeleteState = false,
        wasClickOn,
        containerList,
        containerListLatest,
        buttonDeleteGamers = $('.commands__delete-gamer'),
        buttonChangeCommandor = $('.commands__change-commander'),
        idGamersToServer = [];
    var commandsAction = $('.commands__actions');

    $('.commands__change-commander').on('click', function () {
        if (isDeleteState) return;

        var checkItem = $('<input type="radio" name="changeCommandor"/>'),
            commandsControl = $('.commands__control')
        arrayItems = $('#mCSB_1_container').children(),
            containerList = $('#mCSB_1_container');
        containerListLatest = containerList.clone()
        commandsAction.css({visibility: "visible"});

        wasClickOn = 'change-commander';
        disableButtons(buttonDeleteGamers);

        containerList.children().prepend(checkItem);
        isDeleteState = true;
    });


    $('.commands__delete-gamer').on('click', function (e) {
        if (isDeleteState) return;

        var checkItem = $('<input type="checkbox"/>'),
            commandsControl = $('.commands__control')
        arrayItems = $('#mCSB_1_container').children(),
            containerList = $('#mCSB_1_container');
        containerListLatest = containerList.clone()
        commandsAction.css({visibility: "visible"});

        wasClickOn = 'delete-gamer';

        disableButtons(buttonChangeCommandor);

        containerList.children().prepend(checkItem);
        isDeleteState = true;
    });

    $('.commands__cancel').on('click', function (e) {
        enableButtons(buttonChangeCommandor);
        enableButtons(buttonDeleteGamers);

        containerList.replaceWith(containerListLatest);
        commandsAction.css({visibility: "hidden"});
        isDeleteState = false;
    });

    $('.commands__ok').on('click', function (e) {
        var items = containerList.children();

        for (var o of items) {
            var $o = $(o);
            if ($o.children().prop("checked")) {
                idGamersToServer.push($o.attr('data-id'));
            }
        }

        if (idGamersToServer.length === 0) return;

        switch (wasClickOn) {
            case 'delete-gamer':
                sendGamersId('/deleteFromTeam', idGamersToServer);
                break;
            case 'change-commander':
                sendGamersId('/changeCommanderForTeam', idGamersToServer);
                break;
        }

        idGamersToServer = [];

        enableButtons(buttonChangeCommandor);
        enableButtons(buttonDeleteGamers);

        containerList.replaceWith(containerListLatest);
        commandsAction.css({visibility: "hidden"});
        isDeleteState = false;
    });

    $('.search__invite').on('click', function (e) {
        var id = $(this).parent().attr('data-id');
        sendInvite('/inviteToTeam', id, $(this));
    });

    function sendGamersId(methodName, data) {
        $.ajax({
            type: "GET",
            url: methodName,
            contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            dataType: "json",
            success: function (result) {
                //Прислать новый список игроков в команде и заменить им старый
                console.log('result ', result);
            },
            error: function (result) {
                console.log('result fail ', result);
            }
        });
    }

    function sendInvite(methodName, data, button) {
        $.ajax({
            type: "GET",
            url: methodName,
            contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            dataType: "json",
            success: function (result) {
                //Если выслали, то заменить эту кнопку на кнопку "Приглашение отправлено"
                button.text('Отправлено');
                disableButtons(button);
            },
            error: function (result) {
                console.log('result fail ', this);
            }
        });
    }

    function enableButtons(button) {
        button.removeAttr("style");
        button.removeAttr("disabled");
    }

    function disableButtons(button) {
        button.css({color: "gray"});
        button.attr("disabled", "true");
    }

})();

//Адартивный плейер
(function () {
    $(document).ready(function () {
        makeAdaptivePlayer(".video-view", ".js-player-persistent-youtube");
        makeAdaptivePlayer(".stream-view", ".js-player-persistent");
    })

    function makeAdaptivePlayer(wrapName, iframeName) {
        var wrap = $(wrapName);
        var iframe = $(iframeName),
            width = wrap.width(),
            height = width * .5625,
            widthLetest,
            heightLetest;

        iframe.attr('width', width);
        iframe.attr('height', height);
        wrap.css('height', height);

        $(window).resize(function () {

            width = wrap.width();
            if (typeof width !== 'undefined') {
                height = width * .5625;

                iframe.attr('width', width);
                wrap.css('height', height);
                iframe.attr('height', height);

                widthLetest = width;
                heightLetest = height;
            } else {
                iframe.attr('width', widthLetest);
                wrap.css('height', heightLetest);
                iframe.attr('height', heightLetest);
            }
        });
    }
})();


var notifArray = [
    {
        Id: 3,
        IsChecked: false,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Lapstock Хотчет добавить вас в команду"
    },
    {
        Id: 3450,
        IsChecked: true,
        hasAnswer: 1,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Через 30 минут выхоид лялял"
    },
    {
        Id: 30,
        IsChecked: false,
        hasAnswer: 0,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "First notification"
    },
    {
        Id: 98,
        IsChecked: false,
        NotificationTime: "2017-05-10 T21:34:37",
        Title: " notification"
    },
    {
        Id: 3450,
        IsChecked: true,
        hasAnswer: 1,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Через 30 минут выхоид лялял"
    },
    {
        Id: 3450,
        IsChecked: true,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Через 30 минут выхоид лялял"
    },
    {
        Id: 3450,
        IsChecked: false,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Через 30 минут выхоид лялял"
    },
    {
        Id: 3450,
        IsChecked: true,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "Через 30 минут выхоид лялял"
    },
    {
        Id: 350,
        IsChecked: true,
        NotificationTime: "2017-05-10T21:34:37",
        Title: "2 notification"
    }
];

//Уведомленяия polliyng ajax
(function () {
    var notification = $('.personal-data__has-notifiction')
    timer = 8000;

    if (notification.length !== 0) {
        (function () {
            var notificationList,
                notificationActions;


            $('.personal-data__button--notifiction').on('click', function (e) {
                $('#NotificationModal').modal('toggle');

                getSetNotifications('/api/Notification/SetCheckedByList', onFulfilledSetCheckedNotifications, onRejectedSetCheckedNotifications);
                getSetNotifications('/api/Notification/GetUserNotifications', onFulfilledGetNotifications, onRejectedGetNotifications);
            });

            $('.notification-list').on('click', '.notification__invite--ok ', function () {
                var id = $(this).closest('.notification__item').attr('data-id');
                notificationActions = $(this).closest('.notification__actions');
                sendAjaxNotification('/api/Notification/SetChecked', {idNotification: id, state: 1}, feedbackAgree);
            });

            $('.notification-list').on('click', '.notification__invite--cancel ', function () {
                var id = $(this).closest('.notification__item').attr('data-id');
                notificationActions = $(this).closest('.notification__actions');
                sendAjaxNotification('/api/Notification/SetChecked', {idNotification: id, state: 0}, feedbackCancel);
            });

            $('.notification-list').on('mouseenter', '.notification__item', function () {
                // $(this).find('.notification__new-notifiction').removeClass('isVisible');
                // getSetNotifications('/api/Notification/SetCheckedByList', onFulfilledSetCheckedNotifications, onRejectedSetCheckedNotifications);
            });

            setInterval(function () {
                if ($('#NotificationModal').css('display') === 'block') {
                    getSetNotifications('/api/Notification/SetCheckedByList', onFulfilledSetCheckedNotifications, onRejectedSetCheckedNotifications);
                }
                getSetNotifications('/api/Notification/GetUserNotifications', onFulfilledGetNotifications, onRejectedGetNotifications);
            }, timer);

            //Замен кнопок действия на ничего
            function feedbackAgree() {
                notificationActions.replaceWith($('<span class="notification__feedback--ok">Заявка принята</span>'));
            }

            function feedbackCancel() {
                notificationActions.replaceWith($('<span class="notification__feedback--cancel">Отклонено</span>'));
            }

            //Проверка есть ли непросмотренные уведомления
            function checkUncheckedNotifications() {
                return notifArray.some(function (item) {
                    return (item.IsChecked);
                });
            }

            //Отобразить элемент
            function makeVisible(el) {
                el.addClass('isVisible');
            }

            //получаем массив с html
            function parseNotificationToList() {
                var notifictionsList = [];
                notifArray.forEach(function (item) {
                    notifictionsList.push(fillBlank(item))
                });
                return notifictionsList;
            }

            //Замена старого списка уведомлений на новый
            function replaceNotifictionList(newNotifictionsList) {
                notificationList = $('#mCSB_3_container');
                notificationList.children().remove();
                notificationList.append(newNotifictionsList);
            }

            //парсим json в html разметку
            function fillBlank(item) {
                var isChecked,
                    hasAnswer = ' <div class="notification__actions">' +
                        ' <a href="#" class="notification__button notification__invite--ok">Принять</a>' +
                        ' <a href="#" class="notification__button notification__invite--cancel">Отклонить</a>' +
                        ' </div>';

                if (item.IsChecked) {
                    isChecked = '';
                } else {
                    isChecked = 'isVisible';
                }

                //Если уже отвечали на это уведомление
                if (item.hasOwnProperty('hasAnswer')) {
                    switch (item.hasAnswer) {
                        case 0:
                            hasAnswer = '<span class="notification__feedback--cancel">Отклонено</span>';
                            break;
                        case 1:
                            hasAnswer = '<span class="notification__feedback--ok">Заявка принята</span>';
                            break;
                        default:
                            hasAnswer = ' <div class="notification__actions">' +
                                ' <a href="#" class="notification__button notification__invite--ok">Принять</a>' +
                                ' <a href="#" class="notification__button notification__invite--cancel">Отклонить</a>' +
                                ' </div>';
                    }
                }

                return $('<li data-id=' +
                    item.Id +
                    ' class="notification__item">' +
                    '<div class="notification__new-notifiction ' + isChecked + ' "></div>' +
                    '<span class="notification__title">' +
                    item.Title +
                    '</span>' +
                    '<span class="notification__time">' +
                    item.NotificationTime +
                    '</span>' +
                    hasAnswer +
                    '</li>');
            }


            //Получить список уведомлений при успешном запросе
            function onFulfilledGetNotifications(data) {
                if (checkUncheckedNotifications(data)) {
                    makeVisible(notification);
                }
                replaceNotifictionList(parseNotificationToList());
            }

            //Ошибка запроса при неудачном запросе
            function onRejectedGetNotifications() {
                console.log('Error!');
                // $('.notification span').append( $('<span class="notification__error">Ошибка</span>'));
                if (checkUncheckedNotifications()) {
                    makeVisible(notification);
                }
                replaceNotifictionList(parseNotificationToList());
            }


            //оправка отмеченных уведомлений как прочинатны
            function onFulfilledSetCheckedNotifications(data) {
                $('.notification__new-notifiction').removeClass('isVisible');
                console.log("Checked");
            }

            function onRejectedSetCheckedNotifications() {
                console.log('Error!', 'Checked');
            }


            function getSetNotifications(url, resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'get',
                    success: function (data) {
                        resolve(data);
                    },
                    error: function () {
                        reject();
                    }
                });
            };

            function sendAjaxNotification(url, data, callback) {
                $.ajax({
                    url: url,
                    type: 'get',
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        callback();
                    },
                    error: function () {
                        console.log('Error!');
                        callback();
                    }
                });
            };
        })();
    }
})();


// Автоматическая выравнивание блоков
$(function () {
    $('.news__header').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    $('[class*="col-"]').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });
});

/*!
 * Bootstrap v4.0.0-alpha.4 (http://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
    }
}(jQuery);


+function ($) {

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    'use strict';

    var _get = function get(_x, _x2, _x3) {
        var _again = true;
        _function: while (_again) {
            var object = _x, property = _x2, receiver = _x3;
            _again = false;
            if (object === null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x2 = property;
                    _x3 = receiver;
                    _again = true;
                    desc = parent = undefined;
                    continue _function;
                }
            } else if ('value' in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        }
    };

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    var Util = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */

        var transition = false;

        var MAX_UID = 1000000;

        var TransitionEndEvent = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        // shoutout AngusCroll (https://goo.gl/pxwQGp)
        function toType(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function isElement(obj) {
            return (obj[0] || obj).nodeType;
        }

        function getSpecialTransitionEndEvent() {
            return {
                bindType: transition.end,
                delegateType: transition.end,
                handle: function handle(event) {
                    if ($(event.target).is(this)) {
                        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                    }
                    return undefined;
                }
            };
        }

        function transitionEndTest() {
            if (window.QUnit) {
                return false;
            }

            var el = document.createElement('bootstrap');

            for (var _name in TransitionEndEvent) {
                if (el.style[_name] !== undefined) {
                    return {end: TransitionEndEvent[_name]};
                }
            }

            return false;
        }

        function transitionEndEmulator(duration) {
            var _this = this;

            var called = false;

            $(this).one(Util.TRANSITION_END, function () {
                called = true;
            });

            setTimeout(function () {
                if (!called) {
                    Util.triggerTransitionEnd(_this);
                }
            }, duration);

            return this;
        }

        function setTransitionEndSupport() {
            transition = transitionEndTest();

            $.fn.emulateTransitionEnd = transitionEndEmulator;

            if (Util.supportsTransitionEnd()) {
                $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
            }
        }

        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */

        var Util = {

            TRANSITION_END: 'bsTransitionEnd',

            getUID: function getUID(prefix) {
                do {
                    /* eslint-disable no-bitwise */
                    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
                    /* eslint-enable no-bitwise */
                } while (document.getElementById(prefix));
                return prefix;
            },

            getSelectorFromElement: function getSelectorFromElement(element) {
                var selector = element.getAttribute('data-target');

                if (!selector) {
                    selector = element.getAttribute('href') || '';
                    selector = /^#[a-z]/i.test(selector) ? selector : null;
                }

                return selector;
            },

            reflow: function reflow(element) {
                new Function('bs', 'return bs')(element.offsetHeight);
            },

            triggerTransitionEnd: function triggerTransitionEnd(element) {
                $(element).trigger(transition.end);
            },

            supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(transition);
            },

            typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
                for (var property in configTypes) {
                    if (configTypes.hasOwnProperty(property)) {
                        var expectedTypes = configTypes[property];
                        var value = config[property];
                        var valueType = undefined;

                        if (value && isElement(value)) {
                            valueType = 'element';
                        } else {
                            valueType = toType(value);
                        }

                        if (!new RegExp(expectedTypes).test(valueType)) {
                            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                        }
                    }
                }
            }
        };

        setTransitionEndSupport();

        return Util;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Alert = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'alert';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.alert';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Selector = {
            DISMISS: '[data-dismiss="alert"]'
        };

        var Event = {
            CLOSE: 'close' + EVENT_KEY,
            CLOSED: 'closed' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            ALERT: 'alert',
            FADE: 'fade',
            IN: 'in'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Alert = (function () {
            function Alert(element) {
                _classCallCheck(this, Alert);

                this._element = element;
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Alert, [{
                key: 'close',

                // public

                value: function close(element) {
                    element = element || this._element;

                    var rootElement = this._getRootElement(element);
                    var customEvent = this._triggerCloseEvent(rootElement);

                    if (customEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._removeElement(rootElement);
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);
                    this._element = null;
                }

                // private

            }, {
                key: '_getRootElement',
                value: function _getRootElement(element) {
                    var selector = Util.getSelectorFromElement(element);
                    var parent = false;

                    if (selector) {
                        parent = $(selector)[0];
                    }

                    if (!parent) {
                        parent = $(element).closest('.' + ClassName.ALERT)[0];
                    }

                    return parent;
                }
            }, {
                key: '_triggerCloseEvent',
                value: function _triggerCloseEvent(element) {
                    var closeEvent = $.Event(Event.CLOSE);

                    $(element).trigger(closeEvent);
                    return closeEvent;
                }
            }, {
                key: '_removeElement',
                value: function _removeElement(element) {
                    $(element).removeClass(ClassName.IN);

                    if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
                        this._destroyElement(element);
                        return;
                    }

                    $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
                }
            }, {
                key: '_destroyElement',
                value: function _destroyElement(element) {
                    $(element).detach().trigger(Event.CLOSED).remove();
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $element = $(this);
                        var data = $element.data(DATA_KEY);

                        if (!data) {
                            data = new Alert(this);
                            $element.data(DATA_KEY, data);
                        }

                        if (config === 'close') {
                            data[config](this);
                        }
                    });
                }
            }, {
                key: '_handleDismiss',
                value: function _handleDismiss(alertInstance) {
                    return function (event) {
                        if (event) {
                            event.preventDefault();
                        }

                        alertInstance.close(this);
                    };
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Alert;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Alert._jQueryInterface;
        $.fn[NAME].Constructor = Alert;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Alert._jQueryInterface;
        };

        return Alert;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Button = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'button';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.button';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var ClassName = {
            ACTIVE: 'active',
            BUTTON: 'btn',
            FOCUS: 'focus'
        };

        var Selector = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: 'input',
            ACTIVE: '.active',
            BUTTON: '.btn'
        };

        var Event = {
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
            FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Button = (function () {
            function Button(element) {
                _classCallCheck(this, Button);

                this._element = element;
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Button, [{
                key: 'toggle',

                // public

                value: function toggle() {
                    var triggerChangeEvent = true;
                    var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

                    if (rootElement) {
                        var input = $(this._element).find(Selector.INPUT)[0];

                        if (input) {
                            if (input.type === 'radio') {
                                if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                                    triggerChangeEvent = false;
                                } else {
                                    var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                                    if (activeElement) {
                                        $(activeElement).removeClass(ClassName.ACTIVE);
                                    }
                                }
                            }

                            if (triggerChangeEvent) {
                                input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
                                $(this._element).trigger('change');
                            }

                            input.focus();
                        }
                    } else {
                        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
                    }

                    if (triggerChangeEvent) {
                        $(this._element).toggleClass(ClassName.ACTIVE);
                    }
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);
                    this._element = null;
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);

                        if (!data) {
                            data = new Button(this);
                            $(this).data(DATA_KEY, data);
                        }

                        if (config === 'toggle') {
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Button;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
            event.preventDefault();

            var button = event.target;

            if (!$(button).hasClass(ClassName.BUTTON)) {
                button = $(button).closest(Selector.BUTTON);
            }

            Button._jQueryInterface.call($(button), 'toggle');
        }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
            var button = $(event.target).closest(Selector.BUTTON)[0];
            $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Button._jQueryInterface;
        $.fn[NAME].Constructor = Button;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Button._jQueryInterface;
        };

        return Button;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Carousel = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'carousel';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.carousel';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;
        var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
        var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

        var Default = {
            interval: 5000,
            keyboard: true,
            slide: false,
            pause: 'hover',
            wrap: true
        };

        var DefaultType = {
            interval: '(number|boolean)',
            keyboard: 'boolean',
            slide: '(boolean|string)',
            pause: '(string|boolean)',
            wrap: 'boolean'
        };

        var Direction = {
            NEXT: 'next',
            PREVIOUS: 'prev'
        };

        var Event = {
            SLIDE: 'slide' + EVENT_KEY,
            SLID: 'slid' + EVENT_KEY,
            KEYDOWN: 'keydown' + EVENT_KEY,
            MOUSEENTER: 'mouseenter' + EVENT_KEY,
            MOUSELEAVE: 'mouseleave' + EVENT_KEY,
            LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            CAROUSEL: 'carousel',
            ACTIVE: 'active',
            SLIDE: 'slide',
            RIGHT: 'right',
            LEFT: 'left',
            ITEM: 'carousel-item'
        };

        var Selector = {
            ACTIVE: '.active',
            ACTIVE_ITEM: '.active.carousel-item',
            ITEM: '.carousel-item',
            NEXT_PREV: '.next, .prev',
            INDICATORS: '.carousel-indicators',
            DATA_SLIDE: '[data-slide], [data-slide-to]',
            DATA_RIDE: '[data-ride="carousel"]'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Carousel = (function () {
            function Carousel(element, config) {
                _classCallCheck(this, Carousel);

                this._items = null;
                this._interval = null;
                this._activeElement = null;

                this._isPaused = false;
                this._isSliding = false;

                this._config = this._getConfig(config);
                this._element = $(element)[0];
                this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

                this._addEventListeners();
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Carousel, [{
                key: 'next',

                // public

                value: function next() {
                    if (!this._isSliding) {
                        this._slide(Direction.NEXT);
                    }
                }
            }, {
                key: 'nextWhenVisible',
                value: function nextWhenVisible() {
                    // Don't call next when the page isn't visible
                    if (!document.hidden) {
                        this.next();
                    }
                }
            }, {
                key: 'prev',
                value: function prev() {
                    if (!this._isSliding) {
                        this._slide(Direction.PREVIOUS);
                    }
                }
            }, {
                key: 'pause',
                value: function pause(event) {
                    if (!event) {
                        this._isPaused = true;
                    }

                    if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
                        Util.triggerTransitionEnd(this._element);
                        this.cycle(true);
                    }

                    clearInterval(this._interval);
                    this._interval = null;
                }
            }, {
                key: 'cycle',
                value: function cycle(event) {
                    if (!event) {
                        this._isPaused = false;
                    }

                    if (this._interval) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }

                    if (this._config.interval && !this._isPaused) {
                        this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
                    }
                }
            }, {
                key: 'to',
                value: function to(index) {
                    var _this2 = this;

                    this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

                    var activeIndex = this._getItemIndex(this._activeElement);

                    if (index > this._items.length - 1 || index < 0) {
                        return;
                    }

                    if (this._isSliding) {
                        $(this._element).one(Event.SLID, function () {
                            return _this2.to(index);
                        });
                        return;
                    }

                    if (activeIndex === index) {
                        this.pause();
                        this.cycle();
                        return;
                    }

                    var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

                    this._slide(direction, this._items[index]);
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $(this._element).off(EVENT_KEY);
                    $.removeData(this._element, DATA_KEY);

                    this._items = null;
                    this._config = null;
                    this._element = null;
                    this._interval = null;
                    this._isPaused = null;
                    this._isSliding = null;
                    this._activeElement = null;
                    this._indicatorsElement = null;
                }

                // private

            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                }
            }, {
                key: '_addEventListeners',
                value: function _addEventListeners() {
                    if (this._config.keyboard) {
                        $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
                    }

                    if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
                        $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
                    }
                }
            }, {
                key: '_keydown',
                value: function _keydown(event) {
                    event.preventDefault();

                    if (/input|textarea/i.test(event.target.tagName)) {
                        return;
                    }

                    switch (event.which) {
                        case ARROW_LEFT_KEYCODE:
                            this.prev();
                            break;
                        case ARROW_RIGHT_KEYCODE:
                            this.next();
                            break;
                        default:
                            return;
                    }
                }
            }, {
                key: '_getItemIndex',
                value: function _getItemIndex(element) {
                    this._items = $.makeArray($(element).parent().find(Selector.ITEM));
                    return this._items.indexOf(element);
                }
            }, {
                key: '_getItemByDirection',
                value: function _getItemByDirection(direction, activeElement) {
                    var isNextDirection = direction === Direction.NEXT;
                    var isPrevDirection = direction === Direction.PREVIOUS;
                    var activeIndex = this._getItemIndex(activeElement);
                    var lastItemIndex = this._items.length - 1;
                    var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

                    if (isGoingToWrap && !this._config.wrap) {
                        return activeElement;
                    }

                    var delta = direction === Direction.PREVIOUS ? -1 : 1;
                    var itemIndex = (activeIndex + delta) % this._items.length;

                    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
                }
            }, {
                key: '_triggerSlideEvent',
                value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
                    var slideEvent = $.Event(Event.SLIDE, {
                        relatedTarget: relatedTarget,
                        direction: directionalClassname
                    });

                    $(this._element).trigger(slideEvent);

                    return slideEvent;
                }
            }, {
                key: '_setActiveIndicatorElement',
                value: function _setActiveIndicatorElement(element) {
                    if (this._indicatorsElement) {
                        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

                        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                        if (nextIndicator) {
                            $(nextIndicator).addClass(ClassName.ACTIVE);
                        }
                    }
                }
            }, {
                key: '_slide',
                value: function _slide(direction, element) {
                    var _this3 = this;

                    var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
                    var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

                    var isCycling = Boolean(this._interval);

                    var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

                    if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
                        this._isSliding = false;
                        return;
                    }

                    var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
                    if (slideEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (!activeElement || !nextElement) {
                        // some weirdness is happening, so we bail
                        return;
                    }

                    this._isSliding = true;

                    if (isCycling) {
                        this.pause();
                    }

                    this._setActiveIndicatorElement(nextElement);

                    var slidEvent = $.Event(Event.SLID, {
                        relatedTarget: nextElement,
                        direction: directionalClassName
                    });

                    if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

                        $(nextElement).addClass(direction);

                        Util.reflow(nextElement);

                        $(activeElement).addClass(directionalClassName);
                        $(nextElement).addClass(directionalClassName);

                        $(activeElement).one(Util.TRANSITION_END, function () {
                            $(nextElement).removeClass(directionalClassName).removeClass(direction);

                            $(nextElement).addClass(ClassName.ACTIVE);

                            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

                            _this3._isSliding = false;

                            setTimeout(function () {
                                return $(_this3._element).trigger(slidEvent);
                            }, 0);
                        }).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        $(activeElement).removeClass(ClassName.ACTIVE);
                        $(nextElement).addClass(ClassName.ACTIVE);

                        this._isSliding = false;
                        $(this._element).trigger(slidEvent);
                    }

                    if (isCycling) {
                        this.cycle();
                    }
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);
                        var _config = $.extend({}, Default, $(this).data());

                        if (typeof config === 'object') {
                            $.extend(_config, config);
                        }

                        var action = typeof config === 'string' ? config : _config.slide;

                        if (!data) {
                            data = new Carousel(this, _config);
                            $(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'number') {
                            data.to(config);
                        } else if (typeof action === 'string') {
                            if (data[action] === undefined) {
                                throw new Error('No method named "' + action + '"');
                            }
                            data[action]();
                        } else if (_config.interval) {
                            data.pause();
                            data.cycle();
                        }
                    });
                }
            }, {
                key: '_dataApiClickHandler',
                value: function _dataApiClickHandler(event) {
                    var selector = Util.getSelectorFromElement(this);

                    if (!selector) {
                        return;
                    }

                    var target = $(selector)[0];

                    if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
                        return;
                    }

                    var config = $.extend({}, $(target).data(), $(this).data());
                    var slideIndex = this.getAttribute('data-slide-to');

                    if (slideIndex) {
                        config.interval = false;
                    }

                    Carousel._jQueryInterface.call($(target), config);

                    if (slideIndex) {
                        $(target).data(DATA_KEY).to(slideIndex);
                    }

                    event.preventDefault();
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return Carousel;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

        $(window).on(Event.LOAD_DATA_API, function () {
            $(Selector.DATA_RIDE).each(function () {
                var $carousel = $(this);
                Carousel._jQueryInterface.call($carousel, $carousel.data());
            });
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Carousel._jQueryInterface;
        $.fn[NAME].Constructor = Carousel;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Carousel._jQueryInterface;
        };

        return Carousel;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Collapse = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'collapse';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.collapse';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;

        var Default = {
            toggle: true,
            parent: ''
        };

        var DefaultType = {
            toggle: 'boolean',
            parent: 'string'
        };

        var Event = {
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            IN: 'in',
            COLLAPSE: 'collapse',
            COLLAPSING: 'collapsing',
            COLLAPSED: 'collapsed'
        };

        var Dimension = {
            WIDTH: 'width',
            HEIGHT: 'height'
        };

        var Selector = {
            ACTIVES: '.panel > .in, .panel > .collapsing',
            DATA_TOGGLE: '[data-toggle="collapse"]'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Collapse = (function () {
            function Collapse(element, config) {
                _classCallCheck(this, Collapse);

                this._isTransitioning = false;
                this._element = element;
                this._config = this._getConfig(config);
                this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

                this._parent = this._config.parent ? this._getParent() : null;

                if (!this._config.parent) {
                    this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                }

                if (this._config.toggle) {
                    this.toggle();
                }
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Collapse, [{
                key: 'toggle',

                // public

                value: function toggle() {
                    if ($(this._element).hasClass(ClassName.IN)) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            }, {
                key: 'show',
                value: function show() {
                    var _this4 = this;

                    if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
                        return;
                    }

                    var actives = undefined;
                    var activesData = undefined;

                    if (this._parent) {
                        actives = $.makeArray($(Selector.ACTIVES));
                        if (!actives.length) {
                            actives = null;
                        }
                    }

                    if (actives) {
                        activesData = $(actives).data(DATA_KEY);
                        if (activesData && activesData._isTransitioning) {
                            return;
                        }
                    }

                    var startEvent = $.Event(Event.SHOW);
                    $(this._element).trigger(startEvent);
                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (actives) {
                        Collapse._jQueryInterface.call($(actives), 'hide');
                        if (!activesData) {
                            $(actives).data(DATA_KEY, null);
                        }
                    }

                    var dimension = this._getDimension();

                    $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

                    this._element.style[dimension] = 0;
                    this._element.setAttribute('aria-expanded', true);

                    if (this._triggerArray.length) {
                        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

                        _this4._element.style[dimension] = '';

                        _this4.setTransitioning(false);

                        $(_this4._element).trigger(Event.SHOWN);
                    };

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
                    var scrollSize = 'scroll' + capitalizedDimension;

                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

                    this._element.style[dimension] = this._element[scrollSize] + 'px';
                }
            }, {
                key: 'hide',
                value: function hide() {
                    var _this5 = this;

                    if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
                        return;
                    }

                    var startEvent = $.Event(Event.HIDE);
                    $(this._element).trigger(startEvent);
                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    var dimension = this._getDimension();
                    var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

                    this._element.style[dimension] = this._element[offsetDimension] + 'px';

                    Util.reflow(this._element);

                    $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

                    this._element.setAttribute('aria-expanded', false);

                    if (this._triggerArray.length) {
                        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        _this5.setTransitioning(false);
                        $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
                    };

                    this._element.style[dimension] = 0;

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                }
            }, {
                key: 'setTransitioning',
                value: function setTransitioning(isTransitioning) {
                    this._isTransitioning = isTransitioning;
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);

                    this._config = null;
                    this._parent = null;
                    this._element = null;
                    this._triggerArray = null;
                    this._isTransitioning = null;
                }

                // private

            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);
                    config.toggle = Boolean(config.toggle); // coerce string values
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                }
            }, {
                key: '_getDimension',
                value: function _getDimension() {
                    var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
                    return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
                }
            }, {
                key: '_getParent',
                value: function _getParent() {
                    var _this6 = this;

                    var parent = $(this._config.parent)[0];
                    var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

                    $(parent).find(selector).each(function (i, element) {
                        _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
                    });

                    return parent;
                }
            }, {
                key: '_addAriaAndCollapsedClass',
                value: function _addAriaAndCollapsedClass(element, triggerArray) {
                    if (element) {
                        var isOpen = $(element).hasClass(ClassName.IN);
                        element.setAttribute('aria-expanded', isOpen);

                        if (triggerArray.length) {
                            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                        }
                    }
                }

                // static

            }], [{
                key: '_getTargetFromElement',
                value: function _getTargetFromElement(element) {
                    var selector = Util.getSelectorFromElement(element);
                    return selector ? $(selector)[0] : null;
                }
            }, {
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);
                        var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

                        if (!data && _config.toggle && /show|hide/.test(config)) {
                            _config.toggle = false;
                        }

                        if (!data) {
                            data = new Collapse(this, _config);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return Collapse;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();

            var target = Collapse._getTargetFromElement(this);
            var data = $(target).data(DATA_KEY);
            var config = data ? 'toggle' : $(this).data();

            Collapse._jQueryInterface.call($(target), config);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Collapse._jQueryInterface;
        $.fn[NAME].Constructor = Collapse;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Collapse._jQueryInterface;
        };

        return Collapse;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Dropdown = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'dropdown';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.dropdown';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
        var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
        var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
        var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            CLICK: 'click' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
            KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            BACKDROP: 'dropdown-backdrop',
            DISABLED: 'disabled',
            OPEN: 'open'
        };

        var Selector = {
            BACKDROP: '.dropdown-backdrop',
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: '.dropdown form',
            ROLE_MENU: '[role="menu"]',
            ROLE_LISTBOX: '[role="listbox"]',
            NAVBAR_NAV: '.navbar-nav',
            VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Dropdown = (function () {
            function Dropdown(element) {
                _classCallCheck(this, Dropdown);

                this._element = element;

                this._addEventListeners();
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Dropdown, [{
                key: 'toggle',

                // public

                value: function toggle() {
                    if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                        return false;
                    }

                    var parent = Dropdown._getParentFromElement(this);
                    var isActive = $(parent).hasClass(ClassName.OPEN);

                    Dropdown._clearMenus();

                    if (isActive) {
                        return false;
                    }

                    if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

                        // if mobile we use a backdrop because click events don't delegate
                        var dropdown = document.createElement('div');
                        dropdown.className = ClassName.BACKDROP;
                        $(dropdown).insertBefore(this);
                        $(dropdown).on('click', Dropdown._clearMenus);
                    }

                    var relatedTarget = {relatedTarget: this};
                    var showEvent = $.Event(Event.SHOW, relatedTarget);

                    $(parent).trigger(showEvent);

                    if (showEvent.isDefaultPrevented()) {
                        return false;
                    }

                    this.focus();
                    this.setAttribute('aria-expanded', 'true');

                    $(parent).toggleClass(ClassName.OPEN);
                    $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

                    return false;
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);
                    $(this._element).off(EVENT_KEY);
                    this._element = null;
                }

                // private

            }, {
                key: '_addEventListeners',
                value: function _addEventListeners() {
                    $(this._element).on(Event.CLICK, this.toggle);
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);

                        if (!data) {
                            $(this).data(DATA_KEY, data = new Dropdown(this));
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config].call(this);
                        }
                    });
                }
            }, {
                key: '_clearMenus',
                value: function _clearMenus(event) {
                    if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
                        return;
                    }

                    var backdrop = $(Selector.BACKDROP)[0];
                    if (backdrop) {
                        backdrop.parentNode.removeChild(backdrop);
                    }

                    var toggles = $.makeArray($(Selector.DATA_TOGGLE));

                    for (var i = 0; i < toggles.length; i++) {
                        var _parent = Dropdown._getParentFromElement(toggles[i]);
                        var relatedTarget = {relatedTarget: toggles[i]};

                        if (!$(_parent).hasClass(ClassName.OPEN)) {
                            continue;
                        }

                        if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
                            continue;
                        }

                        var hideEvent = $.Event(Event.HIDE, relatedTarget);
                        $(_parent).trigger(hideEvent);
                        if (hideEvent.isDefaultPrevented()) {
                            continue;
                        }

                        toggles[i].setAttribute('aria-expanded', 'false');

                        $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
                    }
                }
            }, {
                key: '_getParentFromElement',
                value: function _getParentFromElement(element) {
                    var parent = undefined;
                    var selector = Util.getSelectorFromElement(element);

                    if (selector) {
                        parent = $(selector)[0];
                    }

                    return parent || element.parentNode;
                }
            }, {
                key: '_dataApiKeydownHandler',
                value: function _dataApiKeydownHandler(event) {
                    if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
                        return;
                    }

                    event.preventDefault();
                    event.stopPropagation();

                    if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                        return;
                    }

                    var parent = Dropdown._getParentFromElement(this);
                    var isActive = $(parent).hasClass(ClassName.OPEN);

                    if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

                        if (event.which === ESCAPE_KEYCODE) {
                            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
                            $(toggle).trigger('focus');
                        }

                        $(this).trigger('click');
                        return;
                    }

                    var items = $.makeArray($(Selector.VISIBLE_ITEMS));

                    items = items.filter(function (item) {
                        return item.offsetWidth || item.offsetHeight;
                    });

                    if (!items.length) {
                        return;
                    }

                    var index = items.indexOf(event.target);

                    if (event.which === ARROW_UP_KEYCODE && index > 0) {
                        // up
                        index--;
                    }

                    if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                        // down
                        index++;
                    }

                    if (index < 0) {
                        index = 0;
                    }

                    items[index].focus();
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Dropdown;
        })();

        $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
            e.stopPropagation();
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Dropdown._jQueryInterface;
        $.fn[NAME].Constructor = Dropdown;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Dropdown._jQueryInterface;
        };

        return Dropdown;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Modal = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'modal';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.modal';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 300;
        var BACKDROP_TRANSITION_DURATION = 150;
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var Default = {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: true
        };

        var DefaultType = {
            backdrop: '(boolean|string)',
            keyboard: 'boolean',
            focus: 'boolean',
            show: 'boolean'
        };

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            FOCUSIN: 'focusin' + EVENT_KEY,
            RESIZE: 'resize' + EVENT_KEY,
            CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
            KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
            MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
            MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
            BACKDROP: 'modal-backdrop',
            OPEN: 'modal-open',
            FADE: 'fade',
            IN: 'in'
        };

        var Selector = {
            DIALOG: '.modal-dialog',
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Modal = (function () {
            function Modal(element, config) {
                _classCallCheck(this, Modal);

                this._config = this._getConfig(config);
                this._element = element;
                this._dialog = $(element).find(Selector.DIALOG)[0];
                this._backdrop = null;
                this._isShown = false;
                this._isBodyOverflowing = false;
                this._ignoreBackdropClick = false;
                this._originalBodyPadding = 0;
                this._scrollbarWidth = 0;
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Modal, [{
                key: 'toggle',

                // public

                value: function toggle(relatedTarget) {
                    return this._isShown ? this.hide() : this.show(relatedTarget);
                }
            }, {
                key: 'show',
                value: function show(relatedTarget) {
                    var _this7 = this;

                    var showEvent = $.Event(Event.SHOW, {
                        relatedTarget: relatedTarget
                    });

                    $(this._element).trigger(showEvent);

                    if (this._isShown || showEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._isShown = true;

                    this._checkScrollbar();
                    this._setScrollbar();

                    $(document.body).addClass(ClassName.OPEN);

                    this._setEscapeEvent();
                    this._setResizeEvent();

                    $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

                    $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
                        $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
                            if ($(event.target).is(_this7._element)) {
                                _this7._ignoreBackdropClick = true;
                            }
                        });
                    });

                    this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
                }
            }, {
                key: 'hide',
                value: function hide(event) {
                    if (event) {
                        event.preventDefault();
                    }

                    var hideEvent = $.Event(Event.HIDE);

                    $(this._element).trigger(hideEvent);

                    if (!this._isShown || hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._isShown = false;

                    this._setEscapeEvent();
                    this._setResizeEvent();

                    $(document).off(Event.FOCUSIN);

                    $(this._element).removeClass(ClassName.IN);

                    $(this._element).off(Event.CLICK_DISMISS);
                    $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

                    if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

                        $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        this._hideModal();
                    }
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);

                    $(window).off(EVENT_KEY);
                    $(document).off(EVENT_KEY);
                    $(this._element).off(EVENT_KEY);
                    $(this._backdrop).off(EVENT_KEY);

                    this._config = null;
                    this._element = null;
                    this._dialog = null;
                    this._backdrop = null;
                    this._isShown = null;
                    this._isBodyOverflowing = null;
                    this._ignoreBackdropClick = null;
                    this._originalBodyPadding = null;
                    this._scrollbarWidth = null;
                }

                // private

            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                }
            }, {
                key: '_showElement',
                value: function _showElement(relatedTarget) {
                    var _this8 = this;

                    var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

                    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                        // don't move modals dom position
                        document.body.appendChild(this._element);
                    }

                    this._element.style.display = 'block';
                    this._element.removeAttribute('aria-hidden');
                    this._element.scrollTop = 0;

                    if (transition) {
                        Util.reflow(this._element);
                    }

                    $(this._element).addClass(ClassName.IN);

                    if (this._config.focus) {
                        this._enforceFocus();
                    }

                    var shownEvent = $.Event(Event.SHOWN, {
                        relatedTarget: relatedTarget
                    });

                    var transitionComplete = function transitionComplete() {
                        if (_this8._config.focus) {
                            _this8._element.focus();
                        }
                        $(_this8._element).trigger(shownEvent);
                    };

                    if (transition) {
                        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        transitionComplete();
                    }
                }
            }, {
                key: '_enforceFocus',
                value: function _enforceFocus() {
                    var _this9 = this;

                    $(document).off(Event.FOCUSIN) // guard against infinite focus loop
                        .on(Event.FOCUSIN, function (event) {
                            if (document !== event.target && _this9._element !== event.target && !$(_this9._element).has(event.target).length) {
                                _this9._element.focus();
                            }
                        });
                }
            }, {
                key: '_setEscapeEvent',
                value: function _setEscapeEvent() {
                    var _this10 = this;

                    if (this._isShown && this._config.keyboard) {
                        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                            if (event.which === ESCAPE_KEYCODE) {
                                _this10.hide();
                            }
                        });
                    } else if (!this._isShown) {
                        $(this._element).off(Event.KEYDOWN_DISMISS);
                    }
                }
            }, {
                key: '_setResizeEvent',
                value: function _setResizeEvent() {
                    if (this._isShown) {
                        $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
                    } else {
                        $(window).off(Event.RESIZE);
                    }
                }
            }, {
                key: '_hideModal',
                value: function _hideModal() {
                    var _this11 = this;

                    this._element.style.display = 'none';
                    this._element.setAttribute('aria-hidden', 'true');
                    this._showBackdrop(function () {
                        $(document.body).removeClass(ClassName.OPEN);
                        _this11._resetAdjustments();
                        _this11._resetScrollbar();
                        $(_this11._element).trigger(Event.HIDDEN);
                    });
                }
            }, {
                key: '_removeBackdrop',
                value: function _removeBackdrop() {
                    if (this._backdrop) {
                        $(this._backdrop).remove();
                        this._backdrop = null;
                    }
                }
            }, {
                key: '_showBackdrop',
                value: function _showBackdrop(callback) {
                    var _this12 = this;

                    var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

                    if (this._isShown && this._config.backdrop) {
                        var doAnimate = Util.supportsTransitionEnd() && animate;

                        this._backdrop = document.createElement('div');
                        this._backdrop.className = ClassName.BACKDROP;

                        if (animate) {
                            $(this._backdrop).addClass(animate);
                        }

                        $(this._backdrop).appendTo(document.body);

                        $(this._element).on(Event.CLICK_DISMISS, function (event) {
                            if (_this12._ignoreBackdropClick) {
                                _this12._ignoreBackdropClick = false;
                                return;
                            }
                            if (event.target !== event.currentTarget) {
                                return;
                            }
                            if (_this12._config.backdrop === 'static') {
                                _this12._element.focus();
                            } else {
                                _this12.hide();
                            }
                        });

                        if (doAnimate) {
                            Util.reflow(this._backdrop);
                        }

                        $(this._backdrop).addClass(ClassName.IN);

                        if (!callback) {
                            return;
                        }

                        if (!doAnimate) {
                            callback();
                            return;
                        }

                        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                    } else if (!this._isShown && this._backdrop) {
                        $(this._backdrop).removeClass(ClassName.IN);

                        var callbackRemove = function callbackRemove() {
                            _this12._removeBackdrop();
                            if (callback) {
                                callback();
                            }
                        };

                        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                        } else {
                            callbackRemove();
                        }
                    } else if (callback) {
                        callback();
                    }
                }

                // ----------------------------------------------------------------------
                // the following methods are used to handle overflowing modals
                // todo (fat): these should probably be refactored out of modal.js
                // ----------------------------------------------------------------------

            }, {
                key: '_handleUpdate',
                value: function _handleUpdate() {
                    this._adjustDialog();
                }
            }, {
                key: '_adjustDialog',
                value: function _adjustDialog() {
                    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

                    if (!this._isBodyOverflowing && isModalOverflowing) {
                        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
                    }

                    if (this._isBodyOverflowing && !isModalOverflowing) {
                        this._element.style.paddingRight = this._scrollbarWidth + 'px';
                    }
                }
            }, {
                key: '_resetAdjustments',
                value: function _resetAdjustments() {
                    this._element.style.paddingLeft = '';
                    this._element.style.paddingRight = '';
                }
            }, {
                key: '_checkScrollbar',
                value: function _checkScrollbar() {
                    this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
                    this._scrollbarWidth = this._getScrollbarWidth();
                }
            }, {
                key: '_setScrollbar',
                value: function _setScrollbar() {
                    var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

                    this._originalBodyPadding = document.body.style.paddingRight || '';

                    if (this._isBodyOverflowing) {
                        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
                    }
                }
            }, {
                key: '_resetScrollbar',
                value: function _resetScrollbar() {
                    document.body.style.paddingRight = this._originalBodyPadding;
                }
            }, {
                key: '_getScrollbarWidth',
                value: function _getScrollbarWidth() {
                    // thx d.walsh
                    var scrollDiv = document.createElement('div');
                    scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
                    document.body.appendChild(scrollDiv);
                    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    document.body.removeChild(scrollDiv);
                    return scrollbarWidth;
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config, relatedTarget) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);
                        var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

                        if (!data) {
                            data = new Modal(this, _config);
                            $(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config](relatedTarget);
                        } else if (_config.show) {
                            data.show(relatedTarget);
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return Modal;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            var _this13 = this;

            var target = undefined;
            var selector = Util.getSelectorFromElement(this);

            if (selector) {
                target = $(selector)[0];
            }

            var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

            if (this.tagName === 'A') {
                event.preventDefault();
            }

            var $target = $(target).one(Event.SHOW, function (showEvent) {
                if (showEvent.isDefaultPrevented()) {
                    // only register focus restorer if modal will actually get shown
                    return;
                }

                $target.one(Event.HIDDEN, function () {
                    if ($(_this13).is(':visible')) {
                        _this13.focus();
                    }
                });
            });

            Modal._jQueryInterface.call($(target), config, this);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Modal._jQueryInterface;
        $.fn[NAME].Constructor = Modal;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Modal._jQueryInterface;
        };

        return Modal;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var ScrollSpy = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'scrollspy';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.scrollspy';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Default = {
            offset: 10,
            method: 'auto',
            target: ''
        };

        var DefaultType = {
            offset: 'number',
            method: 'string',
            target: '(string|element)'
        };

        var Event = {
            ACTIVATE: 'activate' + EVENT_KEY,
            SCROLL: 'scroll' + EVENT_KEY,
            LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            DROPDOWN_ITEM: 'dropdown-item',
            DROPDOWN_MENU: 'dropdown-menu',
            NAV_LINK: 'nav-link',
            NAV: 'nav',
            ACTIVE: 'active'
        };

        var Selector = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: '.active',
            LIST_ITEM: '.list-item',
            LI: 'li',
            LI_DROPDOWN: 'li.dropdown',
            NAV_LINKS: '.nav-link',
            DROPDOWN: '.dropdown',
            DROPDOWN_ITEMS: '.dropdown-item',
            DROPDOWN_TOGGLE: '.dropdown-toggle'
        };

        var OffsetMethod = {
            OFFSET: 'offset',
            POSITION: 'position'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var ScrollSpy = (function () {
            function ScrollSpy(element, config) {
                _classCallCheck(this, ScrollSpy);

                this._element = element;
                this._scrollElement = element.tagName === 'BODY' ? window : element;
                this._config = this._getConfig(config);
                this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
                this._offsets = [];
                this._targets = [];
                this._activeTarget = null;
                this._scrollHeight = 0;

                $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

                this.refresh();
                this._process();
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(ScrollSpy, [{
                key: 'refresh',

                // public

                value: function refresh() {
                    var _this14 = this;

                    var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

                    var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

                    var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

                    this._offsets = [];
                    this._targets = [];

                    this._scrollHeight = this._getScrollHeight();

                    var targets = $.makeArray($(this._selector));

                    targets.map(function (element) {
                        var target = undefined;
                        var targetSelector = Util.getSelectorFromElement(element);

                        if (targetSelector) {
                            target = $(targetSelector)[0];
                        }

                        if (target && (target.offsetWidth || target.offsetHeight)) {
                            // todo (fat): remove sketch reliance on jQuery position/offset
                            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                        }
                        return null;
                    }).filter(function (item) {
                        return item;
                    }).sort(function (a, b) {
                        return a[0] - b[0];
                    }).forEach(function (item) {
                        _this14._offsets.push(item[0]);
                        _this14._targets.push(item[1]);
                    });
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);
                    $(this._scrollElement).off(EVENT_KEY);

                    this._element = null;
                    this._scrollElement = null;
                    this._config = null;
                    this._selector = null;
                    this._offsets = null;
                    this._targets = null;
                    this._activeTarget = null;
                    this._scrollHeight = null;
                }

                // private

            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);

                    if (typeof config.target !== 'string') {
                        var id = $(config.target).attr('id');
                        if (!id) {
                            id = Util.getUID(NAME);
                            $(config.target).attr('id', id);
                        }
                        config.target = '#' + id;
                    }

                    Util.typeCheckConfig(NAME, config, DefaultType);

                    return config;
                }
            }, {
                key: '_getScrollTop',
                value: function _getScrollTop() {
                    return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
                }
            }, {
                key: '_getScrollHeight',
                value: function _getScrollHeight() {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                }
            }, {
                key: '_process',
                value: function _process() {
                    var scrollTop = this._getScrollTop() + this._config.offset;
                    var scrollHeight = this._getScrollHeight();
                    var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

                    if (this._scrollHeight !== scrollHeight) {
                        this.refresh();
                    }

                    if (scrollTop >= maxScroll) {
                        var target = this._targets[this._targets.length - 1];

                        if (this._activeTarget !== target) {
                            this._activate(target);
                        }
                    }

                    if (this._activeTarget && scrollTop < this._offsets[0]) {
                        this._activeTarget = null;
                        this._clear();
                        return;
                    }

                    for (var i = this._offsets.length; i--;) {
                        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

                        if (isActiveTarget) {
                            this._activate(this._targets[i]);
                        }
                    }
                }
            }, {
                key: '_activate',
                value: function _activate(target) {
                    this._activeTarget = target;

                    this._clear();

                    var queries = this._selector.split(',');
                    queries = queries.map(function (selector) {
                        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
                    });

                    var $link = $(queries.join(','));

                    if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
                        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                        $link.addClass(ClassName.ACTIVE);
                    } else {
                        // todo (fat) this is kinda sus...
                        // recursively add actives to tested nav-links
                        $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
                    }

                    $(this._scrollElement).trigger(Event.ACTIVATE, {
                        relatedTarget: target
                    });
                }
            }, {
                key: '_clear',
                value: function _clear() {
                    $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);
                        var _config = typeof config === 'object' && config || null;

                        if (!data) {
                            data = new ScrollSpy(this, _config);
                            $(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return ScrollSpy;
        })();

        $(window).on(Event.LOAD_DATA_API, function () {
            var scrollSpys = $.makeArray($(Selector.DATA_SPY));

            for (var i = scrollSpys.length; i--;) {
                var $spy = $(scrollSpys[i]);
                ScrollSpy._jQueryInterface.call($spy, $spy.data());
            }
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = ScrollSpy._jQueryInterface;
        $.fn[NAME].Constructor = ScrollSpy;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return ScrollSpy._jQueryInterface;
        };

        return ScrollSpy;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tab = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tab';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.tab';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            DROPDOWN_MENU: 'dropdown-menu',
            ACTIVE: 'active',
            FADE: 'fade',
            IN: 'in'
        };

        var Selector = {
            A: 'a',
            LI: 'li',
            DROPDOWN: '.dropdown',
            UL: 'ul:not(.dropdown-menu)',
            FADE_CHILD: '> .nav-item .fade, > .fade',
            ACTIVE: '.active',
            ACTIVE_CHILD: '> .nav-item > .active, > .active',
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
            DROPDOWN_TOGGLE: '.dropdown-toggle',
            DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tab = (function () {
            function Tab(element) {
                _classCallCheck(this, Tab);

                this._element = element;
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Tab, [{
                key: 'show',

                // public

                value: function show() {
                    var _this15 = this;

                    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
                        return;
                    }

                    var target = undefined;
                    var previous = undefined;
                    var ulElement = $(this._element).closest(Selector.UL)[0];
                    var selector = Util.getSelectorFromElement(this._element);

                    if (ulElement) {
                        previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
                        previous = previous[previous.length - 1];
                    }

                    var hideEvent = $.Event(Event.HIDE, {
                        relatedTarget: this._element
                    });

                    var showEvent = $.Event(Event.SHOW, {
                        relatedTarget: previous
                    });

                    if (previous) {
                        $(previous).trigger(hideEvent);
                    }

                    $(this._element).trigger(showEvent);

                    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (selector) {
                        target = $(selector)[0];
                    }

                    this._activate(this._element, ulElement);

                    var complete = function complete() {
                        var hiddenEvent = $.Event(Event.HIDDEN, {
                            relatedTarget: _this15._element
                        });

                        var shownEvent = $.Event(Event.SHOWN, {
                            relatedTarget: previous
                        });

                        $(previous).trigger(hiddenEvent);
                        $(_this15._element).trigger(shownEvent);
                    };

                    if (target) {
                        this._activate(target, target.parentNode, complete);
                    } else {
                        complete();
                    }
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeClass(this._element, DATA_KEY);
                    this._element = null;
                }

                // private

            }, {
                key: '_activate',
                value: function _activate(element, container, callback) {
                    var active = $(container).find(Selector.ACTIVE_CHILD)[0];
                    var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

                    var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

                    if (active && isTransitioning) {
                        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        complete();
                    }

                    if (active) {
                        $(active).removeClass(ClassName.IN);
                    }
                }
            }, {
                key: '_transitionComplete',
                value: function _transitionComplete(element, active, isTransitioning, callback) {
                    if (active) {
                        $(active).removeClass(ClassName.ACTIVE);

                        var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                        if (dropdownChild) {
                            $(dropdownChild).removeClass(ClassName.ACTIVE);
                        }

                        active.setAttribute('aria-expanded', false);
                    }

                    $(element).addClass(ClassName.ACTIVE);
                    element.setAttribute('aria-expanded', true);

                    if (isTransitioning) {
                        Util.reflow(element);
                        $(element).addClass(ClassName.IN);
                    } else {
                        $(element).removeClass(ClassName.FADE);
                    }

                    if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

                        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
                        if (dropdownElement) {
                            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                        }

                        element.setAttribute('aria-expanded', true);
                    }

                    if (callback) {
                        callback();
                    }
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);

                        if (!data) {
                            data = data = new Tab(this);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Tab;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();
            Tab._jQueryInterface.call($(this), 'show');
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Tab._jQueryInterface;
        $.fn[NAME].Constructor = Tab;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tab._jQueryInterface;
        };

        return Tab;
    })(jQuery);

    /* global Tether */

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tooltip = (function ($) {

        /**
         * Check for Tether dependency
         * Tether - http://github.hubspot.com/tether/
         */
        if (window.Tether === undefined) {
            throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
        }

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tooltip';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.tooltip';
        var EVENT_KEY = '.' + DATA_KEY;
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;
        var CLASS_PREFIX = 'bs-tether';

        var Default = {
            animation: true,
            template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: false,
            selector: false,
            placement: 'top',
            offset: '0 0',
            constraints: []
        };

        var DefaultType = {
            animation: 'boolean',
            template: 'string',
            title: '(string|element|function)',
            trigger: 'string',
            delay: '(number|object)',
            html: 'boolean',
            selector: '(string|boolean)',
            placement: '(string|function)',
            offset: 'string',
            constraints: 'array'
        };

        var AttachmentMap = {
            TOP: 'bottom center',
            RIGHT: 'middle left',
            BOTTOM: 'top center',
            LEFT: 'middle right'
        };

        var HoverState = {
            IN: 'in',
            OUT: 'out'
        };

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            INSERTED: 'inserted' + EVENT_KEY,
            CLICK: 'click' + EVENT_KEY,
            FOCUSIN: 'focusin' + EVENT_KEY,
            FOCUSOUT: 'focusout' + EVENT_KEY,
            MOUSEENTER: 'mouseenter' + EVENT_KEY,
            MOUSELEAVE: 'mouseleave' + EVENT_KEY
        };

        var ClassName = {
            FADE: 'fade',
            IN: 'in'
        };

        var Selector = {
            TOOLTIP: '.tooltip',
            TOOLTIP_INNER: '.tooltip-inner'
        };

        var TetherClass = {
            element: false,
            enabled: false
        };

        var Trigger = {
            HOVER: 'hover',
            FOCUS: 'focus',
            CLICK: 'click',
            MANUAL: 'manual'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tooltip = (function () {
            function Tooltip(element, config) {
                _classCallCheck(this, Tooltip);

                // private
                this._isEnabled = true;
                this._timeout = 0;
                this._hoverState = '';
                this._activeTrigger = {};
                this._tether = null;

                // protected
                this.element = element;
                this.config = this._getConfig(config);
                this.tip = null;

                this._setListeners();
            }

            /**
             * ------------------------------------------------------------------------
             * jQuery
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Tooltip, [{
                key: 'enable',

                // public

                value: function enable() {
                    this._isEnabled = true;
                }
            }, {
                key: 'disable',
                value: function disable() {
                    this._isEnabled = false;
                }
            }, {
                key: 'toggleEnabled',
                value: function toggleEnabled() {
                    this._isEnabled = !this._isEnabled;
                }
            }, {
                key: 'toggle',
                value: function toggle(event) {
                    if (event) {
                        var dataKey = this.constructor.DATA_KEY;
                        var context = $(event.currentTarget).data(dataKey);

                        if (!context) {
                            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                            $(event.currentTarget).data(dataKey, context);
                        }

                        context._activeTrigger.click = !context._activeTrigger.click;

                        if (context._isWithActiveTrigger()) {
                            context._enter(null, context);
                        } else {
                            context._leave(null, context);
                        }
                    } else {

                        if ($(this.getTipElement()).hasClass(ClassName.IN)) {
                            this._leave(null, this);
                            return;
                        }

                        this._enter(null, this);
                    }
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    clearTimeout(this._timeout);

                    this.cleanupTether();

                    $.removeData(this.element, this.constructor.DATA_KEY);

                    $(this.element).off(this.constructor.EVENT_KEY);

                    if (this.tip) {
                        $(this.tip).remove();
                    }

                    this._isEnabled = null;
                    this._timeout = null;
                    this._hoverState = null;
                    this._activeTrigger = null;
                    this._tether = null;

                    this.element = null;
                    this.config = null;
                    this.tip = null;
                }
            }, {
                key: 'show',
                value: function show() {
                    var _this16 = this;

                    var showEvent = $.Event(this.constructor.Event.SHOW);

                    if (this.isWithContent() && this._isEnabled) {
                        $(this.element).trigger(showEvent);

                        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

                        if (showEvent.isDefaultPrevented() || !isInTheDom) {
                            return;
                        }

                        var tip = this.getTipElement();
                        var tipId = Util.getUID(this.constructor.NAME);

                        tip.setAttribute('id', tipId);
                        this.element.setAttribute('aria-describedby', tipId);

                        this.setContent();

                        if (this.config.animation) {
                            $(tip).addClass(ClassName.FADE);
                        }

                        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                        var attachment = this._getAttachment(placement);

                        $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

                        $(this.element).trigger(this.constructor.Event.INSERTED);

                        this._tether = new Tether({
                            attachment: attachment,
                            element: tip,
                            target: this.element,
                            classes: TetherClass,
                            classPrefix: CLASS_PREFIX,
                            offset: this.config.offset,
                            constraints: this.config.constraints,
                            addTargetClasses: false
                        });

                        Util.reflow(tip);
                        this._tether.position();

                        $(tip).addClass(ClassName.IN);

                        var complete = function complete() {
                            var prevHoverState = _this16._hoverState;
                            _this16._hoverState = null;

                            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

                            if (prevHoverState === HoverState.OUT) {
                                _this16._leave(null, _this16);
                            }
                        };

                        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
                            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
                            return;
                        }

                        complete();
                    }
                }
            }, {
                key: 'hide',
                value: function hide(callback) {
                    var _this17 = this;

                    var tip = this.getTipElement();
                    var hideEvent = $.Event(this.constructor.Event.HIDE);
                    var complete = function complete() {
                        if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
                            tip.parentNode.removeChild(tip);
                        }

                        _this17.element.removeAttribute('aria-describedby');
                        $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
                        _this17.cleanupTether();

                        if (callback) {
                            callback();
                        }
                    };

                    $(this.element).trigger(hideEvent);

                    if (hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    $(tip).removeClass(ClassName.IN);

                    if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

                        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        complete();
                    }

                    this._hoverState = '';
                }

                // protected

            }, {
                key: 'isWithContent',
                value: function isWithContent() {
                    return Boolean(this.getTitle());
                }
            }, {
                key: 'getTipElement',
                value: function getTipElement() {
                    return this.tip = this.tip || $(this.config.template)[0];
                }
            }, {
                key: 'setContent',
                value: function setContent() {
                    var $tip = $(this.getTipElement());

                    this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

                    $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

                    this.cleanupTether();
                }
            }, {
                key: 'setElementContent',
                value: function setElementContent($element, content) {
                    var html = this.config.html;
                    if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                        // content is a DOM node or a jQuery
                        if (html) {
                            if (!$(content).parent().is($element)) {
                                $element.empty().append(content);
                            }
                        } else {
                            $element.text($(content).text());
                        }
                    } else {
                        $element[html ? 'html' : 'text'](content);
                    }
                }
            }, {
                key: 'getTitle',
                value: function getTitle() {
                    var title = this.element.getAttribute('data-original-title');

                    if (!title) {
                        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
                    }

                    return title;
                }
            }, {
                key: 'cleanupTether',
                value: function cleanupTether() {
                    if (this._tether) {
                        this._tether.destroy();
                    }
                }

                // private

            }, {
                key: '_getAttachment',
                value: function _getAttachment(placement) {
                    return AttachmentMap[placement.toUpperCase()];
                }
            }, {
                key: '_setListeners',
                value: function _setListeners() {
                    var _this18 = this;

                    var triggers = this.config.trigger.split(' ');

                    triggers.forEach(function (trigger) {
                        if (trigger === 'click') {
                            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
                        } else if (trigger !== Trigger.MANUAL) {
                            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
                            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

                            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
                        }
                    });

                    if (this.config.selector) {
                        this.config = $.extend({}, this.config, {
                            trigger: 'manual',
                            selector: ''
                        });
                    } else {
                        this._fixTitle();
                    }
                }
            }, {
                key: '_fixTitle',
                value: function _fixTitle() {
                    var titleType = typeof this.element.getAttribute('data-original-title');
                    if (this.element.getAttribute('title') || titleType !== 'string') {
                        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                        this.element.setAttribute('title', '');
                    }
                }
            }, {
                key: '_enter',
                value: function _enter(event, context) {
                    var dataKey = this.constructor.DATA_KEY;

                    context = context || $(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $(event.currentTarget).data(dataKey, context);
                    }

                    if (event) {
                        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
                    }

                    if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
                        context._hoverState = HoverState.IN;
                        return;
                    }

                    clearTimeout(context._timeout);

                    context._hoverState = HoverState.IN;

                    if (!context.config.delay || !context.config.delay.show) {
                        context.show();
                        return;
                    }

                    context._timeout = setTimeout(function () {
                        if (context._hoverState === HoverState.IN) {
                            context.show();
                        }
                    }, context.config.delay.show);
                }
            }, {
                key: '_leave',
                value: function _leave(event, context) {
                    var dataKey = this.constructor.DATA_KEY;

                    context = context || $(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $(event.currentTarget).data(dataKey, context);
                    }

                    if (event) {
                        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
                    }

                    if (context._isWithActiveTrigger()) {
                        return;
                    }

                    clearTimeout(context._timeout);

                    context._hoverState = HoverState.OUT;

                    if (!context.config.delay || !context.config.delay.hide) {
                        context.hide();
                        return;
                    }

                    context._timeout = setTimeout(function () {
                        if (context._hoverState === HoverState.OUT) {
                            context.hide();
                        }
                    }, context.config.delay.hide);
                }
            }, {
                key: '_isWithActiveTrigger',
                value: function _isWithActiveTrigger() {
                    for (var trigger in this._activeTrigger) {
                        if (this._activeTrigger[trigger]) {
                            return true;
                        }
                    }

                    return false;
                }
            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

                    if (config.delay && typeof config.delay === 'number') {
                        config.delay = {
                            show: config.delay,
                            hide: config.delay
                        };
                    }

                    Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

                    return config;
                }
            }, {
                key: '_getDelegateConfig',
                value: function _getDelegateConfig() {
                    var config = {};

                    if (this.config) {
                        for (var key in this.config) {
                            if (this.constructor.Default[key] !== this.config[key]) {
                                config[key] = this.config[key];
                            }
                        }
                    }

                    return config;
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);
                        var _config = typeof config === 'object' ? config : null;

                        if (!data && /destroy|hide/.test(config)) {
                            return;
                        }

                        if (!data) {
                            data = new Tooltip(this, _config);
                            $(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }, {
                key: 'NAME',
                get: function get() {
                    return NAME;
                }
            }, {
                key: 'DATA_KEY',
                get: function get() {
                    return DATA_KEY;
                }
            }, {
                key: 'Event',
                get: function get() {
                    return Event;
                }
            }, {
                key: 'EVENT_KEY',
                get: function get() {
                    return EVENT_KEY;
                }
            }, {
                key: 'DefaultType',
                get: function get() {
                    return DefaultType;
                }
            }]);

            return Tooltip;
        })();

        $.fn[NAME] = Tooltip._jQueryInterface;
        $.fn[NAME].Constructor = Tooltip;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tooltip._jQueryInterface;
        };

        return Tooltip;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Popover = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'popover';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.popover';
        var EVENT_KEY = '.' + DATA_KEY;
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Default = $.extend({}, Tooltip.Default, {
            placement: 'right',
            trigger: 'click',
            content: '',
            template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
        });

        var DefaultType = $.extend({}, Tooltip.DefaultType, {
            content: '(string|element|function)'
        });

        var ClassName = {
            FADE: 'fade',
            IN: 'in'
        };

        var Selector = {
            TITLE: '.popover-title',
            CONTENT: '.popover-content',
            ARROW: '.popover-arrow'
        };

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            INSERTED: 'inserted' + EVENT_KEY,
            CLICK: 'click' + EVENT_KEY,
            FOCUSIN: 'focusin' + EVENT_KEY,
            FOCUSOUT: 'focusout' + EVENT_KEY,
            MOUSEENTER: 'mouseenter' + EVENT_KEY,
            MOUSELEAVE: 'mouseleave' + EVENT_KEY
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Popover = (function (_Tooltip) {
            _inherits(Popover, _Tooltip);

            function Popover() {
                _classCallCheck(this, Popover);

                _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
            }

            /**
             * ------------------------------------------------------------------------
             * jQuery
             * ------------------------------------------------------------------------
             */

            _createClass(Popover, [{
                key: 'isWithContent',

                // overrides

                value: function isWithContent() {
                    return this.getTitle() || this._getContent();
                }
            }, {
                key: 'getTipElement',
                value: function getTipElement() {
                    return this.tip = this.tip || $(this.config.template)[0];
                }
            }, {
                key: 'setContent',
                value: function setContent() {
                    var $tip = $(this.getTipElement());

                    // we use append for html objects to maintain js events
                    this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
                    this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

                    $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

                    this.cleanupTether();
                }

                // private

            }, {
                key: '_getContent',
                value: function _getContent() {
                    return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var data = $(this).data(DATA_KEY);
                        var _config = typeof config === 'object' ? config : null;

                        if (!data && /destroy|hide/.test(config)) {
                            return;
                        }

                        if (!data) {
                            data = new Popover(this, _config);
                            $(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',

                // getters

                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }, {
                key: 'NAME',
                get: function get() {
                    return NAME;
                }
            }, {
                key: 'DATA_KEY',
                get: function get() {
                    return DATA_KEY;
                }
            }, {
                key: 'Event',
                get: function get() {
                    return Event;
                }
            }, {
                key: 'EVENT_KEY',
                get: function get() {
                    return EVENT_KEY;
                }
            }, {
                key: 'DefaultType',
                get: function get() {
                    return DefaultType;
                }
            }]);

            return Popover;
        })(Tooltip);

        $.fn[NAME] = Popover._jQueryInterface;
        $.fn[NAME].Constructor = Popover;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Popover._jQueryInterface;
        };

        return Popover;
    })(jQuery);

}(jQuery);

/*
	FlexNav.js 1.3.3

	Created by Jason Weaver http://jasonweaver.name
	Released under http://unlicense.org/

//
*/


(function () {
    var $;

    $ = jQuery;

    $.fn.flexNav = function (options) {
        var $nav, $top_nav_items, breakpoint, count, nav_percent, nav_width, resetMenu, resizer, settings, showMenu,
            toggle_selector, touch_selector;
        settings = $.extend({
            'animationSpeed': 250,
            'transitionOpacity': true,
            'buttonSelector': '.menu-button',
            'hoverIntent': false,
            'hoverIntentTimeout': 150,
            'calcItemWidths': false,
            'hover': true
        }, options);
        $nav = $(this);
        $nav.addClass('with-js');
        if (settings.transitionOpacity === true) {
            $nav.addClass('opacity');
        }
        $nav.find("li").each(function () {
            if ($(this).has("ul").length) {
                return $(this).addClass("item-with-ul").find("ul").hide();
            }
        });
        if (settings.calcItemWidths === true) {
            $top_nav_items = $nav.find('>li');
            count = $top_nav_items.length;
            nav_width = 100 / count;
            nav_percent = nav_width + "%";
        }
        if ($nav.data('breakpoint')) {
            breakpoint = $nav.data('breakpoint');
        }
        showMenu = function () {
            if ($nav.hasClass('lg-screen') === true && settings.hover === true) {
                if (settings.transitionOpacity === true) {
                    return $(this).find('>ul').addClass('flexnav-show').stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, settings.animationSpeed);
                } else {
                    return $(this).find('>ul').addClass('flexnav-show').stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, settings.animationSpeed);
                }
            }
        };
        resetMenu = function () {
            if ($nav.hasClass('lg-screen') === true && $(this).find('>ul').hasClass('flexnav-show') === true && settings.hover === true) {
                if (settings.transitionOpacity === true) {
                    return $(this).find('>ul').removeClass('flexnav-show').stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, settings.animationSpeed);
                } else {
                    return $(this).find('>ul').removeClass('flexnav-show').stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, settings.animationSpeed);
                }
            }
        };
        resizer = function () {
            var selector;
            if ($(window).width() <= breakpoint) {
                $nav.removeClass("lg-screen").addClass("sm-screen");
                if (settings.calcItemWidths === true) {
                    $top_nav_items.css('width', '100%');
                }
                selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
                $(selector).removeClass('active');
                return $('.one-page li a').on('click', function () {
                    return $nav.removeClass('flexnav-show');
                });
            } else if ($(window).width() > breakpoint) {
                $nav.removeClass("sm-screen").addClass("lg-screen");
                if (settings.calcItemWidths === true) {
                    $top_nav_items.css('width', nav_percent);
                }
                $nav.removeClass('flexnav-show').find('.item-with-ul').on();
                $('.item-with-ul').find('ul').removeClass('flexnav-show');
                resetMenu();
                if (settings.hoverIntent === true) {
                    return $('.item-with-ul').hoverIntent({
                        over: showMenu,
                        out: resetMenu,
                        timeout: settings.hoverIntentTimeout
                    });
                } else if (settings.hoverIntent === false) {
                    return $('.item-with-ul').on('mouseenter', showMenu).on('mouseleave', resetMenu);
                }
            }
        };
        $(settings['buttonSelector']).data('navEl', $nav);
        touch_selector = '.item-with-ul, ' + settings['buttonSelector'];
        $(touch_selector).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>');
        toggle_selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
        $(toggle_selector).on('click', function (e) {
            var $btnParent, $thisNav, bs;
            $(toggle_selector).toggleClass('active');
            e.preventDefault();
            e.stopPropagation();
            bs = settings['buttonSelector'];
            $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
            $thisNav = $btnParent.data('navEl');
            return $thisNav.toggleClass('flexnav-show');
        });
        $('.touch-button').on('click', function (e) {
            var $sub, $touchButton;
            $sub = $(this).parent('.item-with-ul').find('>ul');
            $touchButton = $(this).parent('.item-with-ul').find('>span.touch-button');
            if ($nav.hasClass('lg-screen') === true) {
                $(this).parent('.item-with-ul').siblings().find('ul.flexnav-show').removeClass('flexnav-show').hide();
            }
            if ($sub.hasClass('flexnav-show') === true) {
                $sub.removeClass('flexnav-show').slideUp(settings.animationSpeed);
                return $touchButton.removeClass('active');
            } else if ($sub.hasClass('flexnav-show') === false) {
                $sub.addClass('flexnav-show').slideDown(settings.animationSpeed);
                return $touchButton.addClass('active');
            }
        });
        $nav.find('.item-with-ul *').focus(function () {
            $(this).parent('.item-with-ul').parent().find(".open").not(this).removeClass("open").hide();
            return $(this).parent('.item-with-ul').find('>ul').addClass("open").show();
        });
        resizer();
        return $(window).on('resize', resizer);
    };

}).call(this);

/*! flexnav https://github.com/indyplanets/flexnav http://unlicense.org/ 2013-11-28 */
!function () {
    var a;
    a = jQuery, a.fn.flexNav = function (b) {
        var c, d, e, f, g, h, i, j, k, l, m, n;
        return k = a.extend({
            animationSpeed: 250,
            transitionOpacity: !0,
            buttonSelector: ".menu-button",
            hoverIntent: !1,
            hoverIntentTimeout: 150,
            calcItemWidths: !1,
            hover: !0
        }, b), c = a(this), c.addClass("with-js"), k.transitionOpacity === !0 && c.addClass("opacity"), c.find("li").each(function () {
            return a(this).has("ul").length ? a(this).addClass("item-with-ul").find("ul").hide() : void 0
        }), k.calcItemWidths === !0 && (d = c.find(">li"), f = d.length, h = 100 / f, g = h + "%"), c.data("breakpoint") && (e = c.data("breakpoint")), l = function () {
            return c.hasClass("lg-screen") === !0 && k.hover === !0 ? k.transitionOpacity === !0 ? a(this).find(">ul").addClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"],
                opacity: "toggle"
            }, k.animationSpeed) : a(this).find(">ul").addClass("flexnav-show").stop(!0, !0).animate({height: ["toggle", "swing"]}, k.animationSpeed) : void 0
        }, i = function () {
            return c.hasClass("lg-screen") === !0 && a(this).find(">ul").hasClass("flexnav-show") === !0 && k.hover === !0 ? k.transitionOpacity === !0 ? a(this).find(">ul").removeClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"],
                opacity: "toggle"
            }, k.animationSpeed) : a(this).find(">ul").removeClass("flexnav-show").stop(!0, !0).animate({height: ["toggle", "swing"]}, k.animationSpeed) : void 0
        }, j = function () {
            var b;
            if (a(window).width() <= e) return c.removeClass("lg-screen").addClass("sm-screen"), k.calcItemWidths === !0 && d.css("width", "100%"), b = k.buttonSelector + ", " + k.buttonSelector + " .touch-button", a(b).removeClass("active"), a(".one-page li a").on("click", function () {
                return c.removeClass("flexnav-show")
            });
            if (a(window).width() > e) {
                if (c.removeClass("sm-screen").addClass("lg-screen"), k.calcItemWidths === !0 && d.css("width", g), c.removeClass("flexnav-show").find(".item-with-ul").on(), a(".item-with-ul").find("ul").removeClass("flexnav-show"), i(), k.hoverIntent === !0) return a(".item-with-ul").hoverIntent({
                    over: l,
                    out: i,
                    timeout: k.hoverIntentTimeout
                });
                if (k.hoverIntent === !1) return a(".item-with-ul").on("mouseenter", l).on("mouseleave", i)
            }
        }, a(k.buttonSelector).data("navEl", c), n = ".item-with-ul, " + k.buttonSelector, a(n).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>'), m = k.buttonSelector + ", " + k.buttonSelector + " .touch-button", a(m).on("click", function (b) {
            var c, d, e;
            return a(m).toggleClass("active"), b.preventDefault(), b.stopPropagation(), e = k.buttonSelector, c = a(this).is(e) ? a(this) : a(this).parent(e), d = c.data("navEl"), d.toggleClass("flexnav-show")
        }), a(".touch-button").on("click", function () {
            var b, d;
            return b = a(this).parent(".item-with-ul").find(">ul"), d = a(this).parent(".item-with-ul").find(">span.touch-button"), c.hasClass("lg-screen") === !0 && a(this).parent(".item-with-ul").siblings().find("ul.flexnav-show").removeClass("flexnav-show").hide(), b.hasClass("flexnav-show") === !0 ? (b.removeClass("flexnav-show").slideUp(k.animationSpeed), d.removeClass("active")) : b.hasClass("flexnav-show") === !1 ? (b.addClass("flexnav-show").slideDown(k.animationSpeed), d.addClass("active")) : void 0
        }), c.find(".item-with-ul *").focus(function () {
            return a(this).parent(".item-with-ul").parent().find(".open").not(this).removeClass("open").hide(), a(this).parent(".item-with-ul").find(">ul").addClass("open").show()
        }), j(), a(window).on("resize", j)
    }
}.call(this);
/**
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License: MIT
 */

;(function (factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function (value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function (elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function () {
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function (options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function (options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function (key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = '0.7.2';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function (elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function () {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function () {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function (key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function () {
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = {'display': display};
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function () {
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function () {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function () {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function () {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function (event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function () {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function (throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function () {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function (event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function (event) {
        matchHeight._update(true, event);
    });

});

/*
== malihu jquery custom scrollbar plugin ==
Version: 3.1.5
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development.
For production, use either the minified jquery.mCustomScrollbar.min.js script or
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin
and dependencies (minified).
*/

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = factory;
    } else {
        factory(jQuery, window, document);
    }
}(function ($) {
    (function (init) {
        var _rjs = typeof define === "function" && define.amd, /* RequireJS */
            _njs = typeof module !== "undefined" && module.exports, /* NodeJS */
            _dlp = ("https:" == document.location.protocol) ? "https:" : "http:", /* location protocol */
            _url = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        if (!_rjs) {
            if (_njs) {
                require("jquery-mousewheel")($);
            } else {
                /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS
			(works when mCustomScrollbar fn is called on window load) */
                $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src=" + _dlp + "//" + _url + "%3E%3C/script%3E"));
            }
        }
        init();
    }(function () {

        /*
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S)
	----------------------------------------
	*/

        var pluginNS = "mCustomScrollbar",
            pluginPfx = "mCS",
            defaultSelector = ".mCustomScrollbar",


            /*
	----------------------------------------
	DEFAULT OPTIONS
	----------------------------------------
	*/

            defaults = {
                /*
			set element/content width/height programmatically
			values: boolean, pixels, percentage
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
                /*
			set the initial css top property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
                setTop: 0,
                /*
			set the initial css left property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
                setLeft: 0,
                /*
			scrollbar axis (vertical and/or horizontal scrollbars)
			values (string): "y", "x", "yx"
			*/
                axis: "y",
                /*
			position of scrollbar relative to content
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
                scrollbarPosition: "inside",
                /*
			scrolling inertia
			values: integer (milliseconds)
			*/
                scrollInertia: 950,
                /*
			auto-adjust scrollbar dragger length
			values: boolean
			*/
                autoDraggerLength: true,
                /*
			auto-hide scrollbar when idle
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
                /*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
                /*
			always show scrollbar, even when there's nothing to scroll
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
                alwaysShowScrollbar: 0,
                /*
			scrolling always snaps to a multiple of this number in pixels
			values: integer, array ([y,x])
				option						default
				-------------------------------------
				snapAmount					null
			*/
                /*
			when snapping, snap with this number in pixels as an offset
			values: integer
			*/
                snapOffset: 0,
                /*
			mouse-wheel scrolling
			*/
                mouseWheel: {
                    /*
				enable mouse-wheel scrolling
				values: boolean
				*/
                    enable: true,
                    /*
				scrolling amount in pixels
				values: "auto", integer
				*/
                    scrollAmount: "auto",
                    /*
				mouse-wheel scrolling axis
				the default scrolling direction when both vertical and horizontal scrollbars are present
				values (string): "y", "x"
				*/
                    axis: "y",
                    /*
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
                    /*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.
				values: "auto", integer
				"auto" uses the default OS/browser value
				*/
                    deltaFactor: "auto",
                    /*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration)
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
                    /*
				invert mouse-wheel scrolling direction
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
                    /*
				the tags that disable mouse-wheel when cursor is over them
				*/
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                /*
			scrollbar buttons
			*/
                scrollButtons: {
                    /*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
                    /*
				scrollbar buttons scrolling type
				values (string): "stepless", "stepped"
				*/
                    scrollType: "stepless",
                    /*
				scrolling amount in pixels
				values: "auto", integer
				*/
                    scrollAmount: "auto"
                    /*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
                },
                /*
			keyboard scrolling
			*/
                keyboard: {
                    /*
				enable scrolling via keyboard
				values: boolean
				*/
                    enable: true,
                    /*
				keyboard scrolling type
				values (string): "stepless", "stepped"
				*/
                    scrollType: "stepless",
                    /*
				scrolling amount in pixels
				values: "auto", integer
				*/
                    scrollAmount: "auto"
                },
                /*
			enable content touch-swipe scrolling
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
                contentTouchScroll: 25,
                /*
			enable/disable document (default) touch-swipe scrolling
			*/
                documentTouchScroll: true,
                /*
			advanced option parameters
			*/
                advanced: {
                    /*
				auto-expand content horizontally (for "x" or "yx" axis)
				values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
                    /*
				auto-scroll to elements with focus
				*/
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    /*
				auto-update scrollbars on content, element or viewport resize
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc.
				values: boolean
				*/
                    updateOnContentResize: true,
                    /*
				auto-update scrollbars each time each image inside the element is fully loaded
				values: "auto", boolean
				*/
                    updateOnImageLoad: "auto",
                    /*
				auto-update scrollbars based on the amount and size changes of specific selectors
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed)
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
                    /*
				extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					extraDraggableSelectors		null
				*/
                    /*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
                    /*
				auto-update timeout
				values: integer (milliseconds)
				*/
                    autoUpdateTimeout: 60
                },
                /*
			scrollbar theme
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
                theme: "light",
                /*
			user defined callback functions
			*/
                callbacks: {
                    /*
				Available callbacks:
					callback					default
					-------------------------------------
					onCreate					null
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onBeforeUpdate				null
					onUpdate					null
				*/
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: true
                }
                /*
			add scrollbar(s) on all elements matching the current selector, now and in the future
			values: boolean, string
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
            },


            /*
	----------------------------------------
	VARS, CONSTANTS
	----------------------------------------
	*/

            totalInstances = 0, /* plugin instances amount */
            liveTimers = {}, /* live option timers */
            oldIE = (window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
            touchActive = false, touchable, /* global touch vars (for touch and pointer events) */
            /* general plugin classes */
            classes = [
                "mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar",
                "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer",
                "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"
            ],


            /*
	----------------------------------------
	METHODS
	----------------------------------------
	*/

            methods = {

                /*
			plugin initialization method
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/

                init: function (options) {

                    var options = $.extend(true, {}, defaults, options),
                        selector = _selector.call(this); /* validate selector */

                    /*
				if live option is enabled, monitor for elements matching the current selector and
				apply scrollbar(s) when found (now and in the future)
				*/
                    if (options.live) {
                        var liveSelector = options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
                            $liveSelector = $(liveSelector); /* live selector(s) as jquery object */
                        if (options.live === "off") {
                            /*
						disable live if requested
						usage: $(selector).mCustomScrollbar({live:"off"});
						*/
                            removeLiveTimers(liveSelector);
                            return;
                        }
                        liveTimers[liveSelector] = setTimeout(function () {
                            /* call mCustomScrollbar fn on live selector(s) every half-second */
                            $liveSelector.mCustomScrollbar(options);
                            if (options.live === "once" && $liveSelector.length) {
                                /* disable live after first invocation */
                                removeLiveTimers(liveSelector);
                            }
                        }, 500);
                    } else {
                        removeLiveTimers(liveSelector);
                    }

                    /* options backward compatibility (for versions < 3.0.0) and normalization */
                    options.setWidth = (options.set_width) ? options.set_width : options.setWidth;
                    options.setHeight = (options.set_height) ? options.set_height : options.setHeight;
                    options.axis = (options.horizontalScroll) ? "x" : _findAxis(options.axis);
                    options.scrollInertia = options.scrollInertia > 0 && options.scrollInertia < 17 ? 17 : options.scrollInertia;
                    if (typeof options.mouseWheel !== "object" && options.mouseWheel == true) { /* old school mouseWheel option (non-object) */
                        options.mouseWheel = {
                            enable: true,
                            scrollAmount: "auto",
                            axis: "y",
                            preventDefault: false,
                            deltaFactor: "auto",
                            normalizeDelta: false,
                            invert: false
                        }
                    }
                    options.mouseWheel.scrollAmount = !options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
                    options.mouseWheel.normalizeDelta = !options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
                    options.scrollButtons.scrollType = _findScrollButtonsType(options.scrollButtons.scrollType);

                    _theme(options); /* theme-specific options */

                    /* plugin constructor */
                    return $(selector).each(function () {

                        var $this = $(this);

                        if (!$this.data(pluginPfx)) { /* prevent multiple instantiations */

                            /* store options and create objects in jquery data */
                            $this.data(pluginPfx, {
                                idx: ++totalInstances, /* instance index */
                                opt: options, /* options */
                                scrollRatio: {y: null, x: null}, /* scrollbar to content ratio */
                                overflowed: null, /* overflowed axis */
                                contentReset: {y: null, x: null}, /* object to check when content resets */
                                bindEvents: false, /* object to check if events are bound */
                                tweenRunning: false, /* object to check if tween is running */
                                sequential: {}, /* sequential scrolling object */
                                langDir: $this.css("direction"), /* detect/store direction (ltr or rtl) */
                                cbOffsets: null, /* object to check whether callback offsets always trigger */
                                /*
							object to check how scrolling events where last triggered
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method)
							usage: object.data("mCS").trigger
							*/
                                trigger: null,
                                /*
							object to check for changes in elements in order to call the update method automatically
							*/
                                poll: {size: {o: 0, n: 0}, img: {o: 0, n: 0}, change: {o: 0, n: 0}}
                            });

                            var d = $this.data(pluginPfx), o = d.opt,
                                /* HTML data attributes */
                                htmlDataAxis = $this.data("mcs-axis"),
                                htmlDataSbPos = $this.data("mcs-scrollbar-position"),
                                htmlDataTheme = $this.data("mcs-theme");

                            if (htmlDataAxis) {
                                o.axis = htmlDataAxis;
                            } /* usage example: data-mcs-axis="y" */
                            if (htmlDataSbPos) {
                                o.scrollbarPosition = htmlDataSbPos;
                            } /* usage example: data-mcs-scrollbar-position="outside" */
                            if (htmlDataTheme) { /* usage example: data-mcs-theme="minimal" */
                                o.theme = htmlDataTheme;
                                _theme(o); /* theme-specific options */
                            }

                            _pluginMarkup.call(this); /* add plugin markup */

                            if (d && o.callbacks.onCreate && typeof o.callbacks.onCreate === "function") {
                                o.callbacks.onCreate.call(this);
                            } /* callbacks: onCreate */

                            $("#mCSB_" + d.idx + "_container img:not(." + classes[2] + ")").addClass(classes[2]); /* flag loaded images */

                            methods.update.call(null, $this); /* call the update method */

                        }

                    });

                },
                /* ---------------------------------------- */



                /*
			plugin update method
			updates content and scrollbar(s) values, events and status
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/

                update: function (el, cb) {

                    var selector = el || _selector.call(this); /* validate selector */

                    return $(selector).each(function () {

                        var $this = $(this);

                        if ($this.data(pluginPfx)) { /* check if plugin has initialized */

                            var d = $this.data(pluginPfx), o = d.opt,
                                mCSB_container = $("#mCSB_" + d.idx + "_container"),
                                mCustomScrollBox = $("#mCSB_" + d.idx),
                                mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];

                            if (!mCSB_container.length) {
                                return;
                            }

                            if (d.tweenRunning) {
                                _stop($this);
                            } /* stop any running tweens while updating */

                            if (cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate === "function") {
                                o.callbacks.onBeforeUpdate.call(this);
                            } /* callbacks: onBeforeUpdate */

                            /* if element was disabled or destroyed, remove class(es) */
                            if ($this.hasClass(classes[3])) {
                                $this.removeClass(classes[3]);
                            }
                            if ($this.hasClass(classes[4])) {
                                $this.removeClass(classes[4]);
                            }

                            /* css flexbox fix, detect/set max-height */
                            mCustomScrollBox.css("max-height", "none");
                            if (mCustomScrollBox.height() !== $this.height()) {
                                mCustomScrollBox.css("max-height", $this.height());
                            }

                            _expandContentHorizontally.call(this); /* expand content horizontally */

                            if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
                                mCSB_container.css("width", _contentWidth(mCSB_container));
                            }

                            d.overflowed = _overflowed.call(this); /* determine if scrolling is required */

                            _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

                            /* auto-adjust scrollbar dragger length analogous to content */
                            if (o.autoDraggerLength) {
                                _setDraggerLength.call(this);
                            }

                            _scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

                            _bindEvents.call(this); /* bind scrollbar events */

                            /* reset scrolling position and/or events */
                            var to = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)];
                            if (o.axis !== "x") { /* y/yx axis */
                                if (!d.overflowed[0]) { /* y scrolling is not required */
                                    _resetContentPosition.call(this); /* reset content position */
                                    if (o.axis === "y") {
                                        _unbindEvents.call(this);
                                    } else if (o.axis === "yx" && d.overflowed[1]) {
                                        _scrollTo($this, to[1].toString(), {dir: "x", dur: 0, overwrite: "none"});
                                    }
                                } else if (mCSB_dragger[0].height() > mCSB_dragger[0].parent().height()) {
                                    _resetContentPosition.call(this); /* reset content position */
                                } else { /* y scrolling is required */
                                    _scrollTo($this, to[0].toString(), {dir: "y", dur: 0, overwrite: "none"});
                                    d.contentReset.y = null;
                                }
                            }
                            if (o.axis !== "y") { /* x/yx axis */
                                if (!d.overflowed[1]) { /* x scrolling is not required */
                                    _resetContentPosition.call(this); /* reset content position */
                                    if (o.axis === "x") {
                                        _unbindEvents.call(this);
                                    } else if (o.axis === "yx" && d.overflowed[0]) {
                                        _scrollTo($this, to[0].toString(), {dir: "y", dur: 0, overwrite: "none"});
                                    }
                                } else if (mCSB_dragger[1].width() > mCSB_dragger[1].parent().width()) {
                                    _resetContentPosition.call(this); /* reset content position */
                                } else { /* x scrolling is required */
                                    _scrollTo($this, to[1].toString(), {dir: "x", dur: 0, overwrite: "none"});
                                    d.contentReset.x = null;
                                }
                            }

                            /* callbacks: onImageLoad, onSelectorChange, onUpdate */
                            if (cb && d) {
                                if (cb === 2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad === "function") {
                                    o.callbacks.onImageLoad.call(this);
                                } else if (cb === 3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange === "function") {
                                    o.callbacks.onSelectorChange.call(this);
                                } else if (o.callbacks.onUpdate && typeof o.callbacks.onUpdate === "function") {
                                    o.callbacks.onUpdate.call(this);
                                }
                            }

                            _autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */

                        }

                    });

                },
                /* ---------------------------------------- */



                /*
			plugin scrollTo method
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/

                scrollTo: function (val, options) {

                    /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
                    if (typeof val == "undefined" || val == null) {
                        return;
                    }

                    var selector = _selector.call(this); /* validate selector */

                    return $(selector).each(function () {

                        var $this = $(this);

                        if ($this.data(pluginPfx)) { /* check if plugin has initialized */

                            var d = $this.data(pluginPfx), o = d.opt,
                                /* method default options */
                                methodDefaults = {
                                    trigger: "external", /* method is by default triggered externally (e.g. from other scripts) */
                                    scrollInertia: o.scrollInertia, /* scrolling inertia (animation duration) */
                                    scrollEasing: "mcsEaseInOut", /* animation easing */
                                    moveDragger: false, /* move dragger instead of content */
                                    timeout: 60, /* scroll-to delay */
                                    callbacks: true, /* enable/disable callbacks */
                                    onStart: true,
                                    onUpdate: true,
                                    onComplete: true
                                },
                                methodOptions = $.extend(true, {}, methodDefaults, options),
                                to = _arr.call(this, val),
                                dur = methodOptions.scrollInertia > 0 && methodOptions.scrollInertia < 17 ? 17 : methodOptions.scrollInertia;

                            /* translate yx values to actual scroll-to positions */
                            to[0] = _to.call(this, to[0], "y");
                            to[1] = _to.call(this, to[1], "x");

                            /*
						check if scroll-to value moves the dragger instead of content.
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.)
						*/
                            if (methodOptions.moveDragger) {
                                to[0] *= d.scrollRatio.y;
                                to[1] *= d.scrollRatio.x;
                            }

                            methodOptions.dur = _isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden

                            setTimeout(function () {
                                /* do the scrolling */
                                if (to[0] !== null && typeof to[0] !== "undefined" && o.axis !== "x" && d.overflowed[0]) { /* scroll y */
                                    methodOptions.dir = "y";
                                    methodOptions.overwrite = "all";
                                    _scrollTo($this, to[0].toString(), methodOptions);
                                }
                                if (to[1] !== null && typeof to[1] !== "undefined" && o.axis !== "y" && d.overflowed[1]) { /* scroll x */
                                    methodOptions.dir = "x";
                                    methodOptions.overwrite = "none";
                                    _scrollTo($this, to[1].toString(), methodOptions);
                                }
                            }, methodOptions.timeout);

                        }

                    });

                },
                /* ---------------------------------------- */



                /*
			plugin stop method
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
                stop: function () {

                    var selector = _selector.call(this); /* validate selector */

                    return $(selector).each(function () {

                        var $this = $(this);

                        if ($this.data(pluginPfx)) { /* check if plugin has initialized */

                            _stop($this);

                        }

                    });

                },
                /* ---------------------------------------- */



                /*
			plugin disable method
			temporarily disables the scrollbar(s)
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset);
			reset (boolean): resets content position to 0
			*/
                disable: function (r) {

                    var selector = _selector.call(this); /* validate selector */

                    return $(selector).each(function () {

                        var $this = $(this);

                        if ($this.data(pluginPfx)) { /* check if plugin has initialized */

                            var d = $this.data(pluginPfx);

                            _autoUpdate.call(this, "remove"); /* remove automatic updating */

                            _unbindEvents.call(this); /* unbind events */

                            if (r) {
                                _resetContentPosition.call(this);
                            } /* reset content position */

                            _scrollbarVisibility.call(this, true); /* show/hide scrollbar(s) */

                            $this.addClass(classes[3]); /* add disable class */

                        }

                    });

                },
                /* ---------------------------------------- */



                /*
			plugin destroy method
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy");
			*/
                destroy: function () {

                    var selector = _selector.call(this); /* validate selector */

                    return $(selector).each(function () {

                        var $this = $(this);

                        if ($this.data(pluginPfx)) { /* check if plugin has initialized */

                            var d = $this.data(pluginPfx), o = d.opt,
                                mCustomScrollBox = $("#mCSB_" + d.idx),
                                mCSB_container = $("#mCSB_" + d.idx + "_container"),
                                scrollbar = $(".mCSB_" + d.idx + "_scrollbar");

                            if (o.live) {
                                removeLiveTimers(o.liveSelector || $(selector).selector);
                            } /* remove live timers */

                            _autoUpdate.call(this, "remove"); /* remove automatic updating */

                            _unbindEvents.call(this); /* unbind events */

                            _resetContentPosition.call(this); /* reset content position */

                            $this.removeData(pluginPfx); /* remove plugin data object */

                            _delete(this, "mcs"); /* delete callbacks object */

                            /* remove plugin markup */
                            scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
                            mCSB_container.find("img." + classes[2]).removeClass(classes[2]); /* remove loaded images flag */
                            mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
                            /* remove plugin classes from the element and add destroy class */
                            $this.removeClass(pluginNS + " _" + pluginPfx + "_" + d.idx + " " + classes[6] + " " + classes[7] + " " + classes[5] + " " + classes[3]).addClass(classes[4]);

                        }

                    });

                }
                /* ---------------------------------------- */

            },


            /*
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/

            /* validates selector (if selector is invalid or undefined uses the default one) */
            _selector = function () {
                return (typeof $(this) !== "object" || $(this).length < 1) ? defaultSelector : this;
            },
            /* -------------------- */


            /* changes options according to theme */
            _theme = function (obj) {
                var fixedSizeScrollbarThemes = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    nonExpandedScrollbarThemes = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    disabledScrollButtonsThemes = ["minimal", "minimal-dark"],
                    enabledAutoHideScrollbarThemes = ["minimal", "minimal-dark"],
                    scrollbarPositionOutsideThemes = ["minimal", "minimal-dark"];
                obj.autoDraggerLength = $.inArray(obj.theme, fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
                obj.autoExpandScrollbar = $.inArray(obj.theme, nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
                obj.scrollButtons.enable = $.inArray(obj.theme, disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
                obj.autoHideScrollbar = $.inArray(obj.theme, enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
                obj.scrollbarPosition = $.inArray(obj.theme, scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
            },
            /* -------------------- */


            /* live option timers removal */
            removeLiveTimers = function (selector) {
                if (liveTimers[selector]) {
                    clearTimeout(liveTimers[selector]);
                    _delete(liveTimers, selector);
                }
            },
            /* -------------------- */


            /* normalizes axis option to valid values: "y", "x", "yx" */
            _findAxis = function (val) {
                return (val === "yx" || val === "xy" || val === "auto") ? "yx" : (val === "x" || val === "horizontal") ? "x" : "y";
            },
            /* -------------------- */


            /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
            _findScrollButtonsType = function (val) {
                return (val === "stepped" || val === "pixels" || val === "step" || val === "click") ? "stepped" : "stepless";
            },
            /* -------------------- */


            /* generates plugin markup */
            _pluginMarkup = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    expandClass = o.autoExpandScrollbar ? " " + classes[1] + "_expand" : "",
                    scrollbar = ["<div id='mCSB_" + d.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_vertical" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + d.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_horizontal" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    wrapperClass = o.axis === "yx" ? "mCSB_vertical_horizontal" : o.axis === "x" ? "mCSB_horizontal" : "mCSB_vertical",
                    scrollbars = o.axis === "yx" ? scrollbar[0] + scrollbar[1] : o.axis === "x" ? scrollbar[1] : scrollbar[0],
                    contentWrapper = o.axis === "yx" ? "<div id='mCSB_" + d.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    autoHideClass = o.autoHideScrollbar ? " " + classes[6] : "",
                    scrollbarDirClass = (o.axis !== "x" && d.langDir === "rtl") ? " " + classes[7] : "";
                if (o.setWidth) {
                    $this.css("width", o.setWidth);
                } /* set element width */
                if (o.setHeight) {
                    $this.css("height", o.setHeight);
                } /* set element height */
                o.setLeft = (o.axis !== "y" && d.langDir === "rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
                $this.addClass(pluginNS + " _" + pluginPfx + "_" + d.idx + autoHideClass + scrollbarDirClass).wrapInner("<div id='mCSB_" + d.idx + "' class='mCustomScrollBox mCS-" + o.theme + " " + wrapperClass + "'><div id='mCSB_" + d.idx + "_container' class='mCSB_container' style='position:relative; top:" + o.setTop + "; left:" + o.setLeft + ";' dir='" + d.langDir + "' /></div>");
                var mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container");
                if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
                    mCSB_container.css("width", _contentWidth(mCSB_container));
                }
                if (o.scrollbarPosition === "outside") {
                    if ($this.css("position") === "static") { /* requires elements with non-static position */
                        $this.css("position", "relative");
                    }
                    $this.css("overflow", "visible");
                    mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
                } else {
                    mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
                    mCSB_container.wrap(contentWrapper);
                }
                _scrollButtons.call(this); /* add scrollbar buttons */
                /* minimum dragger length */
                var mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
                mCSB_dragger[0].css("min-height", mCSB_dragger[0].height());
                mCSB_dragger[1].css("min-width", mCSB_dragger[1].width());
            },
            /* -------------------- */


            /* calculates content width */
            _contentWidth = function (el) {
                var val = [el[0].scrollWidth, Math.max.apply(Math, el.children().map(function () {
                    return $(this).outerWidth(true);
                }).get())], w = el.parent().width();
                return val[0] > w ? val[0] : val[1] > w ? val[1] : "100%";
            },
            /* -------------------- */


            /* expands content horizontally */
            _expandContentHorizontally = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    mCSB_container = $("#mCSB_" + d.idx + "_container");
                if (o.advanced.autoExpandHorizontalScroll && o.axis !== "y") {
                    /* calculate scrollWidth */
                    mCSB_container.css({"width": "auto", "min-width": 0, "overflow-x": "scroll"});
                    var w = Math.ceil(mCSB_container[0].scrollWidth);
                    if (o.advanced.autoExpandHorizontalScroll === 3 || (o.advanced.autoExpandHorizontalScroll !== 2 && w > mCSB_container.parent().width())) {
                        mCSB_container.css({"width": w, "min-width": "100%", "overflow-x": "inherit"});
                    } else {
                        /*
					wrap content with an infinite width div and set its position to absolute and width to auto.
					Setting width to auto before calculating the actual width is important!
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
                        mCSB_container.css({"overflow-x": "inherit", "position": "absolute"})
                            .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
                            .css({ /* set actual width, original position and un-wrap */
                                /*
							get the exact width (with decimals) and then round-up.
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
                                "width": (Math.ceil(mCSB_container[0].getBoundingClientRect().right + 0.4) - Math.floor(mCSB_container[0].getBoundingClientRect().left)),
                                "min-width": "100%",
                                "position": "relative"
                            }).unwrap();
                    }
                }
            },
            /* -------------------- */


            /* adds scrollbar buttons */
            _scrollButtons = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    mCSB_scrollTools = $(".mCSB_" + d.idx + "_scrollbar:first"),
                    tabindex = !_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='" + o.scrollButtons.tabindex + "'",
                    btnHTML = [
                        "<a href='#' class='" + classes[13] + "' " + tabindex + " />",
                        "<a href='#' class='" + classes[14] + "' " + tabindex + " />",
                        "<a href='#' class='" + classes[15] + "' " + tabindex + " />",
                        "<a href='#' class='" + classes[16] + "' " + tabindex + " />"
                    ],
                    btn = [(o.axis === "x" ? btnHTML[2] : btnHTML[0]), (o.axis === "x" ? btnHTML[3] : btnHTML[1]), btnHTML[2], btnHTML[3]];
                if (o.scrollButtons.enable) {
                    mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
                }
            },
            /* -------------------- */


            /* auto-adjusts scrollbar dragger length */
            _setDraggerLength = function () {
                var $this = $(this), d = $this.data(pluginPfx),
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
                    ratio = [mCustomScrollBox.height() / mCSB_container.outerHeight(false), mCustomScrollBox.width() / mCSB_container.outerWidth(false)],
                    l = [
                        parseInt(mCSB_dragger[0].css("min-height")), Math.round(ratio[0] * mCSB_dragger[0].parent().height()),
                        parseInt(mCSB_dragger[1].css("min-width")), Math.round(ratio[1] * mCSB_dragger[1].parent().width())
                    ],
                    h = oldIE && (l[1] < l[0]) ? l[0] : l[1], w = oldIE && (l[3] < l[2]) ? l[2] : l[3];
                mCSB_dragger[0].css({
                    "height": h, "max-height": (mCSB_dragger[0].parent().height() - 10)
                }).find(".mCSB_dragger_bar").css({"line-height": l[0] + "px"});
                mCSB_dragger[1].css({
                    "width": w, "max-width": (mCSB_dragger[1].parent().width() - 10)
                });
            },
            /* -------------------- */


            /* calculates scrollbar to content ratio */
            _scrollRatio = function () {
                var $this = $(this), d = $this.data(pluginPfx),
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
                    scrollAmount = [mCSB_container.outerHeight(false) - mCustomScrollBox.height(), mCSB_container.outerWidth(false) - mCustomScrollBox.width()],
                    ratio = [
                        scrollAmount[0] / (mCSB_dragger[0].parent().height() - mCSB_dragger[0].height()),
                        scrollAmount[1] / (mCSB_dragger[1].parent().width() - mCSB_dragger[1].width())
                    ];
                d.scrollRatio = {y: ratio[0], x: ratio[1]};
            },
            /* -------------------- */


            /* toggles scrolling classes */
            _onDragClasses = function (el, action, xpnd) {
                var expandClass = xpnd ? classes[0] + "_expanded" : "",
                    scrollbar = el.closest(".mCSB_scrollTools");
                if (action === "active") {
                    el.toggleClass(classes[0] + " " + expandClass);
                    scrollbar.toggleClass(classes[1]);
                    el[0]._draggable = el[0]._draggable ? 0 : 1;
                } else {
                    if (!el[0]._draggable) {
                        if (action === "hide") {
                            el.removeClass(classes[0]);
                            scrollbar.removeClass(classes[1]);
                        } else {
                            el.addClass(classes[0]);
                            scrollbar.addClass(classes[1]);
                        }
                    }
                }
            },
            /* -------------------- */


            /* checks if content overflows its container to determine if scrolling is required */
            _overflowed = function () {
                var $this = $(this), d = $this.data(pluginPfx),
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    contentHeight = d.overflowed == null ? mCSB_container.height() : mCSB_container.outerHeight(false),
                    contentWidth = d.overflowed == null ? mCSB_container.width() : mCSB_container.outerWidth(false),
                    h = mCSB_container[0].scrollHeight, w = mCSB_container[0].scrollWidth;
                if (h > contentHeight) {
                    contentHeight = h;
                }
                if (w > contentWidth) {
                    contentWidth = w;
                }
                return [contentHeight > mCustomScrollBox.height(), contentWidth > mCustomScrollBox.width()];
            },
            /* -------------------- */


            /* resets content position to 0 */
            _resetContentPosition = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
                _stop($this); /* stop any current scrolling before resetting */
                if ((o.axis !== "x" && !d.overflowed[0]) || (o.axis === "y" && d.overflowed[0])) { /* reset y */
                    mCSB_dragger[0].add(mCSB_container).css("top", 0);
                    _scrollTo($this, "_resetY");
                }
                if ((o.axis !== "y" && !d.overflowed[1]) || (o.axis === "x" && d.overflowed[1])) { /* reset x */
                    var cx = dx = 0;
                    if (d.langDir === "rtl") { /* adjust left position for rtl direction */
                        cx = mCustomScrollBox.width() - mCSB_container.outerWidth(false);
                        dx = Math.abs(cx / d.scrollRatio.x);
                    }
                    mCSB_container.css("left", cx);
                    mCSB_dragger[1].css("left", dx);
                    _scrollTo($this, "_resetX");
                }
            },
            /* -------------------- */


            /* binds scrollbar events */
            _bindEvents = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt;
                if (!d.bindEvents) { /* check if events are already bound */
                    _draggable.call(this);
                    if (o.contentTouchScroll) {
                        _contentDraggable.call(this);
                    }
                    _selectable.call(this);
                    if (o.mouseWheel.enable) { /* bind mousewheel fn when plugin is available */
                        function _mwt() {
                            mousewheelTimeout = setTimeout(function () {
                                if (!$.event.special.mousewheel) {
                                    _mwt();
                                } else {
                                    clearTimeout(mousewheelTimeout);
                                    _mousewheel.call($this[0]);
                                }
                            }, 100);
                        }

                        var mousewheelTimeout;
                        _mwt();
                    }
                    _draggerRail.call(this);
                    _wrapperScroll.call(this);
                    if (o.advanced.autoScrollOnFocus) {
                        _focus.call(this);
                    }
                    if (o.scrollButtons.enable) {
                        _buttons.call(this);
                    }
                    if (o.keyboard.enable) {
                        _keyboard.call(this);
                    }
                    d.bindEvents = true;
                }
            },
            /* -------------------- */


            /* unbinds scrollbar events */
            _unbindEvents = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    namespace = pluginPfx + "_" + d.idx,
                    sb = ".mCSB_" + d.idx + "_scrollbar",
                    sel = $("#mCSB_" + d.idx + ",#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper," + sb + " ." + classes[12] + ",#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal," + sb + ">a"),
                    mCSB_container = $("#mCSB_" + d.idx + "_container");
                if (o.advanced.releaseDraggableSelectors) {
                    sel.add($(o.advanced.releaseDraggableSelectors));
                }
                if (o.advanced.extraDraggableSelectors) {
                    sel.add($(o.advanced.extraDraggableSelectors));
                }
                if (d.bindEvents) { /* check if events are bound */
                    /* unbind namespaced events from document/selectors */
                    $(document).add($(!_canAccessIFrame() || top.document)).unbind("." + namespace);
                    sel.each(function () {
                        $(this).unbind("." + namespace);
                    });
                    /* clear and delete timeouts/objects */
                    clearTimeout($this[0]._focusTimeout);
                    _delete($this[0], "_focusTimeout");
                    clearTimeout(d.sequential.step);
                    _delete(d.sequential, "step");
                    clearTimeout(mCSB_container[0].onCompleteTimeout);
                    _delete(mCSB_container[0], "onCompleteTimeout");
                    d.bindEvents = false;
                }
            },
            /* -------------------- */


            /* toggles scrollbar visibility */
            _scrollbarVisibility = function (disabled) {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    contentWrapper = $("#mCSB_" + d.idx + "_container_wrapper"),
                    content = contentWrapper.length ? contentWrapper : $("#mCSB_" + d.idx + "_container"),
                    scrollbar = [$("#mCSB_" + d.idx + "_scrollbar_vertical"), $("#mCSB_" + d.idx + "_scrollbar_horizontal")],
                    mCSB_dragger = [scrollbar[0].find(".mCSB_dragger"), scrollbar[1].find(".mCSB_dragger")];
                if (o.axis !== "x") {
                    if (d.overflowed[0] && !disabled) {
                        scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display", "block");
                        content.removeClass(classes[8] + " " + classes[10]);
                    } else {
                        if (o.alwaysShowScrollbar) {
                            if (o.alwaysShowScrollbar !== 2) {
                                mCSB_dragger[0].css("display", "none");
                            }
                            content.removeClass(classes[10]);
                        } else {
                            scrollbar[0].css("display", "none");
                            content.addClass(classes[10]);
                        }
                        content.addClass(classes[8]);
                    }
                }
                if (o.axis !== "y") {
                    if (d.overflowed[1] && !disabled) {
                        scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display", "block");
                        content.removeClass(classes[9] + " " + classes[11]);
                    } else {
                        if (o.alwaysShowScrollbar) {
                            if (o.alwaysShowScrollbar !== 2) {
                                mCSB_dragger[1].css("display", "none");
                            }
                            content.removeClass(classes[11]);
                        } else {
                            scrollbar[1].css("display", "none");
                            content.addClass(classes[11]);
                        }
                        content.addClass(classes[9]);
                    }
                }
                if (!d.overflowed[0] && !d.overflowed[1]) {
                    $this.addClass(classes[5]);
                } else {
                    $this.removeClass(classes[5]);
                }
            },
            /* -------------------- */


            /* returns input coordinates of pointer, touch and mouse events (relative to document) */
            _coordinates = function (e) {
                var t = e.type,
                    o = e.target.ownerDocument !== document && frameElement !== null ? [$(frameElement).offset().top, $(frameElement).offset().left] : null,
                    io = _canAccessIFrame() && e.target.ownerDocument !== top.document && frameElement !== null ? [$(e.view.frameElement).offset().top, $(e.view.frameElement).offset().left] : [0, 0];
                switch (t) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return o ? [e.originalEvent.pageY - o[0] + io[0], e.originalEvent.pageX - o[1] + io[1], false] : [e.originalEvent.pageY, e.originalEvent.pageX, false];
                        break;
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                            touches = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                        return e.target.ownerDocument !== document ? [touch.screenY, touch.screenX, touches > 1] : [touch.pageY, touch.pageX, touches > 1];
                        break;
                    default:
                        return o ? [e.pageY - o[0] + io[0], e.pageX - o[1] + io[1], false] : [e.pageY, e.pageX, false];
                }
            },
            /* -------------------- */


            /*
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging
		*/
            _draggable = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    namespace = pluginPfx + "_" + d.idx,
                    draggerId = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" + d.idx + "_dragger_horizontal"],
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    mCSB_dragger = $("#" + draggerId[0] + ",#" + draggerId[1]),
                    draggable, dragY, dragX,
                    rds = o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
                    eds = o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
                mCSB_dragger.bind("contextmenu." + namespace, function (e) {
                    e.preventDefault(); //prevent right click
                }).bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    if (!_mouseBtnLeft(e)) {
                        return;
                    } /* left mouse button only */
                    touchActive = true;
                    if (oldIE) {
                        document.onselectstart = function () {
                            return false;
                        }
                    } /* disable text selection for IE < 9 */
                    _iframe.call(mCSB_container, false); /* enable scrollbar dragging over iframes by disabling their events */
                    _stop($this);
                    draggable = $(this);
                    var offset = draggable.offset(), y = _coordinates(e)[0] - offset.top,
                        x = _coordinates(e)[1] - offset.left,
                        h = draggable.height() + offset.top, w = draggable.width() + offset.left;
                    if (y < h && y > 0 && x < w && x > 0) {
                        dragY = y;
                        dragX = x;
                    }
                    _onDragClasses(draggable, "active", o.autoExpandScrollbar);
                }).bind("touchmove." + namespace, function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    var offset = draggable.offset(), y = _coordinates(e)[0] - offset.top,
                        x = _coordinates(e)[1] - offset.left;
                    _drag(dragY, dragX, y, x);
                });
                $(document).add(eds).bind("mousemove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, function (e) {
                    if (draggable) {
                        var offset = draggable.offset(), y = _coordinates(e)[0] - offset.top,
                            x = _coordinates(e)[1] - offset.left;
                        if (dragY === y && dragX === x) {
                            return;
                        } /* has it really moved? */
                        _drag(dragY, dragX, y, x);
                    }
                }).add(rds).bind("mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function (e) {
                    if (draggable) {
                        _onDragClasses(draggable, "active", o.autoExpandScrollbar);
                        draggable = null;
                    }
                    touchActive = false;
                    if (oldIE) {
                        document.onselectstart = null;
                    } /* enable text selection for IE < 9 */
                    _iframe.call(mCSB_container, true); /* enable iframes events */
                });

                function _drag(dragY, dragX, y, x) {
                    mCSB_container[0].idleTimer = o.scrollInertia < 233 ? 250 : 0;
                    if (draggable.attr("id") === draggerId[1]) {
                        var dir = "x", to = ((draggable[0].offsetLeft - dragX) + x) * d.scrollRatio.x;
                    } else {
                        var dir = "y", to = ((draggable[0].offsetTop - dragY) + y) * d.scrollRatio.y;
                    }
                    _scrollTo($this, to.toString(), {dir: dir, drag: true});
                }
            },
            /* -------------------- */


            /*
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices
		*/
            _contentDraggable = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    namespace = pluginPfx + "_" + d.idx,
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
                    draggable, dragY, dragX, touchStartY, touchStartX, touchMoveY = [], touchMoveX = [], startTime,
                    runningTime, endTime, distance, speed, amount,
                    durA = 0, durB, overwrite = o.axis === "yx" ? "none" : "all", touchIntent = [], touchDrag, docDrag,
                    iframe = mCSB_container.find("iframe"),
                    events = [
                        "touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, //start
                        "touchmove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, //move
                        "touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace //end
                    ],
                    touchAction = document.body.style.touchAction !== undefined && document.body.style.touchAction !== "";
                mCSB_container.bind(events[0], function (e) {
                    _onTouchstart(e);
                }).bind(events[1], function (e) {
                    _onTouchmove(e);
                });
                mCustomScrollBox.bind(events[0], function (e) {
                    _onTouchstart2(e);
                }).bind(events[2], function (e) {
                    _onTouchend(e);
                });
                if (iframe.length) {
                    iframe.each(function () {
                        $(this).bind("load", function () {
                            /* bind events on accessible iframes */
                            if (_canAccessIFrame(this)) {
                                $(this.contentDocument || this.contentWindow.document).bind(events[0], function (e) {
                                    _onTouchstart(e);
                                    _onTouchstart2(e);
                                }).bind(events[1], function (e) {
                                    _onTouchmove(e);
                                }).bind(events[2], function (e) {
                                    _onTouchend(e);
                                });
                            }
                        });
                    });
                }

                function _onTouchstart(e) {
                    if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
                        touchable = 0;
                        return;
                    }
                    touchable = 1;
                    touchDrag = 0;
                    docDrag = 0;
                    draggable = 1;
                    $this.removeClass("mCS_touch_action");
                    var offset = mCSB_container.offset();
                    dragY = _coordinates(e)[0] - offset.top;
                    dragX = _coordinates(e)[1] - offset.left;
                    touchIntent = [_coordinates(e)[0], _coordinates(e)[1]];
                }

                function _onTouchmove(e) {
                    if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
                        return;
                    }
                    if (!o.documentTouchScroll) {
                        e.preventDefault();
                    }
                    e.stopImmediatePropagation();
                    if (docDrag && !touchDrag) {
                        return;
                    }
                    if (draggable) {
                        runningTime = _getTime();
                        var offset = mCustomScrollBox.offset(), y = _coordinates(e)[0] - offset.top,
                            x = _coordinates(e)[1] - offset.left,
                            easing = "mcsLinearOut";
                        touchMoveY.push(y);
                        touchMoveX.push(x);
                        touchIntent[2] = Math.abs(_coordinates(e)[0] - touchIntent[0]);
                        touchIntent[3] = Math.abs(_coordinates(e)[1] - touchIntent[1]);
                        if (d.overflowed[0]) {
                            var limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
                                prevent = ((dragY - y) > 0 && (y - dragY) > -(limit * d.scrollRatio.y) && (touchIntent[3] * 2 < touchIntent[2] || o.axis === "yx"));
                        }
                        if (d.overflowed[1]) {
                            var limitX = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
                                preventX = ((dragX - x) > 0 && (x - dragX) > -(limitX * d.scrollRatio.x) && (touchIntent[2] * 2 < touchIntent[3] || o.axis === "yx"));
                        }
                        if (prevent || preventX) { /* prevent native document scrolling */
                            if (!touchAction) {
                                e.preventDefault();
                            }
                            touchDrag = 1;
                        } else {
                            docDrag = 1;
                            $this.addClass("mCS_touch_action");
                        }
                        if (touchAction) {
                            e.preventDefault();
                        }
                        amount = o.axis === "yx" ? [(dragY - y), (dragX - x)] : o.axis === "x" ? [null, (dragX - x)] : [(dragY - y), null];
                        mCSB_container[0].idleTimer = 250;
                        if (d.overflowed[0]) {
                            _drag(amount[0], durA, easing, "y", "all", true);
                        }
                        if (d.overflowed[1]) {
                            _drag(amount[1], durA, easing, "x", overwrite, true);
                        }
                    }
                }

                function _onTouchstart2(e) {
                    if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
                        touchable = 0;
                        return;
                    }
                    touchable = 1;
                    e.stopImmediatePropagation();
                    _stop($this);
                    startTime = _getTime();
                    var offset = mCustomScrollBox.offset();
                    touchStartY = _coordinates(e)[0] - offset.top;
                    touchStartX = _coordinates(e)[1] - offset.left;
                    touchMoveY = [];
                    touchMoveX = [];
                }

                function _onTouchend(e) {
                    if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
                        return;
                    }
                    draggable = 0;
                    e.stopImmediatePropagation();
                    touchDrag = 0;
                    docDrag = 0;
                    endTime = _getTime();
                    var offset = mCustomScrollBox.offset(), y = _coordinates(e)[0] - offset.top,
                        x = _coordinates(e)[1] - offset.left;
                    if ((endTime - runningTime) > 30) {
                        return;
                    }
                    speed = 1000 / (endTime - startTime);
                    var easing = "mcsEaseOut", slow = speed < 2.5,
                        diff = slow ? [touchMoveY[touchMoveY.length - 2], touchMoveX[touchMoveX.length - 2]] : [0, 0];
                    distance = slow ? [(y - diff[0]), (x - diff[1])] : [y - touchStartY, x - touchStartX];
                    var absDistance = [Math.abs(distance[0]), Math.abs(distance[1])];
                    speed = slow ? [Math.abs(distance[0] / 4), Math.abs(distance[1] / 4)] : [speed, speed];
                    var a = [
                        Math.abs(mCSB_container[0].offsetTop) - (distance[0] * _m((absDistance[0] / speed[0]), speed[0])),
                        Math.abs(mCSB_container[0].offsetLeft) - (distance[1] * _m((absDistance[1] / speed[1]), speed[1]))
                    ];
                    amount = o.axis === "yx" ? [a[0], a[1]] : o.axis === "x" ? [null, a[1]] : [a[0], null];
                    durB = [(absDistance[0] * 4) + o.scrollInertia, (absDistance[1] * 4) + o.scrollInertia];
                    var md = parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
                    amount[0] = absDistance[0] > md ? amount[0] : 0;
                    amount[1] = absDistance[1] > md ? amount[1] : 0;
                    if (d.overflowed[0]) {
                        _drag(amount[0], durB[0], easing, "y", overwrite, false);
                    }
                    if (d.overflowed[1]) {
                        _drag(amount[1], durB[1], easing, "x", overwrite, false);
                    }
                }

                function _m(ds, s) {
                    var r = [s * 1.5, s * 2, s / 1.5, s / 2];
                    if (ds > 90) {
                        return s > 4 ? r[0] : r[3];
                    } else if (ds > 60) {
                        return s > 3 ? r[3] : r[2];
                    } else if (ds > 30) {
                        return s > 8 ? r[1] : s > 6 ? r[0] : s > 4 ? s : r[2];
                    } else {
                        return s > 8 ? s : r[3];
                    }
                }

                function _drag(amount, dur, easing, dir, overwrite, drag) {
                    if (!amount) {
                        return;
                    }
                    _scrollTo($this, amount.toString(), {
                        dur: dur,
                        scrollEasing: easing,
                        dir: dir,
                        overwrite: overwrite,
                        drag: drag
                    });
                }
            },
            /* -------------------- */


            /*
		SELECT TEXT EVENTS
		scrolls content when text is selected
		*/
            _selectable = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt, seq = d.sequential,
                    namespace = pluginPfx + "_" + d.idx,
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent(),
                    action;
                mCSB_container.bind("mousedown." + namespace, function (e) {
                    if (touchable) {
                        return;
                    }
                    if (!action) {
                        action = 1;
                        touchActive = true;
                    }
                }).add(document).bind("mousemove." + namespace, function (e) {
                    if (!touchable && action && _sel()) {
                        var offset = mCSB_container.offset(),
                            y = _coordinates(e)[0] - offset.top + mCSB_container[0].offsetTop,
                            x = _coordinates(e)[1] - offset.left + mCSB_container[0].offsetLeft;
                        if (y > 0 && y < wrapper.height() && x > 0 && x < wrapper.width()) {
                            if (seq.step) {
                                _seq("off", null, "stepped");
                            }
                        } else {
                            if (o.axis !== "x" && d.overflowed[0]) {
                                if (y < 0) {
                                    _seq("on", 38);
                                } else if (y > wrapper.height()) {
                                    _seq("on", 40);
                                }
                            }
                            if (o.axis !== "y" && d.overflowed[1]) {
                                if (x < 0) {
                                    _seq("on", 37);
                                } else if (x > wrapper.width()) {
                                    _seq("on", 39);
                                }
                            }
                        }
                    }
                }).bind("mouseup." + namespace + " dragend." + namespace, function (e) {
                    if (touchable) {
                        return;
                    }
                    if (action) {
                        action = 0;
                        _seq("off", null);
                    }
                    touchActive = false;
                });

                function _sel() {
                    return window.getSelection ? window.getSelection().toString() :
                        document.selection && document.selection.type != "Control" ? document.selection.createRange().text : 0;
                }

                function _seq(a, c, s) {
                    seq.type = s && action ? "stepped" : "stepless";
                    seq.scrollAmount = 10;
                    _sequentialScroll($this, a, c, "mcsLinearOut", s ? 60 : null);
                }
            },
            /* -------------------- */


            /*
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
            _mousewheel = function () {
                if (!$(this).data(pluginPfx)) {
                    return;
                } /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    namespace = pluginPfx + "_" + d.idx,
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
                    iframe = $("#mCSB_" + d.idx + "_container").find("iframe");
                if (iframe.length) {
                    iframe.each(function () {
                        $(this).bind("load", function () {
                            /* bind events on accessible iframes */
                            if (_canAccessIFrame(this)) {
                                $(this.contentDocument || this.contentWindow.document).bind("mousewheel." + namespace, function (e, delta) {
                                    _onMousewheel(e, delta);
                                });
                            }
                        });
                    });
                }
                mCustomScrollBox.bind("mousewheel." + namespace, function (e, delta) {
                    _onMousewheel(e, delta);
                });

                function _onMousewheel(e, delta) {
                    _stop($this);
                    if (_disableMousewheel($this, e.target)) {
                        return;
                    } /* disables mouse-wheel when hovering specific elements */
                    var deltaFactor = o.mouseWheel.deltaFactor !== "auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor < 100) ? 100 : e.deltaFactor || 100,
                        dur = o.scrollInertia;
                    if (o.axis === "x" || o.mouseWheel.axis === "x") {
                        var dir = "x",
                            px = [Math.round(deltaFactor * d.scrollRatio.x), parseInt(o.mouseWheel.scrollAmount)],
                            amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] : px[0] >= mCustomScrollBox.width() ? mCustomScrollBox.width() * 0.9 : px[0],
                            contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetLeft),
                            draggerPos = mCSB_dragger[1][0].offsetLeft,
                            limit = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
                            dlt = o.mouseWheel.axis === "y" ? (e.deltaY || delta) : e.deltaX;
                    } else {
                        var dir = "y",
                            px = [Math.round(deltaFactor * d.scrollRatio.y), parseInt(o.mouseWheel.scrollAmount)],
                            amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] : px[0] >= mCustomScrollBox.height() ? mCustomScrollBox.height() * 0.9 : px[0],
                            contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetTop),
                            draggerPos = mCSB_dragger[0][0].offsetTop,
                            limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
                            dlt = e.deltaY || delta;
                    }
                    if ((dir === "y" && !d.overflowed[0]) || (dir === "x" && !d.overflowed[1])) {
                        return;
                    }
                    if (o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) {
                        dlt = -dlt;
                    }
                    if (o.mouseWheel.normalizeDelta) {
                        dlt = dlt < 0 ? -1 : 1;
                    }
                    if ((dlt > 0 && draggerPos !== 0) || (dlt < 0 && draggerPos !== limit) || o.mouseWheel.preventDefault) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                    if (e.deltaFactor < 5 && !o.mouseWheel.normalizeDelta) {
                        //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
                        amount = e.deltaFactor;
                        dur = 17;
                    }
                    _scrollTo($this, (contentPos - (dlt * amount)).toString(), {dir: dir, dur: dur});
                }
            },
            /* -------------------- */


            /* checks if iframe can be accessed */
            _canAccessIFrameCache = new Object(),
            _canAccessIFrame = function (iframe) {
                var result = false, cacheKey = false, html = null;
                if (iframe === undefined) {
                    cacheKey = "#empty";
                } else if ($(iframe).attr("id") !== undefined) {
                    cacheKey = $(iframe).attr("id");
                }
                if (cacheKey !== false && _canAccessIFrameCache[cacheKey] !== undefined) {
                    return _canAccessIFrameCache[cacheKey];
                }
                if (!iframe) {
                    try {
                        var doc = top.document;
                        html = doc.body.innerHTML;
                    } catch (err) {/* do nothing */
                    }
                    result = (html !== null);
                } else {
                    try {
                        var doc = iframe.contentDocument || iframe.contentWindow.document;
                        html = doc.body.innerHTML;
                    } catch (err) {/* do nothing */
                    }
                    result = (html !== null);
                }
                if (cacheKey !== false) {
                    _canAccessIFrameCache[cacheKey] = result;
                }
                return result;
            },
            /* -------------------- */


            /* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
            _iframe = function (evt) {
                var el = this.find("iframe");
                if (!el.length) {
                    return;
                } /* check if content contains iframes */
                var val = !evt ? "none" : "auto";
                el.css("pointer-events", val); /* for IE11, iframe's display property should not be "block" */
            },
            /* -------------------- */


            /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
            _disableMousewheel = function (el, target) {
                var tag = target.nodeName.toLowerCase(),
                    tags = el.data(pluginPfx).opt.mouseWheel.disableOver,
                    /* elements that require focus */
                    focusTags = ["select", "textarea"];
                return $.inArray(tag, tags) > -1 && !($.inArray(tag, focusTags) > -1 && !$(target).is(":focus"));
            },
            /* -------------------- */


            /*
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail
		*/
            _draggerRail = function () {
                var $this = $(this), d = $this.data(pluginPfx),
                    namespace = pluginPfx + "_" + d.idx,
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent(),
                    mCSB_draggerContainer = $(".mCSB_" + d.idx + "_scrollbar ." + classes[12]),
                    clickable;
                mCSB_draggerContainer.bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function (e) {
                    touchActive = true;
                    if (!$(e.target).hasClass("mCSB_dragger")) {
                        clickable = 1;
                    }
                }).bind("touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function (e) {
                    touchActive = false;
                }).bind("click." + namespace, function (e) {
                    if (!clickable) {
                        return;
                    }
                    clickable = 0;
                    if ($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")) {
                        _stop($this);
                        var el = $(this), mCSB_dragger = el.find(".mCSB_dragger");
                        if (el.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!d.overflowed[1]) {
                                return;
                            }
                            var dir = "x",
                                clickDir = e.pageX > mCSB_dragger.offset().left ? -1 : 1,
                                to = Math.abs(mCSB_container[0].offsetLeft) - (clickDir * (wrapper.width() * 0.9));
                        } else {
                            if (!d.overflowed[0]) {
                                return;
                            }
                            var dir = "y",
                                clickDir = e.pageY > mCSB_dragger.offset().top ? -1 : 1,
                                to = Math.abs(mCSB_container[0].offsetTop) - (clickDir * (wrapper.height() * 0.9));
                        }
                        _scrollTo($this, to.toString(), {dir: dir, scrollEasing: "mcsEaseInOut"});
                    }
                });
            },
            /* -------------------- */


            /*
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
            _focus = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    namespace = pluginPfx + "_" + d.idx,
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent();
                mCSB_container.bind("focusin." + namespace, function (e) {
                    var el = $(document.activeElement),
                        nested = mCSB_container.find(".mCustomScrollBox").length,
                        dur = 0;
                    if (!el.is(o.advanced.autoScrollOnFocus)) {
                        return;
                    }
                    _stop($this);
                    clearTimeout($this[0]._focusTimeout);
                    $this[0]._focusTimer = nested ? (dur + 17) * nested : 0;
                    $this[0]._focusTimeout = setTimeout(function () {
                        var to = [_childPos(el)[0], _childPos(el)[1]],
                            contentPos = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
                            isVisible = [
                                (contentPos[0] + to[0] >= 0 && contentPos[0] + to[0] < wrapper.height() - el.outerHeight(false)),
                                (contentPos[1] + to[1] >= 0 && contentPos[0] + to[1] < wrapper.width() - el.outerWidth(false))
                            ],
                            overwrite = (o.axis === "yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
                        if (o.axis !== "x" && !isVisible[0]) {
                            _scrollTo($this, to[0].toString(), {
                                dir: "y",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: overwrite,
                                dur: dur
                            });
                        }
                        if (o.axis !== "y" && !isVisible[1]) {
                            _scrollTo($this, to[1].toString(), {
                                dir: "x",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: overwrite,
                                dur: dur
                            });
                        }
                    }, $this[0]._focusTimer);
                });
            },
            /* -------------------- */


            /* sets content wrapper scrollTop/scrollLeft always to 0 */
            _wrapperScroll = function () {
                var $this = $(this), d = $this.data(pluginPfx),
                    namespace = pluginPfx + "_" + d.idx,
                    wrapper = $("#mCSB_" + d.idx + "_container").parent();
                wrapper.bind("scroll." + namespace, function (e) {
                    if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) {
                        $(".mCSB_" + d.idx + "_scrollbar").css("visibility", "hidden"); /* hide scrollbar(s) */
                    }
                });
            },
            /* -------------------- */


            /*
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons
		*/
            _buttons = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt, seq = d.sequential,
                    namespace = pluginPfx + "_" + d.idx,
                    sel = ".mCSB_" + d.idx + "_scrollbar",
                    btn = $(sel + ">a");
                btn.bind("contextmenu." + namespace, function (e) {
                    e.preventDefault(); //prevent right click
                }).bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace + " mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace + " mouseout." + namespace + " pointerout." + namespace + " MSPointerOut." + namespace + " click." + namespace, function (e) {
                    e.preventDefault();
                    if (!_mouseBtnLeft(e)) {
                        return;
                    } /* left mouse button only */
                    var btnClass = $(this).attr("class");
                    seq.type = o.scrollButtons.scrollType;
                    switch (e.type) {
                        case "mousedown":
                        case "touchstart":
                        case "pointerdown":
                        case "MSPointerDown":
                            if (seq.type === "stepped") {
                                return;
                            }
                            touchActive = true;
                            d.tweenRunning = false;
                            _seq("on", btnClass);
                            break;
                        case "mouseup":
                        case "touchend":
                        case "pointerup":
                        case "MSPointerUp":
                        case "mouseout":
                        case "pointerout":
                        case "MSPointerOut":
                            if (seq.type === "stepped") {
                                return;
                            }
                            touchActive = false;
                            if (seq.dir) {
                                _seq("off", btnClass);
                            }
                            break;
                        case "click":
                            if (seq.type !== "stepped" || d.tweenRunning) {
                                return;
                            }
                            _seq("on", btnClass);
                            break;
                    }

                    function _seq(a, c) {
                        seq.scrollAmount = o.scrollButtons.scrollAmount;
                        _sequentialScroll($this, a, c);
                    }
                });
            },
            /* -------------------- */


            /*
		KEYBOARD EVENTS
		scrolls content via keyboard
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
            _keyboard = function () {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt, seq = d.sequential,
                    namespace = pluginPfx + "_" + d.idx,
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent(),
                    editables = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    iframe = mCSB_container.find("iframe"),
                    events = ["blur." + namespace + " keydown." + namespace + " keyup." + namespace];
                if (iframe.length) {
                    iframe.each(function () {
                        $(this).bind("load", function () {
                            /* bind events on accessible iframes */
                            if (_canAccessIFrame(this)) {
                                $(this.contentDocument || this.contentWindow.document).bind(events[0], function (e) {
                                    _onKeyboard(e);
                                });
                            }
                        });
                    });
                }
                mCustomScrollBox.attr("tabindex", "0").bind(events[0], function (e) {
                    _onKeyboard(e);
                });

                function _onKeyboard(e) {
                    switch (e.type) {
                        case "blur":
                            if (d.tweenRunning && seq.dir) {
                                _seq("off", null);
                            }
                            break;
                        case "keydown":
                        case "keyup":
                            var code = e.keyCode ? e.keyCode : e.which, action = "on";
                            if ((o.axis !== "x" && (code === 38 || code === 40)) || (o.axis !== "y" && (code === 37 || code === 39))) {
                                /* up (38), down (40), left (37), right (39) arrows */
                                if (((code === 38 || code === 40) && !d.overflowed[0]) || ((code === 37 || code === 39) && !d.overflowed[1])) {
                                    return;
                                }
                                if (e.type === "keyup") {
                                    action = "off";
                                }
                                if (!$(document.activeElement).is(editables)) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    _seq(action, code);
                                }
                            } else if (code === 33 || code === 34) {
                                /* PgUp (33), PgDn (34) */
                                if (d.overflowed[0] || d.overflowed[1]) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                }
                                if (e.type === "keyup") {
                                    _stop($this);
                                    var keyboardDir = code === 34 ? -1 : 1;
                                    if (o.axis === "x" || (o.axis === "yx" && d.overflowed[1] && !d.overflowed[0])) {
                                        var dir = "x",
                                            to = Math.abs(mCSB_container[0].offsetLeft) - (keyboardDir * (wrapper.width() * 0.9));
                                    } else {
                                        var dir = "y",
                                            to = Math.abs(mCSB_container[0].offsetTop) - (keyboardDir * (wrapper.height() * 0.9));
                                    }
                                    _scrollTo($this, to.toString(), {dir: dir, scrollEasing: "mcsEaseInOut"});
                                }
                            } else if (code === 35 || code === 36) {
                                /* End (35), Home (36) */
                                if (!$(document.activeElement).is(editables)) {
                                    if (d.overflowed[0] || d.overflowed[1]) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                    }
                                    if (e.type === "keyup") {
                                        if (o.axis === "x" || (o.axis === "yx" && d.overflowed[1] && !d.overflowed[0])) {
                                            var dir = "x",
                                                to = code === 35 ? Math.abs(wrapper.width() - mCSB_container.outerWidth(false)) : 0;
                                        } else {
                                            var dir = "y",
                                                to = code === 35 ? Math.abs(wrapper.height() - mCSB_container.outerHeight(false)) : 0;
                                        }
                                        _scrollTo($this, to.toString(), {dir: dir, scrollEasing: "mcsEaseInOut"});
                                    }
                                }
                            }
                            break;
                    }

                    function _seq(a, c) {
                        seq.type = o.keyboard.scrollType;
                        seq.scrollAmount = o.keyboard.scrollAmount;
                        if (seq.type === "stepped" && d.tweenRunning) {
                            return;
                        }
                        _sequentialScroll($this, a, c);
                    }
                }
            },
            /* -------------------- */


            /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
            _sequentialScroll = function (el, action, trigger, e, s) {
                var d = el.data(pluginPfx), o = d.opt, seq = d.sequential,
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    once = seq.type === "stepped" ? true : false,
                    steplessSpeed = o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
                    steppedSpeed = o.scrollInertia < 1 ? 17 : o.scrollInertia;
                switch (action) {
                    case "on":
                        seq.dir = [
                            (trigger === classes[16] || trigger === classes[15] || trigger === 39 || trigger === 37 ? "x" : "y"),
                            (trigger === classes[13] || trigger === classes[15] || trigger === 38 || trigger === 37 ? -1 : 1)
                        ];
                        _stop(el);
                        if (_isNumeric(trigger) && seq.type === "stepped") {
                            return;
                        }
                        _on(once);
                        break;
                    case "off":
                        _off();
                        if (once || (d.tweenRunning && seq.dir)) {
                            _on(true);
                        }
                        break;
                }

                /* starts sequence */
                function _on(once) {
                    if (o.snapAmount) {
                        seq.scrollAmount = !(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0] === "x" ? o.snapAmount[1] : o.snapAmount[0];
                    } /* scrolling snapping */
                    var c = seq.type !== "stepped", /* continuous scrolling */
                        t = s ? s : !once ? 1000 / 60 : c ? steplessSpeed / 1.5 : steppedSpeed, /* timer */
                        m = !once ? 2.5 : c ? 7.5 : 40, /* multiplier */
                        contentPos = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)],
                        ratio = [d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y, d.scrollRatio.x > 10 ? 10 : d.scrollRatio.x],
                        amount = seq.dir[0] === "x" ? contentPos[1] + (seq.dir[1] * (ratio[1] * m)) : contentPos[0] + (seq.dir[1] * (ratio[0] * m)),
                        px = seq.dir[0] === "x" ? contentPos[1] + (seq.dir[1] * parseInt(seq.scrollAmount)) : contentPos[0] + (seq.dir[1] * parseInt(seq.scrollAmount)),
                        to = seq.scrollAmount !== "auto" ? px : amount,
                        easing = e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
                        onComplete = !once ? false : true;
                    if (once && t < 17) {
                        to = seq.dir[0] === "x" ? contentPos[1] : contentPos[0];
                    }
                    _scrollTo(el, to.toString(), {
                        dir: seq.dir[0],
                        scrollEasing: easing,
                        dur: t,
                        onComplete: onComplete
                    });
                    if (once) {
                        seq.dir = false;
                        return;
                    }
                    clearTimeout(seq.step);
                    seq.step = setTimeout(function () {
                        _on();
                    }, t);
                }

                /* stops sequence */
                function _off() {
                    clearTimeout(seq.step);
                    _delete(seq, "step");
                    _stop(el);
                }
            },
            /* -------------------- */


            /* returns a yx array from value */
            _arr = function (val) {
                var o = $(this).data(pluginPfx).opt, vals = [];
                if (typeof val === "function") {
                    val = val();
                } /* check if the value is a single anonymous function */
                /* check if value is object or array, its length and create an array with yx values */
                if (!(val instanceof Array)) { /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
                    vals[0] = val.y ? val.y : val.x || o.axis === "x" ? null : val;
                    vals[1] = val.x ? val.x : val.y || o.axis === "y" ? null : val;
                } else { /* array value (e.g. [100,100]) */
                    vals = val.length > 1 ? [val[0], val[1]] : o.axis === "x" ? [null, val[0]] : [val[0], null];
                }
                /* check if array values are anonymous functions */
                if (typeof vals[0] === "function") {
                    vals[0] = vals[0]();
                }
                if (typeof vals[1] === "function") {
                    vals[1] = vals[1]();
                }
                return vals;
            },
            /* -------------------- */


            /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
            _to = function (val, dir) {
                if (val == null || typeof val == "undefined") {
                    return;
                }
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent(),
                    t = typeof val;
                if (!dir) {
                    dir = o.axis === "x" ? "x" : "y";
                }
                var contentLength = dir === "x" ? mCSB_container.outerWidth(false) - wrapper.width() : mCSB_container.outerHeight(false) - wrapper.height(),
                    contentPos = dir === "x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
                    cssProp = dir === "x" ? "left" : "top";
                switch (t) {
                    case "function": /* this currently is not used. Consider removing it */
                        return val();
                        break;
                    case "object": /* js/jquery object */
                        var obj = val.jquery ? val : $(val);
                        if (!obj.length) {
                            return;
                        }
                        return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
                        break;
                    case "string":
                    case "number":
                        if (_isNumeric(val)) { /* numeric value */
                            return Math.abs(val);
                        } else if (val.indexOf("%") !== -1) { /* percentage value */
                            return Math.abs(contentLength * parseInt(val) / 100);
                        } else if (val.indexOf("-=") !== -1) { /* decrease value */
                            return Math.abs(contentPos - parseInt(val.split("-=")[1]));
                        } else if (val.indexOf("+=") !== -1) { /* inrease value */
                            var p = (contentPos + parseInt(val.split("+=")[1]));
                            return p >= 0 ? 0 : Math.abs(p);
                        } else if (val.indexOf("px") !== -1 && _isNumeric(val.split("px")[0])) { /* pixels string value (e.g. "100px") */
                            return Math.abs(val.split("px")[0]);
                        } else {
                            if (val === "top" || val === "left") { /* special strings */
                                return 0;
                            } else if (val === "bottom") {
                                return Math.abs(wrapper.height() - mCSB_container.outerHeight(false));
                            } else if (val === "right") {
                                return Math.abs(wrapper.width() - mCSB_container.outerWidth(false));
                            } else if (val === "first" || val === "last") {
                                var obj = mCSB_container.find(":" + val);
                                return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
                            } else {
                                if ($(val).length) { /* jquery selector */
                                    return dir === "x" ? _childPos($(val))[1] : _childPos($(val))[0];
                                } else { /* other values (e.g. "100em") */
                                    mCSB_container.css(cssProp, val);
                                    methods.update.call(null, $this[0]);
                                    return;
                                }
                            }
                        }
                        break;
                }
            },
            /* -------------------- */


            /* calls the update method automatically */
            _autoUpdate = function (rem) {
                var $this = $(this), d = $this.data(pluginPfx), o = d.opt,
                    mCSB_container = $("#mCSB_" + d.idx + "_container");
                if (rem) {
                    /*
				removes autoUpdate timer
				usage: _autoUpdate.call(this,"remove");
				*/
                    clearTimeout(mCSB_container[0].autoUpdate);
                    _delete(mCSB_container[0], "autoUpdate");
                    return;
                }
                upd();

                function upd() {
                    clearTimeout(mCSB_container[0].autoUpdate);
                    if ($this.parents("html").length === 0) {
                        /* check element in dom tree */
                        $this = null;
                        return;
                    }
                    mCSB_container[0].autoUpdate = setTimeout(function () {
                        /* update on specific selector(s) length and size change */
                        if (o.advanced.updateOnSelectorChange) {
                            d.poll.change.n = sizesSum();
                            if (d.poll.change.n !== d.poll.change.o) {
                                d.poll.change.o = d.poll.change.n;
                                doUpd(3);
                                return;
                            }
                        }
                        /* update on main element and scrollbar size changes */
                        if (o.advanced.updateOnContentResize) {
                            d.poll.size.n = $this[0].scrollHeight + $this[0].scrollWidth + mCSB_container[0].offsetHeight + $this[0].offsetHeight + $this[0].offsetWidth;
                            if (d.poll.size.n !== d.poll.size.o) {
                                d.poll.size.o = d.poll.size.n;
                                doUpd(1);
                                return;
                            }
                        }
                        /* update on image load */
                        if (o.advanced.updateOnImageLoad) {
                            if (!(o.advanced.updateOnImageLoad === "auto" && o.axis === "y")) { //by default, it doesn't run on vertical content
                                d.poll.img.n = mCSB_container.find("img").length;
                                if (d.poll.img.n !== d.poll.img.o) {
                                    d.poll.img.o = d.poll.img.n;
                                    mCSB_container.find("img").each(function () {
                                        imgLoader(this);
                                    });
                                    return;
                                }
                            }
                        }
                        if (o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad) {
                            upd();
                        }
                    }, o.advanced.autoUpdateTimeout);
                }

                /* a tiny image loader */
                function imgLoader(el) {
                    if ($(el).hasClass(classes[2])) {
                        doUpd();
                        return;
                    }
                    var img = new Image();

                    function createDelegate(contextObject, delegateMethod) {
                        return function () {
                            return delegateMethod.apply(contextObject, arguments);
                        }
                    }

                    function imgOnLoad() {
                        this.onload = null;
                        $(el).addClass(classes[2]);
                        doUpd(2);
                    }

                    img.onload = createDelegate(img, imgOnLoad);
                    img.src = el.src;
                }

                /* returns the total height and width sum of all elements matching the selector */
                function sizesSum() {
                    if (o.advanced.updateOnSelectorChange === true) {
                        o.advanced.updateOnSelectorChange = "*";
                    }
                    var total = 0, sel = mCSB_container.find(o.advanced.updateOnSelectorChange);
                    if (o.advanced.updateOnSelectorChange && sel.length > 0) {
                        sel.each(function () {
                            total += this.offsetHeight + this.offsetWidth;
                        });
                    }
                    return total;
                }

                /* calls the update method */
                function doUpd(cb) {
                    clearTimeout(mCSB_container[0].autoUpdate);
                    methods.update.call(null, $this[0], cb);
                }
            },
            /* -------------------- */


            /* snaps scrolling to a multiple of a pixels number */
            _snapAmount = function (to, amount, offset) {
                return (Math.round(to / amount) * amount - offset);
            },
            /* -------------------- */


            /* stops content and scrollbar animations */
            _stop = function (el) {
                var d = el.data(pluginPfx),
                    sel = $("#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper,#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal");
                sel.each(function () {
                    _stopTween.call(this);
                });
            },
            /* -------------------- */


            /*
		ANIMATES CONTENT
		This is where the actual scrolling happens
		*/
            _scrollTo = function (el, to, options) {
                var d = el.data(pluginPfx), o = d.opt,
                    defaults = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: false,
                        dur: o.scrollInertia,
                        overwrite: "all",
                        callbacks: true,
                        onStart: true,
                        onUpdate: true,
                        onComplete: true
                    },
                    options = $.extend(defaults, options),
                    dur = [options.dur, (options.drag ? 0 : options.dur)],
                    mCustomScrollBox = $("#mCSB_" + d.idx),
                    mCSB_container = $("#mCSB_" + d.idx + "_container"),
                    wrapper = mCSB_container.parent(),
                    totalScrollOffsets = o.callbacks.onTotalScrollOffset ? _arr.call(el, o.callbacks.onTotalScrollOffset) : [0, 0],
                    totalScrollBackOffsets = o.callbacks.onTotalScrollBackOffset ? _arr.call(el, o.callbacks.onTotalScrollBackOffset) : [0, 0];
                d.trigger = options.trigger;
                if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) { /* always reset scrollTop/Left */
                    $(".mCSB_" + d.idx + "_scrollbar").css("visibility", "visible");
                    wrapper.scrollTop(0).scrollLeft(0);
                }
                if (to === "_resetY" && !d.contentReset.y) {
                    /* callbacks: onOverflowYNone */
                    if (_cb("onOverflowYNone")) {
                        o.callbacks.onOverflowYNone.call(el[0]);
                    }
                    d.contentReset.y = 1;
                }
                if (to === "_resetX" && !d.contentReset.x) {
                    /* callbacks: onOverflowXNone */
                    if (_cb("onOverflowXNone")) {
                        o.callbacks.onOverflowXNone.call(el[0]);
                    }
                    d.contentReset.x = 1;
                }
                if (to === "_resetY" || to === "_resetX") {
                    return;
                }
                if ((d.contentReset.y || !el[0].mcs) && d.overflowed[0]) {
                    /* callbacks: onOverflowY */
                    if (_cb("onOverflowY")) {
                        o.callbacks.onOverflowY.call(el[0]);
                    }
                    d.contentReset.x = null;
                }
                if ((d.contentReset.x || !el[0].mcs) && d.overflowed[1]) {
                    /* callbacks: onOverflowX */
                    if (_cb("onOverflowX")) {
                        o.callbacks.onOverflowX.call(el[0]);
                    }
                    d.contentReset.x = null;
                }
                if (o.snapAmount) { /* scrolling snapping */
                    var snapAmount = !(o.snapAmount instanceof Array) ? o.snapAmount : options.dir === "x" ? o.snapAmount[1] : o.snapAmount[0];
                    to = _snapAmount(to, snapAmount, o.snapOffset);
                }
                switch (options.dir) {
                    case "x":
                        var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_horizontal"),
                            property = "left",
                            contentPos = mCSB_container[0].offsetLeft,
                            limit = [
                                mCustomScrollBox.width() - mCSB_container.outerWidth(false),
                                mCSB_dragger.parent().width() - mCSB_dragger.width()
                            ],
                            scrollTo = [to, to === 0 ? 0 : (to / d.scrollRatio.x)],
                            tso = totalScrollOffsets[1],
                            tsbo = totalScrollBackOffsets[1],
                            totalScrollOffset = tso > 0 ? tso / d.scrollRatio.x : 0,
                            totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.x : 0;
                        break;
                    case "y":
                        var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_vertical"),
                            property = "top",
                            contentPos = mCSB_container[0].offsetTop,
                            limit = [
                                mCustomScrollBox.height() - mCSB_container.outerHeight(false),
                                mCSB_dragger.parent().height() - mCSB_dragger.height()
                            ],
                            scrollTo = [to, to === 0 ? 0 : (to / d.scrollRatio.y)],
                            tso = totalScrollOffsets[0],
                            tsbo = totalScrollBackOffsets[0],
                            totalScrollOffset = tso > 0 ? tso / d.scrollRatio.y : 0,
                            totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.y : 0;
                        break;
                }
                if (scrollTo[1] < 0 || (scrollTo[0] === 0 && scrollTo[1] === 0)) {
                    scrollTo = [0, 0];
                } else if (scrollTo[1] >= limit[1]) {
                    scrollTo = [limit[0], limit[1]];
                } else {
                    scrollTo[0] = -scrollTo[0];
                }
                if (!el[0].mcs) {
                    _mcs();  /* init mcs object (once) to make it available before callbacks */
                    if (_cb("onInit")) {
                        o.callbacks.onInit.call(el[0]);
                    } /* callbacks: onInit */
                }
                clearTimeout(mCSB_container[0].onCompleteTimeout);
                _tweenTo(mCSB_dragger[0], property, Math.round(scrollTo[1]), dur[1], options.scrollEasing);
                if (!d.tweenRunning && ((contentPos === 0 && scrollTo[0] >= 0) || (contentPos === limit[0] && scrollTo[0] <= limit[0]))) {
                    return;
                }
                _tweenTo(mCSB_container[0], property, Math.round(scrollTo[0]), dur[0], options.scrollEasing, options.overwrite, {
                    onStart: function () {
                        if (options.callbacks && options.onStart && !d.tweenRunning) {
                            /* callbacks: onScrollStart */
                            if (_cb("onScrollStart")) {
                                _mcs();
                                o.callbacks.onScrollStart.call(el[0]);
                            }
                            d.tweenRunning = true;
                            _onDragClasses(mCSB_dragger);
                            d.cbOffsets = _cbOffsets();
                        }
                    }, onUpdate: function () {
                        if (options.callbacks && options.onUpdate) {
                            /* callbacks: whileScrolling */
                            if (_cb("whileScrolling")) {
                                _mcs();
                                o.callbacks.whileScrolling.call(el[0]);
                            }
                        }
                    }, onComplete: function () {
                        if (options.callbacks && options.onComplete) {
                            if (o.axis === "yx") {
                                clearTimeout(mCSB_container[0].onCompleteTimeout);
                            }
                            var t = mCSB_container[0].idleTimer || 0;
                            mCSB_container[0].onCompleteTimeout = setTimeout(function () {
                                /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                                if (_cb("onScroll")) {
                                    _mcs();
                                    o.callbacks.onScroll.call(el[0]);
                                }
                                if (_cb("onTotalScroll") && scrollTo[1] >= limit[1] - totalScrollOffset && d.cbOffsets[0]) {
                                    _mcs();
                                    o.callbacks.onTotalScroll.call(el[0]);
                                }
                                if (_cb("onTotalScrollBack") && scrollTo[1] <= totalScrollBackOffset && d.cbOffsets[1]) {
                                    _mcs();
                                    o.callbacks.onTotalScrollBack.call(el[0]);
                                }
                                d.tweenRunning = false;
                                mCSB_container[0].idleTimer = 0;
                                _onDragClasses(mCSB_dragger, "hide");
                            }, t);
                        }
                    }
                });

                /* checks if callback function exists */
                function _cb(cb) {
                    return d && o.callbacks[cb] && typeof o.callbacks[cb] === "function";
                }

                /* checks whether callback offsets always trigger */
                function _cbOffsets() {
                    return [o.callbacks.alwaysTriggerOffsets || contentPos >= limit[0] + tso, o.callbacks.alwaysTriggerOffsets || contentPos <= -tsbo];
                }

                /*
			populates object with useful values for the user
			values:
				content: this.mcs.content
				content top position: this.mcs.top
				content left position: this.mcs.left
				dragger top position: this.mcs.draggerTop
				dragger left position: this.mcs.draggerLeft
				scrolling y percentage: this.mcs.topPct
				scrolling x percentage: this.mcs.leftPct
				scrolling direction: this.mcs.direction
			*/
                function _mcs() {
                    var cp = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft], /* content position */
                        dp = [mCSB_dragger[0].offsetTop, mCSB_dragger[0].offsetLeft], /* dragger position */
                        cl = [mCSB_container.outerHeight(false), mCSB_container.outerWidth(false)], /* content length */
                        pl = [mCustomScrollBox.height(), mCustomScrollBox.width()]; /* content parent length */
                    el[0].mcs = {
                        content: mCSB_container, /* original content wrapper as jquery object */
                        top: cp[0],
                        left: cp[1],
                        draggerTop: dp[0],
                        draggerLeft: dp[1],
                        topPct: Math.round((100 * Math.abs(cp[0])) / (Math.abs(cl[0]) - pl[0])),
                        leftPct: Math.round((100 * Math.abs(cp[1])) / (Math.abs(cl[1]) - pl[1])),
                        direction: options.dir
                    };
                    /*
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc.
				*/
                }
            },
            /* -------------------- */


            /*
		CUSTOM JAVASCRIPT ANIMATION TWEEN
		Lighter and faster than jquery animate() and css transitions
		Animates top/left properties and includes easings
		*/
            _tweenTo = function (el, prop, to, duration, easing, overwrite, callbacks) {
                if (!el._mTween) {
                    el._mTween = {top: {}, left: {}};
                }
                var callbacks = callbacks || {},
                    onStart = callbacks.onStart || function () {
                    }, onUpdate = callbacks.onUpdate || function () {
                    }, onComplete = callbacks.onComplete || function () {
                    },
                    startTime = _getTime(), _delay, progress = 0, from = el.offsetTop, elStyle = el.style, _request,
                    tobj = el._mTween[prop];
                if (prop === "left") {
                    from = el.offsetLeft;
                }
                var diff = to - from;
                tobj.stop = 0;
                if (overwrite !== "none") {
                    _cancelTween();
                }
                _startTween();

                function _step() {
                    if (tobj.stop) {
                        return;
                    }
                    if (!progress) {
                        onStart.call();
                    }
                    progress = _getTime() - startTime;
                    _tween();
                    if (progress >= tobj.time) {
                        tobj.time = (progress > tobj.time) ? progress + _delay - (progress - tobj.time) : progress + _delay - 1;
                        if (tobj.time < progress + 1) {
                            tobj.time = progress + 1;
                        }
                    }
                    if (tobj.time < duration) {
                        tobj.id = _request(_step);
                    } else {
                        onComplete.call();
                    }
                }

                function _tween() {
                    if (duration > 0) {
                        tobj.currVal = _ease(tobj.time, from, diff, duration, easing);
                        elStyle[prop] = Math.round(tobj.currVal) + "px";
                    } else {
                        elStyle[prop] = to + "px";
                    }
                    onUpdate.call();
                }

                function _startTween() {
                    _delay = 1000 / 60;
                    tobj.time = progress + _delay;
                    _request = (!window.requestAnimationFrame) ? function (f) {
                        _tween();
                        return setTimeout(f, 0.01);
                    } : window.requestAnimationFrame;
                    tobj.id = _request(_step);
                }

                function _cancelTween() {
                    if (tobj.id == null) {
                        return;
                    }
                    if (!window.requestAnimationFrame) {
                        clearTimeout(tobj.id);
                    } else {
                        window.cancelAnimationFrame(tobj.id);
                    }
                    tobj.id = null;
                }

                function _ease(t, b, c, d, type) {
                    switch (type) {
                        case "linear":
                        case "mcsLinear":
                            return c * t / d + b;
                            break;
                        case "mcsLinearOut":
                            t /= d;
                            t--;
                            return c * Math.sqrt(1 - t * t) + b;
                            break;
                        case "easeInOutSmooth":
                            t /= d / 2;
                            if (t < 1) return c / 2 * t * t + b;
                            t--;
                            return -c / 2 * (t * (t - 2) - 1) + b;
                            break;
                        case "easeInOutStrong":
                            t /= d / 2;
                            if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                            t--;
                            return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
                            break;
                        case "easeInOut":
                        case "mcsEaseInOut":
                            t /= d / 2;
                            if (t < 1) return c / 2 * t * t * t + b;
                            t -= 2;
                            return c / 2 * (t * t * t + 2) + b;
                            break;
                        case "easeOutSmooth":
                            t /= d;
                            t--;
                            return -c * (t * t * t * t - 1) + b;
                            break;
                        case "easeOutStrong":
                            return c * (-Math.pow(2, -10 * t / d) + 1) + b;
                            break;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var ts = (t /= d) * t, tc = ts * t;
                            return b + c * (0.499999999999997 * tc * ts + -2.5 * ts * ts + 5.5 * tc + -6.5 * ts + 4 * t);
                    }
                }
            },
            /* -------------------- */


            /* returns current time */
            _getTime = function () {
                if (window.performance && window.performance.now) {
                    return window.performance.now();
                } else {
                    if (window.performance && window.performance.webkitNow) {
                        return window.performance.webkitNow();
                    } else {
                        if (Date.now) {
                            return Date.now();
                        } else {
                            return new Date().getTime();
                        }
                    }
                }
            },
            /* -------------------- */


            /* stops a tween */
            _stopTween = function () {
                var el = this;
                if (!el._mTween) {
                    el._mTween = {top: {}, left: {}};
                }
                var props = ["top", "left"];
                for (var i = 0; i < props.length; i++) {
                    var prop = props[i];
                    if (el._mTween[prop].id) {
                        if (!window.requestAnimationFrame) {
                            clearTimeout(el._mTween[prop].id);
                        } else {
                            window.cancelAnimationFrame(el._mTween[prop].id);
                        }
                        el._mTween[prop].id = null;
                        el._mTween[prop].stop = 1;
                    }
                }
            },
            /* -------------------- */


            /* deletes a property (avoiding the exception thrown by IE) */
            _delete = function (c, m) {
                try {
                    delete c[m];
                } catch (e) {
                    c[m] = null;
                }
            },
            /* -------------------- */


            /* detects left mouse button */
            _mouseBtnLeft = function (e) {
                return !(e.which && e.which !== 1);
            },
            /* -------------------- */


            /* detects if pointer type event is touch */
            _pointerTouch = function (e) {
                var t = e.originalEvent.pointerType;
                return !(t && t !== "touch" && t !== 2);
            },
            /* -------------------- */


            /* checks if value is numeric */
            _isNumeric = function (val) {
                return !isNaN(parseFloat(val)) && isFinite(val);
            },
            /* -------------------- */


            /* returns element position according to content */
            _childPos = function (el) {
                var p = el.parents(".mCSB_container");
                return [el.offset().top - p.offset().top, el.offset().left - p.offset().left];
            },
            /* -------------------- */


            /* checks if browser tab is hidden/inactive via Page Visibility API */
            _isTabHidden = function () {
                var prop = _getHiddenProp();
                if (!prop) return false;
                return document[prop];

                function _getHiddenProp() {
                    var pfx = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden"; //natively supported
                    for (var i = 0; i < pfx.length; i++) { //prefixed
                        if ((pfx[i] + "Hidden") in document)
                            return pfx[i] + "Hidden";
                    }
                    return null; //not supported
                }
            };
        /* -------------------- */


        /*
	----------------------------------------
	PLUGIN SETUP
	----------------------------------------
	*/

        /* plugin constructor functions */
        $.fn[pluginNS] = function (method) { /* usage: $(selector).mCustomScrollbar(); */
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error("Method " + method + " does not exist");
            }
        };
        $[pluginNS] = function (method) { /* usage: $.mCustomScrollbar(); */
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error("Method " + method + " does not exist");
            }
        };

        /*
	allow setting plugin default options.
	usage: $.mCustomScrollbar.defaults.scrollInertia=500;
	to apply any changed default options on default selectors (below), use inside document ready fn
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
        $[pluginNS].defaults = defaults;

        /*
	add window object (window.mCustomScrollbar)
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
        window[pluginNS] = true;

        $(window).bind("load", function () {

            $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */

            /* extend jQuery expressions */
            $.extend($.expr[":"], {
                /* checks if element is within scrollable viewport */
                mcsInView: $.expr[":"].mcsInView || function (el) {
                    var $el = $(el), content = $el.parents(".mCSB_container"), wrapper, cPos;
                    if (!content.length) {
                        return;
                    }
                    wrapper = content.parent();
                    cPos = [content[0].offsetTop, content[0].offsetLeft];
                    return cPos[0] + _childPos($el)[0] >= 0 && cPos[0] + _childPos($el)[0] < wrapper.height() - $el.outerHeight(false) &&
                        cPos[1] + _childPos($el)[1] >= 0 && cPos[1] + _childPos($el)[1] < wrapper.width() - $el.outerWidth(false);
                },
                /* checks if element or part of element is in view of scrollable viewport */
                mcsInSight: $.expr[":"].mcsInSight || function (el, i, m) {
                    var $el = $(el), elD, content = $el.parents(".mCSB_container"), wrapperView, pos, wrapperViewPct,
                        pctVals = m[3] === "exact" ? [[1, 0], [1, 0]] : [[0.9, 0.1], [0.6, 0.4]];
                    if (!content.length) {
                        return;
                    }
                    elD = [$el.outerHeight(false), $el.outerWidth(false)];
                    pos = [content[0].offsetTop + _childPos($el)[0], content[0].offsetLeft + _childPos($el)[1]];
                    wrapperView = [content.parent()[0].offsetHeight, content.parent()[0].offsetWidth];
                    wrapperViewPct = [elD[0] < wrapperView[0] ? pctVals[0] : pctVals[1], elD[1] < wrapperView[1] ? pctVals[0] : pctVals[1]];
                    return pos[0] - (wrapperView[0] * wrapperViewPct[0][0]) < 0 && pos[0] + elD[0] - (wrapperView[0] * wrapperViewPct[0][1]) >= 0 &&
                        pos[1] - (wrapperView[1] * wrapperViewPct[1][0]) < 0 && pos[1] + elD[1] - (wrapperView[1] * wrapperViewPct[1][1]) >= 0;
                },
                /* checks if element is overflowed having visible scrollbar(s) */
                mcsOverflow: $.expr[":"].mcsOverflow || function (el) {
                    var d = $(el).data(pluginPfx);
                    if (!d) {
                        return;
                    }
                    return d.overflowed[0] || d.overflowed[1];
                }
            });

        });

    }))
}));
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for (var i = types.length; i;) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true,
            deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120;
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3;
        }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function () {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function (elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function (elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function (fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
            return;
        }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
            clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

// var resultTemp = `<div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">TaZ:»ЯНовая статьятурниров»</h4>
//                       <p class="news__preview-text">
//                         Ldldldldldldl
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>
//                     <div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">TaZ:»Новая статья»</h4>
//                       <p class="news__preview-text">
//
//                         Katowice 2017. Слот выиграла наша команда EYESPORTS female.
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>
//                     <div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">Новая статьяу</h4>
//                       <p class="news__preview-text">
//                         Винсент «Happy» Шопенгауэр
//                         создает новую команду в рамках
//                         грядущего французского решафла.
//                         Happy строит новую боевую
//                         команду …
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>`;
//
//
//
// $(document).ready(function() {
//     var newsDeriction = 'next';
//     var isLoaded = true;
//
//
//     $(".news").on("click", function (e) {
//         if (!isLoaded) return;
//         var headerHeight = $(".news__header").css("height");
//         var newsContainer = $(".news__container");
//         var newsPosts = $(".news__container").children();
//         var arrowDeriction = e.target.parentNode;
//         var arrowClassName = arrowDeriction.className;
//
//         if (arrowClassName == "news__arrow-l") {
//             newsDeriction = 'priv';
//             sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
//         } else if (arrowClassName == "news__arrow-r") {
//             newsDeriction = 'next';
//             sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
//         } else return;
//
//         function replaceNewsPosts() {
//             newsContainer.css("opacity", 0);
//             setTimeout(function () {
//                 var parseNews = $.parseHTML(resultTemp);
//                 newsPosts.remove();
//                 newsContainer.append(parseNews);
//                 $(".news__header").height(headerHeight);
//                 newsContainer.css("opacity", 1);
//                 isLoaded = true;
//             },300);
//             isLoaded = false;
//         }
//
//         function sendAjaxNews(methodName, newsDeriction, callback) {
//             $.ajax({
//                 type: "POST",
//                 url: methodName, // Вызываемый метод на сервере
//                 // url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
//                 contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
//                 data: {newsDeriction: newsDeriction},
//                 dataType: "json",
//                 success: function (result) {
//                     console.log(newsDeriction);
//                     //  returning something
//                     console.log('result... ' + result);
//
//                 },
//                 error: function (result) {
//                     callback();
//                 }
//             });
//         }
//
//     });
//
//
// });
//

//Playlist for streams
/*(function () {
    var videoName = $('#streams .videos__name');
    videoName.click(function () {
        var ref = $(this).attr('data-ref');
        var videoViewerIrame = $('#stream-viewer iframe');
        var iframe = $('<iframe frameborder="0" allowfullscreen></iframe>');
        iframe.attr("src", ref);
        videoViewerIrame.replaceWith(iframe);
    });
}());*/
