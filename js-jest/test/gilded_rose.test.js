const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  // CONSTRUCTOR TESTS
  it("should default to an empty array of items", function () {
    const gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  // UPDATE QUALITY TESTS
  // backstage tests
  it("should increase quality by 1 for backstage passes with more than 10 days left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increase quality by 2 for backstage passes with 10 days or less left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase quality by 3 for backstage passes with 5 days or less left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should set quality to 0 for backstage passes after the concert", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increase quality by 2 for backstage passes with 6 days left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase quality by 1 for backstage passes with 11 days left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increase quality by 3 for backstage passes with 1 day left", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should set quality to 0 for backstage passes with negative sellIn", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should not allow quality to exceed 50 for backstage passes", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  // sulfuras tests
  it("should not change quality or sellIn for Sulfuras", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });

  // sellIn tests
  it("should decrease sellIn by 1 for all items except Sulfuras", function () {
    const gildedRose = new Shop([
      new Item("foo", 10, 20),
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[1].sellIn).toBe(10);
  });

  // normal items tests
  it("should decrease quality by 1 for normal items before the sell-by date", function () {
    const gildedRose = new Shop([new Item("foo", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it("should not allow quality to go below 0 for normal items", function () {
    const gildedRose = new Shop([
      new Item("foo", 10, 0),
      new Item("foo", 0, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });

  // brie tests
  it("should increase quality by 1 for Aged Brie", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increase quality by 2 for Aged Brie after the sellIn date has passed", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should not allow quality to exceed 50 for Aged Brie", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not allow quality to exceed 49 for Aged Brie", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  // expired items tests
  it("should decrease quality by 2 for expired items", function () {
    const gildedRose = new Shop([new Item("foo", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  // conjured items tests
  it("should decrease quality by 2 for conjured items before the sell-by date", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it("should succeed with different Conjured name", function () {
    const gildedRose = new Shop([new Item("Conjured Elixir", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it("should decrease quality by 4 for conjured items after the sell-by date", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
  });

  it("should not allow quality to go below 0 for conjured items", function () {
    const gildedRose = new Shop([
      new Item("Conjured Mana Cake", 10, 1),
      new Item("Conjured Mana Cake", 0, 3),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });


});
