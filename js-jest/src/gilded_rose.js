const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LAST_SELLABLE_DAY = 0;
const BACKSTAGE_PASS_SELL_IN_THRESHOLD = 11;
const BACKSTAGE_PASS_SELL_IN_THRESHOLD_2 = 6;

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
  increaseQuality(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality += 1;
    }
  }
  decreaseQuality(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality -= 1;
    }
  }
  decreaseSellIn(item) {
    item.sellIn -= 1;
  }
  handleBackstagePasses(item) {
    this.increaseQuality(item);
    if (item.sellIn < BACKSTAGE_PASS_SELL_IN_THRESHOLD) {
      this.increaseQuality(item);
    }
    if (item.sellIn < BACKSTAGE_PASS_SELL_IN_THRESHOLD_2) {
      this.increaseQuality(item);
    }
  }
  isExpiredItem(item) {
    return item.sellIn < LAST_SELLABLE_DAY;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case backstage:
          this.handleBackstagePasses(item);
          this.decreaseSellIn(item);
          if (this.isExpiredItem(item)) {
            item.quality = MIN_QUALITY;
          }
          break;
        case sulfuras:
          break;
        case brie:
          this.increaseQuality(item);
          this.decreaseSellIn(item);
          if (this.isExpiredItem(item)) {
            this.increaseQuality(item);
          }
          break;
        default:
          this.decreaseQuality(item);
          this.decreaseSellIn(item);
          if (this.isExpiredItem(item)) {
            this.decreaseQuality(item);
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
