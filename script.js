const colors = {
  red: "#ff0000",
  blue: "#0000ff",
  yellow: "#ffff00",
  green: "#00ff00",
  orange: "#ffa500",
  purple: "#800080",
  pink: "#ffc0cb",
  black: "#000000",
  white: "#ffffff",
  gray: "#808080",
  brown: "#8B4513"
};

let selected = { c1: null, c2: null };

window.onload = function () {
  let list1 = document.getElementById("list1");
  let list2 = document.getElementById("list2");

  for (let key in colors) {
    list1.innerHTML += createItem(key, 1);
    list2.innerHTML += createItem(key, 2);
  }

  // ✅ click outside = close all
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      closeAll();
    }
  });
};

function createItem(color, box) {
  return `
    <div class="item" onclick="selectColor(event,'${color}', ${box})">
      <div class="circle" style="background:${colors[color]}"></div>
      ${capitalize(color)}
    </div>
  `;
}

/* ✅ FIXED: proper close on select */
function selectColor(event, color, box) {
  event.stopPropagation(); // prevent re-open issue

  if (box === 1) {
    selected.c1 = color;
    document.getElementById("selected1").innerText = capitalize(color);
  } else {
    selected.c2 = color;
    document.getElementById("selected2").innerText = capitalize(color);
  }

  closeAll(); // ✅ always close after selection
}

/* dropdown toggle */
function toggleList(box) {
  closeAll();

  if (box === 1) {
    document.getElementById("list1").style.display = "block";
  } else {
    document.getElementById("list2").style.display = "block";
  }
}

/* close both */
function closeAll() {
  document.getElementById("list1").style.display = "none";
  document.getElementById("list2").style.display = "none";
}

function mixColors() {
  if (!selected.c1 || !selected.c2) return;

  let c1 = selected.c1;
  let c2 = selected.c2;

  let rgb1 = hexToRgb(colors[c1]);
  let rgb2 = hexToRgb(colors[c2]);

  let r = Math.round((rgb1.r + rgb2.r) / 2);
  let g = Math.round((rgb1.g + rgb2.g) / 2);
  let b = Math.round((rgb1.b + rgb2.b) / 2);

  let finalColor = `rgb(${r},${g},${b})`;

  let name = capitalize(c1) + " + " + capitalize(c2);

  document.getElementById("colorBox").style.background = finalColor;
  document.getElementById("textResult").innerText = "Result: " + name;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1,3),16),
    g: parseInt(hex.slice(3,5),16),
    b: parseInt(hex.slice(5,7),16)
  };
}