class mapPosition {
    constructor(newx, newz) {
        this.x = newx;
        this.z = newz;
    }
}

export class Mob {
    constructor() {
        this.mesh = undefined;
        this.hp = 10;
        this.speed = 2;

        this.currentStep = 1;
        this.target = undefined; // instance of mapPosition
        this.readyForNextStep = false;
    }

    updatePosition(delta, mapdata) {
        if (!this.target) //bad target
        {
            return;
        }
        var is_X_ok = false;
        var is_Z_ok = false;

        var size = mapdata.mobpath.length;
        var convertedpositiontarget_x = (this.target.x * 2) - (size / 2) * 2; // position x
        var convertedpositiontarget_z = (this.target.z * 2) - (size / 2) * 2;
        // --------- Z AXIS -----------

        if (this.mesh.position.z < convertedpositiontarget_z) {
            this.mesh.position.z += this.speed * delta;

            if (this.mesh.position.z > convertedpositiontarget_z) {
                this.mesh.position.z = convertedpositiontarget_z;
            }
        }
        else if (this.mesh.position.z > convertedpositiontarget_z) {
            this.mesh.position.z -= this.speed * delta;

            if (this.mesh.position.z < convertedpositiontarget_z) {
                this.mesh.position.z = convertedpositiontarget_z;
            }
        }
        else if (this.mesh.position.z == convertedpositiontarget_z) {
            // THE SAME VALUE
            is_Z_ok = true;
        }
        // --------- X AXIS -----------

        if (this.mesh.position.x < convertedpositiontarget_x) {
            this.mesh.position.x += this.speed * delta;

            if (this.mesh.position.x > convertedpositiontarget_x) {
                this.mesh.position.x = convertedpositiontarget_x;
            }
        }
        else if (this.mesh.position.x > convertedpositiontarget_x) {
            this.mesh.position.x -= this.speed * delta;

            if (this.mesh.position.x < convertedpositiontarget_x) {
                this.mesh.position.x = convertedpositiontarget_x;
            }
        }
        else if (this.mesh.position.x == convertedpositiontarget_x) {
            // THE SAME
            is_X_ok = true;
        }
        if (is_X_ok && is_Z_ok) {
            this.readyForNextStep = true;
        }
    }
}

export class MobsManager {
    constructor() {
        this.mobArray = new Array();
        this.pathTargets = new Array();
    }

    loadPathTargets(mapdata) {
        var size = mapdata.mobpath.length;
        this.pathTargets[0] = undefined;

        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                if (mapdata.mobpath[y][x] != 0) {
                    this.pathTargets[mapdata.mobpath[y][x]] = new mapPosition(x, y);
                }
            }
        }
    }

    getStepPosition(stepid) {
        return this.pathTargets[stepid];
    }

    getNextStep(currentstep) {
        var newstep = currentstep + 1;

        if (this.pathTargets[newstep]) {
            return this.getStepPosition(newstep);
        }
        else {
            return undefined;
        }
    }

    createMob(basemesh, scene, mapdata) {
        var tmpmob = new Mob();
        tmpmob.mesh = basemesh.clone();

        // base position
        var baseposition = this.getStepPosition(tmpmob.currentStep);
        var size = mapdata.mobpath.length;
        tmpmob.mesh.position.x = (baseposition.x * 2) - (size / 2) * 2; // position x
        tmpmob.mesh.position.z = (baseposition.z * 2) - (size / 2) * 2; // position z
        tmpmob.target = this.getNextStep(tmpmob.currentStep);
        this.mobArray.push(tmpmob);
        scene.add(tmpmob.mesh);
    }

    deleteMobs(mobstodelete_array, scene) {
        for (var i = 0; i < mobstodelete_array.length; i++) {
            const index = this.mobArray.indexOf(mobstodelete_array[i]);
            if (index > -1) {
                this.mobArray.splice(index, 1);
            }
            scene.remove(mobstodelete_array[i].mesh);
        }
    }

    updateMobsPosition(delta, mapdata, scene) {
        var mobstodelete = new Array();
        for (var i = 0; i < this.mobArray.length; i++) {
            if (this.mobArray[i].readyForNextStep) // if we need a new step
            {
                var mobtarget = this.getNextStep(this.mobArray[i].currentStep);
                this.mobArray[i].currentStep++;
                this.mobArray[i].target = mobtarget;
                this.mobArray[i].readyForNextStep = false;

                if (!this.mobArray[i].target) // if invalid target, we delete this mob - end of path or invalid
                {
                    mobstodelete.push(this.mobArray[i]);
                }
            }
            this.mobArray[i].updatePosition(delta, mapdata);
        }
        this.deleteMobs(mobstodelete, scene);
    }
}