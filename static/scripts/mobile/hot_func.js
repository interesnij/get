
function banner_height_init(block){
  console.log(block);
  if (block.querySelector(".js-height-full")){
    div = block.querySelector(".js-height-full");
        div.style.height = (window.innerHeight - 44) + "px";
    }
};

banner_height_init(document.body.querySelector("#ajax"));
