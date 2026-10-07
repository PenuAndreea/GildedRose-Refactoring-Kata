const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_SELLIN = 0;

const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';
const qualityIncreaseItems = [brie, backstage, sulfuras];

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
  handleExpiredItem(item) {
    switch (item.name) {
      case brie:
        this.increaseQuality(item);
        break;
      case backstage:
        item.quality = MIN_QUALITY;
        break;
      case sulfuras:
        break;
      default:
        this.decreaseQuality(item);
    }
  }
  handleQualityIncrease(item) {
    this.increaseQuality(item);
    if (item.name == backstage) {
      if (item.sellIn < 11) {
        this.increaseQuality(item);
      }
      if (item.sellIn < 6) {
        this.increaseQuality(item);
      }
    }
  }
  updateQuality() {
    for (const item of this.items) {
      if (qualityIncreaseItems.includes(item.name)) {
        this.handleQualityIncrease(item);
      } else {
        this.decreaseQuality(item);
      }
      if (item.name != sulfuras) {
        this.decreaseSellIn(item);
      }
      if (item.sellIn < MIN_SELLIN) {
        this.handleExpiredItem(item);
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
