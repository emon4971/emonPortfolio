/* Glassy 3D project carousel — put this file next to index.html and load it before </body> */
(function () {
  var U = "https://images.unsplash.com/";
  var P = [
    {
      t: "MM Kitchen",
      c: "fe",
      s: "Food delivery website",
      d: "Landing page for a local kitchen with dining, catering and online-order sections, a client showcase and an area-based order form.",
      g: ["Landing Page", "Order Form", "Responsive"],
      l: "https://emon-fooddelivery.netlify.app/",
      i: "photo-1565299624946-b28f40a0ae38",
      a: "#4A3210",
      b: "#0A1114",
    },
    {
      t: "Vai-Bon Store",
      c: "fe",
      s: "Local store website · Bangla",
      d: "Bangla website for a ration & variety store in Dayarampur: product categories, popular items, shop gallery and click-to-call contact.",
      g: ["Bangla UI", "Local Business", "Product Showcase"],
      l: "https://emon-store-management.netlify.app/",
      i: "photo-1542838132-92c53300491e",
      a: "#0E3B33",
      b: "#0A1114",
    },
    {
      t: "SolaraVolt",
      c: "fe",
      s: "Renewable energy site",
      d: "Clean-energy company site with solar and wind solutions, a savings calculator, testimonials and an FAQ section.",
      g: ["Energy Calculator", "Landing Page", "FAQ"],
      l: "https://solar4emon.netlify.app/",
      i: "photo-1509391366360-2e959784a276",
      a: "#26205C",
      b: "#0A1114",
    },
    {
      t: "ShopHub",
      c: "fe",
      s: "E-commerce storefront",
      d: "Multi-page storefront with a category mega menu, cart and wishlist, login/sign-up modals, a deals page and a support chat widget.",
      g: ["Cart", "Wishlist", "Auth UI", "Chat Widget"],
      l: "https://emone-commerce.netlify.app/",
      i: "photo-1483985988355-763728e1935b",
      a: "#0E2F4A",
      b: "#0A1114",
    },
  ];
  function $(s) {
    return document.querySelector(s);
  }
  var view = $(".cx-view"),
    st = $(".cx-stage"),
    sr = $(".cx-sr");
  if (!view) return;
  var list = P.slice(),
    act = 0,
    els = [],
    playing = false,
    timer = null,
    liked = {},
    sx = null,
    moved = false;

  function build() {
    st.innerHTML = "";
    els = list.map(function (p, k) {
      var e = document.createElement("article");
      e.className = "cx-c";
      e.setAttribute("aria-roledescription", "slide");
      e.style.setProperty("--img", "url(" + U + p.i + "?w=900&q=80)");
      e.style.setProperty("--c1", p.a);
      e.style.setProperty("--c2", p.b);
      e.innerHTML =
        '<span class="cx-no"></span><div class="cx-gl"><h3>' +
        p.t +
        "</h3><small>" +
        p.s +
        '</small><div class="cx-more"><p>' +
        p.d +
        '</p><div class="cx-tg">' +
        p.g
          .map(function (x) {
            return "<span>" + x + "</span>";
          })
          .join("") +
        '</div><div class="cx-ac"><a href="' +
        p.l +
        '" target="_blank" rel="noopener">Live Demo</a>' +
        (p.r
          ? '<a href="' + p.r + '" target="_blank" rel="noopener">Source</a>'
          : "") +
        "</div></div></div>";
      e.addEventListener("click", function (ev) {
        if (moved) return;
        if (k !== act) {
          ev.preventDefault();
          go(k);
        }
      });
      st.appendChild(e);
      return e;
    });
  }
  function layout() {
    var n = list.length;
    els.forEach(function (e, k) {
      var d = k - act;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      var a = Math.abs(d);
      e.style.setProperty("--d", d);
      e.style.setProperty("--a", a);
      e.style.zIndex = 20 - a;
      e.classList.toggle("on", d === 0);
      e.classList.toggle("hid", a > 3);
      e.setAttribute("aria-hidden", d !== 0);
      e.querySelector(".cx-no").textContent = k + 1 + " / " + n;
    });
    var p = list[act];
    $("#cxT").textContent = p.t;
    $("#cxS").textContent = p.s;
    $(".cx-th").style.background =
      "url(" +
      U +
      p.i +
      "?w=120&q=70) center/cover,linear-gradient(135deg," +
      p.a +
      "," +
      p.b +
      ")";
    $("#cxLk").classList.toggle("on", !!liked[p.t]);
    var cnt = Object.keys(liked).filter(function (x) {
        return liked[x];
      }).length,
      nb = $("#cxN");
    nb.hidden = !cnt;
    nb.textContent = cnt;
    sr.textContent = "Project " + (act + 1) + " of " + n + ": " + p.t;
  }
  function go(k) {
    act = (k + list.length) % list.length;
    layout();
  }
  function next() {
    go(act + 1);
  }
  function prev() {
    go(act - 1);
  }
  function play(on) {
    playing = on;
    clearInterval(timer);
    if (on) timer = setInterval(next, 3500);
    var b = $("#cxPlay");
    b.textContent = on ? "\u275A\u275A" : "\u25B6\uFE0E";
    b.setAttribute("aria-label", on ? "Pause autoplay" : "Start autoplay");
  }
  $("#cxNext").onclick = next;
  $("#cxPrev").onclick = prev;
  $("#cxPlay").onclick = function () {
    play(!playing);
  };
  $("#cxLk").onclick = function () {
    var t = list[act].t;
    liked[t] = !liked[t];
    layout();
  };
  document.querySelectorAll(".cx-filters button").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll(".cx-filters button").forEach(function (x) {
        x.classList.remove("on");
        x.setAttribute("aria-pressed", "false");
      });
      b.classList.add("on");
      b.setAttribute("aria-pressed", "true");
      var f = b.dataset.f;
      list = P.filter(function (p) {
        return f === "all" || p.c === f;
      });
      act = 0;
      build();
      layout();
    };
  });
  view.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  });
  view.addEventListener("pointerdown", function (e) {
    sx = e.clientX;
    moved = false;
  });
  view.addEventListener("pointermove", function (e) {
    if (sx !== null && Math.abs(e.clientX - sx) > 8) moved = true;
  });
  view.addEventListener("pointerup", function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 45) {
      dx < 0 ? next() : prev();
    }
    setTimeout(function () {
      moved = false;
    }, 50);
  });
  view.addEventListener("pointercancel", function () {
    sx = null;
  });
  view.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  view.addEventListener("mouseleave", function () {
    if (playing) {
      clearInterval(timer);
      timer = setInterval(next, 3500);
    }
  });
  build();
  layout();
  act = 2 % list.length;
  layout();
})();

/* Research expanding panels */
(function () {
  var xs = [].slice.call(document.querySelectorAll(".xp"));
  if (!xs.length) return;
  function open(el) {
    xs.forEach(function (x) {
      var on = x === el;
      x.classList.toggle("on", on);
      x.setAttribute("aria-expanded", on);
    });
  }
  var hover = matchMedia("(hover:hover) and (min-width:801px)").matches;
  xs.forEach(function (x) {
    x.addEventListener("click", function () {
      open(x);
    });
    x.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target === x) {
        e.preventDefault();
        open(x);
      }
    });
    if (hover)
      x.addEventListener("mouseenter", function () {
        open(x);
      });
  });
})();

/* Optional real photo for a research panel: put an image link in data-photo="" on that .xi element.
   If the link fails to load, the drawn illustration stays. */
document.querySelectorAll(".xi[data-photo]").forEach(function (b) {
  var u = b.getAttribute("data-photo");
  if (!u) return;
  var im = new Image();
  im.alt = "";
  im.loading = "lazy";
  im.onload = function () {
    im.style.opacity = 1;
  };
  im.onerror = function () {
    im.remove();
  };
  b.appendChild(im);
  im.src = u;
});
