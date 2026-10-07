const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LAST_SELLABLE_DAY = 0;
const BACKSTAGE_DOUBLE_VALUE_DAYS = 10;
const BACKSTAGE_TRIPLE_VALUE_DAYS = 5;
const DOUBLE_VALUE = 2;
const TRIPLE_VALUE = 3;

const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  increaseQuality(item, amount = 1) {
    if ((item.quality + amount) <= MAX_QUALITY) {
      item.quality += amount;
    } else {
      item.quality = MAX_QUALITY;
    }
  }
  decreaseQuality(item, amount = 1) {
    if ((item.quality - amount) > MIN_QUALITY) {
      item.quality -= amount;
    } else {
      item.quality = MIN_QUALITY;
    }
  }
  decreaseSellIn(item) {
    item.sellIn -= 1;
  }
  handleBackstagePasses(item) {
    if (item.sellIn <= BACKSTAGE_TRIPLE_VALUE_DAYS) {
      this.increaseQuality(item, TRIPLE_VALUE);
    } else if (item.sellIn <= BACKSTAGE_DOUBLE_VALUE_DAYS) {
      this.increaseQuality(item, DOUBLE_VALUE);
    } else {
      this.increaseQuality(item);
    }
  }
  isExpired(item) {
    return item.sellIn < LAST_SELLABLE_DAY;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case backstage:
          this.handleBackstagePasses(item);
          this.decreaseSellIn(item);
          if (this.isExpired(item)) {
            item.quality = MIN_QUALITY;
          }
          break;
        case sulfuras:
          break;
        case brie:
          this.decreaseSellIn(item);
          this.increaseQuality(item, this.isExpired(item) ? DOUBLE_VALUE : undefined);
          break;
        default:
          this.decreaseSellIn(item);
          this.decreaseQuality(item, this.isExpired(item) ? DOUBLE_VALUE : undefined);
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
