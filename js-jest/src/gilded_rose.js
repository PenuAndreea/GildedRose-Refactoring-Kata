const MAX_QUALITY = 50;

const brie = 'Aged Brie';
const backstage = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras = 'Sulfuras, Hand of Ragnaros';
const specificItems = [brie, backstage, sulfuras];

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
      item.quality = item.quality + 1;
    }
  }
  decreaseQuality(item) {
    if (item.quality > 0 && item.name != sulfuras) {
      item.quality = item.quality - 1;
    }
  }
  decreaseSellIn(item) {
    if (item.name != sulfuras) {
      item.sellIn = item.sellIn - 1;
    }
  }
  updateQuality() {
    for (const item of this.items) {
      if (!specificItems.includes(item.name)) {
        this.decreaseQuality(item);
      } else {
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
      // sulfuras does not decrease in sellIn or quality
      // DECREASE SELL IN
      this.decreaseSellIn(item);


      // SELL BY DATE HAS PASSED
      if (item.sellIn < 0) {
        // BRIE AND BACKSTAGE INCREASE IN QUALITY
        if (item.name != brie) {
          // The quality of an item is never negative
          if (item.name != backstage) {
            this.decreaseQuality(item);
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          this.increaseQuality(item);
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
