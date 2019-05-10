class GameObject {
    constructor({createdAt, name}) {
        this.createdAt = createdAt;
        this.name = name;
    }
}

class Champion extends GameObject {
    constructor({createdAt, name, maxHealth, resource, attackDamage, armor, magicResist}) {
        super({createdAt, name}) 

        this.maxHealth = maxHealth;
        this.health = this.maxHealth; // Integer: Total HP. When reaches 0, dies.
        this.resource = resource; // Object: With attributes of resourceType and resourceAmount (if any) Required to use abilities.
        this.attackDamage = attackDamage; // Integer: Base physical damage dealt by abilities and auto attacks.
        this.abilityPower = 0; // Integer: Base magic damage dealt by abilities.
        this.armor = armor; // Integer: Base physical damage reduced.
        this.magicResist = magicResist; // Integer: Base magic damage reduced.
        this.Item = {}; // Class Object: Contains it's own properties and methods.
    }

    autoAttack(enemy) {
        enemy.health -= Math.round(this.attackDamage * 100 / (100 + enemy.armor));
        return `${this.name} struck ${enemy.name} unarmed! (${enemy.name}'s Health: ${enemy.health})`;
    }
}

// ITEMS

class Item extends GameObject {
    constructor({createdAt, name, cost, itemHealth, itemResource, itemAttackDamage, itemAbilityPower, itemArmor, itemMagicResist}) {
        super({createdAt, name});

        this.cost = cost; // Integer: Required gold needed to purchase this item.
        this.itemHealth = itemHealth; // Integer: Additive bonus to holder's health.
        this.itemResource = itemResource; // Object: Additive bonus to holder's resource depending on it's type.
        this.itemAttackDamage = itemAttackDamage; // Integer: Additive bonus to holder's attack damage.
        this.itemAbilityPower = itemAbilityPower; // Integer: Additive bonus to holder's ability power.
        this.itemArmor = itemArmor; // Integer: Additive bonus to holder's armor.
        this.itemMagicResist = itemMagicResist; // Integer: Additive bonus to holder's magic resist.
    }
}

// DIFFERENT CHAMPIONS

class Garen extends Champion {
    constructor(garenAttributes) {
        super(garenAttributes);

        this.createdAt = garenAttributes.createdAt;
        this.name = 'Garen';
        this.maxHealth = 616;
        this.health = this.maxHealth;
        this.resource = {resourceType: 'None', resourceAmount: 0};
        this.attackDamage = 66;
        this.armor = 36;
        this.magicResist = 32;
    }

    // Does 40% of your attackDamage in extra damage.
    decisiveStrike(enemy) {
        enemy.health -= Math.round((30 + (this.attackDamage * 0.4)) * 100 / (100 + enemy.armor));
        return `Garen strikes ${enemy.name} down with his mighty sword! (${enemy.name}'s Health: ${enemy.health})`;
    }

    // Increases Armor and Magic Resist by 5 each.
    courage() {
        this.armor += 5;
        this.magicResist += 5;
        return `Garen's courage carries him through the battle! (Garen's Armor and Magic Resist raise slightly)'`;
    }

    // Does damage to two different enemies.
    judgment(enemy1, enemy2) {
        enemy1.health -= Math.round((14 + (this.attackDamage * 0.36)) * 100 / (100 + enemy1.armor));
        enemy2.health -= Math.round((14 + (this.attackDamage * 0.36)) * 100 / (100 + enemy2.armor));
        return `Garen violently whirls his body and sword, striking both ${enemy1.name} and ${enemy2.name}! (${enemy1.name} Health: ${enemy1.health}) (${enemy2.name} Health: ${enemy2.health})`
    }

    // Does high damage to a single target depending on target's missing health.
    demacianJustice(enemy) {
        enemy.health -= Math.round((175 + ((enemy.maxHealth - enemy.health) * 0.4)) * 100 / (100 + enemy.armor));  
        return `Garen calls upon the might of Demacia and lets down a vicious blow to ${enemy.name}! (${enemy.name} Health: ${enemy.health})`;
    }
}

class Ziggs extends Champion {
    constructor(ziggsAttributes) {
        super(ziggsAttributes);

        this.createdAt = ziggsAttributes.createdAt;
        this.name = 'Ziggs';
        this.maxHealth = 536;
        this.health = this.maxHealth;
        this.resource = {resourceType: 'Mana', resourceAmount: 480};
        this.attackDamage = 54;
        this.armor = 21;
        this.magicResist = 30;
    }

    // Does damage to two different enemies.
    bouncingBomb(enemy1, enemy2) {
        if(this.resource.resourceAmount >= 70) {
            this.resource.resourceAmount -= 70;
            enemy1.health -= Math.round((75 + (this.abilityPower * 0.65)) * 100 / (100 + enemy1.magicResist));
            enemy2.health -= Math.round((75 + (this.abilityPower * 0.65)) * 100 / (100 + enemy2.magicResist));
            return `Ziggs throws a bomb, hitting both ${enemy1.name} and ${enemy2.name}! (${enemy1.name} Health: ${enemy1.health}) (${enemy2.name} Health: ${enemy2.health})`;
        } else {
            return `Ziggs doesn't have enough mana to use this ability!`;
        }
    }

    // Does damage to two different enemies. Lower cost and damage than bouncingBomb.
    satchelCharge(enemy1, enemy2) {
        if(this.resource.resourceAmount >= 65) {
            this.resource.resourceAmount -= 65;
            enemy1.health -= Math.round((70 + (this.abilityPower * 0.35)) * 100 / (100 + enemy1.magicResist));
            enemy2.health -= Math.round((70 + (this.abilityPower * 0.35)) * 100 / (100 + enemy2.magicResist));
            return `Ziggs throws a satchel of explosives, hitting both ${enemy1.name} and ${enemy2.name}! (${enemy1.name} Health: ${enemy1.health}) (${enemy2.name} Health: ${enemy2.health})`;
        } else {
            return `Ziggs doesn't have enough mana to use this ability!`;
        }
    }

    // Does damage to three different enemies. Lower cost and lowest damage.
    hexplosiveMinefield(enemy1, enemy2, enemy3) {
        if(this.resource.resourceAmount >= 70) {
            this.resource.resourceAmount -= 70;
            enemy1.health -= Math.round((40 + (this.abilityPower * 0.30)) * 100 / (100 + enemy1.magicResist));
            enemy2.health -= Math.round((40 + (this.abilityPower * 0.30)) * 100 / (100 + enemy2.magicResist));
            enemy3.health -= Math.round((40 + (this.abilityPower * 0.30)) * 100 / (100 + enemy3.magicResist));
            return `Ziggs throws a scatter of mines, hitting ${enemy1.name}, ${enemy2.name}, and ${enemy3.name}! (${enemy1.name} Health: ${enemy1.health}) (${enemy2.name} Health: ${enemy2.health}) (${enemy3.name} Health: ${enemy3.health})`;
        } else {
            return `Ziggs doesn't have enough mana to use this ability!`;
        }
    }

    // Does high damage to three different enemies.
    megaInfernoBomb(enemy1, enemy2, enemy3) {
        if(this.resource.resourceAmount >= 100) {
            this.resource.resourceAmount -= 100;
            enemy1.health -= Math.round((200 + (this.abilityPower * 0.73)) * 100 / (100 + enemy1.magicResist));
            enemy2.health -= Math.round((200 + (this.abilityPower * 0.73)) * 100 / (100 + enemy2.magicResist));
            enemy3.health -= Math.round((200 + (this.abilityPower * 0.73)) * 100 / (100 + enemy3.magicResist));
            return `Ziggs NUKES the area, hitting ${enemy1.name}, ${enemy2.name}, and ${enemy3.name}! (${enemy1.name} Health: ${enemy1.health}) (${enemy2.name} Health: ${enemy2.health}) (${enemy3.name} Health: ${enemy3.health})`;
        } else {
            return `Ziggs doesn't have enough mana to use this ability!`;
        }
    }
}

class Vayne extends Champion {
    constructor(vayneAttributes) {
        super(vayneAttributes);

        this.createdAt = vayneAttributes.createdAt;
        this.name = 'Vayne';
        this.maxHealth = 515;
        this.health = this.maxHealth;
        this.resource = {resourceType: 'Mana', resourceAmount: 231};
        this.attackDamage = 60;
        this.armor = 23;
        this.magicResist = 30;
        this.count = 0;
    }

    // Although this could be called directly, it's intended to work as a passive ability. This function is only called when count === 3.
    silverBolts(enemy) {
        this.count = 0;
        return Math.round(enemy.maxHealth * 0.04);
    }

    // Does damage to single target. Essentially an empowered autoAttack.
    tumble(enemy) {
        if(this.resource.resourceAmount >= 30 && this.count === 2) {
            this.resource.resourceAmount -= 30;
            enemy.health -= Math.round((this.attackDamage + (this.attackDamage * 0.50) + this.silverBolts(enemy)));
            return `Vayne vaults to the side and shoots a SILVER bolt through ${enemy.name}! (${enemy.name}'s Health: ${enemy.health})`;
        } else if(this.resource.resourceAmount >= 30) {
            enemy.health -= Math.round((this.attackDamage + (this.attackDamage * 0.50)) * 100 / (100 + enemy.armor));
            this.count++;
            return `Vayne vaults to the side and shoots a bolt through ${enemy.name}! (${enemy.name}'s Health: ${enemy.health})`;
        } else {
            return `Vayne needs more mana to use this ability!`;
        }
    }

    // Does damage to a single target. Combos nicely with silverBolts.
    condemn(enemy) {
        if(this.resource.resourceAmount >= 90 && this.count === 2) {
            this.resource.resourceAmount -= 90;
            enemy.health -= Math.round(50 + ((this.attackDamage * 0.5) + this.silverBolts(enemy)));
            return `Vayne reveals a massive crossbow and shoots a SILVER bolt through ${enemy.name}! (${enemy.name}'s Health: ${enemy.health})`;
        } else if(this.resource.resourceAmount >= 90) {
            enemy.health -= Math.round(50 + ((this.attackDamage * 0.50)) * 100 / (100 + enemy.armor));
            this.count++;
            return `Vayne reveals a massive crossbow and shoots a bolt through ${enemy.name}! (${enemy.name}'s Health: ${enemy.health})`;
        } else {
            return `Vayne needs more mana to use this ability!`;
        }
    }

    finalHour() {
        this.attackDamage += 10;
        return `Vayne analyzes her surroundings and prepares to chase her prey... (Vayne's attack damage is slightly increased)`
    }
}

class Minion extends GameObject {
    constructor(minionAttributes) {
        super(minionAttributes)

        this.createdAt = minionAttributes.createdAt;
        this.name = 'Minion';
        this.health = 477;
        this.attackDamage = 12;
        this.armor = 0;
        this.magicResist = 0;
    }
}

const garen = new Garen({createdAt: Date.now});
const ziggs = new Ziggs({createdAt: Date.now});
const vayne = new Vayne({createdAt: Date.now});
const newGaren = new Garen({createdAt: Date.now});
const meleeMinion = new Minion({createdAt: Date.now});

// Garen doing stuff:

console.log(garen.autoAttack(ziggs));
console.log(garen.decisiveStrike(ziggs));
console.log(garen.courage());
console.log(garen.judgment(ziggs, vayne));
console.log(garen.demacianJustice(ziggs));

// Ziggs doing stuff:

console.log(ziggs.autoAttack(garen));
console.log(ziggs.bouncingBomb(garen, vayne));
console.log(ziggs.satchelCharge(garen, vayne));
console.log(ziggs.hexplosiveMinefield(garen, vayne, meleeMinion));
console.log(ziggs.megaInfernoBomb(garen, vayne, meleeMinion));

// Vayne doing stuff:

console.log(vayne.autoAttack(garen));
console.log(vayne.tumble(newGaren));
console.log(vayne.condemn(garen));
console.log(vayne.tumble(newGaren));
console.log(vayne.tumble(newGaren));
console.log(vayne.tumble(newGaren));
console.log(vayne.condemn(garen));
console.log(vayne.count);
console.log(vayne.finalHour());