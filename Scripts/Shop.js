var menuOpen = false;
menuTop = 150;
menuHeight = 1200;
menuWidth = 600;

let menu = new PIXI.Container();
app.stage.addChild(menu)
menu.x = app.renderer.width - menuWidth;
menu.y = menuTop;
const menuBG = new PIXI.Graphics();
menuBG
	.beginFill(0x999999)
	.drawRect(0, 0, menuWidth, menuHeight)
menu.addChild(menuBG);

//const menuPage1 = new PIXI.Container();
//menu.addChild(menuPage1);
currentShopIndex = 0;
console.log(menuBG);

class dogeShopPage {
	constructor (definedDoge) {
		this.type = definedDoge.name;
		this.price = definedDoge.price;
		this.texture = definedDoge.dogeTexture;
		this.count = 0;
	}
}
shopItems = []; //will create procedurally based on dogeTypes array
dogeTypes.forEach(element => {
	newDoge = new dogeShopPage(element);
	shopItems.push(newDoge);
});

shopTitle = new PIXI.Text('SHOP', {fontSize: 100, fill : 0xff1010});
menu.addChild(shopTitle);
shopTitle.x = 213;
shopTitle.y = 0;

defenderName = new PIXI.Text(shopItems[0].type, {fontSize: 50, fill: 0xff1010, wordWrap: true, wordWrapWidth: menu.width});
menu.addChild(defenderName);
defenderName.x = 15;
defenderName.y = 105;

defenderPicture = new PIXI.Sprite(shopItems[0].texture);
menu.addChild(defenderPicture);
defenderPicture.y = 200;
defenderPicture.setTransform(this.x, 200, 5, 5);//x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY
function setPage (page) {
	
}

console.log("page loaded");
const dropdownButtonTexture = PIXI.Texture.from("https://cicada330156.github.io/DOGE_bloons/Assets/openMenuButton.png");
let menuOpenButton = new PIXI.Sprite(dropdownButtonTexture);
menuOpenButton.interactive = true;
menuOpenButton.buttonMode = true;
menuOpenButton.scale.x = 0.35;
menuOpenButton.scale.y = 0.35;
setTimeout ( function(){
	menuOpenButton.x = app.renderer.width - menuOpenButton.height;
	menuOpenButton.y = menuTop + menuOpenButton.width;
}, 500);
menuOpenButton.rotation = Math.PI * 1.5;
app.stage.addChild(menuOpenButton);



menu.visible = false;
menuOpenButton
	.on('pointerdown', menuOBDown)
	.on('pointerup', menuOBUp)
	.on('pointerover', menuOBHover)
	.on('pointerout', menuOBOff);
function menuOBDown() {}
function menuOBUp() {
	menuOpen = !menuOpen
	menu.visible = menuOpen;
	if (menuOpen) {
		menuOpenButton.rotation = 0;
		menuOpenButton.x = app.renderer.width - menuWidth;
		menuOpenButton.y = menuTop;
	}
	if (!menuOpen) {
		menuOpenButton.rotation = Math.PI * 1.5;
		menuOpenButton.x = app.renderer.width - menuOpenButton.height;
		menuOpenButton.y = menuTop + menuOpenButton.width;
	}
}
function menuOBHover() {}
function menuOBOff() {}

function openMenu () {
	
}
