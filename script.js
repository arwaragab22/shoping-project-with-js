let itemsselected = [];
let items = [];

async function getproducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  items = products;

  for (let i = 0; i < products.length; i++) {
    let parent = document.getElementsByClassName("parent")[0];
    let newproduct = document.createElement("div");
    newproduct.className = "product";
    newpadd = document.createElement("button");

    newpadd.innerHTML = `<div class="add" onclick=selectproduct(${products[i].id})>+</div>`;

    newbuttons = document.createElement("div");
    newbuttons.className = "btncontainer";
    newproduct.appendChild(newbuttons);

    newbuttons.appendChild(newpadd);
    let newtitle = document.createElement("h3");
    let newcontainerimg = document.createElement("div");
    newcontainerimg.className = "img";

    newcontainerimg.style.backgroundImage = `url(${products[i].image})`;
    let newprice = document.createElement("span");
    newtitle.innerHTML = products[i].title;
    newprice.innerHTML = "$" + products[i].price;

    newproduct.appendChild(newcontainerimg);
    newproduct.appendChild(newtitle);
    newproduct.appendChild(newprice);
    parent.appendChild(newproduct);
  }

}

getproducts();
function selectproduct(id) {
  let item = items.find((ele, i) => {
    return ele.id === id;
  });

  if (
    itemsselected.some((element) => {
      return element.id === item.id;
    })
  ) {
    console.log("11");
    Swal.fire("you selected it before");
  } else {
    console.log(itemsselected);
    itemsselected.push({ ...item, nums: 1, total: item.price });
    localStorage.setItem("itemsselected", JSON.stringify(itemsselected));
    show();
    final();
  }
}

function getcount(a, id) {
  if (a === "add") {
    let card = itemsselected.find((ele) => {
      return ele.id === id;
    });

    card.nums += 1;
    changeprice("add", card.id);
    show();
  }
  if (a === "sub") {
    let card = itemsselected.find((ele) => {
      return ele.id === id;
    });
    if (card.nums !== 0) {
      card.nums -= 1;
      changeprice("sub", card.id);
    }

    show();
  }
  final();
}

function changeprice(type, id) {
  if (type === "add") {
    itemprice = itemsselected.find((ele) => {
      return ele.id === id;
    });

    itemprice.total += itemprice.price;
    console.log(itemprice.price, itemprice.total);
    console.log(itemsselected);
    localStorage.setItem("itemsselected", JSON.stringify(itemsselected));
    show();
  }
  if (type === "sub") {
    let itemprice = itemsselected.find((ele) => {
      return ele.id === id;
    });

    if (itemprice.total.toFixed(1) > itemprice.price.toFixed(1)) {
      itemprice.total -= itemprice.price;
    }
    localStorage.setItem("itemsselected", JSON.stringify(itemsselected));
    show();
  }
}
function final() {
  let totalnum = 0;
  let totalprice = 0;
  for (let i = 0; i < itemsselected.length; i++) {
    totalnum += itemsselected[i].nums;
    totalprice += itemsselected[i].total;
  }

  document.getElementsByClassName("countheader")[0].innerHTML = totalnum;
  document.getElementsByClassName("tot")[0].innerHTML = "(" + totalnum + ")";
  document.getElementsByClassName("pri")[0].innerHTML =
    totalnum !== 0 ? "$" + totalprice.toFixed(2) : 0;
}
function remove(id) {
  let newitems = itemsselected.filter((ele) => {
    return ele.id !== id;
  });
  itemsselected = newitems;
  localStorage.setItem("itemsselected", JSON.stringify(itemsselected));
  show();
  final();
}

function show() {
  if (localStorage.getItem("itemsselected") !== null) {
    console.log("local");
    itemsselected = JSON.parse(localStorage.getItem("itemsselected"));
    console.log(itemsselected);
  }

  document.getElementsByClassName("cards")[0].innerHTML = "";
  itemsselected.forEach((ele, i) => {
    console.log(ele.total);
    document.getElementsByClassName("cards")[0].innerHTML += `
    <div class="carditem">
    <i class="fa-solid fa-xmark remove" onclick="remove(${ele.id})"></i>
    <img src="${ele.image}" width="100" height="100">
    <span>$${Number(ele.total).toFixed(1)}</span>
    <div class="count">
    <span onclick="getcount('add',${ele.id})">+</span>
    <span>${ele.nums}</span>
    <span onclick="getcount('sub',${ele.id})">-</span>
    </div>
    
    </div>`;
  });
  final();

}
window.onload = show();
/////// slider

