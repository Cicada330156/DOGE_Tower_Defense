var menuOpen = false;

const dropdownButtonTexture = PIXI.Texture.from("https://cicada330156.github.io/DOGE_bloons/Assets/openMenuButton.png");
let menuOpenButton = new PIXI.Sprite(dropdownButtonTexture);
menuOpenButton.interactive = true;
menuOpenButton.buttonMode = true;
menuOpenButton.anchor.set(0.5, 0.5);
menuOpenButton.scale.x = 0.5;
menuOpenButton.scale.y = 0.5;
menuOpenButton.x = app.renderer.width;
menuOpenButton.y = 200;
console.log(menuOpenButton.position);
app.stage.addChild(menuOpenButton);

menuOpenButton
	.on('pointerdown', menuOBDown)
	.on('pointerup', menuOBUp)
	.on('pointerover', menuOBHover)
	.on('pointerout', menuOBOff);
function menuOBDown() {}
function menuOBUp() {
	menuOpen = !menuOpen
	menuPage1.visible = menuOpen;
	if (menuOpen) {
		menuOpenButton.rotation ++;
	}
}
function menuOBHover() {}
function menuOBOff() {}

function openMenu () {
	
}

let menu = new PIXI.Container();
app.stage.addChild(menu)
const menuPage1 = new PIXI.Graphics();
menu.addChild(menuPage1);
menuPage1
	.beginFill(0x999999)
	.drawRect(30, 20, 150, 150)
	.visible = false;
