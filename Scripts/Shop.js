var menuOpen = false;
menuTop = 150;
menuHeight = 1000;
menuWidth = 500;

let menu = new PIXI.Container();
app.stage.addChild(menu)
const menuBG = new PIXI.Graphics();
app.stage.addChild(menuBG);
menuBG
	.beginFill(0x999999)
	.drawRect(app.renderer.width - menuWidth, menuTop, menuWidth, menuHeight)
	.visible = false;

const menuPage1 = new PIXI.Container();
menu.addChild(menuPage1);

shopItems = []; //will create procedurally based on dogeTypes array

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
	console.log(menuOpenButton.position);
}, 500);
menuOpenButton.rotation = Math.PI * 1.5;
app.stage.addChild(menuOpenButton);

menuOpenButton
	.on('pointerdown', menuOBDown)
	.on('pointerup', menuOBUp)
	.on('pointerover', menuOBHover)
	.on('pointerout', menuOBOff);
function menuOBDown() {}
function menuOBUp() {
	menuOpen = !menuOpen
	menuBG.visible = menuOpen;
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