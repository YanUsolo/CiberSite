<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>
<%--
  Created by IntelliJ IDEA.
  User: yanus
  Date: 10.05.2017
  Time: 21:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Regis</title>

    <link href="<c:url value="/resources/css/all.css"/>" type="text/css" rel="stylesheet">

    <script src="${pageContext.request.contextPath}/resources/css/all.css"
            type="text/javascript"></script>


    <%--<script type="text/javascript" src=""></script>--%>


    <base href="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/"/>


</head>
<body>

<div class="page-container personal-page-background">
    <div class="wrapper">
        <!--include ../templates/_nav-games-->
        <nav class="navbar header">
            <button type="button" data-toggle="collapse" data-target="#adaptiveMenu"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggle navbar-toggler-right"><span class="navbar-toggler-icon"></span></button>
            <a href="/" class="navbar-brand"><img src="/resources/img/besa-logo-light.svg"></a>
            <div id="adaptiveMenu" class="collapse navbar-collapse">
                <ul class="nav-gamess navbar-nav mr-auto">
                    <li class="nav-games__item nav-item active"><a href="main-page-csgo.html"
                                                                   class="nav-games__link nav-link"><span>CS GO</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-wot.html"
                                                                   class="nav-games__link nav-link"><span>World of tanks</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-paragon.html"
                                                                   class="nav-games__link nav-link"><span>Paragon</span></a>
                    </li>
                    <li class="nav-games__item nav-item active"><a href="main-page-dota.html"
                                                                   class="nav-games__link nav-link"><span>Dota 2</span></a>
                    </li>
                </ul>
                <div class="account-option"><span class="login login__icon"><a href="../login">Вход</a>
                </span><span>/</span><span class="registration"><a href="../reg">Регистрация</a></span></div>
            </div>
        </nav>
        <div class="registration-block">
            <h2>Регистрация</h2>
            <form id="registration-form" class="registration-form" action="reg" method="post">
                <fieldset>
                    <input type="text" size="40" name="login" placeholder="Логин">
                    <input type="email" size="40" name="email" placeholder="Email">
                </fieldset>
                <fieldset>
                    <input type="password" size="40" name="password" placeholder="Пароль">
                    <input type="password" size="40" name="repassword" placeholder="Повторите пароль">
                </fieldset>

                <fieldset>
                    <select class="input-option" name="country">
                        <option value="2">Австралия</option>
                        <option value="3">Австрия</option>
                        <option value="4">Азербайджан</option>
                        <option value="5">Албания</option>
                        <option value="6">Алжир</option>
                        <option value="7">Ангола</option>
                        <option value="8">Андорра</option>
                        <option value="9">Антигуа и Барбуда</option>
                    </select>
                </fieldset>
                <button>Зарегистрироваться</button>
                <ul class="social">
                    <li class="social__item"><a class="link--social regisrtVK"></a></li>
                    <li class="social__item"><a class="link--social registrFace"></a></li>
                    <li class="social__item"><a class="link--social registrGoogle"></a></li>
                </ul>
            </form>
        </div>
        <!--Created by Алина on 21.11.2016.
        -->
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

