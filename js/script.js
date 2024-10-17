$(function () {
  //オーディオの再生と停止
  var audio = $("#js-audio").get(0);
  var isPlaying = false;
  audio.volume = 0.5;

  $("#js-audio-play").click(function () {
    if (isPlaying) {
      audio.pause();
      $(".audioSwitch").removeClass("on");
      $(".audioSwitch-text").html("SOUND OFF");
    } else {
      audio.play();
      $(".audioSwitch").addClass("on");
      $(".audioSwitch-text").html("SOUND ON");
    }
  });
  audio.onplaying = function () {
    isPlaying = true;
  };
  audio.onpause = function () {
    isPlaying = false;
  };
  // スクロールリンク
  $('a[href^="#"]').click(function () {
    var href = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    var target = $(href == "#" || href == "" ? "html" : href); // hrefが#の時と空の時は'html'が、それ以外は(href)がtargetに代入される。
    var position = $(target).offset().top; //idの上部の距離を取得
    $("body,html").animate({ scrollTop: position }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    return false;
  });

  //スクロールエフェクト
  function fadeUpEffect() {
    $(".fadeUpEffect").each(function () {
      var elemPos = $(this).offset().top + 100;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass("fadeUp");
      }
    });
  }
  $(window).scroll(function () {
    fadeUpEffect();
  });

  // ヘッダーのスクロール対応
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".header").addClass("is-active");
    } else {
      $(".header").removeClass("is-active");
    }
  });

  //ページトップへ戻る
  var $pageTop = $(".page-top");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $pageTop.fadeIn();
    } else {
      $pageTop.fadeOut();
    }
  });
  $pageTop.on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });

  // ハンバーガーメニュー
  var btnMenu = $(".js-btn-menu");
  var globalNav = $(".global-nav");

  btnMenu.on("click", function () {
    btnMenu.toggleClass("is-active");
    globalNav.toggleClass("is-show");
  });
});

// Swipperスクロール
const swiper = new Swiper(".js-swiper-container", {
  autoplay: {
    delay: 3000,
  },
  speed: 600,
  loop: true,
  effect: "fade",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

//SVGアニメーションの描画
var stroke;
stroke = new Vivus(
  "mask",
  {
    //アニメーションをするIDの指定
    start: "manual", //自動再生をせずスタートをマニュアルに
    type: "scenario-sync", // アニメーションのタイプを設定
    duration: 8, //アニメーションの時間設定。数字が小さくなるほど速い
    forceRender: false, //パスが更新された場合に再レンダリングさせない
    animTimingFunction: Vivus.EASE, //動きの加速減速設定
  },
  function () {
    $("#mask").attr("class", "done"); //描画が終わったらdoneというクラスを追加
  }
);

$(window).on("load", function () {
  $("#splash").delay(4000).fadeOut("slow"); //ローディング画面を3秒（3000ms）待機してからフェードアウト
  $("#splash_logo").delay(3500).fadeOut("slow"); //ロゴを3秒（3000ms）待機してからフェードアウト
  stroke.play(); //SVGアニメーションの実行
});
