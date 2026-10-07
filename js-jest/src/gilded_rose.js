const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LAST_SELLABLE_DAY = 0;
const BACKSTAGE_DOUBLE_VALUE_DAYS = 10;
const BACKSTAGE_TRIPLE_VALUE_DAYS = 5;

const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';
const conjured = 'Conjured';

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
  modifyQuality(item, amount) {
    const newQuality = item.quality + amount;

    if (newQuality > MAX_QUALITY) {
      item.quality = MAX_QUALITY;
      return;
    }

    if (newQuality < MIN_QUALITY) {
      item.quality = MIN_QUALITY;
      return;
    }

    item.quality = newQuality;
  }
  decreaseSellIn(item) {
    item.sellIn -= 1;
  }
  handleBackstagePasses(item) {
    if (item.sellIn <= BACKSTAGE_TRIPLE_VALUE_DAYS) {
      this.modifyQuality(item, 3);
    } else if (item.sellIn <= BACKSTAGE_DOUBLE_VALUE_DAYS) {
      this.modifyQuality(item, 2);
    } else {
      this.modifyQuality(item, 1);
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
          this.modifyQuality(item, this.isExpired(item) ? 2 : 1);
          break;
        default: {
          const isConjured = item.name.includes(conjured);
          const qualityDecrease = isConjured ? 2 : 1;
          this.decreaseSellIn(item);

          const expired = this.isExpired(item);
          const qualityChange = -(expired ? qualityDecrease * 2 : qualityDecrease);

          this.modifyQuality(item, qualityChange);
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
