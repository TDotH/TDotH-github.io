import * as Babylon from '@babylonjs/core';
import Player_Bullet from './Player_Bullet';
import Enemy_Ship from './Enemy_Ship';

const sprite_loc = './assets/sprites/';
const bullet_delay = 1;
const player_speed = 3;

const input_map = { 'w' : 'move_up', 's' : 'move_down', 'a' : 'move_left', 'd' : 'move_right', 'z' : 'fire' };
const states = { 0 : "menu", 1 : "stage1"}; 

class SpacerX {

    constructor(scene, engine) {
        this.state = {
            player: null,
            player_sprite_manager: null,
           
            enemies: [],
            enemy_sprite_manager: null,
            background_manager: null,
            background: null,
            scene: scene,
            engine: engine
        };
        this.bullet_sprite_manager = null;
        this.bullets = [];
        this.input_map = {};
    }

    update() {
        /*
        for (let i = 0; i < this.state.bullets.size(); i++) {
            this.state.bullets[i].update(delta_time_ms);
        }

        for (enemy in this.state.enemies) {
            this.state.enemies[i].update(delta_time_ms);
        }
        this.state.player.update(delta_time_ms);
        */
    }

    setupGame(scene) {
        
        this.state.player_sprite_manager = new Babylon.SpriteManager('player_manager', sprite_loc + 'Player_Ship.png', 1, 64, this.state.scene);
        this.player = new Babylon.Sprite('player', this.state.player_sprite_manager);

        this.bullet_sprite_manager = new Babylon.SpriteManager('bullet_manager', sprite_loc + 'Ship_Bullet.png', 10, 8, this.state.scene);

        scene.actionManager.registerAction(new Babylon.ExecuteCodeAction(Babylon.ActionManager.OnKeyDownTrigger, (evt) => {

            this.input_map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
        }));

        scene.actionManager.registerAction(new Babylon.ExecuteCodeAction(Babylon.ActionManager.OnKeyUpTrigger, (evt) => {

            this.input_map[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
        }));

        scene.onBeforeRenderObservable.add(() => {
            this.inputHander();
        });

        /*
        scene.registerBeforeRender(() => {
          //for each object in scene call update function
          this.objects.forEach(object => {
              object.update();
          });
        });
        */
        //this.state.background_manager = new Babylon.SpriteManager('background_mangaer', sprite_loc + 'Space.png', 1, {width: 512, height: 288}, this.state.scene);
        //this.background = new Babylon.Sprite('background', this.state.background_manager);
    }

    inputHander() {
        if (this.input_map["w"]) {
            this.player.position.z -= player_speed * (this.state.engine.getDeltaTime() / 1000);
        }

        if (this.input_map["s"]) {
            this.player.position.z += player_speed * (this.state.engine.getDeltaTime() / 1000);
        }

        if (this.input_map["a"]) {
            this.player.position.x += player_speed * (this.state.engine.getDeltaTime() / 1000);
        }

        if (this.input_map["d"]) {
            this.player.position.x -= player_speed * (this.state.engine.getDeltaTime() / 1000);
        }

        if (this.input_map["z"]) {
            var bullet = new Babylon.Sprite('bullet', this.bullet_sprite_manager);
            bullet.size = 0.10;
            this.bullets.push(bullet);
            console.log(this.bullets);
            //this.bullets[0].position = this.player.position;
        }

        //console.log(this.input_map);
    }
}

export default SpacerX;