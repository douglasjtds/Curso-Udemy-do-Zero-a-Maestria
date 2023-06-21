function a() {
  console.log("A");
}

function b() {
  console.log("B");
}

function c() {
  console.log("C");
  a();
  b();
}

c();
