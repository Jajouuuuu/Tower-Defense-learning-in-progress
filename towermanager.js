class Tower
{
    constructor()
    {
        this.mesh = undefined;
    }
}

export class TowerManager
{
    constructor()
    {
        // ---- Tower List ----
        this.towerArray = new Array();

        // ---- Temporary variables ----
        this.newTowerMeshToCreate = undefined;
        this.selectedTower = undefined;
    }

    addTower(newtowermesh)
    {
      var newtower = new Tower();
      newtower.mesh = newtowermesh;
      this.towerArray.push(newtower);
    }

    deleteTower(TowerObj)
    {
        const index = this.towerArray.indexOf(TowerObj);
        if (index > -1) {
          this.towerArray.splice(index, 1);
        }
    }

    getTowerAtPosition(x, z)
    {
        for(var i = 0 ; i < this.towerArray.length ; i++ )
        {
            if(this.towerArray[i].mesh.position.x == x && this.towerArray[i].mesh.position.z == z )
            {
                return this.towerArray[i];
            }
        }
        return null;
    }
}