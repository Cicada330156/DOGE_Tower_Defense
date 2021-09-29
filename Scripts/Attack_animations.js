//attackRocket = new PIXI.Texture.from('');
function attackAnimation(defender) {
	if (defender.isAttacking == false) {
		defender.texture = defender.textures.attack;
		setTimeout(() => {defender.texture = defender.textures.idle;}, 100)
	}	
}
