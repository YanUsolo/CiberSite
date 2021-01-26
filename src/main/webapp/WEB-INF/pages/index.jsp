<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yanus
  Date: 10.05.2017
  Time: 21:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Index</title>

    <base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/"/>

    <script src="http://code.jquery.com/jquery-1.9.0.min.js" type="text/javascript"></script>

    <link href="<c:url value="/resources/css/all.css"/>" type="text/css" rel="stylesheet">

    <script src="${pageContext.request.contextPath}/resources/js/all.js?<?=filemtime( 'js/file.js' )?>"
            type="text/javascript"></script>


</head>

<body>


<div class="page-container main-background">
    <div class="wrapper">
        <nav class="navbar header">
            <button type="button" data-toggle="collapse" data-target="#adaptiveMenu"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggle navbar-toggler-right"><span class="navbar-toggler-icon"></span></button>
            <a href="index.html" class="navbar-brand"><img
                    src="${pageContext.request.contextPath}/resources/img/besa-logo-light.svg"></a>
            <div id="adaptiveMenu" class="collapse navbar-collapse">
                <ul class="nav-gamess navbar-nav mr-auto">
                    <li class="nav-games__item nav-item active"><a class="nav-games__link nav-link"
                                                                   href="../main-page-cs"><span>CS GO</span></a></li>
                    <li class="nav-games__item nav-item active"><a class="nav-games__link nav-link"
                                                                   href="../main-page-wot/"><span>World of tanks</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a class="nav-games__link nav-link"
                                                                   href="../main-page-paragon"><span>Paragon</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a class="nav-games__link nav-link"
                                                                   href="../main-page-dota"><span>Dota 2</span></a></li>
                </ul>
                <c:choose>
                    <c:when test="${isExist == false}">
                        <div class="account-option"><span class="login login__icon"><a href="../login">Вход</a>
                            </span><span>/</span><span class="registration"><a href="../reg">Регистрация</a></span>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <div class="account-option"><span class="login login__icon"><a>${login}</a>
                <div class="account-option__actions-list">
                  <ul class="account-option__list">
                    <li class="account-option__item"><a class="account-option__link" href="createNewsPage">Написать новость</a></li>
                    <li class="account-option__item"><a class="account-option__link" href="createSteamOrVideoPage">Добавить стрим или видео</a></li>
                    <li class="account-option__item"><a class="account-option__link"
                                                        href="deletePostsPage">Удалить пост</a></li>
                    <li class="account-option__item"><a class="account-option__link" href="">Добавить матч</a></li>
                      <li class="account-option__item"><a class="account-option__link" href="/getViewPage">Просмотр постов</a></li>
                  </ul>
                </div></span><span> : </span><a>Здесь</a></div>
                    </c:otherwise>
                </c:choose>
            </div>

        </nav>


        <div class="container-fluid flex-center">
            <div class="menu-game">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <form action="main-page-cs" class="menu-game__item menu-game__item--hover-cs"><img
                                src="${pageContext.request.contextPath}/resources/img/cs-go_item.jpg" alt="CSGO">
                            <div class="menu-game__wrap">
                                <div class="menu-game__game-logo"><img
                                        src="${pageContext.request.contextPath}/resources/img/cs-go_logo.svg"></div>
                            </div>
                            <div class="menu-game__button-wrap">
                                <button type="submit" class="menu-game__link">Узнать больше</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <form action="main-page-wot" method="get" class="menu-game__item menu-game__item--hover-wot">
                            <img src="${pageContext.request.contextPath}/resources/img/wot_item.jpg" alt="wot">
                            <div class="menu-game__wrap">
                                <div class="menu-game__game-logo"><img
                                        src="${pageContext.request.contextPath}/resources/img/wot_logo.svg"></div>
                            </div>
                            <div class="menu-game__button-wrap">
                                <button type="submit" class="menu-game__link">Узнать больше</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <form action="main-page-paragon" type="get"
                              class="menu-game__item menu-game__item--hover-paragon"><img
                                src="${pageContext.request.contextPath}/resources/img/paragon_item.jpg" alt="paragon">
                            <div class="menu-game__wrap">
                                <div class="menu-game__game-logo"><img
                                        src="${pageContext.request.contextPath}/resources/img/paragon_logo.svg"></div>
                            </div>
                            <div class="menu-game__button-wrap">
                                <button type="submit" class="menu-game__link">Узнать больше</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <form action="main-page-dota" method="get" class="menu-game__item menu-game__item--hover-dota">
                            <img src="${pageContext.request.contextPath}/resources/img/dota_item.jpg" alt="dota">
                            <div class="menu-game__wrap">
                                <div class="menu-game__game-logo"><img
                                        src="${pageContext.request.contextPath}/resources/img/dota_logo.svg"></div>
                            </div>
                            <div class="menu-game__button-wrap">
                                <button type="submit" class="menu-game__link">Узнать больше</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <ul class="tech-support">
                <li class="tech-support__item"><a class="link-item">Faq</a></li>
                <li class="tech-support__item"><a class="link-item">Тех. поддержка</a></li>
            </ul>
            <span class="copyright">© 2016—2017</span>
            <ul class="social">
                <li class="social__item"><a class="link--social google"></a></li>
                <li class="social__item"><a class="link--social youtube"></a></li>
                <li class="social__item"><a class="link--social tumblr"></a></li>
                <li class="social__item"><a class="link--social facebook"></a></li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>
