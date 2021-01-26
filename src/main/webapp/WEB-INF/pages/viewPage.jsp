<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--

  Created by IntelliJ IDEA.
  User: yanus
  Date: 8/7/2017
  Time: 7:17 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%--<c:forEach var="num" items="${arraySimple}">
                                    <div class="videos__item">
                                        <div class="videos__preview"><img data-ref="https://www.youtube.com/embed/Q_5IZKJlPIk?ecver=2" src="https://i.kinja-img.com/gawker-media/image/upload/s--G76fDOkv--/c_scale,fl_progressive,q_80,w_800/nvr33pslf0ukv1mtn6w2.png" frameborder="0" allowfullscreen></div>
                                        <div class="videos__item-info-wrap"><span data-ref="https://www.youtube.com/embed/Q_5IZKJlPIk?ecver=2" class="videos__name">Выход Natus Vincere в плей-офф ELEAGUE Major</span><span class="videos__data">5 февраля, воскресенье</span></div>
                                    </div>
                                </c:forEach>--%>
<head>
    <title>View Page</title>

    <%-- <c:set var = "arraySimple" scope = "session" value = "${{0,1,2,3,4}}"/>--%>

    <base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/"/>

    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js" type="text/javascript"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" type="text/javascript"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></script>

    <link href="<c:url value="/resources/css/all.css?<?=filemtime( 'css/all.css' )?>"/>" type="text/css"
          rel="stylesheet">

    <script src="${pageContext.request.contextPath}/resources/js/all.js?<?=filemtime( 'js/all.js' )?>"
            type="text/javascript"></script>

</head>
<body>
<div class="page-container wot-background">
    <div class="wrapper">
        <!--include ../templates/_nav-games-->
        <nav class="navbar header">
            <button type="button" data-toggle="collapse" data-target="#adaptiveMenu"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggle navbar-toggler-right"><span class="navbar-toggler-icon"></span></button>
            <a href="index" class="navbar-brand"><img src="/resources/img/besa-logo-light.svg"></a>
            <div id="adaptiveMenu" class="collapse navbar-collapse">
                <ul class="nav-gamess navbar-nav mr-auto">
                    <li class="nav-games__item nav-item active"><a href="main-page-csgo"
                                                                   class="nav-games__link nav-link"><span>CS GO</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-wot"
                                                                   class="nav-games__link nav-link"><span>World of tanks</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-paragon"
                                                                   class="nav-games__link nav-link"><span>Paragon</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-dota"
                                                                   class="nav-games__link nav-link"><span>Dota 2</span></a>
                    </li>
                </ul>
                <div class="account-option"><span class="login login__icon"><a href="../login.html">Вход</a>
                <div class="account-option__actions-list">
                  <ul class="account-option__list">
                    <li class="account-option__item"><a class="account-option__link" href="createNewsPage">Написать новость</a></li>
                    <li class="account-option__item"><a class="account-option__link" href="createSteamOrVideoPage">Добавить стрим или видео</a></li>
                    <li class="account-option__item"><a class="account-option__link"
                                                        href="deletePostsPage">Удалить пост</a></li>
                    <li class="account-option__item"><a class="account-option__link" href="">Action</a></li>
                  </ul>
                </div></span><span>/</span><span class="registration"><a
                        href="../registration.html">Регистрация</a></span></div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="matches">
                    <form class="matches__wrap">
                        <div>
                            <h2 class="block-title">Матчи</h2>

                            <fieldset style="float:left;border: 0px">
                                <select class="input-option" id="selectTable" name="table">
                                    <option value="news">News</option>
                                    <option value="stream">Stream</option>
                                    <option value="video">Video</option>
                                    <option value="tourney">Tourney</option>
                                </select>
                            </fieldset>

                            <fieldset style="border: 0px">
                                <select class="input-option" id="selectTitel" name="titel">
                                    <option value="3">Dota 2</option>
                                    <option value="4">World of tanks</option>
                                    <option value="1">CS GO</option>
                                    <option value="2">Paragon</option>
                                </select>
                            </fieldset>
                        </div>

                        <div class="matches__table">
                            <table>
                                <tbody id="tableOfPost">
                                <tr>
                                    <th>id</th>
                                    <th>titel</th>
                                    <th>name</th>
                                    <th>Action</th>
                                    <th>person</th>
                                    <th>any</th>
                                </tr>
                                <tr>
                                    <th>id</th>
                                    <th>titel</th>
                                    <th>name</th>
                                    <th>Action</th>
                                    <th>person</th>
                                    <th>any</th>
                                </tr>
                                <tr>
                                    <th>id</th>
                                    <th>titel</th>
                                    <th>name</th>
                                    <th>Action</th>
                                    <th>person</th>
                                    <th>any</th>
                                </tr>
                                <tr>
                                    <th>id</th>
                                    <th>titel</th>
                                    <th>name</th>
                                    <th>Action</th>
                                    <th>person</th>
                                    <th>any</th>
                                </tr>

                                </tbody>
                            </table>

                        </div>
                    </form>
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
