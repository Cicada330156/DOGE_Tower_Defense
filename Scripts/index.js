const canvas = document.getElementById('gamePanel');
const app = new PIXI.Application({
    view: canvas,
    width: 2800,
    height: 1500,
    backgroundColor: 0x7cfc00,
    autostart: false
});
app.ticker.stop();

const canvasSizeRatio = 2800 / 1500;
function resize() {
    if (window.innerHeight * 0.9 >= 750 && window.innerWidth * 0.9 >= 1400) {
        var w = 1400;
        var h = 750;
    } else {
        if (window.innerWidth / window.innerHeight >= canvasSizeRatio) {
            var w = window.innerHeight * canvasSizeRatio * 0.9;
            var h = window.innerHeight * 0.9;
        } else {
            var w = window.innerWidth * 0.9;
            var h = window.innerWidth / canvasSizeRatio * 0.9;
        }
    }
    app.renderer.view.style.width = w + 'px';
    app.renderer.view.style.height = h + 'px';
}
window.onresize = function(event) {
    resize();
};
resize();

grid = {horizontals: [], verticals: []};
gridSpacing = 100;
for (i = 0; i < app.renderer.width; i += gridSpacing) {
    const gridLine = new PIXI.Graphics();
    grid.horizontals.push(gridLine);
    app.stage.addChild(gridLine);
    gridLine
        .lineStyle(5, 0x78e900, 1)
        .moveTo(0, i)
        .lineTo(app.renderer.width, i);
}
for (i = 0; i < app.renderer.width; i += gridSpacing) {
    const gridLine = new PIXI.Graphics();
    grid.verticals.push(gridLine);
    app.stage.addChild(gridLine);
    gridLine
        .lineStyle(5, 0x78e900, 1)
        .moveTo(i, 0)
        .lineTo(i, app.renderer.height);
}

const thiefCate = PIXI.Texture.from('https://cdn.discordapp.com/emojis/569160672739590174.png?v=1');
var catePath = [[100, 100], [200, 200], [300, 200], [200, 300], [300, 500]];
catesSpawned = 0;
defaultWave = {
cateSpeed: 1,
cateSpawnRate: 120
}
cateTypes = [
    {size: [153, 135], attack: 5, HP: 10},//normal cate
    {size: [113, 100]}
]
waveType = defaultWave;
let cates = [];
function cateSpawn(type, pos) {
    for (i = 0; i < 1; i++) {
        let cate = new PIXI.Sprite(thiefCate);
        cate.anchor.set(0.5);
        cate.currentSegment = 0;
        cate.dirToWaypoint;
        cate.totalId = catesSpawned;
        //variables base on inputs
        cate.x = pos[0];
        cate.y = pos[1];
        //type defined traits vv
        cate.attack = cateTypes[type].attack;
        cate.HP = cateTypes[type].HP;
        cate.width = cateTypes[type].size[0];
        cate.height = cateTypes[type].size[1];
        cate.stage = defaultWave;
        cate.path = catePath;
        //add to stage and array
        app.stage.addChild(cate);
        cates.push(cate);
        catesSpawned++;
    }
}

const closeDefDoge = PIXI.Texture.from('Assets/Helpers/Helpers_2x/shibes-idle-0_2x-art-scale-2_00x.png');
const closeDefDogeAttack = PIXI.Texture.from('Assets/Helpers/Helpers_2x/shibes-mine-0_2x-art-scale-2_00x.png');
closeDefDogeWHRatio = closeDefDoge.height/closeDefDoge.width;
dogeTypes = [
    {name: "close defense baguette doge", size: [150, 150 * closeDefDogeWHRatio], price: 30, dogeTextures: {idle: closeDefDoge, attack: closeDefDogeAttack}, range: 50, attack: 5}, //close defense baguette doge
{name: "ranged doge", price: 50, dogeTextures: {idle: closeDefDoge, attack: closeDefDogeAttack}, range: 200, attack: 3} //ranged attack doge
];
//dogeType = dogeCloseDef;
let doges = [];
function dogeSpawn (type, pos) {
    for (i = 0; i < 1; i++) {
        let doge = new PIXI.Sprite(dogeTypes[type].dogeTextures.idle);
        doge.range = dogeTypes[type].range;
        doge.attack = dogeTypes[type].attack;
        doge.anchor.set(0.5);
        doge.height = dogeTypes[type].size[0];
        doge.width = dogeTypes[type].size[1];
        doge.x = pos[0];
        doge.y = pos[1];
        doge.isAttacking = false;
        doge.textures = dogeTypes[type].dogeTextures;
        app.stage.addChild(doge);
        doges.push(doge);
    }
}
//dogeSpawn(0, [50, 35]);
//dogeSpawn(0, [50, 200]);
dogeSpawn(0, [400, 225]);

function getDistance(p1, p2) {
    xL = p1.x - p2.x;
    yL = p1.y - p2.y;
    d = Math.sqrt((xL * xL) + (yL * yL));
    return(d);
}

const defaultBaseHP = 20;
baseHP = defaultBaseHP;
function hurtBase(attacker) {
    baseHP -= attacker.attack;
    if (baseHP <= 0) {
        app.ticker.stop();
        alert("oh noes! looks like your base was defeated by the cates!");
        document.body.innerHTML += "<p>RIP. Looks like your base was defeated.</p>"
        canvas.style = "display: block; margin-left: auto; margin-right: auto; touch-action: none; width: 1400px; height: 756px; cursor: inherit";
    }
}



function checkVertical (p1, p2) {
    if (p1 != p2) {
        if (p1[0] != p2[0]) {
            if (p1[1] != p2[1]) {
                return(diagonal);
            }
            return(horizontal);
        }
        return(vertical);
    }
    return(no_movement);
}




frame = 0;
app.ticker.add(animate);
function animate() {
    if (frame % waveType.cateSpawnRate == 0) {
        if((frame / waveType.cateSpawnRate) % 2 == 0){
        cateSpawn(0, [100, 100]);
        }else{
        cateSpawn(0, [50, 100]);
        }
    }
    for (var i = 0; i < cates.length; i++) {
        //cates[i].x += waveType.cateSpeed;
        followPath(cates[i]);
    }
    if (frame % 30 == 0) {
        for (var i = 0; i < doges.length; i++) {
            for (var g = 0; g < cates.length; g++) {
                spriteDistance = getDistance(cates[g].position, doges[i].position)
                if (spriteDistance <= doges[i].range) {//should update to include physical size of doges
                    console.log("bonk!");
                    cates[g].HP -= doges[i].attack;
                    attackAnimation(doges[i]);
                }
                if (cates[g].HP <= 0) {
                    app.stage.removeChild(cates[g]);
                    cates.splice(g, 1);
                }
            }
        }
    }

    //everything after this has to be done last, for order of operations and such. otherwise it gets super buggy.
    for (var i = 0; i < cates.length - 1; i++) {
        if (cates[i].x >= app.renderer.width) {
            hurtBase(cates[i]);
            console.log("a cate got in! \nbase HP is now " + baseHP)
            app.stage.removeChild(cates[i]);
            cates.splice(i, 1);
            i--;
        }
    }
    frame++;
}
//app.ticker.start();